export type Language = 'ar' | 'en';

export type PageId =
  | 'home'
  | 'catalog'
  | 'categories'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'cuts-guide'
  | 'cut-detail'
  | 'grill-menu'
  | 'story'
  | 'mission'
  | 'quality'
  | 'recipes'
  | 'recipe-detail'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms'
  | '404';

export interface ProductWeightOption {
  id: string;
  labelAr: string;
  labelEn: string;
  weightKg: number;
  priceMultiplier: number;
}

export interface ProductPrepOption {
  id: string;
  labelAr: string;
  labelEn: string;
  extraPrice: number;
}

export interface ProductItem {
  id: string;
  slug: string;
  categoryId:
    | 'steak'
    | 'grilling'
    | 'cooking'
    | 'carcasses'
    | 'minced'
    | 'burger'
    | 'grill-corner'
    | 'bundles';
  nameAr: string;
  nameEn: string;
  shortDescAr: string;
  shortDescEn: string;
  fullDescAr: string;
  fullDescEn: string;
  basePriceSar: number;
  isIllustrativePrice: boolean;
  pricingUnit: 'per_kg' | 'per_pack' | 'per_item';
  pricingUnitLabelAr: string;
  pricingUnitLabelEn: string;
  isWeightBased: boolean;
  image: string;
  gallery: string[];
  weights: ProductWeightOption[];
  prepOptions: ProductPrepOption[];
  inStock: boolean;
  stockQty: number;
  relatedCutId?: string;
  relatedRecipeIds: string[];
  featured?: boolean;
  cookingMethodAr: string;
  cookingMethodEn: string;
}

export interface MeatCutGuideItem {
  id: string;
  slug: string;
  groupId: 'steak' | 'grilling' | 'slow-cooking' | 'saudi-traditional' | 'minced';
  groupLabelAr: string;
  groupLabelEn: string;
  nameAr: string;
  nameEn: string;
  anatomicalZone: 'rib' | 'short-loin' | 'sirloin' | 'chuck' | 'brisket' | 'shank' | 'round';
  anatomicalLabelAr: string;
  anatomicalLabelEn: string;
  image: string;
  marblingLevel: number; // 1 to 5
  tendernessLevel: number; // 1 to 5
  textureAr: string;
  textureEn: string;
  flavorProfileAr: string;
  flavorProfileEn: string;
  suitableCookingMethodsAr: string[];
  suitableCookingMethodsEn: string[];
  prepAdviceAr: string;
  prepAdviceEn: string;
  commonMistakesAr: string[];
  commonMistakesEn: string[];
  cookingGuidanceAr: string;
  cookingGuidanceEn: string;
  foodSafetyTipAr: string;
  foodSafetyTipEn: string;
  relatedProductIds: string[];
  relatedRecipeIds: string[];
}

export interface RecipeItem {
  id: string;
  slug: string;
  categoryId: 'steak' | 'grilling' | 'slow-cooked' | 'saudi-dishes' | 'burgers-sandwiches';
  categoryLabelAr: string;
  categoryLabelEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: string;
  cookingMethodAr: string;
  cookingMethodEn: string;
  recommendedCutId: string;
  recommendedCutNameAr: string;
  recommendedCutNameEn: string;
  ingredientsAr: { item: string; amount: string }[];
  ingredientsEn: { item: string; amount: string }[];
  stepsAr: string[];
  stepsEn: string[];
  servingSuggestionsAr: string;
  servingSuggestionsEn: string;
  chefTipAr: string;
  chefTipEn: string;
  relatedProductIds: string[];
}

export interface StoreOwnerVerificationConfig {
  phoneVerified: boolean;
  phoneNumber: string; // Empty until verified by owner
  whatsappVerified: boolean;
  whatsappNumber: string; // Empty until verified by owner
  whatsappDefaultGreetingAr: string;
  whatsappDefaultGreetingEn: string;
  addressVerified: boolean;
  cityAr: string;
  cityEn: string;
  districtAndStreetAr: string;
  districtAndStreetEn: string;
  googleMapsEmbedUrl: string;
  googleMapsDirectionsUrl: string;
  supplierDetailsVerified: boolean;
  verifiedOriginsAr: string;
  verifiedOriginsEn: string;
  verifiedSuppliersAr: string;
  verifiedSuppliersEn: string;
  verifiedCertificationsAr: string;
  verifiedCertificationsEn: string;
  socialLinks: {
    platform: 'instagram' | 'tiktok' | 'snapchat' | 'x' | 'facebook' | 'youtube';
    label: string;
    url: string;
    verified: boolean;
  }[];
}

export const BRAND_TOKENS = {
  nameAr: 'بيف هاوس',
  nameEn: 'BEEF HOUSE',
  fullTitleAr: 'BEEF HOUSE | بيف هاوس — ملحمة فاخرة وشواية في الرياض',
  fullTitleEn: 'BEEF HOUSE — Premium Butchery & Grill Corner in Riyadh',
  logoPath: '/images/brand/beef-house-logo.png',
  originalUploadedLogoPath: '/assets/aistudio/_________________-_2026-10-25T062801.345_70981ab7.png',
  colors: {
    canvasBlack: '#000000',
    surfaceCharcoal: '#080808',
    surfaceElevated: '#0E0E0E',
    brandIvory: '#E0D5CD',
    brandIvoryLight: '#E1DBD0',
    brandMuted: '#9E938B',
    brandCrimson: '#A20000',
    brandCrimsonAccent: '#E6061E',
    whatsappGreen: '#25D366',
  },
  images: {
    heroMarbledRibeye: '/images/hero/hero-marbled-ribeye.jpg',
    steakCollection: '/images/products/steak-cuts-collection.jpg',
    tomahawkGrill: '/images/products/tomahawk-shortribs-grill.jpg',
    cookingOssobuco: '/images/products/cooking-ossobuco-cubes.jpg',
    mincedAndBurger: '/images/products/minced-beef-wagyu-burger.jpg',
    grillSandwichCorner: '/images/grill/ribeye-ciabatta-sandwich-skewers.jpg',
    castIronRecipe: '/images/recipes/cast-iron-herb-butter-ribeye.jpg',
    butcherCraftsmanship: '/images/brand/master-butcher-preparation.jpg',
  },
  schedule: {
    timeZone: 'Asia/Riyadh',
    openHour: 9, // 9:00 AM
    openMinute: 0,
    closeHour: 24, // 12:00 Midnight (end of day)
    closeMinute: 0,
    publishedHoursAr: 'يومياً من 9:00 صباحاً حتى 12:00 منتصف الليل (بتوقيت الرياض)',
    publishedHoursEn: 'Daily from 9:00 AM to 12:00 Midnight (Riyadh Time)',
  },
  delivery: {
    standardFeeSar: 25,
    freeDeliveryThresholdSar: 350,
    coldChainNoteAr: 'توصيل مبرد بسيارات مجهزة للحفاظ على سلسلة التبريد داخل مدينة الرياض.',
    coldChainNoteEn: 'Temperature-controlled cold-chain delivery across Riyadh.',
  },
  paymentGateway: {
    liveGatewayConfigured: false,
    supportedMethods: ['cod', 'pickup_pos', 'online_gateway_pending'] as const,
    setupRequirementNoteAr:
      'الدفع الإلكتروني المباشر بالبطاقة أو Apple Pay يتطلب ربط مفاتيح بوابة دفع معتمدة في السعودية (Moyasar / Tap / HyperPay) في إعدادات الخادم. يتوفر حالياً الدفع عند الاستلام (نقداً أو شبكة مدى) أو الدفع عند الاستلام من الفرع بدون أي محاكاة وهمية لخصم البطاقات.',
    setupRequirementNoteEn:
      'Live online card / Apple Pay processing requires configuring verified Saudi payment provider credentials (Moyasar / Tap / HyperPay) on the server. Cash/Mada POS on Delivery and In-Store Pickup payment are currently active without simulating fake card charges.',
  },
};

export const INITIAL_VERIFICATION_CONFIG: StoreOwnerVerificationConfig = {
  phoneVerified: false,
  phoneNumber: '',
  whatsappVerified: false,
  whatsappNumber: '',
  whatsappDefaultGreetingAr: 'مرحباً BEEF HOUSE، أرغب في الاستفسار عن قطعيات اللحوم والطلب.',
  whatsappDefaultGreetingEn: 'Hello BEEF HOUSE, I would like to inquire about your meat cuts and ordering.',
  addressVerified: false,
  cityAr: 'الرياض، المملكة العربية السعودية',
  cityEn: 'Riyadh, Kingdom of Saudi Arabia',
  districtAndStreetAr: 'بانتظار إدخال الحي والشارع الموثق من إدارة BEEF HOUSE',
  districtAndStreetEn: 'Awaiting verified district & street address from BEEF HOUSE management',
  googleMapsEmbedUrl: 'https://www.google.com/maps?q=Riyadh,Saudi+Arabia&output=embed',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=Riyadh+Saudi+Arabia',
  supplierDetailsVerified: false,
  verifiedOriginsAr: 'يتم تحديد بلد المنشأ المعتمد لكل دفعة في بطاقة التوريد الرسمية بالفرع.',
  verifiedOriginsEn: 'Country of origin is specified per batch on the official store supply record.',
  verifiedSuppliersAr: 'بانتظار اعتماد قائمة الموردين والمزارع الموثقة من المالك.',
  verifiedSuppliersEn: 'Awaiting verified supplier & farm registry confirmation from store owner.',
  verifiedCertificationsAr: 'تخضع جميع الذبائح واللحوم للفحص البيطري واشتراطات البلدية والذبح الحلال في المملكة.',
  verifiedCertificationsEn: 'All meats comply with municipal veterinary inspection and Halal slaughtering regulations in KSA.',
  socialLinks: [
    { platform: 'instagram', label: 'Instagram', url: '', verified: false },
    { platform: 'tiktok', label: 'TikTok', url: '', verified: false },
    { platform: 'snapchat', label: 'Snapchat', url: '', verified: false },
    { platform: 'x', label: 'X (Twitter)', url: '', verified: false },
  ],
};

export interface LiveBusinessStatus {
  isOpen: boolean;
  CalculationSucceeded: boolean;
  riyadhTimeFormattedAr: string;
  riyadhTimeFormattedEn: string;
  statusBadgeAr: string;
  statusBadgeEn: string;
  subStatusAr: string;
  subStatusEn: string;
  msUntilNextBoundary: number;
}

export function getRiyadhBusinessStatus(now: Date = new Date()): LiveBusinessStatus {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: BRAND_TOKENS.schedule.timeZone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const parts = formatter.formatToParts(now);
    const hourPart = parts.find((p) => p.type === 'hour')?.value;
    const minutePart = parts.find((p) => p.type === 'minute')?.value;
    const secondPart = parts.find((p) => p.type === 'second')?.value;

    if (hourPart === undefined || minutePart === undefined) {
      throw new Error('Could not parse Riyadh time parts');
    }

    const hour24 = parseInt(hourPart, 10) % 24;
    const minute = parseInt(minutePart, 10);
    const second = parseInt(secondPart || '0', 10);

    // Open daily from 09:00 AM (hour24 >= 9) until 12:00 Midnight (hour24 < 24)
    const isOpen = hour24 >= BRAND_TOKENS.schedule.openHour && hour24 < BRAND_TOKENS.schedule.closeHour;

    // Format friendly 12-hour Riyadh time
    const displayAr = new Intl.DateTimeFormat('ar-SA', {
      timeZone: BRAND_TOKENS.schedule.timeZone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(now);

    const displayEn = new Intl.DateTimeFormat('en-US', {
      timeZone: BRAND_TOKENS.schedule.timeZone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(now);

    // Calculate milliseconds until next boundary (09:00:00 or 24:00:00)
    const currentSecondsOfDay = hour24 * 3600 + minute * 60 + second;
    const nextBoundarySeconds = isOpen ? 24 * 3600 : 9 * 3600;
    const secondsUntilBoundary = Math.max(1, nextBoundarySeconds - currentSecondsOfDay);

    return {
      isOpen,
      CalculationSucceeded: true,
      riyadhTimeFormattedAr: displayAr,
      riyadhTimeFormattedEn: displayEn,
      statusBadgeAr: isOpen ? 'مفتوح الآن' : 'مغلق الآن',
      statusBadgeEn: isOpen ? 'Open Now' : 'Closed Now',
      subStatusAr: isOpen ? 'يغلق الساعة 12:00 منتصف الليل' : 'يفتح الساعة 9:00 صباحًا',
      subStatusEn: isOpen ? 'Closes at 12:00 Midnight' : 'Opens at 9:00 AM',
      msUntilNextBoundary: secondsUntilBoundary * 1000,
    };
  } catch {
    return {
      isOpen: true,
      CalculationSucceeded: false,
      riyadhTimeFormattedAr: '',
      riyadhTimeFormattedEn: '',
      statusBadgeAr: BRAND_TOKENS.schedule.publishedHoursAr,
      statusBadgeEn: BRAND_TOKENS.schedule.publishedHoursEn,
      subStatusAr: 'يومياً 9:00 صباحاً - 12:00 منتصف الليل',
      subStatusEn: 'Daily 9:00 AM - 12:00 Midnight',
      msUntilNextBoundary: 60000,
    };
  }
}

export const PRODUCT_CATEGORIES = [
  {
    id: 'steak' as const,
    nameAr: 'قطعيات الستيك',
    nameEn: 'Steak Cuts',
    descAr: 'ريب آي، ستريب لوين، وتندرلوين بتعريق دهني متوازن وتقطيع احترافي بالسماكة التي تفضلها.',
    descEn: 'Ribeye, Striploin, and Tenderloin with balanced marbling, custom-cut to your preferred thickness.',
    image: BRAND_TOKENS.images.steakCollection,
  },
  {
    id: 'grilling' as const,
    nameAr: 'قطعيات الشواء',
    nameEn: 'Grilling Cuts',
    descAr: 'توماهوك، شورت ريبس (أسادو)، وأوصال مجهزة للشواء المباشر على الفحم أو الحطب.',
    descEn: 'Tomahawk, Asado short ribs, and skewers crafted for charcoal and wood-fire grilling.',
    image: BRAND_TOKENS.images.tomahawkGrill,
  },
  {
    id: 'cooking' as const,
    nameAr: 'قطعيات الطبخ',
    nameEn: 'Cooking Cuts',
    descAr: 'موزات بالعظم (أوسو بوكو)، مكعبات الرقبة والكتف للطبخ البطيء، الكبسة، والإيدامات.',
    descEn: 'Bone-in Osso Buco shanks and chuck cubes ideal for slow braising, Kabsa, and traditional stews.',
    image: BRAND_TOKENS.images.cookingOssobuco,
  },
  {
    id: 'carcasses' as const,
    nameAr: 'الذبائح والتجهيزات',
    nameEn: 'Whole Cuts & Custom Prep',
    descAr: 'أنصاف ورباعيات وتجهيز كامل حسب الطلب (ثلاجة، مناسبات، وتقسيم مخصص للعائلة).',
    descEn: 'Custom primal quarters and event preparations tailored to your household or gathering needs.',
    image: BRAND_TOKENS.images.butcherCraftsmanship,
  },
  {
    id: 'minced' as const,
    nameAr: 'اللحم المفروم',
    nameEn: 'Minced Meat',
    descAr: 'مفروم بقري طازج يُفرم يومياً بنسب دهون مدروسة للكفتة، الحشوات، وأطباق المكرونة.',
    descEn: 'Freshly ground beef prepared daily with precise lean-to-fat ratios for kofta, fillings, and pasta.',
    image: BRAND_TOKENS.images.mincedAndBurger,
  },
  {
    id: 'burger' as const,
    nameAr: 'البرجر',
    nameEn: 'Artisanal Burgers',
    descAr: 'أقراص برجر مشكلة يدوياً من قطعيات مختارة بنسبة دهن 20% لقوام عصيري غني.',
    descEn: 'Hand-pressed artisanal burger patties crafted with an 80/20 meat-to-fat ratio for maximum juiciness.',
    image: BRAND_TOKENS.images.mincedAndBurger,
  },
  {
    id: 'grill-corner' as const,
    nameAr: 'منتجات الشواية والسندوتشات',
    nameEn: 'Grill & Sandwich Corner',
    descAr: 'سندوتشات ستيك مشوية لحظياً وأسياخ مشويات ساخنة جاهزة للأكل من ركن الشواية.',
    descEn: 'Freshly seared steak sandwiches and hot char-grilled skewers prepared to order at our grill corner.',
    image: BRAND_TOKENS.images.grillSandwichCorner,
  },
  {
    id: 'bundles' as const,
    nameAr: 'باقات اللحوم',
    nameEn: 'Meat Bundles',
    descAr: 'بوكسات متكاملة تجمع بين الستيك، البرجر، وقطعيات الشواء أو الطبخ الأسبوعي.',
    descEn: 'Curated butcher boxes combining steaks, burgers, and grilling or weekly family cooking cuts.',
    image: BRAND_TOKENS.images.steakCollection,
  },
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'prod-ribeye-prime',
    slug: 'prime-ribeye-steak',
    categoryId: 'steak',
    nameAr: 'ستيك ريب آي فاخر (Ribeye Steak)',
    nameEn: 'Prime Marbled Ribeye Steak',
    shortDescAr: 'القطعية الأكثر غنىً بالتعريق الدهني (Marbling) لنكهة عصيرية استثنائية في المقلاة أو الشواية.',
    shortDescEn: 'Richly marbled ribeye cut delivering extraordinary juiciness and butter-tender flavor.',
    fullDescAr:
      'يُقطع ستيك الريب آي من منطقة الأضلاع العلوية الغنية بالتعريق الدهني المتداخل داخل الألياف. أثناء الطهي، تذوب هذه الدهون الطبيعية لتمنح القطعة طراوة فائقة ونكهة عميقة. يتم تنظيف القطعة وتجهيزها يدوياً حسب السماكة التي تختارها.',
    fullDescEn:
      'Cut from the upper rib primal section, our Ribeye features abundant intramuscular marbling that melts during searing, basting the meat from within. Hand-trimmed by our master butchers to your exact thickness preference.',
    basePriceSar: 165,
    isIllustrativePrice: true,
    pricingUnit: 'per_kg',
    pricingUnitLabelAr: 'ريال / كجم (سعر استرشادي)',
    pricingUnitLabelEn: 'SAR / kg (Illustrative)',
    isWeightBased: true,
    image: BRAND_TOKENS.images.heroMarbledRibeye,
    gallery: [
      BRAND_TOKENS.images.heroMarbledRibeye,
      BRAND_TOKENS.images.steakCollection,
      BRAND_TOKENS.images.castIronRecipe,
    ],
    weights: [
      { id: 'w-350g', labelAr: 'قطعة واحدة (~350 جرام تقديري)', labelEn: 'Single Cut (~350g est.)', weightKg: 0.35, priceMultiplier: 0.35 },
      { id: 'w-500g', labelAr: 'نصف كيلو (~500 جرام تقديري)', labelEn: 'Half Kilo (~500g est.)', weightKg: 0.5, priceMultiplier: 0.5 },
      { id: 'w-1kg', labelAr: '1 كيلو (~1000 جرام تقديري)', labelEn: '1 Kilogram (~1000g est.)', weightKg: 1.0, priceMultiplier: 1.0 },
    ],
    prepOptions: [
      { id: 'prep-2.5cm', labelAr: 'سماكة 2.5 سم (موصى به للمقلاة)', labelEn: '2.5 cm Thickness (Pan Sear)', extraPrice: 0 },
      { id: 'prep-3.5cm', labelAr: 'سماكة 3.5 سم (سميك للفرن العكسي)', labelEn: '3.5 cm Thick Cut (Reverse Sear)', extraPrice: 0 },
      { id: 'prep-vac', labelAr: 'تغليف مفرغ من الهواء (Vacuum)', labelEn: 'Vacuum Sealed Packaging', extraPrice: 0 },
    ],
    inStock: true,
    stockQty: 25,
    relatedCutId: 'cut-ribeye',
    relatedRecipeIds: ['rec-cast-iron-ribeye'],
    featured: true,
    cookingMethodAr: 'مقلاة حديد الزهر (Cast Iron) أو شواية الفحم على حرارة عالية',
    cookingMethodEn: 'Heavy cast-iron skillet or high-heat charcoal grill',
  },
  {
    id: 'prod-striploin-ny',
    slug: 'striploin-new-york-steak',
    categoryId: 'steak',
    nameAr: 'ستيك ستريب لوين (نيويورك ستريب)',
    nameEn: 'New York Striploin Steak',
    shortDescAr: 'توازن مثالي بين القوام المتماسك، النكهة البقرية الواضحة، وشريط الدهن الجانبي.',
    shortDescEn: 'Balanced tenderness with a bold beefy profile and classic outer fat cap.',
    fullDescAr:
      'يتميز الستريب لوين بألياف ناعمة وقوام متماسك مع غطاء دهني خارجي رفيع يضيف نكهة رائعة عند تحميره على حافة المقلاة أو الشواية. خيار مثالي لمن يفضلون نكهة اللحم المركزة مع دهون أقل من الريب آي.',
    fullDescEn:
      'Cut from the short loin, the New York Striploin offers a refined texture, rich beef flavor, and a signature edge fat cap that crisps beautifully when seared.',
    basePriceSar: 150,
    isIllustrativePrice: true,
    pricingUnit: 'per_kg',
    pricingUnitLabelAr: 'ريال / كجم (سعر استرشادي)',
    pricingUnitLabelEn: 'SAR / kg (Illustrative)',
    isWeightBased: true,
    image: BRAND_TOKENS.images.steakCollection,
    gallery: [BRAND_TOKENS.images.steakCollection, BRAND_TOKENS.images.heroMarbledRibeye],
    weights: [
      { id: 'w-300g', labelAr: 'قطعة واحدة (~300 جرام تقديري)', labelEn: 'Single Cut (~300g est.)', weightKg: 0.3, priceMultiplier: 0.3 },
      { id: 'w-600g', labelAr: 'قطعتان (~600 جرام تقديري)', labelEn: 'Two Cuts (~600g est.)', weightKg: 0.6, priceMultiplier: 0.6 },
      { id: 'w-1kg', labelAr: '1 كيلو (~1000 جرام تقديري)', labelEn: '1 Kilogram (~1000g est.)', weightKg: 1.0, priceMultiplier: 1.0 },
    ],
    prepOptions: [
      { id: 'prep-2.5cm', labelAr: 'سماكة 2.5 سم مع شريط الدهن', labelEn: '2.5 cm with Fat Cap', extraPrice: 0 },
      { id: 'prep-trimmed', labelAr: 'تخفيف الدهن الخارجي', labelEn: 'Trimmed Outer Fat', extraPrice: 0 },
    ],
    inStock: true,
    stockQty: 20,
    relatedCutId: 'cut-striploin',
    relatedRecipeIds: ['rec-cast-iron-ribeye'],
    featured: true,
    cookingMethodAr: 'الشواء المباشر أو التحمير السريع مع الزبدة والأعشاب',
    cookingMethodEn: 'Direct grilling or pan-basting with herb butter',
  },
  {
    id: 'prod-tenderloin-filet',
    slug: 'beef-tenderloin-filet-mignon',
    categoryId: 'steak',
    nameAr: 'تندرلوين بقري (فيليه مينيون)',
    nameEn: 'Beef Tenderloin (Filet Mignon)',
    shortDescAr: 'أطرى قطعية في الذبيحة على الإطلاق، قليلة الدهون وذات قوام يذوب في الفم.',
    shortDescEn: 'The most tender cut of beef, lean yet remarkably buttery in texture.',
    fullDescAr:
      'يُستخرج التندرلوين من عضلة الفسيحة الداخلية التي لا تتعرض للمجهود، مما يجعلها القطعية الأكثر طراوة ونعومة. يتم تنظيفها بعناية من الغشاء الفضي وربطها بخيط الجزار للحفاظ على شكلها الدائري المتناسق أثناء الطهي.',
    fullDescEn:
      'Harvested from the psoas major muscle, Tenderloin Filet Mignon is prized for its unmatched fork-tenderness and lean, delicate flavor. Silverskin-trimmed and butcher-tied for even cooking.',
    basePriceSar: 195,
    isIllustrativePrice: true,
    pricingUnit: 'per_kg',
    pricingUnitLabelAr: 'ريال / كجم (سعر استرشادي)',
    pricingUnitLabelEn: 'SAR / kg (Illustrative)',
    isWeightBased: true,
    image: BRAND_TOKENS.images.steakCollection,
    gallery: [BRAND_TOKENS.images.steakCollection, BRAND_TOKENS.images.butcherCraftsmanship],
    weights: [
      { id: 'w-250g', labelAr: 'ميدالية فيليه (~250 جرام تقديري)', labelEn: 'Filet Medallion (~250g est.)', weightKg: 0.25, priceMultiplier: 0.25 },
      { id: 'w-500g', labelAr: 'قطعتان (~500 جرام تقديري)', labelEn: 'Two Medallions (~500g est.)', weightKg: 0.5, priceMultiplier: 0.5 },
      { id: 'w-1kg', labelAr: 'عرق تندرلوين (1 كجم تقديري)', labelEn: '1 kg Tenderloin Roast', weightKg: 1.0, priceMultiplier: 1.0 },
    ],
    prepOptions: [
      { id: 'prep-medallion', labelAr: 'ميداليات مربوطة بخيط الجزار (4 سم)', labelEn: 'Tied 4cm Medallions', extraPrice: 0 },
      { id: 'prep-chateaubriand', labelAr: 'قطعة كاملة (شاتوبريان)', labelEn: 'Whole Chateaubriand Cut', extraPrice: 0 },
    ],
    inStock: true,
    stockQty: 15,
    relatedCutId: 'cut-tenderloin',
    relatedRecipeIds: ['rec-cast-iron-ribeye'],
    featured: false,
    cookingMethodAr: 'تحمير سريع في المقلاة ثم إكمال النضج في الفرن لدرجة Medium Rare',
    cookingMethodEn: 'Pan-sear then finish in oven to Medium Rare',
  },
  {
    id: 'prod-tomahawk-bonein',
    slug: 'bone-in-tomahawk-steak',
    categoryId: 'grilling',
    nameAr: 'توماهوك ريب آي بالعظم (Tomahawk)',
    nameEn: 'Bone-In French-Trimmed Tomahawk',
    shortDescAr: 'قطعة استعراضية فاخرة مع ضلع طويل منظف على الطريقة الفرنسية، مثالية للشواء والمناسبات.',
    shortDescEn: 'Showstopping French-trimmed bone-in ribeye crafted for charcoal grilling and gatherings.',
    fullDescAr:
      'يجمع التوماهوك بين غنى الريب آي ونكهة العظم الطبيعي الذي يحمي اللحم من الجفاف أثناء الشواء على الفحم أو التدخين. قطعة مثالية للمشاركة على المائدة.',
    fullDescEn:
      'A dramatic long-bone ribeye trimmed French-style. The bone insulates the meat over charcoal embers, preserving moisture and imparting deep, smoky richness.',
    basePriceSar: 175,
    isIllustrativePrice: true,
    pricingUnit: 'per_kg',
    pricingUnitLabelAr: 'ريال / كجم (سعر استرشادي)',
    pricingUnitLabelEn: 'SAR / kg (Illustrative)',
    isWeightBased: true,
    image: BRAND_TOKENS.images.tomahawkGrill,
    gallery: [BRAND_TOKENS.images.tomahawkGrill, BRAND_TOKENS.images.heroMarbledRibeye],
    weights: [
      { id: 'w-1.1kg', labelAr: 'قطعة متوسطة (~1.1 كجم تقديري)', labelEn: 'Medium Cut (~1.1 kg est.)', weightKg: 1.1, priceMultiplier: 1.1 },
      { id: 'w-1.4kg', labelAr: 'قطعة كبيرة (~1.4 كجم تقديري)', labelEn: 'Large Cut (~1.4 kg est.)', weightKg: 1.4, priceMultiplier: 1.4 },
    ],
    prepOptions: [
      { id: 'prep-french', labelAr: 'تنظيف العظم بالكامل (French Trim)', labelEn: 'Clean French-Trimmed Bone', extraPrice: 0 },
      { id: 'prep-seasoned', labelAr: 'إرفاق ملح بحري خشن وإكليل الجبل', labelEn: 'Include Coarse Sea Salt & Rosemary', extraPrice: 0 },
    ],
    inStock: true,
    stockQty: 12,
    relatedCutId: 'cut-tomahawk-shortribs',
    relatedRecipeIds: ['rec-charcoal-asado-ribs'],
    featured: true,
    cookingMethodAr: 'الشواء العكسي (Reverse Sear) على الفحم أو الفرن ثم التحمير المباشر',
    cookingMethodEn: 'Reverse-sear over indirect charcoal then sear over direct flame',
  },
  {
    id: 'prod-short-ribs-asado',
    slug: 'beef-short-ribs-asado',
    categoryId: 'grilling',
    nameAr: 'أضلاع بقري شورت ريبس (أسادو)',
    nameEn: 'Beef Short Ribs (Asado & Smoking Cut)',
    shortDescAr: 'أضلاع غنية بطبقات اللحم والدهن المتداخلة، رائعة للتدخين البطيء أو شواء الأسادو.',
    shortDescEn: 'Thick, richly marbled beef ribs ideal for slow smoking, Asado grilling, or braising.',
    fullDescAr:
      'تُقطع الشورت ريبس إما طولياً على شكل بلوك للتدخين والطبخ البطيء، أو عرضياً على طريقة الأسادو للشواء على الفحم. تمنحك قواماً يذوب عن العظم ونكهة غنية لا تُضاهى.',
    fullDescEn:
      'Available either as thick 3-bone plate blocks for smoking/braising or cross-cut Flanken style for Argentine Asado grilling over hot coals.',
    basePriceSar: 115,
    isIllustrativePrice: true,
    pricingUnit: 'per_kg',
    pricingUnitLabelAr: 'ريال / كجم (سعر استرشادي)',
    pricingUnitLabelEn: 'SAR / kg (Illustrative)',
    isWeightBased: true,
    image: BRAND_TOKENS.images.tomahawkGrill,
    gallery: [BRAND_TOKENS.images.tomahawkGrill, BRAND_TOKENS.images.cookingOssobuco],
    weights: [
      { id: 'w-1kg', labelAr: '1 كيلو (~1000 جرام تقديري)', labelEn: '1 Kilogram (~1000g est.)', weightKg: 1.0, priceMultiplier: 1.0 },
      { id: 'w-2kg', labelAr: '2 كيلو (~2000 جرام تقديري)', labelEn: '2 Kilograms (~2000g est.)', weightKg: 2.0, priceMultiplier: 2.0 },
    ],
    prepOptions: [
      { id: 'prep-asado', labelAr: 'تقطيع عرضي للشواء (Asado Flanken)', labelEn: 'Cross-Cut Asado Style', extraPrice: 0 },
      { id: 'prep-block', labelAr: 'بلوك كامل للتدخين والفرن', labelEn: 'Whole Block for Smoking/Oven', extraPrice: 0 },
    ],
    inStock: true,
    stockQty: 18,
    relatedCutId: 'cut-tomahawk-shortribs',
    relatedRecipeIds: ['rec-charcoal-asado-ribs'],
    featured: false,
    cookingMethodAr: 'شواء بطيء على الفحم أو تدخين على حرارة هادئة (120°C)',
    cookingMethodEn: 'Slow charcoal grilling or low-and-slow smoking at 120°C',
  },
  {
    id: 'prod-ossobuco-shank',
    slug: 'osso-buco-beef-shank-and-chuck',
    categoryId: 'cooking',
    nameAr: 'موزات بقري بالعظم ومكعبات الطبخ (Osso Buco)',
    nameEn: 'Bone-In Osso Buco Shank & Braising Cubes',
    shortDescAr: 'قطعيات غنية بالكولاجين ونخاع العظم الطبيعي، مثالية للكبسة، اليخنات، والطبخ البطيء.',
    shortDescEn: 'Collagen-rich cross-cut shanks with marrow bone and chuck cubes for Kabsa and slow stews.',
    fullDescAr:
      'عند طهي الموزات ومكعبات الرقبة على نار هادئة، يتحول الكولاجين الطبيعي ونخاع العظم إلى مرق غني وقوام طري جداً يتشرب البهارات السعودية والعربية بامتياز.',
    fullDescEn:
      'Slow-simmering transforms the natural connective tissue and rich bone marrow of our cross-cut shanks into velvety, aromatic broths ideal for Saudi Kabsa and traditional braises.',
    basePriceSar: 88,
    isIllustrativePrice: true,
    pricingUnit: 'per_kg',
    pricingUnitLabelAr: 'ريال / كجم (سعر استرشادي)',
    pricingUnitLabelEn: 'SAR / kg (Illustrative)',
    isWeightBased: true,
    image: BRAND_TOKENS.images.cookingOssobuco,
    gallery: [BRAND_TOKENS.images.cookingOssobuco, BRAND_TOKENS.images.butcherCraftsmanship],
    weights: [
      { id: 'w-1kg', labelAr: '1 كيلو (~1000 جرام تقديري)', labelEn: '1 Kilogram (~1000g est.)', weightKg: 1.0, priceMultiplier: 1.0 },
      { id: 'w-2kg', labelAr: '2 كيلو (~2000 جرام تقديري)', labelEn: '2 Kilograms (~2000g est.)', weightKg: 2.0, priceMultiplier: 2.0 },
    ],
    prepOptions: [
      { id: 'prep-osso', labelAr: 'حلقات موزة بالعظم والنخاع (أوسو بوكو)', labelEn: 'Cross-Cut Marrow Shanks (Osso Buco)', extraPrice: 0 },
      { id: 'prep-kabsa', labelAr: 'تقطيع كبير للكبسة والمناسبات', labelEn: 'Large Cuts for Traditional Kabsa', extraPrice: 0 },
      { id: 'prep-stew', labelAr: 'مكعبات صافي بدون عظم للإيدام', labelEn: 'Boneless Braising Cubes', extraPrice: 0 },
    ],
    inStock: true,
    stockQty: 30,
    relatedCutId: 'cut-shank-chuck',
    relatedRecipeIds: ['rec-slow-braised-shank-kabsa'],
    featured: true,
    cookingMethodAr: 'الطبخ البطيء في القدر أو الفرن مع البهارات الصحيحة',
    cookingMethodEn: 'Slow braising or pressure-cooking with whole spices',
  },
  {
    id: 'prod-custom-quarter-prep',
    slug: 'custom-quarter-beef-preparation',
    categoryId: 'carcasses',
    nameAr: 'تجهيز ربع بقري كامل (تقسيم ثلاجة ومناسبات)',
    nameEn: 'Custom Quarter Beef Primal Box (Tailored Butcher Prep)',
    shortDescAr: 'تجهيز احترافي مقسم ومغلف ومسمّى حسب احتياج منزلك (مفروم، كبسة، ستيك، وشواء).',
    shortDescEn: 'Professionally butchered, portioned, and labeled quarter-beef package tailored for your freezer.',
    fullDescAr:
      'خدمة التجهيز المتكامل من BEEF HOUSE: يتم تقطيع وتقسيم اللحم إلى أطباق وأكياس مفرغة من الهواء مع ملصق يوضح اسم كل قطعية وطريقة الطهي المناسبة لها (طبخ، مفروم، شواء، ستيك).',
    fullDescEn:
      'Complete custom butchery service: portioned into vacuum-sealed or tray-packed family bags, clearly labeled by cut and ideal cooking method.',
    basePriceSar: 1250,
    isIllustrativePrice: true,
    pricingUnit: 'per_pack',
    pricingUnitLabelAr: 'ريال / الباقة التقديرية (~15 كجم)',
    pricingUnitLabelEn: 'SAR / Estimated Package (~15 kg)',
    isWeightBased: true,
    image: BRAND_TOKENS.images.butcherCraftsmanship,
    gallery: [BRAND_TOKENS.images.butcherCraftsmanship, BRAND_TOKENS.images.cookingOssobuco],
    weights: [
      { id: 'w-quarter', labelAr: 'ربع أمامي (~15 كجم تقديري)', labelEn: 'Forequarter (~15 kg est.)', weightKg: 15, priceMultiplier: 1.0 },
      { id: 'w-hind', labelAr: 'ربع خلفي غني بالستيك (~16 كجم تقديري)', labelEn: 'Hindquarter with Steaks (~16 kg est.)', weightKg: 16, priceMultiplier: 1.15 },
    ],
    prepOptions: [
      { id: 'prep-family-500g', labelAr: 'تقسيم أكياس 500 جرام للثلاجة', labelEn: '500g Freezer Family Portions', extraPrice: 0 },
      { id: 'prep-family-1kg', labelAr: 'تقسيم أكياس 1 كجم للعزايم', labelEn: '1kg Gathering Portions', extraPrice: 0 },
    ],
    inStock: true,
    stockQty: 6,
    relatedCutId: 'cut-shank-chuck',
    relatedRecipeIds: ['rec-slow-braised-shank-kabsa'],
    featured: false,
    cookingMethodAr: 'متنوع: يشمل قطعيات طبخ، شواء، ومفروم مقسمة بوضوح',
    cookingMethodEn: 'Multi-purpose: clearly labeled portions for stewing, grilling, and mincing',
  },
  {
    id: 'prod-fresh-minced-beef',
    slug: 'fresh-artisanal-minced-beef',
    categoryId: 'minced',
    nameAr: 'لحم بقري مفروم طازج يومياً',
    nameEn: 'Daily Fresh Ground Beef Mince',
    shortDescAr: 'مفروم صافي محضر من قطعيات الرقبة والكتف المختارة، متوفر بنسب دهون 10% أو 20%.',
    shortDescEn: 'Freshly ground daily from whole chuck and shoulder cuts, available in 90/10 or 80/20 ratios.',
    fullDescAr:
      'لا نستخدم بقايا التقطيع العشوائية؛ بل نفرم قطعيات كاملة مختارة أمامك أو عند الطلب لضمان النظافة، اللون الوردي الطازج، والقوام المتماسك للكفتة والسمبوسة والحشوات.',
    fullDescEn:
      'Ground fresh to order from selected whole muscle cuts—never random trimmings—ensuring clean flavor, bright texture, and reliable cooking performance.',
    basePriceSar: 76,
    isIllustrativePrice: true,
    pricingUnit: 'per_kg',
    pricingUnitLabelAr: 'ريال / كجم (سعر استرشادي)',
    pricingUnitLabelEn: 'SAR / kg (Illustrative)',
    isWeightBased: true,
    image: BRAND_TOKENS.images.mincedAndBurger,
    gallery: [BRAND_TOKENS.images.mincedAndBurger],
    weights: [
      { id: 'w-500g', labelAr: 'نصف كيلو (500 جرام)', labelEn: '500 Grams', weightKg: 0.5, priceMultiplier: 0.5 },
      { id: 'w-1kg', labelAr: '1 كيلو (1000 جرام)', labelEn: '1 Kilogram', weightKg: 1.0, priceMultiplier: 1.0 },
    ],
    prepOptions: [
      { id: 'prep-80-20', labelAr: 'نسبة دهن 20% (مثالي للكفتة والمشويات)', labelEn: '80/20 Lean-to-Fat (Ideal for Kofta)', extraPrice: 0 },
      { id: 'prep-90-10', labelAr: 'نسبة دهن 10% (قليل الدهن للطبخ والحشوات)', labelEn: '90/10 Lean (Low Fat for Cooking)', extraPrice: 0 },
      { id: 'prep-coarse', labelAr: 'فرم خشن (وجه واحد)', labelEn: 'Coarse Single-Pass Grind', extraPrice: 0 },
    ],
    inStock: true,
    stockQty: 40,
    relatedCutId: 'cut-minced-blend',
    relatedRecipeIds: ['rec-artisan-smash-burger'],
    featured: false,
    cookingMethodAr: 'للشواء (كفتة/كباب)، الحشوات، والصلصات',
    cookingMethodEn: 'Kofta skewers, savory fillings, and rich meat sauces',
  },
  {
    id: 'prod-wagyu-burger-box',
    slug: 'artisanal-wagyu-blend-burger-patties',
    categoryId: 'burger',
    nameAr: 'بوكس برجر BEEF HOUSE الفاخر (6 أقراص)',
    nameEn: 'BEEF HOUSE Artisanal Burger Patties (6 Pack)',
    shortDescAr: 'أقراص برجر مشكلة يدوياً من مزيج البريسكت والتشاك بنسبة دهن 20% لطعم غني وعصيري.',
    shortDescEn: 'Six hand-formed 150g patties crafted from a signature Brisket & Chuck 80/20 blend.',
    fullDescAr:
      'سر البرجر المثالي يبدأ من المزيج الصحيح: نجمع بين نكهة البريسكت العميقة وطراوة الرقبة (Chuck) بفرم خشن يحافظ على العصارة داخل القرص أثناء الشواء على الصاج أو الفحم.',
    fullDescEn:
      'Crafted from a coarse-ground blend of beef brisket and chuck (80% lean, 20% marbling fat), lightly formed so each patty stays tender and juicy on the griddle or grill.',
    basePriceSar: 95,
    isIllustrativePrice: true,
    pricingUnit: 'per_pack',
    pricingUnitLabelAr: 'ريال / البوكس (6 أقراص × 150 جم)',
    pricingUnitLabelEn: 'SAR / Box (6 Patties × 150g)',
    isWeightBased: false,
    image: BRAND_TOKENS.images.mincedAndBurger,
    gallery: [BRAND_TOKENS.images.mincedAndBurger, BRAND_TOKENS.images.grillSandwichCorner],
    weights: [
      { id: 'w-6pack', labelAr: 'بوكس 6 أقراص (900 جرام إجمالي)', labelEn: '6-Patty Box (900g total)', weightKg: 0.9, priceMultiplier: 1.0 },
      { id: 'w-12pack', labelAr: 'بوكس عائلي 12 قرص (1.8 كجم)', labelEn: '12-Patty Family Box (1.8kg)', weightKg: 1.8, priceMultiplier: 1.9 },
    ],
    prepOptions: [
      { id: 'prep-classic-150', labelAr: 'سماكة كلاسيكية (150 جرام للقرص)', labelEn: 'Classic Thick Patty (150g each)', extraPrice: 0 },
      { id: 'prep-smash-90', labelAr: 'كرات سماش برجر (10 كرات × 90 جرام)', labelEn: 'Smash Burger Balls (10 × 90g)', extraPrice: 0 },
    ],
    inStock: true,
    stockQty: 28,
    relatedCutId: 'cut-minced-blend',
    relatedRecipeIds: ['rec-artisan-smash-burger'],
    featured: true,
    cookingMethodAr: 'صاج حديد ساخن جداً (3 دقائق لكل وجه) أو شواية فحم',
    cookingMethodEn: 'Piping-hot cast-iron griddle (3 mins per side) or charcoal grill',
  },
  {
    id: 'prod-grill-ribeye-sandwich',
    slug: 'grilled-ribeye-ciabatta-sandwich',
    categoryId: 'grill-corner',
    nameAr: 'سندوتش ريب آي ستيك على الشواية (جاهز للأكل)',
    nameEn: 'Char-Grilled Ribeye Steak Ciabatta Sandwich (Ready to Eat)',
    shortDescAr: 'شرائح ريب آي مشوية لحظياً في خبز تشاباتا محمص مع البصل المكرمل وجبن الشيدر المعتق.',
    shortDescEn: 'Freshly seared ribeye strips in toasted ciabatta with caramelized onions, wild arugula, and aged cheddar.',
    fullDescAr:
      'من ركن الشواية في BEEF HOUSE مباشرة إليك: نشوي شرائح الريب آي الطازجة على الطلب بدرجة النضج المفضلة لديك، وتُقدم في خبز تشاباتا مقرمش مع صوص الخردل بالحبيبات والبصل المكرمل ببطء.',
    fullDescEn:
      'Prepared fresh at the BEEF HOUSE Grill Corner: tender ribeye slices seared to order, layered into crusty toasted artisanal ciabatta with slow-caramelized onions, grain mustard, and melted cheddar.',
    basePriceSar: 54,
    isIllustrativePrice: true,
    pricingUnit: 'per_item',
    pricingUnitLabelAr: 'ريال / الوجبة (سعر استرشادي)',
    pricingUnitLabelEn: 'SAR / Sandwich (Illustrative)',
    isWeightBased: false,
    image: BRAND_TOKENS.images.grillSandwichCorner,
    gallery: [BRAND_TOKENS.images.grillSandwichCorner, BRAND_TOKENS.images.castIronRecipe],
    weights: [
      { id: 'w-reg-180g', labelAr: 'حجم عادي (180 جرام لحم صافي)', labelEn: 'Regular (180g Steak)', weightKg: 0.18, priceMultiplier: 1.0 },
      { id: 'w-dbl-300g', labelAr: 'حجم دبل (300 جرام لحم صافي)', labelEn: 'Double Meat (300g Steak)', weightKg: 0.3, priceMultiplier: 1.45 },
    ],
    prepOptions: [
      { id: 'prep-med', labelAr: 'درجة استواء Medium (عصيري)', labelEn: 'Medium Doneness (Juicy)', extraPrice: 0 },
      { id: 'prep-medwell', labelAr: 'درجة استواء Medium Well', labelEn: 'Medium-Well Doneness', extraPrice: 0 },
      { id: 'prep-well', labelAr: 'درجة استواء Well Done', labelEn: 'Well-Done', extraPrice: 0 },
    ],
    inStock: true,
    stockQty: 35,
    relatedCutId: 'cut-ribeye',
    relatedRecipeIds: ['rec-cast-iron-ribeye'],
    featured: true,
    cookingMethodAr: 'يُحضر طازجاً وساخناً في ركن الشواية بالفرع',
    cookingMethodEn: 'Cooked fresh to order at our in-store Grill Corner',
  },
  {
    id: 'prod-grill-tenderloin-skewers',
    slug: 'char-grilled-tenderloin-skewers-platter',
    categoryId: 'grill-corner',
    nameAr: 'صحن أوصال تندرلوين مشوية على الفحم (جاهز للأكل)',
    nameEn: 'Char-Grilled Tenderloin Skewers Platter (Ready to Eat)',
    shortDescAr: 'أسياخ مكعبات فيليه تندرلوين مشوية مع الطماطم الكرزية والبصل المشوي وإكليل الجبل.',
    shortDescEn: 'Char-grilled beef tenderloin skewers served hot with blistered cherry tomatoes and herb glaze.',
    fullDescAr:
      'مكعبات التندرلوين الطرية متبلة بزيت الزيتون البكر، الفلفل الأسود المجروش، وإكليل الجبل الطازج، مشوية على الفحم لتصل إليك ساخنة وطرية.',
    fullDescEn:
      'Marinated lightly in extra-virgin olive oil, cracked black pepper, and fresh rosemary, our tenderloin skewers are seared over live embers for a smoky crust and melt-in-your-mouth center.',
    basePriceSar: 68,
    isIllustrativePrice: true,
    pricingUnit: 'per_item',
    pricingUnitLabelAr: 'ريال / الوجبة (سعر استرشادي)',
    pricingUnitLabelEn: 'SAR / Platter (Illustrative)',
    isWeightBased: false,
    image: BRAND_TOKENS.images.grillSandwichCorner,
    gallery: [BRAND_TOKENS.images.grillSandwichCorner],
    weights: [
      { id: 'w-2skewers', labelAr: 'وجبة سيخين (~240 جرام لحم)', labelEn: '2 Skewers Platter (~240g)', weightKg: 0.24, priceMultiplier: 1.0 },
      { id: 'w-4skewers', labelAr: 'وجبة 4 أسياخ (~480 جرام لحم)', labelEn: '4 Skewers Sharing Platter (~480g)', weightKg: 0.48, priceMultiplier: 1.85 },
    ],
    prepOptions: [
      { id: 'prep-med', labelAr: 'درجة استواء Medium', labelEn: 'Medium Doneness', extraPrice: 0 },
      { id: 'prep-well', labelAr: 'درجة استواء كامل (Well Done)', labelEn: 'Well-Done', extraPrice: 0 },
    ],
    inStock: true,
    stockQty: 25,
    relatedCutId: 'cut-tenderloin',
    relatedRecipeIds: ['rec-cast-iron-ribeye'],
    featured: false,
    cookingMethodAr: 'يُشوى طازجاً على الفحم عند الطلب في ركن الشواية',
    cookingMethodEn: 'Char-grilled fresh upon order at our Grill Corner',
  },
  {
    id: 'prod-weekend-bbq-bundle',
    slug: 'weekend-riyadh-grill-master-bundle',
    categoryId: 'bundles',
    nameAr: 'باقة شواء نهاية الأسبوع (بوكس الطلعات والجمعات)',
    nameEn: 'Weekend Grill Master Bundle Box',
    shortDescAr: 'تشكيلة متكاملة تضم ستيك ريب آي، شورت ريبس، وبوكس برجر مع ملح بحري وإكليل الجبل.',
    shortDescEn: 'Complete gathering box featuring Prime Ribeye steaks, Short Ribs, and 6 Artisanal Burgers.',
    fullDescAr:
      'باقة مصممة لجمعات الأهل والأصدقاء في الرياض: تحتوي على 1 كجم ستيك ريب آي، 1 كجم أضلاع شورت ريبس، و6 أقراص برجر BEEF HOUSE، مغلفة بعناية في بوكس حافظ للبرودة.',
    fullDescEn:
      'Curated for Riyadh weekend gatherings: includes 1kg Prime Ribeye steaks, 1kg Asado Short Ribs, and 6 hand-pressed Burger patties packed in an insulated cold-box.',
    basePriceSar: 345,
    isIllustrativePrice: true,
    pricingUnit: 'per_pack',
    pricingUnitLabelAr: 'ريال / الباقة المتكاملة (~2.9 كجم)',
    pricingUnitLabelEn: 'SAR / Complete Bundle (~2.9 kg)',
    isWeightBased: true,
    image: BRAND_TOKENS.images.steakCollection,
    gallery: [
      BRAND_TOKENS.images.steakCollection,
      BRAND_TOKENS.images.tomahawkGrill,
      BRAND_TOKENS.images.mincedAndBurger,
    ],
    weights: [
      { id: 'w-std-bundle', labelAr: 'الباقة القياسية (~2.9 كجم تكفي 5-6 أشخاص)', labelEn: 'Standard Bundle (~2.9kg serves 5-6)', weightKg: 2.9, priceMultiplier: 1.0 },
      { id: 'w-xl-bundle', labelAr: 'الباقة الكبيرة (~5.5 كجم تكفي 10 أشخاص)', labelEn: 'XL Gathering Bundle (~5.5kg serves 10)', weightKg: 5.5, priceMultiplier: 1.85 },
    ],
    prepOptions: [
      { id: 'prep-ready-grill', labelAr: 'تجهيز جاهز للشواء مع الملح البحري والأعشاب', labelEn: 'Grill-Ready with Sea Salt & Fresh Herbs', extraPrice: 0 },
      { id: 'prep-vac-indiv', labelAr: 'تغليف كل صنف بشكل منفصل (Vacuum)', labelEn: 'Individually Vacuum-Sealed Cuts', extraPrice: 0 },
    ],
    inStock: true,
    stockQty: 14,
    relatedCutId: 'cut-ribeye',
    relatedRecipeIds: ['rec-cast-iron-ribeye', 'rec-charcoal-asado-ribs'],
    featured: true,
    cookingMethodAr: 'مثالية لشواية الفحم والمقلاة الحديدية',
    cookingMethodEn: 'Designed for charcoal grills and cast-iron skillets',
  },
];

export const MEAT_CUTS_GUIDE: MeatCutGuideItem[] = [
  {
    id: 'cut-ribeye',
    slug: 'ribeye-cut-guide',
    groupId: 'steak',
    groupLabelAr: 'قطعيات الستيك',
    groupLabelEn: 'Steak Cuts',
    nameAr: 'الريب آي (Ribeye)',
    nameEn: 'Ribeye (Scotch Fillet / Entrecôte)',
    anatomicalZone: 'rib',
    anatomicalLabelAr: 'منطقة الأضلاع العلوية (الأضلاع 6 إلى 12)',
    anatomicalLabelEn: 'Upper Rib Primal Section (Ribs 6 to 12)',
    image: BRAND_TOKENS.images.heroMarbledRibeye,
    marblingLevel: 5,
    tendernessLevel: 5,
    textureAr: 'طري جداً وعصيري مع تداخل دهني غني (Marbling) وعين دهنية وسطية تذوب بالحرارة.',
    textureEn: 'Richly marbled with fine muscle grain and the prized Spinalis dorsi (ribeye cap).',
    flavorProfileAr: 'نكهة زبدية عميقة وغنية جداً بفضل الدهون المتداخلة داخل الألياف.',
    flavorProfileEn: 'Deep, buttery, and intensely savory beef flavor.',
    suitableCookingMethodsAr: [
      'التحمير في مقلاة حديد الزهر (Cast Iron Pan-Searing)',
      'الشواء المباشر على الفحم (Direct Charcoal Grilling)',
      'الطهي العكسي للقطع السميكة (Reverse Sear)',
    ],
    suitableCookingMethodsEn: [
      'Cast-Iron Pan Searing with Herb Butter Basting',
      'Direct High-Heat Charcoal Grilling',
      'Reverse Searing for Thick Cuts (3.5cm+)',
    ],
    prepAdviceAr:
      'أخرج القطعة من الثلاجة قبل الطهي بـ 25-30 دقيقة وجفف سطحها تماماً بورق المطبخ قبل إضافة الملح البحري الخشن.',
    prepAdviceEn:
      'Temper for 25–30 minutes before cooking and pat the surface completely dry with paper towels prior to seasoning with coarse sea salt.',
    commonMistakesAr: [
      'وضع اللحم بارداً ومبللاً في مقلاة غير ساخنة مما يؤدي لسلق اللحم بدلاً من تحميره.',
      'تقطيع الستيك فور رفعه من النار دون إراحته (Resting) لمدة 5–7 دقائق مما يفقد العصارة.',
      'المبالغة في الطهي لدرجة Well Done القاسية التي تجفف الدهون الطبيعية.',
    ],
    commonMistakesEn: [
      'Placing wet, cold meat into a lukewarm pan, resulting in steaming rather than crust formation.',
      'Slicing immediately off the heat without a 5–7 minute rest, causing juices to run out.',
      'Overcooking past Medium, which renders out the prized intramuscular marbling.',
    ],
    cookingGuidanceAr:
      'أفضل درجة استواء للريب آي هي Medium Rare إلى Medium (درجة حرارة داخلية 54°C – 58°C) لإعطاء الوقت الكافي لذوبان التعريق الدهني داخل الألياف.',
    cookingGuidanceEn:
      'Best enjoyed at Medium Rare to Medium (54°C–58°C internal temperature) so the rich marbling fully renders into the muscle fibers.',
    foodSafetyTipAr:
      'احفظ اللحوم النيئة في الرف السفلي من الثلاجة (0°C إلى 4°C) واستخدم لوح تقطيع مخصص للحوم النيئة منفصلاً تماماً عن لوح تقديم اللحم المطبوخ.',
    foodSafetyTipEn:
      'Keep raw steaks chilled between 0°C and 4°C and always use separate cutting boards for raw preparation and cooked slicing.',
    relatedProductIds: ['prod-ribeye-prime', 'prod-grill-ribeye-sandwich', 'prod-weekend-bbq-bundle'],
    relatedRecipeIds: ['rec-cast-iron-ribeye'],
  },
  {
    id: 'cut-striploin',
    slug: 'striploin-cut-guide',
    groupId: 'steak',
    groupLabelAr: 'قطعيات الستيك',
    groupLabelEn: 'Steak Cuts',
    nameAr: 'الستريب لوين / نيويورك ستريب (Striploin)',
    nameEn: 'New York Striploin (Short Loin)',
    anatomicalZone: 'short-loin',
    anatomicalLabelAr: 'بيت الكلاوي الأمامي (Short Loin) خلف الأضلاع مباشرة',
    anatomicalLabelEn: 'Short Loin Primal Section (Behind the Rib)',
    image: BRAND_TOKENS.images.steakCollection,
    marblingLevel: 4,
    tendernessLevel: 4,
    textureAr: 'قوام متماسك وناعم مع شريط دهني خارجي على أحد الجوانب.',
    textureEn: 'Firm yet tender fine-grained muscle with a single exterior fat rim.',
    flavorProfileAr: 'نكهة لحم بقري مركزة وواضحة، أقل دسامة من الريب آي وأكثر غنىً من الفيليه.',
    flavorProfileEn: 'Bold, beef-forward flavor with cleaner finish than ribeye.',
    suitableCookingMethodsAr: ['الشواء على الفحم', 'مقلاة الحديد الزهر', 'التحمير مع إكليل الجبل والثوم'],
    suitableCookingMethodsEn: ['Charcoal Grilling', 'Cast-Iron Skillet Searing', 'Broiling'],
    prepAdviceAr:
      'ابدأ بتحمير الحافة الدهنية الجانبية أولاً لمدة 60 ثانية بالملقط حتى تصبح ذهبية ومقرمشة وتذوب دهونها في المقلاة.',
    prepAdviceEn:
      'Hold the steak upright with tongs for 60 seconds first to render and crisp the outer fat cap before searing the flat sides.',
    commonMistakesAr: [
      'إزالة شريط الدهن الجانبي بالكامل قبل الطهي مما يحرم القطعة من النكهة.',
      'تقليب اللحم بشوكة تثقب الألياف وتخرج العصارة بدلاً من استخدام ملقط.',
    ],
    commonMistakesEn: [
      'Trimming off the entire fat cap prior to cooking instead of rendering it.',
      'Piercing the meat with a fork instead of using culinary tongs.',
    ],
    cookingGuidanceAr:
      'يُطهى لمدة 3 إلى 4 دقائق لكل وجه حسب السماكة للوصول لدرجة Medium Rare (54°C) مع إراحة القطعة 5 دقائق.',
    cookingGuidanceEn:
      'Sear 3–4 minutes per side depending on thickness for Medium Rare (54°C), followed by a 5-minute rest.',
    foodSafetyTipAr: 'استخدم ميزان حرارة رقمي (Meat Thermometer) للتأكد من درجة النضج الدقيقة بأمان.',
    foodSafetyTipEn: 'Use an instant-read digital meat thermometer inserted into the center for accurate internal temperature checks.',
    relatedProductIds: ['prod-striploin-ny'],
    relatedRecipeIds: ['rec-cast-iron-ribeye'],
  },
  {
    id: 'cut-tenderloin',
    slug: 'tenderloin-filet-cut-guide',
    groupId: 'steak',
    groupLabelAr: 'قطعيات الستيك',
    groupLabelEn: 'Steak Cuts',
    nameAr: 'التندرلوين / الفيليه (Tenderloin Filet)',
    nameEn: 'Beef Tenderloin (Filet Mignon)',
    anatomicalZone: 'sirloin',
    anatomicalLabelAr: 'العضلة الداخلية أسفل العمود الفقري (Psoas Major)',
    anatomicalLabelEn: 'Internal Loin Muscle Beneath the Spine',
    image: BRAND_TOKENS.images.steakCollection,
    marblingLevel: 2,
    tendernessLevel: 5,
    textureAr: 'فائق الطراوة، خالٍ تقريباً من الأنسجة الضامة والدهون الكثيفة.',
    textureEn: 'Exceptionally buttery tenderness with very lean, fine muscle fibers.',
    flavorProfileAr: 'نكهة ناعمة ورقيقة تتألق مع الزبدة والأعشاب أو الصوصات الفاخرة.',
    flavorProfileEn: 'Mild, delicate flavor that pairs wonderfully with herb butter and pan sauces.',
    suitableCookingMethodsAr: [
      'التحمير السريع في الزبدة ثم الفرن',
      'أوصال مشوية سريعة على الفحم',
      'تقطيع شاتوبريان للمناسبات',
    ],
    suitableCookingMethodsEn: ['Pan-Sear + Oven Finish', 'Quick Charcoal Skewers', 'Chateaubriand Roast'],
    prepAdviceAr:
      'لأنها قطعية قليلة الدهون، يُفضل تقطيعها بسماكة 4 سم ودهنها بقليل من زيت الأفوكادو أو السمن قبل التحمير وسقيها بالزبدة.',
    prepAdviceEn:
      'Because tenderloin is naturally lean, cut into thick 4cm medallions and baste generously with butter during the final minute of searing.',
    commonMistakesAr: [
      'ترك الغشاء الفضي (Silverskin) دون تنظيف مما ينكمش بالحرارة.',
      'الطهي الزائد الذي يحول الفيليه القليل الدهون إلى قطعة جافة.',
    ],
    commonMistakesEn: [
      'Failing to remove the tough silverskin membrane before cutting.',
      'Overcooking past Medium, which dries out this naturally lean muscle.',
    ],
    cookingGuidanceAr: 'درجة الحرارة الداخلية المثالية هي 52°C إلى 55°C (Medium Rare).',
    cookingGuidanceEn: 'Target an internal temperature of 52°C–55°C (Medium Rare) for optimal tenderness.',
    foodSafetyTipAr: 'لا تترك اللحوم المبردة خارج الثلاجة لأكثر من ساعة في الأجواء الحارة.',
    foodSafetyTipEn: 'Never leave chilled raw meat at room temperature for more than 1 hour in warm climates.',
    relatedProductIds: ['prod-tenderloin-filet', 'prod-grill-tenderloin-skewers'],
    relatedRecipeIds: ['rec-cast-iron-ribeye'],
  },
  {
    id: 'cut-tomahawk-shortribs',
    slug: 'tomahawk-and-short-ribs-guide',
    groupId: 'grilling',
    groupLabelAr: 'قطعيات الشواء والتدخين',
    groupLabelEn: 'Grilling & Smoking Cuts',
    nameAr: 'التوماهوك والشورت ريبس (أسادو)',
    nameEn: 'Tomahawk & Short Ribs (Asado)',
    anatomicalZone: 'rib',
    anatomicalLabelAr: 'منطقة الأضلاع الكاملة والقصيرة (Rib & Plate)',
    anatomicalLabelEn: 'Rib & Short Plate Primal Sections',
    image: BRAND_TOKENS.images.tomahawkGrill,
    marblingLevel: 5,
    tendernessLevel: 4,
    textureAr: 'طبقات غنية من اللحم المتداخل مع الدهون حول العظم العطري.',
    textureEn: 'Richly layered muscle and marbling surrounding flavor-enhancing rib bones.',
    flavorProfileAr: 'نكهة مدخنة وقوية تبرز بشكل مذهل مع الفحم الطبيعي أو حطب السمر.',
    flavorProfileEn: 'Deep, rich, smoky beef flavor amplified by cooking on the bone.',
    suitableCookingMethodsAr: [
      'الشواء على الفحم بطريقة الأسادو الأرجنتينية',
      'التدخين البطيء (Low & Slow Smoking)',
      'الشواء غير المباشر للتوماهوك',
    ],
    suitableCookingMethodsEn: ['Argentine Asado Charcoal Grilling', 'Low & Slow Wood Smoking', 'Two-Zone Indirect Grilling'],
    prepAdviceAr:
      'جهّز الشواية بمنطقتين للحرارة (منطقة جمر مباشر للتحمير، ومنطقة غير مباشرة لإكمال النضج بهدوء دون احتراق السطح).',
    prepAdviceEn:
      'Set up a two-zone charcoal fire (direct embers for searing and an indirect zone for gentle roasting to temperature).',
    commonMistakesAr: [
      'وضع التوماهوك السميك فوق لهب مرتفع مباشرة طوال الوقت فيحترق من الخارج ويبقى نيئاً من الداخل.',
      'استعجال نضج الشورت ريبس الكاملة بحرارة عالية بدلاً من الطهي البطيء.',
    ],
    commonMistakesEn: [
      'Keeping thick bone-in cuts directly over flaring flames, charring the exterior before the center warms.',
      'Rushing thick plate short ribs over high heat instead of allowing collagen to melt slowly.',
    ],
    cookingGuidanceAr:
      'للتوماهوك: حرارة داخلية 56°C. للشورت ريبس المدخنة بالكامل: تطهى ببطء حتى تصل إلى 93°C–95°C لتذوب تماماً.',
    cookingGuidanceEn:
      'Tomahawk: pull at 55°C–56°C and rest 10 minutes. Whole smoked short ribs: cook low-and-slow to 93°C–95°C until probe-tender.',
    foodSafetyTipAr: 'تأكد من نظافة شبك الشواية وتسخينه جيداً قبل وضع اللحوم.',
    foodSafetyTipEn: 'Brush and preheat grill grates thoroughly before placing raw cuts on the grill.',
    relatedProductIds: ['prod-tomahawk-bonein', 'prod-short-ribs-asado', 'prod-weekend-bbq-bundle'],
    relatedRecipeIds: ['rec-charcoal-asado-ribs'],
  },
  {
    id: 'cut-shank-chuck',
    slug: 'shank-ossobuco-and-chuck-guide',
    groupId: 'saudi-traditional',
    groupLabelAr: 'الطبخ البطيء والأطباق السعودية',
    groupLabelEn: 'Slow Cooking & Traditional Saudi Dishes',
    nameAr: 'الموزات بالعظم (أوسو بوكو) والرقبة (Chuck)',
    nameEn: 'Bone-In Shank (Osso Buco) & Chuck Roast',
    anatomicalZone: 'shank',
    anatomicalLabelAr: 'منطقة الساق (الموزة) والرقبة/الكتف الأمامي',
    anatomicalLabelEn: 'Foreshank / Hindshank & Chuck Shoulder',
    image: BRAND_TOKENS.images.cookingOssobuco,
    marblingLevel: 4,
    tendernessLevel: 5,
    textureAr: 'ألياف غنية بالكولاجين ونخاع العظم تتحول بعد الطبخ البطيء إلى قوام حريري يذوب بالملعقة.',
    textureEn: 'Rich in natural collagen and marrow that transforms into spoon-tender silkiness when braised.',
    flavorProfileAr: 'نكهة مرق غنية وعميقة مثالية للكبسة السعودية، الجريش، المرقوق، وأوسو بوكو.',
    flavorProfileEn: 'Deeply gelatinous, savory broth flavor ideal for Saudi Kabsa, Jareesh, and Osso Buco.',
    suitableCookingMethodsAr: [
      'الطبخ البطيء في القدر الثقيل (Braising)',
      'الكبسة السعودية التقليدية باللحم',
      'الطبخ في الفرن المغطى مع الخضروات العطرية',
    ],
    suitableCookingMethodsEn: ['Traditional Saudi Kabsa', 'Slow Dutch-Oven Braising', 'Pressure Cooking'],
    prepAdviceAr:
      'شوّح قطع الموزة أو مكعبات الرقبة في قدر ساخن من جميع الجهات لاكتساب لون ذهبي عميق (تفاعل مايلارد) قبل إضافة الماء والبهارات الصحيحة.',
    prepAdviceEn:
      'Brown the shanks or chuck cubes deeply on all sides in a hot pot before adding stock and whole spices to build a rich flavor base.',
    commonMistakesAr: [
      'محاولة شوي الموزة سريعا على الفحم مثل الستيك (فهي تحتاج رطوبة ووقتاً طويلين لتطرى).',
      'سلق اللحم بدون تشويحه مسبقاً مما يفقد المرق عمق النكهة.',
    ],
    commonMistakesEn: [
      'Attempting to quick-grill shank cuts over dry high heat—they require slow, moist heat to break down collagen.',
      'Boiling gray meat without searing it first.',
    ],
    cookingGuidanceAr:
      'يطهى على نار هادئة لمدة 2 إلى 3 ساعات في القدر العادي (أو 45–60 دقيقة في قدر الضغط) حتى ينفصل اللحم عن العظم بسهولة.',
    cookingGuidanceEn:
      'Simmer gently covered for 2.5–3 hours (or 50 minutes in a pressure cooker) until fork-tender.',
    foodSafetyTipAr: 'عند حفظ المرق واللحم المطبوخ، برّده خلال ساعتين واحفظه في الثلاجة وأعد تسخينه حتى الغليان الكامل.',
    foodSafetyTipEn: 'Refrigerate cooked stews within 2 hours and reheat thoroughly to at least 74°C before serving.',
    relatedProductIds: ['prod-ossobuco-shank', 'prod-custom-quarter-prep'],
    relatedRecipeIds: ['rec-slow-braised-shank-kabsa'],
  },
  {
    id: 'cut-minced-blend',
    slug: 'minced-beef-and-burger-blend-guide',
    groupId: 'minced',
    groupLabelAr: 'اللحم المفروم ومزيج البرجر',
    groupLabelEn: 'Minced Meat & Burger Blends',
    nameAr: 'مزيج البريسكت والتشاك للمفروم والبرجر',
    nameEn: 'Brisket & Chuck Artisanal Grind Blend',
    anatomicalZone: 'brisket',
    anatomicalLabelAr: 'منطقة الصدر (Brisket) والرقبة (Chuck)',
    anatomicalLabelEn: 'Brisket Chest & Chuck Primal Sections',
    image: BRAND_TOKENS.images.mincedAndBurger,
    marblingLevel: 4,
    tendernessLevel: 5,
    textureAr: 'حبيبات مفرومة بتوازن مدروس بين الهبر الصافي والدهن الطبيعي لضمان الطراوة.',
    textureEn: 'Coarse artisanal grind balancing lean muscle with flavorful brisket fat.',
    flavorProfileAr: 'طعم غني وعصيري يناسب البرجر الفاخر، الكفتة المشوية، والحشوات.',
    flavorProfileEn: 'Rich, juicy, savory profile engineered for gourmet burgers and grilled kofta.',
    suitableCookingMethodsAr: [
      'سماش برجر على صاج حديد ساخن',
      'كفتة وكباب مشوي على الفحم',
      'حشوات السمبوسة، اللازانيا، والبولونيز',
    ],
    suitableCookingMethodsEn: ['Cast-Iron Smash Burgers', 'Charcoal Grilled Kofta', 'Bolognese & Savory Pastries'],
    prepAdviceAr:
      'للبرجر: لا تعجن اللحم المفروم كثيراً ولا تضف الملح داخل اللحم قبل التشكيل حتى لا يصبح قوامه مطاطياً؛ بل رش الملح على السطح الخارجي مباشرة قبل وضعه على الصاج.',
    prepAdviceEn:
      'For burgers: handle the mince gently without overworking it, and season only the outside surface right before hitting the hot griddle.',
    commonMistakesAr: [
      'استخدام لحم مفروم خالٍ تماماً من الدهون (0% دهن) لعمل البرجر، مما ينتج قرصاً جافاً ومتفتتاً.',
      'الضغط المستمر على قرص البرجر السميك بعد نضجه مما يعصر الدهون للخارج.',
    ],
    commonMistakesEn: [
      'Using ultra-lean mince for burgers, resulting in dry, crumbly patties.',
      'Pressing down on cooked thick patties and squeezing out all the juices.',
    ],
    cookingGuidanceAr:
      'يطهى اللحم المفروم والبرجر حتى تصل درجة الحرارة الداخلية إلى 71°C لضمان السلامة الغذائية مع الحفاظ على العصارة.',
    cookingGuidanceEn:
      'Cook ground beef and burgers to a safe internal temperature of 71°C (160°F).',
    foodSafetyTipAr:
      'اللحم المفروم أكثر حساسية من القطع الكاملة؛ لذا يجب حفظه مبرداً باستمرار وطهيه خلال 24–48 ساعة من الشراء أو تجميده فوراً.',
    foodSafetyTipEn:
      'Because grinding increases surface area, keep minced beef strictly chilled at 0–4°C and cook within 24–48 hours or freeze promptly.',
    relatedProductIds: ['prod-fresh-minced-beef', 'prod-wagyu-burger-box'],
    relatedRecipeIds: ['rec-artisan-smash-burger'],
  },
];

export const RECIPES_DATA: RecipeItem[] = [
  {
    id: 'rec-cast-iron-ribeye',
    slug: 'cast-iron-herb-butter-ribeye-steak',
    categoryId: 'steak',
    categoryLabelAr: 'تحضير الستيك',
    categoryLabelEn: 'Steak Preparation',
    titleAr: 'ستيك ريب آي في مقلاة حديد الزهر مع الزبدة والثوم وإكليل الجبل',
    titleEn: 'Cast-Iron Pan-Seared Ribeye with Roasted Garlic & Rosemary Butter',
    subtitleAr: 'الطريقة الاحترافية للحصول على قشرة ذهبية مقرمشة وقلب وردي عصيري يذوب في الفم.',
    subtitleEn: 'Master the steakhouse crust and aromatic butter-baste technique at home.',
    image: BRAND_TOKENS.images.castIronRecipe,
    prepTimeMinutes: 25,
    cookTimeMinutes: 10,
    servings: 'شخصان (2 Persons)',
    cookingMethodAr: 'التحمير والسقي بالزبدة (Pan-Searing & Butter Basting)',
    cookingMethodEn: 'Cast-Iron Pan-Searing & Arrosé Butter Basting',
    recommendedCutId: 'cut-ribeye',
    recommendedCutNameAr: 'ريب آي ستيك بسماكة 3 سم',
    recommendedCutNameEn: '3cm Thick-Cut Prime Ribeye',
    ingredientsAr: [
      { item: 'ستيك ريب آي من BEEF HOUSE (سماكة 3 سم)', amount: '500 جرام' },
      { item: 'ملح بحري خشن وفلفل أسود مجروش طازج', amount: 'ملعقة كبيرة' },
      { item: 'زيت ذو نقطة دخان عالية (أفوكادو أو ذرة)', amount: 'ملعقتان كبيرتان' },
      { item: 'زبدة غير مملحة عالية الجودة', amount: '40 جرام (3 ملاعق كبيرة)' },
      { item: 'فصوص ثوم كاملة مقشرة ومهروسة خفيفاً', amount: '4 فصوص' },
      { item: 'أغصان إكليل الجبل (روزميري) وزعتر بري طازج', amount: '3 أغصان' },
    ],
    ingredientsEn: [
      { item: 'BEEF HOUSE Prime Ribeye Steak (3cm thick)', amount: '500g' },
      { item: 'Coarse sea salt & freshly cracked black pepper', amount: '1 tbsp' },
      { item: 'High-smoke-point neutral oil (avocado or grapeseed)', amount: '2 tbsp' },
      { item: 'Unsalted grass-fed butter', amount: '40g (3 tbsp)' },
      { item: 'Whole garlic cloves, lightly smashed', amount: '4 cloves' },
      { item: 'Fresh rosemary and thyme sprigs', amount: '3 sprigs' },
    ],
    stepsAr: [
      'أخرج قطعة الريب آي من الثلاجة قبل 25 دقيقة من الطهي، وجفف سطحها جيداً من الرطوبة باستخدام مناديل المطبخ الورقية.',
      'تبّل الستيك بسخاء من جميع الجوانب (بما في ذلك الحواف) بالملح البحري الخشن والفلفل الأسود المجروش قبل وضعه في المقلاة مباشرة.',
      'سخّن مقلاة حديد الزهر الثقيلة على نار عالية لمدة 4 دقائق حتى تصبح ساخنة جداً، ثم أضف الزيت.',
      'ضع قطعة الستيك بعيداً عنك وحمّر الوجه الأول لمدة دقيقتين ونصف دون تحريكها حتى تتكون قشرة بنية عميقة.',
      'اقلب الستيك على الوجه الثاني، اخفض الحرارة إلى متوسطة، وأضف الزبدة وفصوص الثوم وأغصان إكليل الجبل.',
      'أمِل المقلاة قليلاً واستخدم ملعقة لسقي سطح الستيك باستمرار بالزبدة الذائبة العطرية لمدة دقيقتين.',
      'ارفع الستيك عندما تصل درجة حرارته الداخلية إلى 54°C (Medium Rare)، وضعه على لوح خشبي دافئ ليرتاح لمدة 6 دقائق كاملة قبل تقطيعه عكس اتجاه الألياف.',
    ],
    stepsEn: [
      'Remove the Ribeye from the refrigerator 25 minutes before cooking and pat every surface dry with paper towels.',
      'Season generously on all sides and edges with coarse sea salt and freshly cracked black pepper right before searing.',
      'Heat a heavy cast-iron skillet over high heat for 4 minutes until smoking hot, then add the neutral oil.',
      'Lay the steak away from you and sear undisturbed for 2.5 minutes until a deep golden-brown crust forms.',
      'Flip the steak, reduce heat to medium, and immediately add butter, smashed garlic cloves, and rosemary sprigs.',
      'Tilt the pan slightly and continuously spoon the foaming aromatic butter over the top of the steak for 2 minutes.',
      'Transfer to a warm board at 54°C internal temperature and rest for 6 full minutes before slicing against the grain.',
    ],
    servingSuggestionsAr:
      'يُقدم مقطعاً إلى شرائح سميكة مع الثوم المشوي في الزبدة، البطاطس المهروسة أو المشوية، وسلطة الجرجير البري.',
    servingSuggestionsEn:
      'Serve sliced on a warm wooden board drizzled with the pan juices, roasted garlic bulbs, and wild rocket salad.',
    chefTipAr:
      'إراحة الستيك بعد الطهي لا تقل أهمية عن الطهي نفسه؛ فهي تسمح للألياف بالاسترخاء وإعادة توزيع العصارة بالتساوي داخل القطعة.',
    chefTipEn:
      'Resting the steak is just as critical as the sear—it allows muscle fibers to relax and reabsorb juices throughout the cut.',
    relatedProductIds: ['prod-ribeye-prime', 'prod-striploin-ny'],
  },
  {
    id: 'rec-charcoal-asado-ribs',
    slug: 'charcoal-grilled-asado-short-ribs',
    categoryId: 'grilling',
    categoryLabelAr: 'الشواء على الفحم',
    categoryLabelEn: 'Charcoal Grilling',
    titleAr: 'أضلاع شورت ريبس (أسادو) والتوماهوك المشوية على الفحم',
    titleEn: 'Charcoal-Grilled Asado Short Ribs & Rosemary Tomahawk',
    subtitleAr: 'تجربة شواء أصيلة تعتمد على جودة اللحم وحرارة الجمر الهادئة والملح البحري فقط.',
    subtitleEn: 'Authentic live-fire grilling relying on pure marbling, glowing embers, and coarse salt.',
    image: BRAND_TOKENS.images.tomahawkGrill,
    prepTimeMinutes: 20,
    cookTimeMinutes: 35,
    servings: '4 أشخاص (4 Persons)',
    cookingMethodAr: 'الشواء على الجمر الطبيعي (Two-Zone Charcoal Grill)',
    cookingMethodEn: 'Two-Zone Live Charcoal Embers',
    recommendedCutId: 'cut-tomahawk-shortribs',
    recommendedCutNameAr: 'توماهوك بالعظم + شورت ريبس أسادو',
    recommendedCutNameEn: 'Bone-In Tomahawk + Cross-Cut Asado Short Ribs',
    ingredientsAr: [
      { item: 'أضلاع شورت ريبس مقطعة عرضياً (أسادو) أو توماهوك', amount: '1.2 كجم' },
      { item: 'ملح بحري خشن', amount: 'ملعقتان كبيرتان' },
      { item: 'فلفل أسود مجروش طازج', amount: 'ملعقة صغيرة' },
      { item: 'زيت زيتون بكر ممتاز مع أغصان إكليل الجبل للدهن', amount: '3 ملاعق كبيرة' },
    ],
    ingredientsEn: [
      { item: 'Cross-cut Asado Beef Short Ribs or Bone-In Tomahawk', amount: '1.2 kg' },
      { item: 'Coarse flaky sea salt', amount: '2 tbsp' },
      { item: 'Freshly cracked black pepper', amount: '1 tsp' },
      { item: 'Extra-virgin olive oil & rosemary brush', amount: '3 tbsp' },
    ],
    stepsAr: [
      'أشعل الفحم الطبيعي وانتظر حتى يهدأ اللهب تماماً وتغطى الجمار بطبقة رمادية بيضاء متوهجة.',
      'وزّع الفحم بحيث تكون هناك منطقة حرارة عالية مباشرة ومنطقة حرارة هادئة جانبية.',
      'تبّل اللحم بالملح البحري الخشن فقط قبل وضعه على الشبك.',
      'للشورت ريبس المقطعة عرضياً: اشوِها على حرارة متوسطة إلى عالية لمدة 4–5 دقائق لكل وجه حتى تتحمر الدهون وتتقرمش الحواف.',
      'للتوماهوك السميك: ابدأ في المنطقة غير المباشرة لمدة 20 دقيقة مع تغطية الشواية، ثم انقله فوق الجمر المباشر لمدة دقيقتين لكل وجه.',
      'استخدم حزمة من إكليل الجبل الطازج المغموسة في زيت الزيتون لدهن سطح اللحم أثناء الدقائق الأخيرة، ثم أرح اللحم 8 دقائق قبل التقديم.',
    ],
    stepsEn: [
      'Light natural lump charcoal and wait until flames subside and coals are covered in glowing white ash.',
      'Arrange coals into a two-zone fire: high direct heat on one side, gentle indirect heat on the other.',
      'Season the ribs and Tomahawk generously with coarse sea salt.',
      'For cross-cut Asado ribs: grill over medium-high embers for 4–5 minutes per side until fat renders and edges crisp.',
      'For thick Tomahawk: roast on the indirect side for 20 minutes covered, then sear directly over glowing coals for 2 minutes per side.',
      'Brush with a bundle of fresh rosemary dipped in olive oil and rest for 8 minutes before carving.',
    ],
    servingSuggestionsAr: 'يُقدم مع صوص التشيميتشوري بالأعشاب الطازجة، البصل المشوي على الجمر، والخبز الحار.',
    servingSuggestionsEn: 'Serve with fresh herb chimichurri, ember-roasted onions, and warm flatbread.',
    chefTipAr: 'لا تضع اللحم فوق الفحم المشتعل باللهب الأسود؛ انتظر دائماً حتى يصفو الجمر تماماً لتجنب المرارة.',
    chefTipEn: 'Never place marbled beef over active black smoke or starter flames—wait for clean, glowing red embers.',
    relatedProductIds: ['prod-tomahawk-bonein', 'prod-short-ribs-asado', 'prod-weekend-bbq-bundle'],
  },
  {
    id: 'rec-slow-braised-shank-kabsa',
    slug: 'saudi-spiced-braised-beef-shank-ossobuco',
    categoryId: 'saudi-dishes',
    categoryLabelAr: 'الأطباق السعودية والطبخ البطيء',
    categoryLabelEn: 'Saudi Dishes & Slow Cooking',
    titleAr: 'موزات اللحم المطهوة ببطء بالبهارات العطرية على الطريقة السعودية',
    titleEn: 'Slow-Braised Beef Osso Buco Shanks with Aromatic Saudi Spices',
    subtitleAr: 'موزات بالعظم ونخاع غني تطهى على نار هادئة مع الهيل، القرفة، واللومي لتقدم مع الأرز الفاخر.',
    subtitleEn: 'Bone-in marrow shanks braised slowly with cardamom, cinnamon, and black lime over fragrant rice.',
    image: BRAND_TOKENS.images.cookingOssobuco,
    prepTimeMinutes: 20,
    cookTimeMinutes: 135,
    servings: '5 أشخاص (5 Persons)',
    cookingMethodAr: 'التشويح والطبخ البطيء (Seared & Slow-Braised)',
    cookingMethodEn: 'Seared & Slow-Simmered Braise',
    recommendedCutId: 'cut-shank-chuck',
    recommendedCutNameAr: 'موزات بقري بالعظم (أوسو بوكو) ومكعبات الرقبة',
    recommendedCutNameEn: 'Bone-In Osso Buco Shanks & Chuck Cubes',
    ingredientsAr: [
      { item: 'حلقات موزة بقري بالعظم ومكعبات طبخ من BEEF HOUSE', amount: '1.5 كجم' },
      { item: 'بصل مفروم ناعم وثوم مهروس', amount: 'بصلتان كبيرتان + 5 فصوص ثوم' },
      { item: 'بهارات صحيحة (هيل، قرفة، ورق غار، قرنفل، لومي، نجمة اليانسون)', amount: 'مجموعة متكاملة' },
      { item: 'سمن بلدي أو زيت زيتون للتشويح', amount: 'ملعقتان كبيرتان' },
      { item: 'ماء مغلي أو مرق لحم طبيعي', amount: '1.5 لتر' },
      { item: 'أرز بسمتي طويل الحبة مغسول ومنقوع', amount: '3 أكواب' },
    ],
    ingredientsEn: [
      { item: 'BEEF HOUSE Bone-In Osso Buco Shanks & Chuck Cubes', amount: '1.5 kg' },
      { item: 'Finely diced onions & minced garlic', amount: '2 large onions + 5 cloves' },
      { item: 'Whole spices (cardamom, cinnamon stick, bay leaves, cloves, dried lime)', amount: '1 spice bouquet' },
      { item: 'Ghee or olive oil for searing', amount: '2 tbsp' },
      { item: 'Boiling water or beef bone broth', amount: '1.5 liters' },
      { item: 'Aged long-grain Basmati rice, soaked', amount: '3 cups' },
    ],
    stepsAr: [
      'سخّن السمن في قدر ثقيل وحمّر قطع الموزة بالعظم من الجانبين حتى تكتسب لوناً ذهبياً عميقاً، ثم ارفعها جانباً.',
      'في نفس القدر، قلّب البصل والثوم والبهارات الصحيحة (الهيل، القرفة، ورق الغار، واللومي) حتى تفوح رائحتها الزكية.',
      'أعد قطع اللحم إلى القدر وأضف الماء المغلي، واتركه يغلي ثم اخفض النار إلى هادئة جداً مع تغطية القدر بإحكام.',
      'اترك اللحم ينضج ببطء لمدة ساعتين إلى ساعتين ونصف (أو 50 دقيقة في قدر الضغط) حتى يذوب اللحم ويمتزج نخاع العظم بالمرق.',
      'أضف الملح في المرحلة الأخيرة، ثم استخدم المرق الغني المصفى لطهي أرز البسمتي، وقدّم الموزات المحمرة فوق الأرز.',
    ],
    stepsEn: [
      'Heat ghee in a heavy pot and sear the bone-in shanks deeply on both sides until golden brown; set aside.',
      'In the same pot, sauté onions, garlic, and whole aromatic spices (cardamom, cinnamon, bay leaf, dried lime) until fragrant.',
      'Return the beef to the pot, pour in boiling water, bring to a gentle simmer, cover tightly, and reduce heat to low.',
      'Braise slowly for 2 to 2.5 hours (or 50 minutes in a pressure cooker) until the meat is falling off the bone and the marrow enriches the broth.',
      'Season with salt, cook the soaked Basmati rice in the strained rich broth, and serve the glazed shanks on top.',
    ],
    servingSuggestionsAr: 'يُقدم ساخناً مع المكسرات المحمصة، الدقوس الحار، وسلطة اللبن بالخيار.',
    servingSuggestionsEn: 'Serve hot garnished with toasted almonds, spicy Daqoos tomato sauce, and cucumber yogurt.',
    chefTipAr: 'وجود العظم والنخاع في قطع الأوسو بوكو هو السر الذي يمنح مرق الكبسة قواماً غنياً ولمعة طبيعية.',
    chefTipEn: 'Keeping the marrow bone intact during braising naturally thickens and enriches the Kabsa broth.',
    relatedProductIds: ['prod-ossobuco-shank', 'prod-custom-quarter-prep'],
  },
  {
    id: 'rec-artisan-smash-burger',
    slug: 'artisanal-steakhouse-burger-and-steak-sandwich',
    categoryId: 'burgers-sandwiches',
    categoryLabelAr: 'البرجر والسندوتشات',
    categoryLabelEn: 'Burgers & Sandwiches',
    titleAr: 'برجر BEEF HOUSE وسندوتش الستيك بالبصل المكرمل والشيدر',
    titleEn: 'BEEF HOUSE Artisanal Burger & Caramelized Onion Steak Sandwich',
    subtitleAr: 'كيف تحضر برجر وسندوتش ستيك بمستوى المطاعم الفاخرة في منزلك خلال دقائق.',
    subtitleEn: 'Achieve crispy-laced burger edges and caramelized steak sandwiches in your own kitchen.',
    image: BRAND_TOKENS.images.grillSandwichCorner,
    prepTimeMinutes: 15,
    cookTimeMinutes: 8,
    servings: '4 أشخاص (4 Persons)',
    cookingMethodAr: 'صاج حديد الزهر الساخن (High-Heat Cast-Iron Griddle)',
    cookingMethodEn: 'High-Heat Cast-Iron Griddle',
    recommendedCutId: 'cut-minced-blend',
    recommendedCutNameAr: 'بوكس برجر BEEF HOUSE أو شرائح ريب آي',
    recommendedCutNameEn: 'BEEF HOUSE 80/20 Burger Box or Ribeye Strips',
    ingredientsAr: [
      { item: 'بوكس برجر BEEF HOUSE (نسبة دهن 20%)', amount: '6 أقراص' },
      { item: 'بصل أبيض مقطع شرائح رفيعة ومكرمل ببطء مع الزبدة', amount: 'بصلتان' },
      { item: 'شرائح جبن شيدر معتق', amount: '6 شرائح' },
      { item: 'خبز بريوش أو تشاباتا محمص بالزبدة', amount: 'حسب العدد' },
      { item: 'ملح بحري وفلفل أسود مطحون', amount: 'حسب الرغبة' },
    ],
    ingredientsEn: [
      { item: 'BEEF HOUSE 80/20 Artisanal Burger Patties', amount: '6 patties' },
      { item: 'Thinly sliced white onions slow-caramelized in butter', amount: '2 onions' },
      { item: 'Aged sharp cheddar cheese slices', amount: '6 slices' },
      { item: 'Butter-toasted brioche buns or ciabatta bread', amount: 'As needed' },
      { item: 'Sea salt and cracked black pepper', amount: 'To taste' },
    ],
    stepsAr: [
      'حمّص خبز البريوش أو التشاباتا مع مسحة خفيفة من الزبدة على الصاج أولاً وارفعه جانباً.',
      'سخّن الصاج الحديدي على أعلى درجة حرارة بدون إضافة زيت (دهون اللحم الطبيعية 20% كافية تماماً).',
      'رش الملح والفلفل الأسود على سطح قرص البرجر الخارجي فقط، ثم ضعه على الصاج الساخن لمدة 3 دقائق دون تحريك حتى تتكون قشرة مقرمشة.',
      'اقلب القرص، وضع فوقه البصل المكرمل وشريحة جبن الشيدر، وغطِّه بغطاء معدني لمدة دقيقة ونصف حتى يذوب الجبن تماماً وقدمّه فوراً.',
    ],
    stepsEn: [
      'Toast the brioche buns or ciabatta lightly with butter on the griddle first and set aside.',
      'Heat the cast-iron griddle over high heat dry (the natural 80/20 marbling provides all the fat needed).',
      'Season the exterior of the patties with salt and pepper, then sear undisturbed for 3 minutes until a deep crust forms.',
      'Flip, top immediately with caramelized onions and aged cheddar, cover with a dome lid for 90 seconds to melt, and serve hot.',
    ],
    servingSuggestionsAr: 'يُقدم مع البطاطس المقلية المقرمشة، المخلل، والجرجير الطازج.',
    servingSuggestionsEn: 'Serve immediately with crispy skin-on fries, house pickles, and wild arugula.',
    chefTipAr: 'تحميص الخبز بالزبدة يمنع امتصاصه لعصارة اللحم ويحافظ على قرمشته حتى آخر لقمة.',
    chefTipEn: 'Butter-toasting the interior of the bun creates a barrier that keeps the bread crisp against the juicy meat.',
    relatedProductIds: ['prod-wagyu-burger-box', 'prod-grill-ribeye-sandwich', 'prod-fresh-minced-beef'],
  },
];

export const QUALITY_PILLARS = [
  {
    id: 'q-animal-care',
    num: '01',
    titleAr: 'العناية بالتربية وبيئة المزرعة',
    titleEn: 'Animal Care & Farming Environment',
    descAr:
      'نؤمن أن جودة اللحم تبدأ من بيئة نظيفة خالية من الإجهاد وعناية بيطرية منتظمة تحترم سلامة الحيوان وصحته قبل كل شيء.',
    descEn:
      'Meat quality begins with low-stress, hygienic farming conditions and consistent veterinary care.',
  },
  {
    id: 'q-suitable-feed',
    num: '02',
    titleAr: 'جودة الغذاء وتوازنه',
    titleEn: 'Balanced, Quality Nutrition',
    descAr:
      'يسهم الغذاء المتوازن والمدروس في تكوين التعريق الدهني الطبيعي ونكهة اللحم، كجزء من منظومة متكاملة تشمل السلالة والعمر والعناية.',
    descEn:
      'Proper feed programs work alongside genetics, age, and husbandry to develop clean flavor and natural marbling.',
  },
  {
    id: 'q-sourcing-transparency',
    num: '03',
    titleAr: 'شفافية المصدر والاختيار',
    titleEn: 'Sourcing Transparency',
    descAr:
      'نوضح لعملائنا طبيعة كل قطعية ومصدرها المعتمد دون مبالغات تسويقية، ونفرق بوضوح بين طموحات العلامة والممارسات التشغيلية الموثقة.',
    descEn:
      'We communicate cut characteristics and verified batch origins honestly without unverified marketing claims.',
  },
  {
    id: 'q-cold-chain',
    num: '04',
    titleAr: 'إدارة سلسلة التبريد والنظافة',
    titleEn: 'Cold-Chain & Hygienic Handling',
    descAr:
      'الحفاظ الصارم على درجات الحرارة المبردة (0°C إلى 4°C) في جميع مراحل الاستلام، التقطيع، العرض، والتوصيل لمنع أي نمو بكتيري وحفظ الطراوة.',
    descEn:
      'Strict temperature control (0°C–4°C) from receiving and butcher block preparation to chilled delivery.',
  },
  {
    id: 'q-pro-cutting',
    num: '05',
    titleAr: 'التقطيع الاحترافي والتجهيز',
    titleEn: 'Master Butcher Preparation',
    descAr:
      'تقطيع اللحم بالزاوية الصحيحة عكس الألياف، تنظيف الأغشية القاسية، وتحديد السماكة المثالية لكل طريقة طهي (ستيك، شواء، أو طبخ بطيء).',
    descEn:
      'Precision trimming of silverskin and cutting across the grain at the exact thickness suited for your cooking method.',
  },
  {
    id: 'q-packaging',
    num: '06',
    titleAr: 'التغليف الآمن والتخزين',
    titleEn: 'Safe Packaging & Storage',
    descAr:
      'استخدام تغليف غذائي آمن وتفريغ الهواء (Vacuum) عند الطلب للحفاظ على اللون الطبيعي، العصارة، وسهولة الحفظ في ثلاجة العميل.',
    descEn:
      'Food-grade butcher wrapping and optional vacuum sealing to lock in freshness and simplify home storage.',
  },
];

export const FAQ_ITEMS = [
  {
    qAr: 'ما هي ساعات عمل BEEF HOUSE في الرياض؟',
    qEn: 'What are BEEF HOUSE opening hours in Riyadh?',
    aAr: 'نعمل يومياً من الساعة 9:00 صباحاً حتى الساعة 12:00 منتصف الليل بتوقيت الرياض (Asia/Riyadh). يمكنك متابعة مؤشر الحالة الحي في أعلى الموقع لمعرفة حالة المتجر الآن.',
    aEn: 'We are open daily from 9:00 AM until 12:00 Midnight Riyadh time (Asia/Riyadh). You can check the live status indicator in the header at any time.',
  },
  {
    qAr: 'كيف يتم حساب السعر في المنتجات المعتمدة على الوزن؟',
    qEn: 'How is pricing calculated for weight-based meat cuts?',
    aAr: 'عند الطلب عبر المتجر الإلكتروني، يظهر لك الوزن التقديري والسعر التقديري بناءً عليه. نظراً لأن تقطيع اللحوم وتنظيفها يتم يدوياً لكل طلب، يتم وزن القطعة النهائية بدقة بعد التجهيز وإبلاغ العميل بالوزن الفعلي النهائي لتأكيده قبل تحصيل أي مبلغ.',
    aEn: 'Online orders display the estimated weight and price. Because cuts are hand-trimmed to order, the final confirmed weight is measured after preparation and shared with you for approval—we never charge unapproved amounts.',
  },
  {
    qAr: 'ما الفرق بين قطعيات الستيك (الريب آي، الستريب لوين، والتندرلوين)؟',
    qEn: 'What is the difference between Ribeye, Striploin, and Tenderloin?',
    aAr: 'الريب آي هو الأغنى بالتعريق الدهني والعصارة والنكهة، الستريب لوين يجمع بين القوام المتماسك والنكهة البقرية الواضحة مع شريط دهني جانبي، أما التندرلوين (الفيليه) فهو القطعية الأطرى والأقل دهوناً على الإطلاق. يمكنك تصفح "دليل قطعيات اللحوم" في موقعنا لمقارنة تفصيلية.',
    aEn: 'Ribeye offers the richest marbling and juiciest flavor; Striploin balances firm texture with bold beefy flavor; Tenderloin (Filet) is the leanest and most fork-tender cut. Visit our Meat Cuts Guide for anatomical diagrams and cooking tips.',
  },
  {
    qAr: 'هل تتوفر خدمة الشواية والسندوتشات الجاهزة للأكل؟',
    qEn: 'Do you offer ready-to-eat grilled dishes and sandwiches?',
    aAr: 'نعم، يضم BEEF HOUSE ركناً مخصصاً للشواية والسندوتشات يقدم سندوتشات الريب آي في خبز التشاباتا وأسياخ التندرلوين المشوية طازجة حسب درجة النضج التي تختارها.',
    aEn: 'Yes, our Grill & Sandwich Corner prepares freshly seared Ribeye Ciabatta Sandwiches and char-grilled Tenderloin Skewers cooked to your preferred doneness.',
  },
  {
    qAr: 'ما هي خيارات التوصيل والاستلام وطرق الدفع المتاحة؟',
    qEn: 'What delivery, pickup, and payment options are available?',
    aAr: 'يتوفر التوصيل المبرد داخل مدينة الرياض (برسوم 25 ريال، ومجاناً للطلبات فوق 350 ريال) أو الاستلام المباشر من الفرع. الدفع متاح حالياً عند الاستلام (نقداً أو عبر جهاز مدى) أو عند الاستلام من الفرع.',
    aEn: 'We offer chilled cold-chain delivery across Riyadh (25 SAR fee, free over 350 SAR) as well as In-Store Pickup. Payment is supported via Cash or Mada POS on delivery/pickup.',
  },
];
