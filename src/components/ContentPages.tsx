import React, { useState } from 'react';
import {
  Flame,
  Clock,
  Check,
  AlertTriangle,
  ShieldCheck,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  Settings,
  ShoppingBag,
  ChefHat,
  ArrowLeft,
  ArrowRight,
  Thermometer,
} from 'lucide-react';
import {
  Language,
  PageId,
  ProductItem,
  MEAT_CUTS_GUIDE,
  PRODUCTS_DATA,
  RECIPES_DATA,
  QUALITY_PILLARS,
  FAQ_ITEMS,
  BRAND_TOKENS,
  LiveBusinessStatus,
  StoreOwnerVerificationConfig,
} from '../config/siteConfig';
import { Breadcrumbs, ProductCard } from './LayoutComponents';
import { AnatomyDiagram } from './AnatomyDiagram';

export const CutsGuidePage: React.FC<{
  lang: Language;
  onNavigate: (page: PageId, slug?: string) => void;
}> = ({ lang, onNavigate }) => {
  const [groupFilter, setGroupFilter] = useState<string>('all');
  const [anatomicalZone, setAnatomicalZone] = useState<
    'rib' | 'short-loin' | 'sirloin' | 'chuck' | 'brisket' | 'shank' | 'round' | 'all'
  >('all');

  const filteredCuts = MEAT_CUTS_GUIDE.filter((c) => {
    const matchGroup = groupFilter === 'all' || c.groupId === groupFilter;
    const matchZone = anatomicalZone === 'all' || c.anatomicalZone === anatomicalZone;
    return matchGroup && matchZone;
  });

  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[
          {
            labelAr: 'دليل قطعيات اللحوم — اعرف قطعتك قبل أن تطلبها',
            labelEn: 'Meat Cuts Guide — Know Your Cut Before You Order',
          },
        ]}
        onNavigate={onNavigate}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-4 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E0D5CD]/15">
          <div>
            <span className="bh-eyebrow">
              {lang === 'ar' ? 'الموسوعة التعليمية لـ BEEF HOUSE' : 'BEEF HOUSE Culinary Education'}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] mt-2">
              {lang === 'ar'
                ? 'دليل قطعيات اللحوم — اعرف قطعتك قبل أن تطلبها'
                : 'Meat Cuts Guide — Know Your Cut Before You Order'}
            </h1>
          </div>
          <p className="text-sm text-[#9E938B] max-w-md">
            {lang === 'ar'
              ? 'اكتشف موقع كل قطعية، درجة التعريق الدهني، قوام الألياف، وطريقة الطهي المثالية لتختار بثقة القطعة الأنسب لمائدتك.'
              : 'Understand the anatomical position, marbling score, grain texture, and best cooking technique for every cut.'}
          </p>
        </div>

        {/* Interactive Beef Primal Cuts Diagram */}
        <AnatomyDiagram
          lang={lang}
          activeZone={anatomicalZone}
          onSelectZone={(z) => setAnatomicalZone((prev) => (prev === z ? 'all' : z))}
        />

        {/* Group Filter Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              ['all', 'جميع القطعيات', 'All Cuts'],
              ['steak', 'قطعيات الستيك', 'Steak Cuts'],
              ['grilling', 'قطعيات الشواء والتدخين', 'Grilling & Smoking'],
              ['saudi-traditional', 'الطبخ البطيء والأطباق السعودية', 'Slow Cooking & Saudi Dishes'],
              ['minced', 'اللحم المفروم والبرجر', 'Minced Meat & Burgers'],
            ].map(([id, ar, en]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setGroupFilter(id);
                  setAnatomicalZone('all');
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                  groupFilter === id
                    ? 'bg-[#A20000] text-[#E0D5CD]'
                    : 'bg-[#080808] text-[#9E938B] border border-[#E0D5CD]/15 hover:text-[#E0D5CD]'
                }`}
              >
                {lang === 'ar' ? ar : en}
              </button>
            ))}
          </div>

          {anatomicalZone !== 'all' && (
            <button
              type="button"
              onClick={() => setAnatomicalZone('all')}
              className="text-xs text-[#E6061E] underline"
            >
              {lang === 'ar' ? 'إلغاء فلتر المنطقة التشريحية' : 'Clear Anatomical Filter'}
            </button>
          )}
        </div>

        {/* Cuts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCuts.map((cut) => (
            <article
              key={cut.id}
              className="bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl overflow-hidden flex flex-col hover:border-[#A20000] transition-colors"
            >
              <div
                onClick={() => onNavigate('cut-detail', cut.slug)}
                className="aspect-[16/10] bg-black overflow-hidden relative cursor-pointer group"
              >
                <img
                  src={cut.image}
                  alt={lang === 'ar' ? cut.nameAr : cut.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-4 inset-x-5 flex items-center justify-between text-xs text-[#E0D5CD]">
                  <span>{lang === 'ar' ? cut.anatomicalLabelAr : cut.anatomicalLabelEn}</span>
                  <span className="font-mono-num">
                    {lang === 'ar'
                      ? `التعريق: ${cut.marblingLevel}/5 · الطراوة: ${cut.tendernessLevel}/5`
                      : `Marbling: ${cut.marblingLevel}/5 · Tenderness: ${cut.tendernessLevel}/5`}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div>
                  <span className="text-xs text-[#A20000] font-bold">
                    {lang === 'ar' ? cut.groupLabelAr : cut.groupLabelEn}
                  </span>
                  <h2
                    onClick={() => onNavigate('cut-detail', cut.slug)}
                    className="font-display text-2xl font-bold text-[#E0D5CD] mt-1 cursor-pointer hover:text-[#E6061E]"
                  >
                    {lang === 'ar' ? cut.nameAr : cut.nameEn}
                  </h2>
                  <p className="text-xs text-[#9E938B] mt-2 leading-relaxed">
                    {lang === 'ar' ? cut.textureAr : cut.textureEn}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-black border border-[#E0D5CD]/10 text-xs space-y-1.5">
                  <div className="text-[#E0D5CD] font-semibold">
                    {lang === 'ar' ? 'طرق الطهي المناسبة:' : 'Suitable Cooking Methods:'}
                  </div>
                  <div className="text-[#9E938B]">
                    {(lang === 'ar'
                      ? cut.suitableCookingMethodsAr
                      : cut.suitableCookingMethodsEn
                    ).join(' · ')}
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-[#E0D5CD]/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('cut-detail', cut.slug)}
                    className="h-10 px-5 rounded-full bg-[#A20000] text-xs font-bold text-[#E0D5CD] hover:bg-[#E6061E]"
                  >
                    {lang === 'ar' ? 'دليل القطعية الكامل' : 'Full Cut Guide'}
                  </button>
                  {cut.relatedProductIds[0] && (
                    <button
                      type="button"
                      onClick={() => onNavigate('product-detail', cut.relatedProductIds[0])}
                      className="h-10 px-4 rounded-full border border-[#E0D5CD]/25 text-xs font-bold text-[#E0D5CD] hover:border-[#E0D5CD]"
                    >
                      {lang === 'ar' ? 'اطلب هذه القطعية' : 'Shop This Cut'}
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CutDetailPage: React.FC<{
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
  const cut =
    MEAT_CUTS_GUIDE.find((c) => c.slug === slug || c.id === slug) || MEAT_CUTS_GUIDE[0];

  const relatedProducts = PRODUCTS_DATA.filter((p) => cut.relatedProductIds.includes(p.id));
  const relatedRecipes = RECIPES_DATA.filter((r) => cut.relatedRecipeIds.includes(r.id));

  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[
          { labelAr: 'دليل قطعيات اللحوم', labelEn: 'Meat Cuts Guide', page: 'cuts-guide' },
          { labelAr: cut.nameAr, labelEn: cut.nameEn },
        ]}
        onNavigate={onNavigate}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-4 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#080808] border border-[#E0D5CD]/15">
              <img
                src={cut.image}
                alt={lang === 'ar' ? cut.nameAr : cut.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <AnatomyDiagram lang={lang} activeZone={cut.anatomicalZone} />
          </div>

          <div className="lg:col-span-6 bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="bh-eyebrow">
                {lang === 'ar' ? cut.groupLabelAr : cut.groupLabelEn}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#E0D5CD] mt-2">
                {lang === 'ar' ? cut.nameAr : cut.nameEn}
              </h1>
              <span className="block text-sm text-[#9E938B] mt-1">
                {lang === 'ar' ? cut.nameEn : cut.nameAr} ·{' '}
                {lang === 'ar' ? cut.anatomicalLabelAr : cut.anatomicalLabelEn}
              </span>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black border border-[#E0D5CD]/12">
              <div>
                <span className="text-xs text-[#9E938B] block">
                  {lang === 'ar' ? 'درجة التعريق الدهني (Marbling)' : 'Marbling Score'}
                </span>
                <div className="font-mono-num text-2xl font-bold text-[#E0D5CD] mt-1">
                  {cut.marblingLevel} / 5
                </div>
              </div>
              <div>
                <span className="text-xs text-[#9E938B] block">
                  {lang === 'ar' ? 'درجة الطراوة (Tenderness)' : 'Tenderness Score'}
                </span>
                <div className="font-mono-num text-2xl font-bold text-[#E0D5CD] mt-1">
                  {cut.tendernessLevel} / 5
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
              <div>
                <h3 className="font-bold text-[#E0D5CD]">
                  {lang === 'ar' ? 'القوام والتعريق:' : 'Texture & Marbling:'}
                </h3>
                <p className="text-[#9E938B] mt-1">
                  {lang === 'ar' ? cut.textureAr : cut.textureEn}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#E0D5CD]">
                  {lang === 'ar' ? 'السمات النكهية (Flavor Profile):' : 'Flavor Profile:'}
                </h3>
                <p className="text-[#9E938B] mt-1">
                  {lang === 'ar' ? cut.flavorProfileAr : cut.flavorProfileEn}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[#E0D5CD]">
                  {lang === 'ar' ? 'طرق الطهي المثالية:' : 'Ideal Cooking Methods:'}
                </h3>
                <ul className="mt-1.5 space-y-1 text-[#9E938B]">
                  {(lang === 'ar'
                    ? cut.suitableCookingMethodsAr
                    : cut.suitableCookingMethodsEn
                  ).map((m, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#A20000] shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-[#E0D5CD]">
                  {lang === 'ar' ? 'نصيحة التجهيز قبل الطهي:' : 'Preparation Advice:'}
                </h3>
                <p className="text-[#9E938B] mt-1">
                  {lang === 'ar' ? cut.prepAdviceAr : cut.prepAdviceEn}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black border border-[#E0D5CD]/15">
                <h3 className="font-bold text-[#E0D5CD] flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-[#A20000]" />
                  {lang === 'ar' ? 'درجة الاستواء وإرشادات الطهي:' : 'Cooking & Doneness Guidance:'}
                </h3>
                <p className="text-[#9E938B] mt-1">
                  {lang === 'ar' ? cut.cookingGuidanceAr : cut.cookingGuidanceEn}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#A20000]/15 border border-[#A20000]/50">
                <h3 className="font-bold text-[#E0D5CD] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#E6061E]" />
                  {lang === 'ar' ? 'أخطاء شائعة يجب تجنبها:' : 'Common Mistakes to Avoid:'}
                </h3>
                <ul className="mt-2 space-y-1.5 text-xs text-[#E0D5CD]/90">
                  {(lang === 'ar' ? cut.commonMistakesAr : cut.commonMistakesEn).map((err, i) => (
                    <li key={i}>• {err}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-black border border-[#E0D5CD]/15 text-xs">
                <strong className="text-[#E0D5CD] flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                  {lang === 'ar' ? 'إرشادات السلامة الغذائية:' : 'Food Safety Guidance:'}
                </strong>
                <span className="text-[#9E938B]">
                  {lang === 'ar' ? cut.foodSafetyTipAr : cut.foodSafetyTipEn}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products to Order */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-[#E0D5CD]/15 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#E0D5CD]">
              {lang === 'ar'
                ? 'اطلب هذه القطعية مباشرة من متجر BEEF HOUSE'
                : 'Order This Cut Directly from BEEF HOUSE'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {relatedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  lang={lang}
                  onAddToCart={onAddToCart}
                  onOpenDetail={(s) => onNavigate('product-detail', s)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <div className="pt-8 border-t border-[#E0D5CD]/15 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#E0D5CD]">
              {lang === 'ar' ? 'وصفات مقترحة لهذه القطعية' : 'Recommended Recipes for This Cut'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedRecipes.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => onNavigate('recipe-detail', rec.slug)}
                  className="p-5 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 flex items-center gap-4 cursor-pointer hover:border-[#A20000]"
                >
                  <img
                    src={rec.image}
                    alt={lang === 'ar' ? rec.titleAr : rec.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <span className="text-xs text-[#A20000] font-bold">
                      {lang === 'ar' ? rec.categoryLabelAr : rec.categoryLabelEn}
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#E0D5CD] mt-0.5">
                      {lang === 'ar' ? rec.titleAr : rec.titleEn}
                    </h3>
                    <span className="text-xs text-[#9E938B] mt-1 block">
                      {rec.cookTimeMinutes} {lang === 'ar' ? 'دقيقة طهي' : 'mins cook'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const GrillMenuPage: React.FC<{
  lang: Language;
  onNavigate: (page: PageId, slug?: string) => void;
  onAddToCart: (
    product: ProductItem,
    weightId: string,
    prepId: string,
    qty: number,
    note?: string
  ) => void;
}> = ({ lang, onNavigate, onAddToCart }) => {
  const grillItems = PRODUCTS_DATA.filter(
    (p) => p.categoryId === 'grill-corner' || p.categoryId === 'burger' || p.categoryId === 'grilling'
  );

  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[{ labelAr: 'ركن الشواية والسندوتشات', labelEn: 'Grill & Sandwich Corner' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-4 space-y-12">
        {/* Hero Split for Grill Corner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl overflow-hidden">
          <div className="lg:col-span-6 p-8 sm:p-10 space-y-5">
            <span className="bh-eyebrow">
              {lang === 'ar' ? 'ركن الشواية والسندوتشات — الرياض' : 'Live Grill & Sandwich Corner'}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] leading-tight">
              {lang === 'ar'
                ? 'من الملحمة إلى الجمر مباشرة.'
                : 'From the Butcher Block Straight to Live Embers.'}
            </h1>
            <p className="text-sm text-[#9E938B] leading-relaxed">
              {lang === 'ar'
                ? 'في ركن الشواية والسندوتشات بفرع BEEF HOUSE، نحضر سندوتشات الستيك المشوية وأسياخ التندرلوين والبرجر الفاخر طازجة عند طلبك، بدرجة الاستواء التي تفضلها.'
                : 'At our in-store Grill & Sandwich Corner, we sear Ribeye Ciabatta Sandwiches, Tenderloin Skewers, and Artisanal Burgers fresh to order at your preferred doneness.'}
            </p>
            <div className="p-3.5 rounded-xl bg-black border border-[#E0D5CD]/12 text-xs text-[#9E938B]">
              {lang === 'ar'
                ? 'ملاحظة: الأصناف والأسعار أدناه تمثل قائمة الشواية الاسترشادية وتخضع للتأكيد حسب القائمة الرسمية بالفرع.'
                : 'Note: Menu items and prices below represent illustrative grill corner offerings subject to official in-store menu confirmation.'}
            </div>
          </div>
          <div className="lg:col-span-6 aspect-[4/3] lg:aspect-auto lg:h-full bg-black">
            <img
              src={BRAND_TOKENS.images.grillSandwichCorner}
              alt={lang === 'ar' ? 'ركن الشواية والسندوتشات' : 'Grill & Sandwich Corner'}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Grill & Sandwich Products Grid */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#E0D5CD]">
            {lang === 'ar'
              ? 'قائمة السندوتشات، المشويات، والبرجر'
              : 'Sandwiches, Skewers, Burgers & Grill Cuts'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {grillItems.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                lang={lang}
                onAddToCart={onAddToCart}
                onOpenDetail={(slug) => onNavigate('product-detail', slug)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecipesListPage: React.FC<{
  lang: Language;
  onNavigate: (page: PageId, slug?: string) => void;
}> = ({ lang, onNavigate }) => {
  const [catFilter, setCatFilter] = useState<string>('all');

  const filtered = RECIPES_DATA.filter(
    (r) => catFilter === 'all' || r.categoryId === catFilter
  );

  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[{ labelAr: 'مركز الوصفات وفنون الطهي', labelEn: 'Recipe & Culinary Center' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-4 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E0D5CD]/15">
          <div>
            <span className="bh-eyebrow">
              {lang === 'ar' ? 'وصفات وتقنيات الطهي' : 'Recipes & Cooking Techniques'}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] mt-2">
              {lang === 'ar'
                ? 'كيف تطهو كل قطعية باحترافية في منزلك'
                : 'Master Every Cut in Your Kitchen'}
            </h1>
          </div>
          <p className="text-sm text-[#9E938B] max-w-md">
            {lang === 'ar'
              ? 'خطوات واضحة، مقادير مضبوطة، ودرجات حرارة دقيقة لتحضير الستيك، مشويات الفحم، الكبسة، والبرجر.'
              : 'Step-by-step instructions, exact quantities, and recommended cuts for cast-iron steaks, charcoal ribs, Saudi Kabsa, and burgers.'}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            ['all', 'جميع الوصفات', 'All Recipes'],
            ['steak', 'تحضير الستيك', 'Steak Preparation'],
            ['grilling', 'الشواء على الفحم', 'Charcoal Grilling'],
            ['saudi-dishes', 'الأطباق السعودية والطبخ البطيء', 'Saudi Dishes & Slow Cooking'],
            ['burgers-sandwiches', 'البرجر والسندوتشات', 'Burgers & Sandwiches'],
          ].map(([id, ar, en]) => (
            <button
              key={id}
              type="button"
              onClick={() => setCatFilter(id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${
                catFilter === id
                  ? 'bg-[#A20000] text-[#E0D5CD]'
                  : 'bg-[#080808] text-[#9E938B] border border-[#E0D5CD]/15 hover:text-[#E0D5CD]'
              }`}
            >
              {lang === 'ar' ? ar : en}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((rec) => (
            <article
              key={rec.id}
              onClick={() => onNavigate('recipe-detail', rec.slug)}
              className="group cursor-pointer bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl overflow-hidden flex flex-col hover:border-[#A20000] transition-colors"
            >
              <div className="aspect-[16/10] bg-black overflow-hidden relative">
                <img
                  src={rec.image}
                  alt={lang === 'ar' ? rec.titleAr : rec.titleEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-5 flex items-center justify-between text-xs text-[#E0D5CD]">
                  <span>{lang === 'ar' ? rec.categoryLabelAr : rec.categoryLabelEn}</span>
                  <span className="font-mono-num">
                    {rec.prepTimeMinutes + rec.cookTimeMinutes} {lang === 'ar' ? 'دقيقة' : 'mins'}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#E0D5CD] group-hover:text-[#E6061E] transition-colors">
                    {lang === 'ar' ? rec.titleAr : rec.titleEn}
                  </h2>
                  <p className="text-xs text-[#9E938B] mt-2 leading-relaxed">
                    {lang === 'ar' ? rec.subtitleAr : rec.subtitleEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E0D5CD]/10 flex items-center justify-between text-xs">
                  <span className="text-[#9E938B]">
                    {lang === 'ar' ? 'القطعية الموصى بها: ' : 'Recommended Cut: '}
                    <strong className="text-[#E0D5CD]">
                      {lang === 'ar' ? rec.recommendedCutNameAr : rec.recommendedCutNameEn}
                    </strong>
                  </span>
                  <span className="font-bold text-[#A20000] flex items-center gap-1">
                    {lang === 'ar' ? 'عرض الوصفة' : 'Read Recipe'}
                    {lang === 'ar' ? (
                      <ArrowLeft className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RecipeDetailPage: React.FC<{
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
  const recipe =
    RECIPES_DATA.find((r) => r.slug === slug || r.id === slug) || RECIPES_DATA[0];
  const relatedProducts = PRODUCTS_DATA.filter((p) =>
    recipe.relatedProductIds.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[
          { labelAr: 'مركز الوصفات', labelEn: 'Recipes', page: 'recipes' },
          { labelAr: recipe.titleAr, labelEn: recipe.titleEn },
        ]}
        onNavigate={onNavigate}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-4 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="bh-eyebrow">
              {lang === 'ar' ? recipe.categoryLabelAr : recipe.categoryLabelEn}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] leading-tight">
              {lang === 'ar' ? recipe.titleAr : recipe.titleEn}
            </h1>
            <p className="text-sm text-[#9E938B] leading-relaxed">
              {lang === 'ar' ? recipe.subtitleAr : recipe.subtitleEn}
            </p>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#080808] border border-[#E0D5CD]/15 text-xs">
              <div>
                <span className="text-[#9E938B] block">
                  {lang === 'ar' ? 'وقت التجهيز' : 'Prep Time'}
                </span>
                <strong className="font-mono-num text-base text-[#E0D5CD]">
                  {recipe.prepTimeMinutes} {lang === 'ar' ? 'دقيقة' : 'mins'}
                </strong>
              </div>
              <div>
                <span className="text-[#9E938B] block">
                  {lang === 'ar' ? 'وقت الطهي' : 'Cook Time'}
                </span>
                <strong className="font-mono-num text-base text-[#E0D5CD]">
                  {recipe.cookTimeMinutes} {lang === 'ar' ? 'دقيقة' : 'mins'}
                </strong>
              </div>
              <div>
                <span className="text-[#9E938B] block">
                  {lang === 'ar' ? 'القطعية الموصى بها' : 'Recommended Cut'}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('cut-detail', recipe.recommendedCutId)}
                  className="text-xs font-bold text-[#E6061E] underline text-start"
                >
                  {lang === 'ar' ? recipe.recommendedCutNameAr : recipe.recommendedCutNameEn}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 aspect-[4/3] rounded-2xl overflow-hidden border border-[#E0D5CD]/15">
            <img
              src={recipe.image}
              alt={lang === 'ar' ? recipe.titleAr : recipe.titleEn}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Ingredients & Preparation Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Ingredients */}
          <div className="lg:col-span-5 bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-2xl font-bold text-[#E0D5CD]">
              {lang === 'ar' ? 'المكونات والمقادير' : 'Ingredients & Quantities'}
            </h2>
            <ul className="divide-y divide-[#E0D5CD]/10 text-xs sm:text-sm">
              {(lang === 'ar' ? recipe.ingredientsAr : recipe.ingredientsEn).map((ing, idx) => (
                <li key={idx} className="py-3 flex items-center justify-between gap-4">
                  <span className="text-[#E0D5CD]">{ing.item}</span>
                  <span className="font-mono-num text-[#9E938B] font-semibold shrink-0">
                    {ing.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="lg:col-span-7 bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="font-display text-2xl font-bold text-[#E0D5CD]">
              {lang === 'ar' ? 'خطوات التحضير والطهي' : 'Preparation & Cooking Steps'}
            </h2>
            <ol className="space-y-4">
              {(lang === 'ar' ? recipe.stepsAr : recipe.stepsEn).map((step, idx) => (
                <li
                  key={idx}
                  className="p-4 rounded-xl bg-black border border-[#E0D5CD]/12 flex items-start gap-4 text-xs sm:text-sm leading-relaxed"
                >
                  <span className="w-7 h-7 rounded-full bg-[#A20000] text-[#E0D5CD] font-mono-num font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-[#E0D5CD]/90">{step}</span>
                </li>
              ))}
            </ol>

            <div className="p-4 rounded-xl bg-[#A20000]/15 border border-[#A20000]/40 text-xs space-y-1">
              <strong className="text-[#E0D5CD] block">
                {lang === 'ar' ? 'سر الشيف والتقديم:' : 'Chef Tip & Serving Suggestion:'}
              </strong>
              <p className="text-[#E0D5CD]/90">
                {lang === 'ar' ? recipe.chefTipAr : recipe.chefTipEn}
              </p>
              <p className="text-[#9E938B] pt-1">
                {lang === 'ar' ? recipe.servingSuggestionsAr : recipe.servingSuggestionsEn}
              </p>
            </div>
          </div>
        </div>

        {/* Shop the Cuts for This Recipe */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-[#E0D5CD]/15 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#E0D5CD]">
              {lang === 'ar'
                ? 'تسوق القطعيات المناسبة لهذه الوصفة'
                : 'Shop the Cuts for This Recipe'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  lang={lang}
                  onAddToCart={onAddToCart}
                  onOpenDetail={(s) => onNavigate('product-detail', s)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const BrandStoryPage: React.FC<{
  lang: Language;
  mode: 'story' | 'mission';
  onNavigate: (page: PageId) => void;
}> = ({ lang, mode, onNavigate }) => {
  const coreValues = [
    {
      ar: 'الجودة (Quality)',
      en: 'Quality',
      descAr: 'اختيار القطعيات بعناية فائقة وعدم المساومة على الطزاجة والقوام.',
      descEn: 'Uncompromising standards in cut selection, freshness, and marbling.',
    },
    {
      ar: 'المصدر المسؤول (Responsible Sourcing)',
      en: 'Responsible Sourcing',
      descAr: 'الانتقاء من مصادر موثوقة تلتزم باشتراطات الفحص البيطري والذبح الحلال.',
      descEn: 'Selecting from vetted suppliers adhering to veterinary and Halal standards.',
    },
    {
      ar: 'النظافة والسلامة الغذائية (Hygiene & Safe Handling)',
      en: 'Hygiene & Safe Handling',
      descAr: 'بيئة عمل معقمة والتزام صارم بسلسلة التبريد في كل مرحلة.',
      descEn: 'Sanitized preparation blocks and continuous cold-chain integrity.',
    },
    {
      ar: 'التجهيز الاحترافي (Professional Preparation)',
      en: 'Professional Preparation',
      descAr: 'تقطيع وتشذيب متقن يراعي اتجاه الألياف وطريقة الطهي الخاصة بكل عميل.',
      descEn: 'Precision butchery tailored to grain direction and cooking method.',
    },
    {
      ar: 'الشفافية (Transparency)',
      en: 'Transparency',
      descAr: 'توضيح خصائص كل قطعية، الوزن التقديري والفعلي، دون أي ادعاءات غير موثقة.',
      descEn: 'Clear communication of cut traits, weights, and verified practices.',
    },
    {
      ar: 'الحرفية في الطهي (Culinary Craftsmanship)',
      en: 'Culinary Craftsmanship',
      descAr: 'تمكين العميل بالمعرفة والوصفات ودليل القطعيات وركن الشواية المتخصص.',
      descEn: 'Empowering guests through our Cuts Guide, recipes, and Grill Corner.',
    },
    {
      ar: 'التطوير المستمر (Continuous Improvement)',
      en: 'Continuous Improvement',
      descAr: 'الاستماع المستمر لعملائنا في الرياض للارتقاء بتجربة الشراء والتحضير.',
      descEn: 'Continuously refining our service and craft for Riyadh meat lovers.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[
          {
            labelAr: mode === 'story' ? 'قصتنا — عالم BEEF HOUSE' : 'الرسالة والرؤية والقيم',
            labelEn: mode === 'story' ? 'Our Brand Story' : 'Mission, Vision & Values',
          },
        ]}
        onNavigate={onNavigate}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-4 space-y-16">
        {/* Reference-Inspired 2-Column Editorial Story Grid (.about-grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 3-Image Mosaic Grid (like reference .about-imgs) */}
          <div className="lg:col-span-6 grid grid-cols-2 grid-rows-2 gap-4 h-[460px]">
            <div className="row-span-2 rounded-2xl overflow-hidden border border-[#E0D5CD]/15">
              <img
                src={BRAND_TOKENS.images.butcherCraftsmanship}
                alt={lang === 'ar' ? 'حرفية التقطيع في BEEF HOUSE' : 'BEEF HOUSE Craftsmanship'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#E0D5CD]/15">
              <img
                src={BRAND_TOKENS.images.heroMarbledRibeye}
                alt={lang === 'ar' ? 'ستيك ريب آي فاخر' : 'Prime Ribeye'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#E0D5CD]/15">
              <img
                src={BRAND_TOKENS.images.grillSandwichCorner}
                alt={lang === 'ar' ? 'ركن الشواية والسندوتشات' : 'Grill Corner'}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Mandatory Arabic Story Copy (Section 10) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="bh-eyebrow">
              {lang === 'ar' ? 'قصتنا وفلسفتنا — الرياض' : 'Our Story & Philosophy — Riyadh'}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] leading-tight">
              {lang === 'ar' ? 'مرحبًا بك في عالم BEEF HOUSE.' : 'Welcome to the World of BEEF HOUSE.'}
            </h1>

            <div className="space-y-4 text-sm sm:text-base text-[#E0D5CD]/90 leading-relaxed">
              <p>
                {lang === 'ar'
                  ? 'نؤمن أن قطعة اللحم المميزة لا تبدأ عند الجزار، بل قبل ذلك بكثير؛ من العناية بالتربية، وجودة الغذاء، ونظافة بيئة المزرعة، وصولًا إلى الاختيار الدقيق والتجهيز الاحترافي.'
                  : 'We believe an extraordinary cut of meat does not begin at the butcher block, but long before—through attentive animal care, quality nutrition, and clean farming environments, all the way to careful selection and master preparation.'}
              </p>
              <p>
                {lang === 'ar'
                  ? 'نريد أن نجعل اختيار اللحوم تجربة أكثر وضوحًا وثقة ومتعة، وأن نساعد كل عميل على اكتشاف القطعية المناسبة لطريقة طهيه والمناسبة التي يجتمع من أجلها مع من يحب.'
                  : 'We strive to make choosing meat a clearer, more confident, and enjoyable experience—helping every guest discover the right cut for their cooking method and the moments they share with loved ones.'}
              </p>
              <p>
                {lang === 'ar'
                  ? 'طموحنا أن نصنع في الرياض اسمًا يرتبط بجودة اللحم، ودقة التجهيز، والاهتمام بالتفاصيل، وتجربة تستحق العودة إليها.'
                  : 'Our ambition is to build a name in Riyadh synonymous with meat quality, precision preparation, attention to detail, and an experience worth returning to.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080808] border border-[#E0D5CD]/15 text-xs text-[#9E938B]">
              {lang === 'ar'
                ? 'التزام الشفافية: نميز بوضوح بين رؤيتنا وطموحنا للارتقاء بثقافة اللحوم في الرياض وبين الممارسات التشغيلية اليومية في ملحمتنا (الاختيار الدقيق، سلسلة التبريد، التقطيع الاحترافي، والنظافة)، ولا ندّعي امتلاك مزارع خاصة أو شهادات غير موثقة.'
                : 'Transparency Commitment: We clearly distinguish our brand aspirations from our daily store operations (careful selection, cold-chain management, precision cutting, and hygiene) without claiming unverified farm ownership.'}
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards (Section 10 Exact Text) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-[#080808] border border-[#A20000]/50 space-y-3">
            <span className="bh-eyebrow">{lang === 'ar' ? 'رسالتنا (Mission)' : 'Our Mission'}</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#E0D5CD] leading-snug">
              {lang === 'ar'
                ? 'تقديم تجربة متكاملة في اختيار اللحوم وتجهيزها، تقوم على الجودة والعناية بالتفاصيل، وتساعد عملاءنا على اكتشاف القطعية المناسبة لكل وجبة.'
                : 'To deliver an integrated experience in selecting and preparing meats built on quality and attention to detail, helping our customers discover the right cut for every meal.'}
            </h2>
          </div>

          <div className="p-8 rounded-2xl bg-[#080808] border border-[#E0D5CD]/20 space-y-3">
            <span className="bh-eyebrow">{lang === 'ar' ? 'رؤيتنا (Vision)' : 'Our Vision'}</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#E0D5CD] leading-snug">
              {lang === 'ar'
                ? 'أن تصبح BEEF HOUSE وجهة بارزة في الرياض لعشاق اللحوم الذين يبحثون عن الجودة والثقة والتميّز في تجربة الشراء والتحضير.'
                : 'For BEEF HOUSE to become a premier destination in Riyadh for meat enthusiasts seeking quality, trust, and excellence in purchasing and preparation.'}
            </h2>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="space-y-6">
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#E0D5CD]">
            {lang === 'ar' ? 'قيمنا الأساسية (Core Values)' : 'Our Core Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 space-y-2"
              >
                <span className="font-mono-num text-xs text-[#A20000] font-bold">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-xl font-bold text-[#E0D5CD]">
                  {lang === 'ar' ? val.ar : val.en}
                </h3>
                <p className="text-xs text-[#9E938B] leading-relaxed">
                  {lang === 'ar' ? val.descAr : val.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const QualitySourcingPage: React.FC<{
  lang: Language;
  verificationConfig: StoreOwnerVerificationConfig;
  onOpenStoreConfig: () => void;
  onNavigate: (page: PageId) => void;
}> = ({ lang, verificationConfig, onOpenStoreConfig, onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[{ labelAr: 'الجودة والمصدر وسلسلة التبريد', labelEn: 'Quality & Sourcing' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-4 space-y-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E0D5CD]/15">
          <div>
            <span className="bh-eyebrow">
              {lang === 'ar' ? 'معايير الجودة والمصدر' : 'Quality & Sourcing Standards'}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] mt-2">
              {lang === 'ar'
                ? 'منظومة متكاملة تبدأ من المصدر وتكتمل بالتجهيز'
                : 'An Integrated System from Source to Butcher Block'}
            </h1>
          </div>
          <p className="text-sm text-[#9E938B] max-w-md">
            {lang === 'ar'
              ? 'جودة اللحم لا تعتمد على عامل واحد مثل الغذاء فقط، بل هي ثمرة تضافر السلالة، بيئة التربية، سلسلة التبريد، والتقطيع الاحترافي.'
              : 'Meat quality is never guaranteed by feed alone—it requires a complete chain of animal welfare, cold-chain discipline, and skilled butchery.'}
          </p>
        </div>

        {/* 6 Pillars of Quality */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {QUALITY_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="p-6 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 space-y-3"
            >
              <span className="font-mono-num text-sm font-bold text-[#A20000]">
                {pillar.num}
              </span>
              <h2 className="font-display text-xl font-bold text-[#E0D5CD]">
                {lang === 'ar' ? pillar.titleAr : pillar.titleEn}
              </h2>
              <p className="text-xs text-[#9E938B] leading-relaxed">
                {lang === 'ar' ? pillar.descAr : pillar.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Editable Verified Sourcing & Certifications Registry (Section 11 Requirement) */}
        <div className="bg-[#080808] border border-[#E0D5CD]/20 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E0D5CD]/12">
            <div>
              <span className="bh-eyebrow">
                {lang === 'ar' ? 'سجل التوريد الموثق' : 'Verified Supply & Origin Registry'}
              </span>
              <h3 className="font-display text-2xl font-bold text-[#E0D5CD] mt-1">
                {lang === 'ar'
                  ? 'بيانات بلد المنشأ، الموردين، والشهادات المعتمدة'
                  : 'Verified Country of Origin, Suppliers & Certifications'}
              </h3>
            </div>
            <button
              type="button"
              onClick={onOpenStoreConfig}
              className="px-4 py-2.5 rounded-xl bg-[#A20000] text-xs font-bold text-[#E0D5CD] inline-flex items-center gap-2 self-start"
            >
              <Settings className="w-4 h-4" />
              <span>
                {lang === 'ar'
                  ? 'تحديث بيانات التوريد الموثقة'
                  : 'Edit Verified Sourcing Fields'}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-black border border-[#E0D5CD]/12 space-y-1.5">
              <strong className="text-[#E0D5CD] block text-sm">
                {lang === 'ar' ? 'بلد المنشأ (Country of Origin):' : 'Country of Origin:'}
              </strong>
              <p className="text-[#9E938B] leading-relaxed">
                {lang === 'ar'
                  ? verificationConfig.verifiedOriginsAr
                  : verificationConfig.verifiedOriginsEn}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black border border-[#E0D5CD]/12 space-y-1.5">
              <strong className="text-[#E0D5CD] block text-sm">
                {lang === 'ar' ? 'الموردون والمزارع المعتمدة:' : 'Verified Suppliers & Farms:'}
              </strong>
              <p className="text-[#9E938B] leading-relaxed">
                {lang === 'ar'
                  ? verificationConfig.verifiedSuppliersAr
                  : verificationConfig.verifiedSuppliersEn}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black border border-[#E0D5CD]/12 space-y-1.5">
              <strong className="text-[#E0D5CD] block text-sm">
                {lang === 'ar' ? 'الفحص البيطري والشهادات:' : 'Inspections & Certifications:'}
              </strong>
              <p className="text-[#9E938B] leading-relaxed">
                {lang === 'ar'
                  ? verificationConfig.verifiedCertificationsAr
                  : verificationConfig.verifiedCertificationsEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactLocationPage: React.FC<{
  lang: Language;
  liveStatus: LiveBusinessStatus;
  verificationConfig: StoreOwnerVerificationConfig;
  onOpenStoreConfig: () => void;
  onNavigate: (page: PageId) => void;
}> = ({ lang, liveStatus, verificationConfig, onOpenStoreConfig, onNavigate }) => {
  const cleanWa = (verificationConfig.whatsappNumber || '').replace(/[^\d]/g, '');

  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[{ labelAr: 'الموقع، ساعات العمل، والتواصل', labelEn: 'Location, Hours & Contact' }]}
        onNavigate={onNavigate}
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-4 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E0D5CD]/15">
          <div>
            <span className="bh-eyebrow">
              {lang === 'ar' ? 'تواصل معنا — الرياض' : 'Visit & Contact Us — Riyadh'}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] mt-2">
              {lang === 'ar'
                ? 'فرع BEEF HOUSE وساعات العمل الحية'
                : 'BEEF HOUSE Location & Live Opening Hours'}
            </h1>
          </div>

          <button
            type="button"
            onClick={onOpenStoreConfig}
            className="px-4 py-2.5 rounded-full border border-[#E0D5CD]/25 text-xs font-bold text-[#E0D5CD] hover:border-[#A20000] inline-flex items-center gap-2 self-start"
          >
            <Settings className="w-4 h-4 text-[#A20000]" />
            <span>
              {lang === 'ar'
                ? 'تحديث بيانات التواصل والعنوان الموثقة'
                : 'Configure Verified Contact Details'}
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Google Maps Embed */}
          <div className="lg:col-span-7 min-h-[380px] rounded-2xl overflow-hidden bg-[#080808] border border-[#E0D5CD]/15 relative">
            <iframe
              src={verificationConfig.googleMapsEmbedUrl}
              title={lang === 'ar' ? 'خريطة موقع BEEF HOUSE في الرياض' : 'BEEF HOUSE Riyadh Map'}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[380px] border-0 filter grayscale contrast-125 invert-[0.9] hue-rotate-180"
            />
          </div>

          {/* Contact & Live Hours Card */}
          <div className="lg:col-span-5 bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            {/* Live Opening Status Box (Section 18) */}
            <div className="p-4 rounded-xl bg-black border border-[#E0D5CD]/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#9E938B]">
                  {lang === 'ar' ? 'حالة المتجر الآن (توقيت الرياض):' : 'Live Riyadh Store Status:'}
                </span>
                <span className="font-mono-num text-xs text-[#9E938B]">
                  {lang === 'ar'
                    ? liveStatus.riyadhTimeFormattedAr
                    : liveStatus.riyadhTimeFormattedEn}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    liveStatus.isOpen ? 'bg-[#25D366]' : 'bg-[#A20000]'
                  }`}
                />
                <strong className="font-display text-2xl font-bold text-[#E0D5CD]">
                  {lang === 'ar' ? liveStatus.statusBadgeAr : liveStatus.statusBadgeEn}
                </strong>
                <span className="text-xs text-[#9E938B]">
                  · {lang === 'ar' ? liveStatus.subStatusAr : liveStatus.subStatusEn}
                </span>
              </div>
              <p className="text-xs text-[#9E938B] pt-1">
                {lang === 'ar'
                  ? 'الجدول الرسمي: يومياً من الساعة 9:00 صباحاً حتى 12:00 منتصف الليل (Asia/Riyadh).'
                  : 'Official Schedule: Daily from 9:00 AM to 12:00 Midnight (Asia/Riyadh).'}
              </p>
            </div>

            {/* Address, Phone, WhatsApp */}
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#A20000] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#9E938B] block">
                    {lang === 'ar' ? 'العنوان في الرياض:' : 'Store Address:'}
                  </span>
                  <strong className="text-sm text-[#E0D5CD] block mt-0.5">
                    {lang === 'ar' ? verificationConfig.cityAr : verificationConfig.cityEn}
                  </strong>
                  <span className="text-[#9E938B]">
                    {lang === 'ar'
                      ? verificationConfig.districtAndStreetAr
                      : verificationConfig.districtAndStreetEn}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#A20000] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#9E938B] block">
                    {lang === 'ar' ? 'الهاتف المباشر:' : 'Direct Phone:'}
                  </span>
                  {verificationConfig.phoneVerified && verificationConfig.phoneNumber ? (
                    <a
                      href={`tel:${verificationConfig.phoneNumber}`}
                      dir="ltr"
                      className="text-sm font-bold text-[#E0D5CD] hover:text-[#E6061E]"
                    >
                      {verificationConfig.phoneNumber}
                    </a>
                  ) : (
                    <span className="text-[#9E938B]">
                      {lang === 'ar'
                        ? 'بانتظار اعتماد رقم الهاتف الرسمي في لوحة الإعدادات'
                        : 'Awaiting verified phone number in store settings'}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#9E938B] block">
                    {lang === 'ar' ? 'واتساب BEEF HOUSE الرسمي:' : 'Official WhatsApp:'}
                  </span>
                  {verificationConfig.whatsappVerified && cleanWa.length >= 8 ? (
                    <a
                      href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(
                        lang === 'ar'
                          ? verificationConfig.whatsappDefaultGreetingAr
                          : verificationConfig.whatsappDefaultGreetingEn
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#25D366] hover:underline"
                    >
                      {verificationConfig.whatsappNumber}
                    </a>
                  ) : (
                    <span className="text-[#9E938B]">
                      {lang === 'ar'
                        ? 'بانتظار ربط رقم واتساب الرسمي في لوحة الإعدادات'
                        : 'Awaiting verified WhatsApp number in store settings'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={verificationConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 rounded-full bg-[#A20000] text-[#E0D5CD] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#E6061E]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>
                  {lang === 'ar' ? 'الاتجاهات عبر خرائط Google' : 'Google Maps Directions'}
                </span>
              </a>
              <button
                type="button"
                onClick={onOpenStoreConfig}
                className="h-11 rounded-full border border-[#E0D5CD]/25 text-[#E0D5CD] text-xs font-bold hover:border-[#E0D5CD]"
              >
                {lang === 'ar' ? 'إدخال بيانات الفرع الموثقة' : 'Update Store Details'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FaqLegalOr404Page: React.FC<{
  mode: 'faq' | 'privacy' | 'terms' | '404';
  lang: Language;
  onNavigate: (page: PageId) => void;
}> = ({ mode, lang, onNavigate }) => {
  if (mode === '404') {
    return (
      <div className="min-h-screen bg-black text-[#E0D5CD] pt-40 pb-24 px-4 text-center space-y-5">
        <span className="font-mono-num text-5xl font-bold text-[#A20000]">404</span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold">
          {lang === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        <p className="text-sm text-[#9E938B] max-w-md mx-auto">
          {lang === 'ar'
            ? 'عذراً، الرابط الذي تبحث عنه غير متوفر. يمكنك العودة إلى الصفحة الرئيسية أو تصفح متجر اللحوم.'
            : 'The page you are looking for does not exist. Return home or explore our online butcher catalog.'}
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-full bg-[#A20000] text-xs font-bold text-[#E0D5CD]"
          >
            {lang === 'ar' ? 'الرئيسية' : 'Back to Homepage'}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('catalog')}
            className="px-6 py-3 rounded-full border border-[#E0D5CD]/25 text-xs font-bold text-[#E0D5CD]"
          >
            {lang === 'ar' ? 'المتجر الإلكتروني' : 'Online Store'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] pb-24">
      <Breadcrumbs
        lang={lang}
        items={[
          {
            labelAr:
              mode === 'faq'
                ? 'الأسئلة الشائعة'
                : mode === 'privacy'
                ? 'سياسة الخصوصية'
                : 'الشروط والأحكام',
            labelEn:
              mode === 'faq'
                ? 'Frequently Asked Questions'
                : mode === 'privacy'
                ? 'Privacy Policy'
                : 'Terms & Conditions',
          },
        ]}
        onNavigate={onNavigate}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 space-y-8">
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD]">
          {mode === 'faq'
            ? lang === 'ar'
              ? 'الأسئلة الشائعة حول BEEF HOUSE'
              : 'Frequently Asked Questions'
            : mode === 'privacy'
            ? lang === 'ar'
              ? 'سياسة الخصوصية وحماية البيانات'
              : 'Privacy Policy'
            : lang === 'ar'
            ? 'الشروط والأحكام وسياسة الأوزان'
            : 'Terms & Conditions'}
        </h1>

        {mode === 'faq' ? (
          <div className="space-y-4">
            {FAQ_ITEMS.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 space-y-2"
              >
                <h2 className="font-display text-xl font-bold text-[#E0D5CD]">
                  {lang === 'ar' ? f.qAr : f.qEn}
                </h2>
                <p className="text-xs sm:text-sm text-[#9E938B] leading-relaxed">
                  {lang === 'ar' ? f.aAr : f.aEn}
                </p>
              </div>
            ))}
          </div>
        ) : mode === 'privacy' ? (
          <div className="p-8 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 space-y-4 text-sm text-[#9E938B] leading-relaxed">
            <p>
              {lang === 'ar'
                ? 'تحترم ملحمة BEEF HOUSE في الرياض خصوصية عملائها وتلتزم بحماية بياناتهم الشخصية (الاسم، رقم الجوال، وعنوان التوصيل) واستخدامها حصرياً لتجهيز الطلبات، تأكيد الوزن الفعلي النهائي، والتوصيل المبرد.'
                : 'BEEF HOUSE Riyadh respects your privacy and uses your personal details (name, mobile number, and delivery address) strictly for order preparation, final weight confirmation, and chilled delivery.'}
            </p>
            <p>
              {lang === 'ar'
                ? 'لا نقوم بتخزين أي بيانات بطاقات ائتمانية أو بنكية في قاعدة بياناتنا، ولا نشارك أرقام هواتف العملاء مع أي جهات تسويقية خارجية.'
                : 'We never store raw payment card details in our database and never sell customer contact information to third parties.'}
            </p>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 space-y-4 text-sm text-[#9E938B] leading-relaxed">
            <h2 className="font-display text-xl font-bold text-[#E0D5CD]">
              {lang === 'ar'
                ? '1. سياسة الأوزان التقديرية والوزن الفعلي النهائي'
                : '1. Estimated vs. Final Confirmed Weight Policy'}
            </h2>
            <p>
              {lang === 'ar'
                ? 'نظراً لأن قطعيات اللحوم الطازجة يتم تقطيعها وتشذيبها يدوياً حسب طلب العميل، فإن الأوزان المعروضة في المتجر هي أوزان تقديرية. يتم قياس الوزن الفعلي النهائي بعد التجهيز وإبلاغ العميل بالسعر النهائي للموافقة عليه قبل الدفع أو التسليم.'
                : 'Because fresh meat cuts are hand-trimmed to order, weights displayed online are estimates. Final confirmed weight is measured after preparation and shared with the customer for approval prior to payment.'}
            </p>
            <h2 className="font-display text-xl font-bold text-[#E0D5CD]">
              {lang === 'ar'
                ? '2. حفظ سلسلة التبريد والسلامة الغذائية'
                : '2. Cold-Chain & Food Safety'}
            </h2>
            <p>
              {lang === 'ar'
                ? 'تُجهز وتُنقل جميع الطلبات وفق اشتراطات التبريد المعتمدة (0°C إلى 4°C). يُنصح العميل بوضع اللحوم في الثلاجة أو الفريزر فور استلامها.'
                : 'All orders are prepared and delivered under strict temperature control (0°C–4°C). Customers should refrigerate or freeze raw meats immediately upon receipt.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
