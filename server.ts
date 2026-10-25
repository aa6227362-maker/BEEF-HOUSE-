import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  BRAND_TOKENS,
  INITIAL_VERIFICATION_CONFIG,
  PRODUCTS_DATA,
  PRODUCT_CATEGORIES,
  MEAT_CUTS_GUIDE,
  RECIPES_DATA,
  FAQ_ITEMS,
  getRiyadhBusinessStatus,
  StoreOwnerVerificationConfig,
} from './src/config/siteConfig.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const CONFIG_FILE = path.join(DATA_DIR, 'store-config.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadStoreConfig(): StoreOwnerVerificationConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const raw = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return { ...INITIAL_VERIFICATION_CONFIG, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('Failed to read store-config.json:', e);
  }
  return { ...INITIAL_VERIFICATION_CONFIG };
}

function saveStoreConfig(cfg: StoreOwnerVerificationConfig): void {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to write store-config.json:', e);
  }
}

export interface StoredOrder {
  orderNumber: string;
  createdAt: string;
  riyadhCreatedAt: string;
  status: 'received' | 'preparing_weight_confirmation' | 'ready' | 'completed';
  lang: 'ar' | 'en';
  customer: {
    fullName: string;
    phone: string;
    city: string;
    district: string;
    streetAddress: string;
    notes: string;
  };
  fulfillmentType: 'delivery' | 'pickup';
  paymentMethod: 'cod' | 'pickup_pos';
  hasWeightBasedItems: boolean;
  acceptedWeightPolicy: boolean;
  discountCode: string | null;
  items: {
    productId: string;
    nameAr: string;
    nameEn: string;
    weightId: string;
    weightLabelAr: string;
    weightLabelEn: string;
    estimatedWeightKg: number;
    isWeightBased: boolean;
    prepId: string;
    prepLabelAr: string;
    prepLabelEn: string;
    quantity: number;
    unitEstimatedPriceSar: number;
    lineEstimatedTotalSar: number;
    customCuttingNote?: string;
  }[];
  pricing: {
    estimatedSubtotalSar: number;
    discountSar: number;
    deliveryFeeSar: number;
    estimatedGrandTotalSar: number;
    isIllustrativeCatalogNotice: boolean;
    weightConfirmationPolicyAr: string;
    weightConfirmationPolicyEn: string;
  };
}

function loadOrders(): StoredOrder[] {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to read orders.json:', e);
  }
  return [];
}

function saveOrders(orders: StoredOrder[]): void {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to write orders.json:', e);
  }
}

// Simple in-memory rate limiter per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function apiRateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || 'local';
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxReqs = 120;
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return next();
  }
  entry.count += 1;
  if (entry.count > maxReqs) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a moment and try again.',
      errorAr: 'طلبات كثيرة جداً، يرجى الانتظار لحظات والمحاولة مجدداً.',
    });
  }
  return next();
}

interface CartIncomingItem {
  productId: string;
  weightId: string;
  prepId: string;
  quantity: number;
  customCuttingNote?: string;
}

function validateAndCalculateCart(
  rawItems: CartIncomingItem[],
  fulfillmentType: 'delivery' | 'pickup',
  discountCodeInput?: string | null
) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error('السلة فارغة / Cart is empty');
  }

  let estimatedSubtotalSar = 0;
  let hasWeightBasedItems = false;

  const validatedItems = rawItems.map((item) => {
    const product = PRODUCTS_DATA.find((p) => p.id === item.productId);
    if (!product) {
      throw new Error(`المنتج غير موجود: ${item.productId}`);
    }
    if (!product.inStock || product.stockQty <= 0) {
      throw new Error(`المنتج غير متوفر حالياً: ${product.nameAr}`);
    }

    const qty = Math.max(1, Math.min(20, Math.floor(Number(item.quantity) || 1)));
    if (qty > product.stockQty) {
      throw new Error(`الكمية المطلوبة من ${product.nameAr} تتجاوز المخزون المتاح (${product.stockQty})`);
    }

    const weightOpt =
      product.weights.find((w) => w.id === item.weightId) || product.weights[0];
    const prepOpt =
      product.prepOptions.find((p) => p.id === item.prepId) || product.prepOptions[0];

    const unitEstimatedPriceSar = Math.round(
      product.basePriceSar * weightOpt.priceMultiplier + prepOpt.extraPrice
    );
    const lineEstimatedTotalSar = unitEstimatedPriceSar * qty;

    estimatedSubtotalSar += lineEstimatedTotalSar;
    if (product.isWeightBased) {
      hasWeightBasedItems = true;
    }

    return {
      productId: product.id,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      weightId: weightOpt.id,
      weightLabelAr: weightOpt.labelAr,
      weightLabelEn: weightOpt.labelEn,
      estimatedWeightKg: Number((weightOpt.weightKg * qty).toFixed(2)),
      isWeightBased: product.isWeightBased,
      prepId: prepOpt.id,
      prepLabelAr: prepOpt.labelAr,
      prepLabelEn: prepOpt.labelEn,
      quantity: qty,
      unitEstimatedPriceSar,
      lineEstimatedTotalSar,
      customCuttingNote: item.customCuttingNote ? String(item.customCuttingNote).slice(0, 200) : '',
    };
  });

  const normalizedPromo = (discountCodeInput || '').trim().toUpperCase();
  let discountSar = 0;
  let validPromoCode: string | null = null;

  if (normalizedPromo === 'BEEF10') {
    discountSar = Math.round(estimatedSubtotalSar * 0.1);
    validPromoCode = 'BEEF10';
  }

  const afterDiscount = Math.max(0, estimatedSubtotalSar - discountSar);

  let deliveryFeeSar = 0;
  if (fulfillmentType === 'delivery') {
    if (
      afterDiscount >= BRAND_TOKENS.delivery.freeDeliveryThresholdSar ||
      normalizedPromo === 'RIYADH'
    ) {
      deliveryFeeSar = 0;
      if (normalizedPromo === 'RIYADH') validPromoCode = 'RIYADH';
    } else {
      deliveryFeeSar = BRAND_TOKENS.delivery.standardFeeSar;
    }
  }

  const estimatedGrandTotalSar = afterDiscount + deliveryFeeSar;

  return {
    validatedItems,
    hasWeightBasedItems,
    validPromoCode,
    pricing: {
      estimatedSubtotalSar,
      discountSar,
      deliveryFeeSar,
      estimatedGrandTotalSar,
      isIllustrativeCatalogNotice: true,
      weightConfirmationPolicyAr:
        'تنويه الأوزان والأسعار: الأوزان المعروضة للمنتجات الموزونة هي أوزان تقديرية قبل التقطيع والتنظيف اليدوي. يتم قياس الوزن الفعلي النهائي بعد التجهيز في الملحمة وإبلاغ العميل بالسعر النهائي الدقيق للموافقة عليه قبل الدفع أو التسليم.',
      weightConfirmationPolicyEn:
        'Weight & Pricing Policy: Displayed weights for cut-to-order meats are estimated weights prior to hand trimming. Final confirmed weight is measured after preparation and shared with you for approval before payment collection.',
    },
  };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));
  app.use('/api', apiRateLimiter);

  // Health & Live Riyadh Opening Status API
  app.get('/api/status', (_req: Request, res: Response) => {
    const riyadhStatus = getRiyadhBusinessStatus(new Date());
    const storeConfig = loadStoreConfig();
    res.json({
      status: 'ok',
      riyadhStatus,
      storeConfig,
      aiConfigured: Boolean(
        process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'
      ),
      paymentGateway: BRAND_TOKENS.paymentGateway,
    });
  });

  // Centralized Config API (Get & Update Verified Business Details)
  app.get('/api/config', (_req: Request, res: Response) => {
    res.json({
      brand: BRAND_TOKENS,
      verificationConfig: loadStoreConfig(),
      liveStatus: getRiyadhBusinessStatus(new Date()),
    });
  });

  app.post('/api/config', (req: Request, res: Response) => {
    try {
      const current = loadStoreConfig();
      const incoming = req.body as Partial<StoreOwnerVerificationConfig>;
      const updated: StoreOwnerVerificationConfig = {
        ...current,
        phoneNumber:
          incoming.phoneNumber !== undefined
            ? String(incoming.phoneNumber).trim()
            : current.phoneNumber,
        phoneVerified: Boolean(
          (incoming.phoneNumber !== undefined
            ? String(incoming.phoneNumber).trim()
            : current.phoneNumber
          ).length >= 7
        ),
        whatsappNumber:
          incoming.whatsappNumber !== undefined
            ? String(incoming.whatsappNumber).replace(/[^\d+]/g, '')
            : current.whatsappNumber,
        whatsappVerified: Boolean(
          (incoming.whatsappNumber !== undefined
            ? String(incoming.whatsappNumber).replace(/[^\d+]/g, '')
            : current.whatsappNumber
          ).length >= 8
        ),
        districtAndStreetAr:
          incoming.districtAndStreetAr !== undefined
            ? String(incoming.districtAndStreetAr).trim()
            : current.districtAndStreetAr,
        districtAndStreetEn:
          incoming.districtAndStreetEn !== undefined
            ? String(incoming.districtAndStreetEn).trim()
            : current.districtAndStreetEn,
        addressVerified:
          incoming.addressVerified !== undefined
            ? Boolean(incoming.addressVerified)
            : current.addressVerified,
        googleMapsEmbedUrl:
          incoming.googleMapsEmbedUrl !== undefined
            ? String(incoming.googleMapsEmbedUrl).trim()
            : current.googleMapsEmbedUrl,
        googleMapsDirectionsUrl:
          incoming.googleMapsDirectionsUrl !== undefined
            ? String(incoming.googleMapsDirectionsUrl).trim()
            : current.googleMapsDirectionsUrl,
        supplierDetailsVerified:
          incoming.supplierDetailsVerified !== undefined
            ? Boolean(incoming.supplierDetailsVerified)
            : current.supplierDetailsVerified,
        verifiedOriginsAr:
          incoming.verifiedOriginsAr !== undefined
            ? String(incoming.verifiedOriginsAr).trim()
            : current.verifiedOriginsAr,
        verifiedOriginsEn:
          incoming.verifiedOriginsEn !== undefined
            ? String(incoming.verifiedOriginsEn).trim()
            : current.verifiedOriginsEn,
        verifiedSuppliersAr:
          incoming.verifiedSuppliersAr !== undefined
            ? String(incoming.verifiedSuppliersAr).trim()
            : current.verifiedSuppliersAr,
        verifiedSuppliersEn:
          incoming.verifiedSuppliersEn !== undefined
            ? String(incoming.verifiedSuppliersEn).trim()
            : current.verifiedSuppliersEn,
        verifiedCertificationsAr:
          incoming.verifiedCertificationsAr !== undefined
            ? String(incoming.verifiedCertificationsAr).trim()
            : current.verifiedCertificationsAr,
        verifiedCertificationsEn:
          incoming.verifiedCertificationsEn !== undefined
            ? String(incoming.verifiedCertificationsEn).trim()
            : current.verifiedCertificationsEn,
        socialLinks: Array.isArray(incoming.socialLinks)
          ? incoming.socialLinks.map((s) => ({
              platform: s.platform,
              label: s.label,
              url: String(s.url || '').trim(),
              verified: Boolean(String(s.url || '').trim().startsWith('http')),
            }))
          : current.socialLinks,
      };
      saveStoreConfig(updated);
      res.json({ ok: true, verificationConfig: updated });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error instanceof Error ? error.message : 'Invalid configuration payload',
      });
    }
  });

  // Catalog API
  app.get('/api/products', (_req: Request, res: Response) => {
    res.json({
      categories: PRODUCT_CATEGORIES,
      products: PRODUCTS_DATA,
      cutsGuide: MEAT_CUTS_GUIDE,
      recipes: RECIPES_DATA,
    });
  });

  // Server-Side Cart Validation API
  app.post('/api/cart/validate', (req: Request, res: Response) => {
    try {
      const { items, fulfillmentType = 'delivery', discountCode = null } = req.body;
      const result = validateAndCalculateCart(
        items,
        fulfillmentType === 'pickup' ? 'pickup' : 'delivery',
        discountCode
      );
      res.json({ ok: true, ...result });
    } catch (error) {
      res.status(400).json({
        ok: false,
        error: error instanceof Error ? error.message : 'Cart validation failed',
      });
    }
  });

  // Genuine Server-Side Order Submission & Persistent Storage
  app.post('/api/orders', (req: Request, res: Response) => {
    try {
      const {
        items,
        fulfillmentType = 'delivery',
        paymentMethod = 'cod',
        discountCode = null,
        acceptedWeightPolicy = false,
        lang = 'ar',
        customer,
      } = req.body;

      if (!customer || typeof customer !== 'object') {
        return res.status(400).json({
          ok: false,
          error: lang === 'ar' ? 'يرجى إدخال بيانات العميل كاملة.' : 'Please provide customer details.',
        });
      }

      const fullName = String(customer.fullName || '').trim();
      const phone = String(customer.phone || '').trim();
      const district = String(customer.district || '').trim();
      const streetAddress = String(customer.streetAddress || '').trim();
      const notes = String(customer.notes || '').trim().slice(0, 500);

      if (fullName.length < 2) {
        return res.status(400).json({
          ok: false,
          error: lang === 'ar' ? 'يرجى إدخال الاسم الكامل بشكل صحيح.' : 'Please enter a valid full name.',
        });
      }

      if (phone.replace(/\D/g, '').length < 9) {
        return res.status(400).json({
          ok: false,
          error:
            lang === 'ar'
              ? 'يرجى إدخال رقم جوال صحيح للتواصل وتأكيد الوزن النهائي.'
              : 'Please enter a valid mobile number for order & weight confirmation.',
        });
      }

      if (fulfillmentType === 'delivery' && (district.length < 2 || streetAddress.length < 3)) {
        return res.status(400).json({
          ok: false,
          error:
            lang === 'ar'
              ? 'يرجى إدخال الحي والعنوان التفصيلي في الرياض للتوصيل المبرد.'
              : 'Please enter your Riyadh district and street address for chilled delivery.',
        });
      }

      if (paymentMethod !== 'cod' && paymentMethod !== 'pickup_pos') {
        return res.status(400).json({
          ok: false,
          error:
            lang === 'ar'
              ? 'بوابة الدفع الإلكتروني بالبطاقة قيد الربط البرمجي؛ يرجى اختيار الدفع عند الاستلام أو في الفرع.'
              : 'Online card gateway requires live merchant credentials; please select Pay on Delivery or In-Store POS.',
        });
      }

      const validation = validateAndCalculateCart(
        items,
        fulfillmentType === 'pickup' ? 'pickup' : 'delivery',
        discountCode
      );

      if (validation.hasWeightBasedItems && !acceptedWeightPolicy) {
        return res.status(400).json({
          ok: false,
          error:
            lang === 'ar'
              ? 'يرجى الموافقة على آلية تسعير الوزن التقديري والوزن الفعلي النهائي قبل إرسال الطلب.'
              : 'Please acknowledge the estimated vs. final confirmed weight pricing policy before submitting.',
        });
      }

      const now = new Date();
      const riyadhStatus = getRiyadhBusinessStatus(now);
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const orderNumber = `BH-${now.getFullYear()}-${randomSuffix}`;

      const newOrder: StoredOrder = {
        orderNumber,
        createdAt: now.toISOString(),
        riyadhCreatedAt: riyadhStatus.riyadhTimeFormattedAr || now.toLocaleString('ar-SA'),
        status: validation.hasWeightBasedItems ? 'preparing_weight_confirmation' : 'received',
        lang: lang === 'en' ? 'en' : 'ar',
        customer: {
          fullName,
          phone,
          city: 'الرياض / Riyadh',
          district: fulfillmentType === 'pickup' ? 'استلام من الفرع / Store Pickup' : district,
          streetAddress: fulfillmentType === 'pickup' ? 'فرع BEEF HOUSE - الرياض' : streetAddress,
          notes,
        },
        fulfillmentType: fulfillmentType === 'pickup' ? 'pickup' : 'delivery',
        paymentMethod,
        hasWeightBasedItems: validation.hasWeightBasedItems,
        acceptedWeightPolicy: Boolean(acceptedWeightPolicy),
        discountCode: validation.validPromoCode,
        items: validation.validatedItems,
        pricing: validation.pricing,
      };

      const orders = loadOrders();
      orders.unshift(newOrder);
      saveOrders(orders);

      return res.status(201).json({
        ok: true,
        order: newOrder,
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        error: error instanceof Error ? error.message : 'Order submission failed',
      });
    }
  });

  app.get('/api/orders/:orderNumber', (req: Request, res: Response) => {
    const orders = loadOrders();
    const found = orders.find(
      (o) => o.orderNumber.toUpperCase() === String(req.params.orderNumber).toUpperCase()
    );
    if (!found) {
      return res.status(404).json({
        ok: false,
        error: 'لم يتم العثور على الطلب / Order not found',
      });
    }
    return res.json({ ok: true, order: found });
  });

  // AI-Powered Customer Assistant (Server-Side Gemini API)
  app.post('/api/assistant/chat', async (req: Request, res: Response) => {
    try {
      const { message, history = [], lang = 'ar' } = req.body;
      const userPrompt = String(message || '').trim();
      if (!userPrompt) {
        return res.status(400).json({ error: 'Empty message' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        return res.status(503).json({
          ok: false,
          aiConfigured: false,
          error:
            lang === 'ar'
              ? 'خدمة المساعد الذكي تتطلب تفعيل مفتاح GEMINI_API_KEY في إعدادات الخادم (Secrets). يمكنك التواصل معنا مباشرة عبر واتساب أو تصفح دليل القطعيات.'
              : 'The AI Assistant service requires a configured GEMINI_API_KEY in server secrets. Please use our direct WhatsApp support or browse the Meat Cuts Guide.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const riyadhStatus = getRiyadhBusinessStatus(new Date());
      const storeConfig = loadStoreConfig();

      const catalogSummary = PRODUCTS_DATA.map(
        (p) =>
          `- ${p.nameAr} (${p.nameEn}): ${p.basePriceSar} ${p.pricingUnitLabelAr} | متوفر: ${
            p.inStock ? 'نعم' : 'لا'
          } | الأوزان: ${p.weights.map((w) => w.labelAr).join('، ')} | خيارات التجهيز: ${p.prepOptions
            .map((o) => o.labelAr)
            .join('، ')} | طريقة الطهي: ${p.cookingMethodAr}`
      ).join('\n');

      const cutsSummary = MEAT_CUTS_GUIDE.map(
        (c) =>
          `- ${c.nameAr} (${c.nameEn}): الموقع: ${c.anatomicalLabelAr} | التعريق الدهني: ${c.marblingLevel}/5 | الطراوة: ${c.tendernessLevel}/5 | طرق الطهي: ${c.suitableCookingMethodsAr.join('، ')} | نصيحة: ${c.cookingGuidanceAr}`
      ).join('\n');

      const recipesSummary = RECIPES_DATA.map(
        (r) =>
          `- ${r.titleAr} (${r.titleEn}): القطعية الموصى بها: ${r.recommendedCutNameAr} | مدة الطهي: ${r.cookTimeMinutes} دقيقة`
      ).join('\n');

      const systemInstruction = `أنت المساعد الذكي الرسمي لملحمة وشواية "BEEF HOUSE | بيف هاوس" في الرياض، المملكة العربية السعودية.
تحدث بلغة راقية، احترافية، ودافئة (بالعربية أو الإنجليزية حسب لغة العميل، والافتراضي هو العربية).

قواعد صارمة لا يجوز مخالفتها:
1. اعتمد فقط على بيانات BEEF HOUSE المعتمدة أدناه. لا تخترع أي منتجات، أسعار، خصومات، أرقام هواتف، عناوين، أو وعود توصيل غير موجودة في البيانات.
2. وضح دائماً أن الأسعار المعروضة في الكتالوج الحالي هي أسعار استرشادية (${
        PRODUCTS_DATA[0].pricingUnitLabelAr
      })، وأن المنتجات المعتمدة على الوزن يتم تسعيرها مبدئياً حسب الوزن التقديري ثم يؤكد الوزن الفعلي النهائي بعد التقطيع والتجهيز قبل الدفع.
3. ساعات العمل الرسمية: يومياً من الساعة 9:00 صباحاً حتى 12:00 منتصف الليل بتوقيت الرياض (Asia/Riyadh).
4. الحالة الحية الآن في الرياض: ${riyadhStatus.statusBadgeAr} (${riyadhStatus.subStatusAr}) - الوقت الآن في الرياض: ${
        riyadhStatus.riyadhTimeFormattedAr
      }.
5. سياسة التوصيل والاستلام: توصيل مبرد داخل الرياض (25 ريال، ومجاني للطلبات فوق 350 ريال أو بكود RIYADH) أو استلام من الفرع. كود خصم التجربة المتاح: BEEF10 (خصم 10%).
6. بيانات التواصل الموثقة حالياً:
   - المدينة: ${storeConfig.cityAr}
   - العنوان التفصيلي: ${storeConfig.districtAndStreetAr}
   - الهاتف: ${storeConfig.phoneVerified ? storeConfig.phoneNumber : 'بانتظار اعتماد الرقم الرسمي من الإدارة في لوحة الإعدادات'}
   - واتساب: ${storeConfig.whatsappVerified ? storeConfig.whatsappNumber : 'بانتظار ربط الرقم الرسمي من الإدارة'}
7. لا تدّعِ أن BEEF HOUSE يمتلك مزارع خاصة أو شهادات غير موثقة، بل وضح التزامنا بمعايير الفحص البيطري والذبح الحلال وسلسلة التبريد والتقطيع الاحترافي.

كتالوج المنتجات الحالي:
${catalogSummary}

دليل قطعيات اللحوم:
${cutsSummary}

الوصفات المتاحة:
${recipesSummary}

الأسئلة الشائعة:
${FAQ_ITEMS.map((f) => `س: ${f.qAr} ج: ${f.aAr}`).join('\n')}

أجب بإيجاز ووضوح (3 إلى 6 جمل أو نقاط مرتبة) وساعد العميل في اختيار القطعية الأنسب لطبخته أو إتمام طلبه.`;

      const recentHistory = Array.isArray(history)
        ? history
            .slice(-6)
            .map((h: { role?: string; text?: string }) => `${h.role === 'user' ? 'العميل' : 'المساعد'}: ${h.text || ''}`)
            .join('\n')
        : '';

      const fullPrompt = recentHistory
        ? `سجل المحادثة السابق:\n${recentHistory}\n\nسؤال العميل الحالي: ${userPrompt}`
        : userPrompt;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: fullPrompt,
        config: {
          systemInstruction,
          temperature: 0.3,
        },
      });

      const replyText =
        response.text ||
        (lang === 'ar'
          ? 'عذراً، لم أتمكن من توليد إجابة في هذه اللحظة. يمكنك التواصل معنا مباشرة عبر واتساب.'
          : 'Sorry, I could not generate a response right now. Please reach out to our team via WhatsApp.');

      return res.json({
        ok: true,
        aiConfigured: true,
        reply: replyText,
      });
    } catch (error) {
      console.error('Gemini Assistant Error:', error);
      return res.status(500).json({
        ok: false,
        aiConfigured: true,
        error:
          error instanceof Error
            ? error.message
            : 'حدث خطأ أثناء الاتصال بالمساعد الذكي / Error connecting to AI assistant',
      });
    }
  });

  // Dynamic SEO Sitemap & Robots fallback
  app.get('/robots.txt', (_req: Request, res: Response) => {
    res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: /sitemap.xml\n`);
  });

  const distPath = path.join(__dirname, 'dist');
  const isProd = process.env.NODE_ENV === 'production' && fs.existsSync(distPath);

  if (isProd) {
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BEEF HOUSE full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
