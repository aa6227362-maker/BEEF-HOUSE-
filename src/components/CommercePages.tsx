import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Check,
  AlertCircle,
  Truck,
  Store,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  BookOpen,
  ChefHat,
  Info,
} from 'lucide-react';
import {
  Language,
  PageId,
  ProductItem,
  PRODUCT_CATEGORIES,
  PRODUCTS_DATA,
  MEAT_CUTS_GUIDE,
  RECIPES_DATA,
  BRAND_TOKENS,
} from '../config/siteConfig';
import { Breadcrumbs, ProductCard, CartLineItem } from './LayoutComponents';

interface CatalogPageProps {
  lang: Language;
  initialCategory?: string;
  initialSearch?: string;
  onNavigate: (page: PageId, slug?: string) => void;
  onAddToCart: (
    product: ProductItem,
    weightId: string,
    prepId: string,
    qty: number,
    note?: string
  ) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  lang,
  initialCategory = 'all',
  initialSearch = '',
  onNavigate,
  onAddToCart,
}) => {
  const [cat, setCat] = useState<string>(initialCategory);
  const [search, setSearch] = useState<string>(initialSearch);
  const [weightTypeFilter, setWeightTypeFilter] = useState<'all' | 'weight' | 'ready'>('all');

  const filtered = PRODUCTS_DATA.filter((p) => {
    const matchCat = cat === 'all' || p.categoryId === cat;
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      p.nameAr.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.shortDescAr.toLowerCase().includes(q) ||
      p.shortDescEn.toLowerCase().includes(q);
    const matchType =
      weightTypeFilter === 'all' ||
      (weightTypeFilter === 'weight' && p.isWeightBased) ||
      (weightTypeFilter === 'ready' && !p.isWeightBased);
    return matchCat && matchSearch && matchType;
  });

  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[{ labelAr: 'المتجر الإلكتروني وكتالوج اللحوم', labelEn: 'Online Store & Catalog' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E0D5CD]/15">
          <div>
            <span className="bh-eyebrow">
              {lang === 'ar' ? 'المتجر الإلكتروني — الرياض' : 'Online Butcher Store — Riyadh'}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] mt-2">
              {lang === 'ar'
                ? 'اختر قطعيتك، سماكتك، وطريقة التجهيز'
                : 'Select Your Cut, Thickness & Butcher Preparation'}
            </h1>
          </div>
          <p className="text-sm text-[#9E938B] max-w-md">
            {lang === 'ar'
              ? 'جميع اللحوم تجهز طازجة عند الطلب. الأسعار المعروضة أدناه هي أسعار استرشادية للكتالوج وتُعتمد نهائياً حسب الوزن الفعلي بعد التقطيع.'
              : 'All cuts are freshly prepared to order. Catalog prices shown below are illustrative and finalized upon confirmed post-trimming weight.'}
          </p>
        </div>

        {/* Sticky Filter & Search Bar (Reference-inspired .menu-bar) */}
        <div className="sticky top-28 z-30 bg-black/95 backdrop-blur-md py-4 border-b border-[#E0D5CD]/15 my-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              <button
                type="button"
                onClick={() => setCat('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  cat === 'all'
                    ? 'bg-[#A20000] text-[#E0D5CD]'
                    : 'bg-[#080808] text-[#9E938B] border border-[#E0D5CD]/15 hover:text-[#E0D5CD]'
                }`}
              >
                {lang === 'ar' ? 'جميع الأقسام' : 'All Categories'}
              </button>
              {PRODUCT_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCat(c.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    cat === c.id
                      ? 'bg-[#A20000] text-[#E0D5CD]'
                      : 'bg-[#080808] text-[#9E938B] border border-[#E0D5CD]/15 hover:text-[#E0D5CD]'
                  }`}
                >
                  {lang === 'ar' ? c.nameAr : c.nameEn}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-[#9E938B] absolute top-1/2 -translate-y-1/2 start-3.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  lang === 'ar'
                    ? 'ابحث عن ريب آي، توماهوك، برجر، موزة...'
                    : 'Search ribeye, tomahawk, burger, shank...'
                }
                className="w-full h-10 ps-10 pe-4 rounded-full bg-[#080808] border border-[#E0D5CD]/20 text-xs text-[#E0D5CD] placeholder:text-[#9E938B] focus:outline-none focus:border-[#A20000]"
              />
            </div>
          </div>

          {/* Secondary Filter Controls */}
          <div className="flex items-center justify-between flex-wrap gap-3 mt-3 pt-3 border-t border-[#E0D5CD]/10 text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setWeightTypeFilter('all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  weightTypeFilter === 'all'
                    ? 'bg-[#E0D5CD] text-black font-bold'
                    : 'text-[#9E938B] hover:text-[#E0D5CD]'
                }`}
              >
                {lang === 'ar' ? 'الكل' : 'All Items'}
              </button>
              <button
                type="button"
                onClick={() => setWeightTypeFilter('weight')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  weightTypeFilter === 'weight'
                    ? 'bg-[#E0D5CD] text-black font-bold'
                    : 'text-[#9E938B] hover:text-[#E0D5CD]'
                }`}
              >
                {lang === 'ar' ? 'لحوم طازجة بالوزن' : 'Cut-to-Order by Weight'}
              </button>
              <button
                type="button"
                onClick={() => setWeightTypeFilter('ready')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  weightTypeFilter === 'ready'
                    ? 'bg-[#E0D5CD] text-black font-bold'
                    : 'text-[#9E938B] hover:text-[#E0D5CD]'
                }`}
              >
                {lang === 'ar' ? 'وجبات الشواية وبوكسات جاهزة' : 'Ready Grill & Fixed Boxes'}
              </button>
            </div>

            <span className="text-[#9E938B] font-mono-num">
              {filtered.length} {lang === 'ar' ? 'منتج متاح' : 'products available'}
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl">
            <p className="text-base text-[#E0D5CD] font-semibold">
              {lang === 'ar'
                ? 'لا توجد منتجات مطابقة لبحثك حالياً.'
                : 'No products match your current filter.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setCat('all');
                setSearch('');
                setWeightTypeFilter('all');
              }}
              className="mt-4 px-5 py-2.5 rounded-full bg-[#A20000] text-xs font-bold text-[#E0D5CD]"
            >
              {lang === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                onAddToCart={onAddToCart}
                onOpenDetail={(slug) => onNavigate('product-detail', slug)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const CategoriesPage: React.FC<{
  lang: Language;
  onNavigate: (page: PageId, slug?: string) => void;
  onSelectCategoryInCatalog: (catId: string) => void;
}> = ({ lang, onNavigate, onSelectCategoryInCatalog }) => {
  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[{ labelAr: 'أقسام ومنتجات اللحوم', labelEn: 'Meat Categories' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-4">
        <div className="mb-12">
          <span className="bh-eyebrow">
            {lang === 'ar' ? 'تشكيلة BEEF HOUSE المتكاملة' : 'Complete Butchery Taxonomy'}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] mt-2">
            {lang === 'ar'
              ? 'أقسام اللحوم، التجهيزات، والشواية'
              : 'Meat Cuts, Preparations & Grill Corner Categories'}
          </h1>
          <p className="text-sm text-[#9E938B] max-w-2xl mt-3">
            {lang === 'ar'
              ? 'صممنا أقسام BEEF HOUSE لتلبي كل مناسبة وطريقة طهي: من قطعيات الستيك الفاخرة وأضلاع الشواء على الفحم إلى قطعيات الطبخ السعودي اليومي وركن الشواية الساخن.'
              : 'Explore our eight specialized butcher and culinary departments tailored to every cooking method.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {PRODUCT_CATEGORIES.map((c, idx) => {
            const count = PRODUCTS_DATA.filter((p) => p.categoryId === c.id).length;
            return (
              <div
                key={c.id}
                onClick={() => onSelectCategoryInCatalog(c.id)}
                className="group cursor-pointer bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-12 hover:border-[#A20000] transition-colors"
              >
                <div className="sm:col-span-5 aspect-[4/3] sm:aspect-auto bg-black overflow-hidden">
                  <img
                    src={c.image}
                    alt={lang === 'ar' ? c.nameAr : c.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-[#9E938B] font-mono-num">
                      0{idx + 1} · {count} {lang === 'ar' ? 'منتجات رئيسية' : 'Signature Items'}
                    </div>
                    <h2 className="font-display text-2xl font-bold text-[#E0D5CD] mt-1 group-hover:text-[#E6061E] transition-colors">
                      {lang === 'ar' ? c.nameAr : c.nameEn}
                    </h2>
                    <p className="text-xs text-[#9E938B] mt-2 leading-relaxed">
                      {lang === 'ar' ? c.descAr : c.descEn}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#E0D5CD]/10 flex items-center justify-between text-xs font-bold text-[#E0D5CD]">
                    <span>
                      {lang === 'ar' ? 'تصفح منتجات القسم' : 'Browse Category Products'}
                    </span>
                    {lang === 'ar' ? (
                      <ArrowLeft className="w-4 h-4 text-[#A20000]" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#A20000]" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ProductDetailPage: React.FC<{
  lang: Language;
  slug: string;
  onNavigate: (page: PageId, slug?: string) => void;
  onAddToCart: (
    product: ProductItem,
    weightId: string,
    prepId: string,
    qty: number,
    note?: string
  ) => void;
}> = ({ lang, slug, onNavigate, onAddToCart }) => {
  const product =
    PRODUCTS_DATA.find((p) => p.slug === slug || p.id === slug) || PRODUCTS_DATA[0];

  const [activeImage, setActiveImage] = useState(product.image);
  const [weightId, setWeightId] = useState(product.weights[0]?.id || '');
  const [prepId, setPrepId] = useState(product.prepOptions[0]?.id || '');
  const [qty, setQty] = useState(1);
  const [cuttingNote, setCuttingNote] = useState('');
  const [addedConfirm, setAddedConfirm] = useState(false);

  const selectedWeight =
    product.weights.find((w) => w.id === weightId) || product.weights[0];
  const selectedPrep =
    product.prepOptions.find((p) => p.id === prepId) || product.prepOptions[0];

  const unitPrice = Math.round(
    product.basePriceSar * selectedWeight.priceMultiplier + selectedPrep.extraPrice
  );
  const totalEstimatedPrice = unitPrice * qty;

  const relatedCut = MEAT_CUTS_GUIDE.find((c) => c.id === product.relatedCutId);
  const relatedRecipes = RECIPES_DATA.filter((r) => product.relatedRecipeIds.includes(r.id));

  const handleAdd = () => {
    onAddToCart(product, selectedWeight.id, selectedPrep.id, qty, cuttingNote);
    setAddedConfirm(true);
    setTimeout(() => setAddedConfirm(false), 1800);
  };

  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[
          { labelAr: 'المتجر الإلكتروني', labelEn: 'Online Store', page: 'catalog' },
          { labelAr: product.nameAr, labelEn: product.nameEn },
        ]}
        onNavigate={onNavigate}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-4">
        {/* Contiguous Purchase Module (Sticky Gallery Left + Sticky Purchase Module Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#080808] border border-[#E0D5CD]/15">
              <img
                src={activeImage || product.image}
                alt={lang === 'ar' ? product.nameAr : product.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            {product.gallery.length > 1 && (
              <div className="flex gap-3">
                {product.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                      (activeImage || product.image) === imgUrl
                        ? 'border-[#A20000]'
                        : 'border-[#E0D5CD]/15 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Contiguous Purchase Module Column */}
          <div className="lg:col-span-6 bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#9E938B]">
                <span>
                  {product.inStock
                    ? lang === 'ar'
                      ? 'متوفر للتجهيز الطازج'
                      : 'In Stock — Prepared Fresh'
                    : lang === 'ar'
                    ? 'غير متوفر حالياً'
                    : 'Out of Stock'}
                </span>
                <span>·</span>
                <span className="font-mono-num">
                  {product.basePriceSar}{' '}
                  {lang === 'ar' ? product.pricingUnitLabelAr : product.pricingUnitLabelEn}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#E0D5CD] mt-2">
                {lang === 'ar' ? product.nameAr : product.nameEn}
              </h1>
              <p className="text-sm text-[#9E938B] mt-3 leading-relaxed">
                {lang === 'ar' ? product.fullDescAr : product.fullDescEn}
              </p>
            </div>

            {/* Weight Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#E0D5CD]">
                {lang === 'ar' ? '1. اختر الوزن التقديري أو حجم الباقة:' : '1. Select Weight or Package:'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {product.weights.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWeightId(w.id)}
                    className={`p-3 rounded-xl text-start border transition-colors ${
                      weightId === w.id
                        ? 'bg-[#A20000]/25 border-[#A20000] text-[#E0D5CD]'
                        : 'bg-black border-[#E0D5CD]/15 text-[#9E938B] hover:text-[#E0D5CD]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#E0D5CD]">
                      {lang === 'ar' ? w.labelAr : w.labelEn}
                    </div>
                    <div className="font-mono-num text-xs text-[#9E938B] mt-1">
                      ~{Math.round(product.basePriceSar * w.priceMultiplier)}{' '}
                      {lang === 'ar' ? 'ر.س' : 'SAR'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preparation Options */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#E0D5CD]">
                {lang === 'ar'
                  ? '2. اختر طريقة التقطيع والتجهيز:'
                  : '2. Select Butcher Preparation Option:'}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {product.prepOptions.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPrepId(p.id)}
                    className={`px-4 py-3 rounded-xl text-start border text-xs font-semibold flex items-center justify-between transition-colors ${
                      prepId === p.id
                        ? 'bg-[#A20000]/25 border-[#A20000] text-[#E0D5CD]'
                        : 'bg-black border-[#E0D5CD]/15 text-[#9E938B] hover:text-[#E0D5CD]'
                    }`}
                  >
                    <span>{lang === 'ar' ? p.labelAr : p.labelEn}</span>
                    {prepId === p.id && <Check className="w-4 h-4 text-[#E6061E]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Butcher Cutting Instructions */}
            <div>
              <label className="block text-xs font-bold text-[#E0D5CD] mb-1.5">
                {lang === 'ar'
                  ? '3. تعليمات خاصة للجزار (اختياري):'
                  : '3. Special Cutting Instructions for the Butcher (Optional):'}
              </label>
              <input
                type="text"
                value={cuttingNote}
                onChange={(e) => setCuttingNote(e.target.value)}
                placeholder={
                  lang === 'ar'
                    ? 'مثال: يرجى وضع كل قطعة في كيس منفصل، أو الإبقاء على الدهن الجانبي...'
                    : 'e.g., Pack each steak individually, keep outer fat cap intact...'
                }
                className="w-full h-11 px-4 rounded-xl bg-black border border-[#E0D5CD]/20 text-xs text-[#E0D5CD] placeholder:text-[#9E938B] focus:outline-none focus:border-[#A20000]"
              />
            </div>

            {/* Weight-Based Pricing Explanation Box (Mandatory Section 13) */}
            {product.isWeightBased && (
              <div className="p-4 rounded-xl bg-black border border-[#A20000]/50 flex items-start gap-3">
                <Info className="w-5 h-5 text-[#E6061E] shrink-0 mt-0.5" />
                <div className="text-xs text-[#9E938B] leading-relaxed">
                  <strong className="text-[#E0D5CD] block mb-0.5">
                    {lang === 'ar'
                      ? 'الفرق بين الوزن التقديري والوزن الفعلي المؤكد:'
                      : 'Estimated Weight vs. Final Confirmed Weight:'}
                  </strong>
                  {lang === 'ar'
                    ? 'هذا المنتج يُقطع يدوياً حسب طلبك. السعر الظاهر هنا يعتمد على الوزن التقديري (~' +
                      (selectedWeight.weightKg * qty).toFixed(2) +
                      ' كجم). بعد التقطيع والتجهيز في الفرع، يتم قياس الوزن الفعلي النهائي بدقة وإبلاغك به لتأكيده قبل تحصيل أي مبلغ.'
                    : `This cut is hand-trimmed to order. The price shown reflects an estimated weight (~${(
                        selectedWeight.weightKg * qty
                      ).toFixed(
                        2
                      )} kg). Once trimmed, our butcher weighs the final cut and confirms the exact total with you prior to payment.`}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart CTA */}
            <div className="pt-4 border-t border-[#E0D5CD]/15 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="block text-xs text-[#9E938B]">
                  {lang === 'ar' ? 'الإجمالي التقديري:' : 'Estimated Total:'}
                </span>
                <div className="font-mono-num text-3xl font-bold text-[#E0D5CD]">
                  {totalEstimatedPrice}{' '}
                  <span className="text-sm font-normal">{lang === 'ar' ? 'ر.س' : 'SAR'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-12 px-3 rounded-full bg-black border border-[#E0D5CD]/25 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 flex items-center justify-center text-[#E0D5CD]"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono-num text-sm font-bold w-6 text-center">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    className="w-7 h-7 flex items-center justify-center text-[#E0D5CD]"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`h-12 px-7 rounded-full font-bold text-sm flex items-center gap-2 transition-colors whitespace-nowrap ${
                    addedConfirm
                      ? 'bg-[#25D366] text-black'
                      : 'bg-[#A20000] text-[#E0D5CD] hover:bg-[#E6061E]'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {addedConfirm
                      ? lang === 'ar'
                        ? 'تمت الإضافة للسلة'
                        : 'Added to Cart'
                      : lang === 'ar'
                      ? 'أضف إلى السلة'
                      : 'Add to Cart'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Educational Cut Guide & Recipes Links */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedCut && (
            <div className="p-6 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs text-[#A20000] font-bold flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {lang === 'ar' ? 'من دليل قطعيات اللحوم' : 'From the Meat Cuts Guide'}
                </span>
                <h3 className="font-display text-xl font-bold text-[#E0D5CD]">
                  {lang === 'ar' ? relatedCut.nameAr : relatedCut.nameEn}
                </h3>
                <p className="text-xs text-[#9E938B]">{relatedCut.cookingGuidanceAr}</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('cut-detail', relatedCut.slug)}
                className="px-4 py-2.5 rounded-full border border-[#E0D5CD]/25 text-xs font-bold text-[#E0D5CD] hover:border-[#A20000] shrink-0"
              >
                {lang === 'ar' ? 'اقرأ دليل القطعية' : 'View Cut Guide'}
              </button>
            </div>
          )}

          {relatedRecipes[0] && (
            <div className="p-6 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs text-[#A20000] font-bold flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4" />
                  {lang === 'ar' ? 'وصفة مقترحة لهذه القطعية' : 'Recommended Recipe'}
                </span>
                <h3 className="font-display text-xl font-bold text-[#E0D5CD]">
                  {lang === 'ar' ? relatedRecipes[0].titleAr : relatedRecipes[0].titleEn}
                </h3>
                <p className="text-xs text-[#9E938B]">
                  {lang === 'ar' ? relatedRecipes[0].subtitleAr : relatedRecipes[0].subtitleEn}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('recipe-detail', relatedRecipes[0].slug)}
                className="px-4 py-2.5 rounded-full border border-[#E0D5CD]/25 text-xs font-bold text-[#E0D5CD] hover:border-[#A20000] shrink-0"
              >
                {lang === 'ar' ? 'طريقة التحضير' : 'View Recipe'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const CartAndCheckoutView: React.FC<{
  mode: 'cart' | 'checkout';
  lang: Language;
  cart: CartLineItem[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onNavigate: (page: PageId, slug?: string) => void;
  onOrderConfirmed: (orderData: any) => void;
}> = ({ mode, lang, cart, onUpdateQty, onRemove, onNavigate, onOrderConfirmed }) => {
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoMsg, setPromoMsg] = useState<string | null>(null);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'pickup_pos'>('cod');
  const [acceptedWeightPolicy, setAcceptedWeightPolicy] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => {
    const w =
      item.product.weights.find((x) => x.id === item.weightId) || item.product.weights[0];
    const p =
      item.product.prepOptions.find((x) => x.id === item.prepId) ||
      item.product.prepOptions[0];
    return sum + Math.round(item.product.basePriceSar * w.priceMultiplier + p.extraPrice) * item.quantity;
  }, 0);

  const hasWeightBasedItems = cart.some((i) => i.product.isWeightBased);
  const discountSar = appliedPromo === 'BEEF10' ? Math.round(subtotal * 0.1) : 0;
  const afterDiscount = Math.max(0, subtotal - discountSar);
  const deliveryFeeSar =
    fulfillmentType === 'pickup' ||
    afterDiscount >= BRAND_TOKENS.delivery.freeDeliveryThresholdSar ||
    appliedPromo === 'RIYADH'
      ? 0
      : BRAND_TOKENS.delivery.standardFeeSar;
  const grandTotal = afterDiscount + deliveryFeeSar;

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'BEEF10') {
      setAppliedPromo('BEEF10');
      setPromoMsg(lang === 'ar' ? 'تم تطبيق خصم 10% (BEEF10)' : '10% discount applied (BEEF10)');
    } else if (code === 'RIYADH') {
      setAppliedPromo('RIYADH');
      setPromoMsg(
        lang === 'ar' ? 'تم تطبيق التوصيل المجاني داخل الرياض' : 'Free Riyadh delivery applied'
      );
    } else {
      setAppliedPromo(null);
      setPromoMsg(
        lang === 'ar'
          ? 'كود غير صالح. يمكنك تجربة BEEF10 أو RIYADH'
          : 'Invalid code. Try BEEF10 or RIYADH'
      );
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);

    try {
      const payload = {
        lang,
        fulfillmentType,
        paymentMethod: fulfillmentType === 'pickup' ? 'pickup_pos' : paymentMethod,
        discountCode: appliedPromo,
        acceptedWeightPolicy,
        customer: {
          fullName,
          phone,
          district,
          streetAddress,
          notes,
        },
        items: cart.map((c) => ({
          productId: c.product.id,
          weightId: c.weightId,
          prepId: c.prepId,
          quantity: c.quantity,
          customCuttingNote: c.customCuttingNote,
        })),
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.ok || !data.order) {
        setSubmitError(
          data.error ||
            (lang === 'ar'
              ? 'تعذر إتمام الطلب، يرجى التحقق من البيانات المدخلة.'
              : 'Could not complete order. Please verify your details.')
        );
        return;
      }

      onOrderConfirmed(data.order);
    } catch {
      setSubmitError(
        lang === 'ar'
          ? 'حدث خطأ في الاتصال بالخادم. لم يتم إرسال الطلب.'
          : 'Server connection error. Order was not submitted.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[
          { labelAr: 'المتجر الإلكتروني', labelEn: 'Online Store', page: 'catalog' },
          {
            labelAr: mode === 'cart' ? 'سلة التسوق' : 'إتمام الطلب والدفع',
            labelEn: mode === 'cart' ? 'Shopping Cart' : 'Checkout',
          },
        ]}
        onNavigate={onNavigate}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-4">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-[#E0D5CD]/15">
          <div>
            <span className="bh-eyebrow">
              {mode === 'cart'
                ? lang === 'ar'
                  ? 'مراجعة الطلبات والأوزان'
                  : 'Review Cuts & Weights'
                : lang === 'ar'
                ? 'تأكيد بيانات التوصيل والاستلام'
                : 'Confirm Delivery & Fulfillment'}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] mt-2">
              {mode === 'cart'
                ? lang === 'ar'
                  ? 'سلة تسوق BEEF HOUSE'
                  : 'Your Shopping Cart'
                : lang === 'ar'
                ? 'إتمام الطلب'
                : 'Checkout & Order Confirmation'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('cart')}
              className={`px-4 py-2 rounded-full text-xs font-bold ${
                mode === 'cart'
                  ? 'bg-[#A20000] text-[#E0D5CD]'
                  : 'bg-[#080808] text-[#9E938B] border border-[#E0D5CD]/15'
              }`}
            >
              1. {lang === 'ar' ? 'السلة' : 'Cart'}
            </button>
            <button
              type="button"
              disabled={cart.length === 0}
              onClick={() => onNavigate('checkout')}
              className={`px-4 py-2 rounded-full text-xs font-bold ${
                mode === 'checkout'
                  ? 'bg-[#A20000] text-[#E0D5CD]'
                  : 'bg-[#080808] text-[#9E938B] border border-[#E0D5CD]/15'
              }`}
            >
              2. {lang === 'ar' ? 'إتمام الطلب' : 'Checkout'}
            </button>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="my-12 p-12 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 text-center space-y-4">
            <ShoppingBag className="w-12 h-12 text-[#9E938B] mx-auto" />
            <h2 className="font-display text-2xl font-bold">
              {lang === 'ar' ? 'سلة التسوق فارغة' : 'Your Shopping Cart is Empty'}
            </h2>
            <p className="text-xs text-[#9E938B] max-w-md mx-auto">
              {lang === 'ar'
                ? 'تصفح متجر اللحوم أو ركن الشواية والسندوتشات لإضافة منتجاتك المفضلة.'
                : 'Browse our meat catalog or Grill Corner menu to add items to your order.'}
            </p>
            <button
              type="button"
              onClick={() => onNavigate('catalog')}
              className="px-6 py-3 rounded-full bg-[#A20000] text-xs font-bold text-[#E0D5CD]"
            >
              {lang === 'ar' ? 'تصفح المتجر الإلكتروني' : 'Browse Online Store'}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Items or Checkout Form */}
            <div className="lg:col-span-7 space-y-6">
              {mode === 'cart' ? (
                <div className="space-y-4">
                  {cart.map((item) => {
                    const w =
                      item.product.weights.find((x) => x.id === item.weightId) ||
                      item.product.weights[0];
                    const p =
                      item.product.prepOptions.find((x) => x.id === item.prepId) ||
                      item.product.prepOptions[0];
                    const unitPrice = Math.round(
                      item.product.basePriceSar * w.priceMultiplier + p.extraPrice
                    );
                    return (
                      <div
                        key={item.key}
                        className="p-5 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product.image}
                            alt={lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                            referrerPolicy="no-referrer"
                            className="w-24 h-24 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <h3 className="font-display text-lg font-bold text-[#E0D5CD]">
                              {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                            </h3>
                            <p className="text-xs text-[#9E938B] mt-1">
                              {lang === 'ar' ? w.labelAr : w.labelEn} ·{' '}
                              {lang === 'ar' ? p.labelAr : p.labelEn}
                            </p>
                            {item.product.isWeightBased && (
                              <span className="inline-block text-[11px] text-[#E6061E] mt-1">
                                {lang === 'ar'
                                  ? `وزن تقديري: ~${(w.weightKg * item.quantity).toFixed(2)} كجم (يؤكد بعد التقطيع)`
                                  : `Estimated weight: ~${(w.weightKg * item.quantity).toFixed(2)} kg`}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 self-end sm:self-center">
                          <div className="inline-flex items-center gap-2 bg-black border border-[#E0D5CD]/20 rounded-full px-3 py-1">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.key, -1)}
                              className="w-6 h-6 flex items-center justify-center"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-mono-num text-xs font-bold px-2">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(item.key, 1)}
                              className="w-6 h-6 flex items-center justify-center"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="font-mono-num text-base font-bold text-[#E0D5CD] min-w-[80px] text-end">
                            {unitPrice * item.quantity} {lang === 'ar' ? 'ر.س' : 'SAR'}
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemove(item.key)}
                            className="p-2 text-[#9E938B] hover:text-[#E6061E]"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-6">
                  {/* Fulfillment Selector */}
                  <div className="p-6 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 space-y-4">
                    <h3 className="font-display text-xl font-bold text-[#E0D5CD]">
                      {lang === 'ar' ? '1. طريقة استلام الطلب' : '1. Fulfillment Method'}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFulfillmentType('delivery')}
                        className={`p-4 rounded-xl border text-start flex items-start gap-3 transition-colors ${
                          fulfillmentType === 'delivery'
                            ? 'bg-[#A20000]/25 border-[#A20000] text-[#E0D5CD]'
                            : 'bg-black border-[#E0D5CD]/15 text-[#9E938B]'
                        }`}
                      >
                        <Truck className="w-5 h-5 text-[#A20000] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-[#E0D5CD]">
                            {lang === 'ar' ? 'توصيل مبرد (الرياض)' : 'Chilled Delivery (Riyadh)'}
                          </div>
                          <div className="text-xs text-[#9E938B] mt-0.5">
                            {lang === 'ar'
                              ? '25 ر.س (مجاني للطلبات فوق 350 ر.س)'
                              : '25 SAR (Free over 350 SAR)'}
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFulfillmentType('pickup')}
                        className={`p-4 rounded-xl border text-start flex items-start gap-3 transition-colors ${
                          fulfillmentType === 'pickup'
                            ? 'bg-[#A20000]/25 border-[#A20000] text-[#E0D5CD]'
                            : 'bg-black border-[#E0D5CD]/15 text-[#9E938B]'
                        }`}
                      >
                        <Store className="w-5 h-5 text-[#A20000] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-[#E0D5CD]">
                            {lang === 'ar' ? 'استلام من فرع BEEF HOUSE' : 'In-Store Pickup'}
                          </div>
                          <div className="text-xs text-[#9E938B] mt-0.5">
                            {lang === 'ar'
                              ? 'مجاناً — يومياً 9:00 ص إلى 12:00 منتصف الليل'
                              : 'Free — Daily 9:00 AM to 12:00 Midnight'}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Customer & Address Details */}
                  <div className="p-6 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 space-y-4">
                    <h3 className="font-display text-xl font-bold text-[#E0D5CD]">
                      {lang === 'ar' ? '2. بيانات العميل والتوصيل' : '2. Customer & Address Details'}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#E0D5CD] mb-1.5">
                          {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={lang === 'ar' ? 'الاسم الثلاثي' : 'Your full name'}
                          className="w-full h-11 px-3.5 rounded-xl bg-black border border-[#E0D5CD]/20 text-sm text-[#E0D5CD]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#E0D5CD] mb-1.5">
                          {lang === 'ar'
                            ? 'رقم الجوال السعودي (لتأكيد الوزن النهائي) *'
                            : 'Mobile Number (for weight confirmation) *'}
                        </label>
                        <input
                          type="tel"
                          dir="ltr"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="05XXXXXXXX"
                          className="w-full h-11 px-3.5 rounded-xl bg-black border border-[#E0D5CD]/20 text-sm text-[#E0D5CD]"
                        />
                      </div>
                    </div>

                    {fulfillmentType === 'delivery' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#E0D5CD] mb-1.5">
                            {lang === 'ar' ? 'الحي في الرياض *' : 'Riyadh District *'}
                          </label>
                          <input
                            type="text"
                            required
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            placeholder={
                              lang === 'ar' ? 'مثال: حي الملقا، النخيل، حطين...' : 'e.g., Al Malqa, Al Nakheel...'
                            }
                            className="w-full h-11 px-3.5 rounded-xl bg-black border border-[#E0D5CD]/20 text-sm text-[#E0D5CD]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#E0D5CD] mb-1.5">
                            {lang === 'ar' ? 'الشارع ورقم المبنى / المعلم *' : 'Street & Building *'}
                          </label>
                          <input
                            type="text"
                            required
                            value={streetAddress}
                            onChange={(e) => setStreetAddress(e.target.value)}
                            placeholder={lang === 'ar' ? 'اسم الشارع ورقم الفيلا/المبنى' : 'Street & building number'}
                            className="w-full h-11 px-3.5 rounded-xl bg-black border border-[#E0D5CD]/20 text-sm text-[#E0D5CD]"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-[#E0D5CD] mb-1.5">
                        {lang === 'ar'
                          ? 'ملاحظات إضافية للطلب أو التقطيع (اختياري)'
                          : 'Order or Butcher Notes (Optional)'}
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={
                          lang === 'ar'
                            ? 'أي تعليمات إضافية للتجهيز أو وقت التوصيل المفضل...'
                            : 'Any additional instructions for preparation or delivery...'
                        }
                        className="w-full p-3.5 rounded-xl bg-black border border-[#E0D5CD]/20 text-sm text-[#E0D5CD]"
                      />
                    </div>
                  </div>

                  {/* Genuine Payment Structure & Transparency (Section 13) */}
                  <div className="p-6 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 space-y-4">
                    <h3 className="font-display text-xl font-bold text-[#E0D5CD]">
                      {lang === 'ar' ? '3. طريقة الدفع المعتمدة' : '3. Payment Method'}
                    </h3>

                    <div className="grid grid-cols-1 gap-3">
                      <label className="p-4 rounded-xl bg-black border border-[#A20000] flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={true}
                          onChange={() => setPaymentMethod('cod')}
                          className="mt-1 accent-[#A20000]"
                        />
                        <div className="text-xs">
                          <strong className="text-sm text-[#E0D5CD] block">
                            {fulfillmentType === 'delivery'
                              ? lang === 'ar'
                                ? 'الدفع عند الاستلام (نقداً أو عبر جهاز نقاط البيع مدى بعد تأكيد الوزن النهائي)'
                                : 'Pay on Delivery (Cash or Mada POS terminal after final weight confirmation)'
                              : lang === 'ar'
                              ? 'الدفع في فرع BEEF HOUSE عند الاستلام (نقداً أو شبكة مدى / Apple Pay)'
                              : 'Pay In-Store upon Pickup (Cash, Mada POS, or Apple Pay)'}
                          </strong>
                          <span className="text-[#9E938B] block mt-1">
                            {lang === 'ar'
                              ? 'لا يتم تحصيل أي مبالغ غير معتمدة مسبقاً قبل وزن القطعيات النهائية.'
                              : 'No unapproved amounts are charged prior to weighing your trimmed cuts.'}
                          </span>
                        </div>
                      </label>

                      <div className="p-4 rounded-xl bg-black/60 border border-[#E0D5CD]/10 text-xs text-[#9E938B] flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-[#A20000] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-[#E0D5CD] block">
                            {lang === 'ar'
                              ? 'حالة بوابة الدفع الإلكتروني المباشر (Moyasar / Tap / HyperPay):'
                              : 'Online Payment Gateway Integration Status:'}
                          </strong>
                          {lang === 'ar'
                            ? BRAND_TOKENS.paymentGateway.setupRequirementNoteAr
                            : BRAND_TOKENS.paymentGateway.setupRequirementNoteEn}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Order Summary & Server Validation */}
            <div className="lg:col-span-5 bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl p-6 space-y-5 sticky top-32">
              <h3 className="font-display text-2xl font-bold text-[#E0D5CD]">
                {lang === 'ar' ? 'ملخص الطلب والتسعير' : 'Order & Weight Summary'}
              </h3>

              {/* Discount Code Input */}
              <div className="space-y-2">
                <label className="block text-xs text-[#9E938B]">
                  {lang === 'ar'
                    ? 'كود الخصم (جرّب BEEF10 لخصم 10% أو RIYADH للتوصيل المجاني):'
                    : 'Promo Code (Try BEEF10 for 10% off or RIYADH for free delivery):'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    dir="ltr"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="BEEF10"
                    className="flex-1 h-10 px-3.5 rounded-xl bg-black border border-[#E0D5CD]/20 text-xs text-[#E0D5CD] uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 h-10 rounded-xl bg-black border border-[#E0D5CD]/30 text-xs font-bold text-[#E0D5CD] hover:border-[#A20000]"
                  >
                    {lang === 'ar' ? 'تطبيق' : 'Apply'}
                  </button>
                </div>
                {promoMsg && <p className="text-xs text-[#25D366]">{promoMsg}</p>}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-[#E0D5CD]/15 text-xs">
                <div className="flex justify-between text-[#9E938B]">
                  <span>{lang === 'ar' ? 'المجموع التقديري للمنتجات:' : 'Estimated Items Subtotal:'}</span>
                  <span className="font-mono-num text-[#E0D5CD] font-semibold">
                    {subtotal} {lang === 'ar' ? 'ر.س' : 'SAR'}
                  </span>
                </div>
                {discountSar > 0 && (
                  <div className="flex justify-between text-[#25D366]">
                    <span>{lang === 'ar' ? `الخصم (${appliedPromo}):` : `Discount (${appliedPromo}):`}</span>
                    <span className="font-mono-num">
                      -{discountSar} {lang === 'ar' ? 'ر.س' : 'SAR'}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-[#9E938B]">
                  <span>{lang === 'ar' ? 'رسوم التوصيل المبرد:' : 'Cold-Chain Delivery Fee:'}</span>
                  <span className="font-mono-num text-[#E0D5CD] font-semibold">
                    {deliveryFeeSar === 0
                      ? lang === 'ar'
                        ? 'مجاني'
                        : 'Free'
                      : `${deliveryFeeSar} ${lang === 'ar' ? 'ر.س' : 'SAR'}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#E0D5CD]/15 flex justify-between items-baseline text-base font-bold text-[#E0D5CD]">
                  <span>{lang === 'ar' ? 'الإجمالي التقديري للطلب:' : 'Estimated Grand Total:'}</span>
                  <span className="font-mono-num text-2xl text-[#E0D5CD]">
                    {grandTotal} {lang === 'ar' ? 'ر.س' : 'SAR'}
                  </span>
                </div>
              </div>

              {/* Weight Policy Checkbox */}
              {hasWeightBasedItems && (
                <label className="p-3.5 rounded-xl bg-black border border-[#E0D5CD]/15 flex items-start gap-2.5 cursor-pointer text-xs text-[#9E938B]">
                  <input
                    type="checkbox"
                    checked={acceptedWeightPolicy}
                    onChange={(e) => setAcceptedWeightPolicy(e.target.checked)}
                    className="mt-1 accent-[#A20000]"
                  />
                  <span>
                    {lang === 'ar'
                      ? 'أوافق على أن المنتجات الموزونة تُسعر مبدئياً حسب الوزن التقديري، وسيتم تأكيد الوزن الفعلي النهائي بعد التقطيع والتجهيز قبل الدفع.'
                      : 'I understand weight-based cuts are priced by estimated weight and the final weight will be confirmed after trimming prior to payment.'}
                  </span>
                </label>
              )}

              {submitError && (
                <div className="p-3.5 rounded-xl bg-[#A20000]/20 border border-[#E6061E] text-xs text-[#E0D5CD] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#E6061E] shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {mode === 'cart' ? (
                <button
                  type="button"
                  onClick={() => onNavigate('checkout')}
                  className="w-full h-12 rounded-full bg-[#A20000] text-[#E0D5CD] font-bold text-sm hover:bg-[#E6061E] transition-colors"
                >
                  {lang === 'ar' ? 'متابعة إلى إتمام الطلب' : 'Proceed to Checkout'}
                </button>
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={submitting}
                  className="w-full h-12 rounded-full bg-[#A20000] text-[#E0D5CD] font-bold text-sm hover:bg-[#E6061E] transition-colors disabled:opacity-50"
                >
                  {submitting
                    ? lang === 'ar'
                      ? 'جاري التحقق وتأكيد الطلب في الخادم...'
                      : 'Validating & Submitting Order...'
                    : lang === 'ar'
                    ? `تأكيد وإرسال الطلب · ${grandTotal} ر.س`
                    : `Confirm & Submit Order · ${grandTotal} SAR`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const OrderConfirmationPage: React.FC<{
  lang: Language;
  order: any;
  onNavigate: (page: PageId) => void;
}> = ({ lang, order, onNavigate }) => {
  if (!order) {
    return (
      <div className="min-h-screen bg-black text-[#E0D5CD] pt-36 pb-24 px-4 text-center">
        <h1 className="font-display text-3xl font-bold">
          {lang === 'ar' ? 'لا يوجد طلب نشط للعرض' : 'No Active Order Found'}
        </h1>
        <button
          type="button"
          onClick={() => onNavigate('catalog')}
          className="mt-6 px-6 py-3 rounded-full bg-[#A20000] text-xs font-bold text-[#E0D5CD]"
        >
          {lang === 'ar' ? 'العودة إلى المتجر' : 'Return to Store'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[{ labelAr: 'تأكيد الطلب الرسمي', labelEn: 'Order Confirmation' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-[#080808] border border-[#25D366]/50 rounded-2xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#25D366]/20 border border-[#25D366] text-[#25D366] flex items-center justify-center shrink-0">
              <Check className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xs text-[#25D366] font-bold">
                {lang === 'ar'
                  ? 'تم قبول الطلب وحفظه في خادم BEEF HOUSE بنجاح'
                  : 'Order Validated & Persisted on BEEF HOUSE Server'}
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-bold text-[#E0D5CD] mt-1">
                {lang === 'ar'
                  ? `شكراً لك يا ${order.customer.fullName}!`
                  : `Thank you, ${order.customer.fullName}!`}
              </h1>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black border border-[#E0D5CD]/15 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="block text-xs text-[#9E938B]">
                {lang === 'ar' ? 'رقم الطلب المرجعي:' : 'Official Order Number:'}
              </span>
              <strong className="font-mono-num text-xl text-[#E0D5CD]">{order.orderNumber}</strong>
            </div>
            <div>
              <span className="block text-xs text-[#9E938B]">
                {lang === 'ar' ? 'توقيت التسجيل (الرياض):' : 'Riyadh Timestamp:'}
              </span>
              <strong className="text-xs text-[#E0D5CD]">{order.riyadhCreatedAt}</strong>
            </div>
            <div>
              <span className="block text-xs text-[#9E938B]">
                {lang === 'ar' ? 'الحالة الحالية:' : 'Order Status:'}
              </span>
              <strong className="text-xs text-[#25D366]">
                {order.hasWeightBasedItems
                  ? lang === 'ar'
                    ? 'قيد التقطيع وتأكيد الوزن النهائي'
                    : 'Trimming & Final Weight Confirmation'
                  : lang === 'ar'
                  ? 'قيد التجهيز'
                  : 'Preparing Order'}
              </strong>
            </div>
          </div>

          {/* Itemized Summary */}
          <div className="space-y-3">
            <h3 className="font-display text-lg font-bold">
              {lang === 'ar' ? 'المنتجات المطلوبة:' : 'Ordered Items:'}
            </h3>
            <div className="divide-y divide-[#E0D5CD]/10 bg-black rounded-xl border border-[#E0D5CD]/12 px-4">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <strong className="text-[#E0D5CD] text-sm block">
                      {lang === 'ar' ? item.nameAr : item.nameEn} × {item.quantity}
                    </strong>
                    <span className="text-[#9E938B]">
                      {lang === 'ar' ? item.weightLabelAr : item.weightLabelEn} ·{' '}
                      {lang === 'ar' ? item.prepLabelAr : item.prepLabelEn}
                    </span>
                  </div>
                  <span className="font-mono-num font-bold text-[#E0D5CD]">
                    {item.lineEstimatedTotalSar} {lang === 'ar' ? 'ر.س' : 'SAR'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black border border-[#A20000]/40 text-xs text-[#9E938B] leading-relaxed">
            {lang === 'ar'
              ? order.pricing.weightConfirmationPolicyAr
              : order.pricing.weightConfirmationPolicyEn}
          </div>

          <div className="pt-4 border-t border-[#E0D5CD]/15 flex items-center justify-between">
            <span className="text-sm font-bold">
              {lang === 'ar' ? 'الإجمالي التقديري المسجل:' : 'Estimated Grand Total:'}
            </span>
            <span className="font-mono-num text-2xl font-bold text-[#E0D5CD]">
              {order.pricing.estimatedGrandTotalSar} {lang === 'ar' ? 'ر.س' : 'SAR'}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-full bg-[#A20000] text-xs font-bold text-[#E0D5CD]"
            >
              {lang === 'ar' ? 'العودة للرئيسية' : 'Return to Homepage'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('cuts-guide')}
              className="px-6 py-3 rounded-full border border-[#E0D5CD]/25 text-xs font-bold text-[#E0D5CD]"
            >
              {lang === 'ar' ? 'تصفح دليل القطعيات ونصائح الطهي' : 'Explore Meat Cuts Guide'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
