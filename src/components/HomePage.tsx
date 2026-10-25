import React from 'react';
import {
  ShoppingBag,
  Compass,
  MapPin,
  Clock,
  ShieldCheck,
  Flame,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Settings,
  ExternalLink,
} from 'lucide-react';
import {
  Language,
  PageId,
  ProductItem,
  LiveBusinessStatus,
  StoreOwnerVerificationConfig,
  BRAND_TOKENS,
  PRODUCT_CATEGORIES,
  PRODUCTS_DATA,
  QUALITY_PILLARS,
  RECIPES_DATA,
  FAQ_ITEMS,
} from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';
import { ProductCard } from './LayoutComponents';
import { AnatomyDiagram } from './AnatomyDiagram';

interface HomePageProps {
  lang: Language;
  liveStatus: LiveBusinessStatus;
  verificationConfig: StoreOwnerVerificationConfig;
  onNavigate: (page: PageId, slug?: string) => void;
  onSelectCategoryInCatalog: (catId: string) => void;
  onAddToCart: (
    product: ProductItem,
    weightId: string,
    prepId: string,
    qty: number,
    note?: string
  ) => void;
  onOpenStoreConfig: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  liveStatus,
  verificationConfig,
  onNavigate,
  onSelectCategoryInCatalog,
  onAddToCart,
  onOpenStoreConfig,
}) => {
  const featuredProducts = PRODUCTS_DATA.filter((p) => p.featured);

  return (
    <div className="bg-black text-[#E0D5CD]">
      {/* 2. CINEMATIC HERO SECTION (Reference-inspired composition + Section 5 exact Arabic copy) */}
      <section className="relative min-h-[100svh] flex items-end bg-black overflow-hidden pt-32 pb-16">
        {/* Hero Background Marbled Beef Photography blending seamlessly into #000000 */}
        <div className="absolute inset-0 bg-black">
          <img
            src={BRAND_TOKENS.images.heroMarbledRibeye}
            alt={
              lang === 'ar'
                ? 'قطعية ستيك ريب آي فاخرة بتعريق دهني متوازن من BEEF HOUSE'
                : 'Prime marbled ribeye steak cut on black slate — BEEF HOUSE'
            }
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center animate-ken-burns opacity-90"
          />
          {/* Measured dark contrast scrim blending naturally into pure black */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-black/85" />
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-3xl space-y-6">
            {/* Original BEEF HOUSE Logo Badge + Live Riyadh Status */}
            <div className="flex flex-wrap items-center gap-4">
              <BrandLogo size="md" showWordmark={false} />
              <div className="text-xs text-[#E0D5CD]/90 flex items-center flex-wrap gap-2">
                <span className="font-bold tracking-wide text-[#E0D5CD]">
                  BEEF HOUSE · بيف هاوس
                </span>
                <span aria-hidden="true">·</span>
                <span>{lang === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, KSA'}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      liveStatus.isOpen ? 'bg-[#25D366]' : 'bg-[#A20000]'
                    }`}
                  />
                  {lang === 'ar' ? liveStatus.statusBadgeAr : liveStatus.statusBadgeEn}
                </span>
              </div>
            </div>

            {/* Mandatory Hero Headline (Section 5) */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-[#E0D5CD] leading-[1.08]">
              {lang === 'ar' ? 'الفرق يبدأ من المصدر.' : 'The Difference Starts at the Source.'}
            </h1>

            {/* Mandatory Supporting Text (Section 5) */}
            <p className="text-base sm:text-lg lg:text-xl text-[#E0D5CD]/90 leading-relaxed max-w-2xl">
              {lang === 'ar'
                ? 'من العناية بالتربية وجودة الغذاء إلى اختيار القطعية المناسبة والتجهيز بعناية، نؤمن أن تجربة اللحم المميزة تبدأ قبل أن تصل إلى مائدتك.'
                : 'From attentive animal husbandry and balanced nutrition to selecting the right cut and master preparation, we believe an extraordinary meat experience begins long before it reaches your table.'}
            </p>

            {/* Mandatory Primary & Secondary CTAs (Section 5) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('catalog')}
                className="h-14 px-8 rounded-full bg-[#A20000] text-[#E0D5CD] font-bold text-base flex items-center gap-2.5 shadow-xl hover:bg-[#E6061E] transition-colors whitespace-nowrap"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{lang === 'ar' ? 'تسوّق اللحوم' : 'Shop Meats'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('story')}
                className="h-14 px-8 rounded-full bg-black/60 backdrop-blur-md border border-[#E0D5CD]/35 text-[#E0D5CD] font-bold text-base flex items-center gap-2.5 hover:bg-[#E0D5CD]/15 transition-colors whitespace-nowrap"
              >
                <Compass className="w-5 h-5 text-[#A20000]" />
                <span>
                  {lang === 'ar' ? 'اكتشف عالم BEEF HOUSE' : 'Discover BEEF HOUSE'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reference-Inspired 4-Column Architectural Strip (.strip) */}
      <div className="bg-[#080808] border-y border-[#E0D5CD]/15">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-[#E0D5CD]/12">
          <div className="p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-black border border-[#E0D5CD]/15 flex items-center justify-center text-[#A20000] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs text-[#9E938B]">
                {lang === 'ar' ? 'الموقع' : 'Location'}
              </span>
              <strong className="text-sm text-[#E0D5CD]">
                {lang === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
              </strong>
            </div>
          </div>

          <div className="p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-black border border-[#E0D5CD]/15 flex items-center justify-center text-[#A20000] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs text-[#9E938B]">
                {lang === 'ar' ? 'ساعات العمل الرسمية' : 'Opening Hours'}
              </span>
              <strong className="text-sm text-[#E0D5CD]">
                {lang === 'ar' ? 'يومياً 9:00 ص – 12:00 منتصف الليل' : 'Daily 9:00 AM – 12:00 AM'}
              </strong>
            </div>
          </div>

          <div className="p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-black border border-[#E0D5CD]/15 flex items-center justify-center text-[#A20000] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs text-[#9E938B]">
                {lang === 'ar' ? 'التجهيز والتبريد' : 'Butchery & Cold-Chain'}
              </span>
              <strong className="text-sm text-[#E0D5CD]">
                {lang === 'ar' ? 'تقطيع احترافي حسب طريقة طهيك' : 'Custom Trimmed to Your Recipe'}
              </strong>
            </div>
          </div>

          <div className="p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-black border border-[#E0D5CD]/15 flex items-center justify-center text-[#A20000] shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs text-[#9E938B]">
                {lang === 'ar' ? 'ركن الشواية والسندوتشات' : 'Grill & Sandwich Corner'}
              </span>
              <strong className="text-sm text-[#E0D5CD]">
                {lang === 'ar' ? 'ستيك وسندوتشات مشوية لحظياً' : 'Freshly Seared Steak Sandwiches'}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BEEF HOUSE PHILOSOPHY & BRAND STORY (Reference-inspired .about-grid) */}
      <section className="py-24 bg-black border-b border-[#E0D5CD]/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 3-Image Mosaic */}
          <div className="lg:col-span-6 grid grid-cols-2 grid-rows-2 gap-4 h-[440px]">
            <div className="row-span-2 rounded-2xl overflow-hidden border border-[#E0D5CD]/15">
              <img
                src={BRAND_TOKENS.images.butcherCraftsmanship}
                alt={lang === 'ar' ? 'تجهيز وتقطيع احترافي' : 'Master Butcher Preparation'}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#E0D5CD]/15">
              <img
                src={BRAND_TOKENS.images.steakCollection}
                alt={lang === 'ar' ? 'تشكيلة قطعيات الستيك' : 'Steak Cuts Collection'}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#E0D5CD]/15">
              <img
                src={BRAND_TOKENS.images.tomahawkGrill}
                alt={lang === 'ar' ? 'توماهوك وشورت ريبس للشواء' : 'Tomahawk & Short Ribs'}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="bh-eyebrow">
              {lang === 'ar' ? 'فلسفة BEEF HOUSE' : 'The BEEF HOUSE Philosophy'}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] leading-tight">
              {lang === 'ar'
                ? 'قطعة اللحم المميزة لا تبدأ عند الجزار، بل قبل ذلك بكثير.'
                : 'An Extraordinary Cut Begins Long Before the Butcher Block.'}
            </h2>
            <p className="text-sm sm:text-base text-[#9E938B] leading-relaxed">
              {lang === 'ar'
                ? 'نؤمن أن قطعة اللحم المميزة تبدأ من العناية بالتربية، وجودة الغذاء، ونظافة بيئة المزرعة، وصولًا إلى الاختيار الدقيق والتجهيز الاحترافي. نريد أن نجعل اختيار اللحوم في الرياض تجربة أكثر وضوحًا وثقة ومتعة.'
                : 'From attentive care and balanced feed to rigorous cold-chain handling and master cutting, we help every guest in Riyadh choose the right cut with clarity and confidence.'}
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-[#080808] border border-[#E0D5CD]/12">
                <span className="font-display text-2xl font-bold text-[#A20000] block">0–4°C</span>
                <small className="text-xs text-[#9E938B]">
                  {lang === 'ar' ? 'سلسلة تبريد صارمة' : 'Strict Cold-Chain'}
                </small>
              </div>
              <div className="p-4 rounded-xl bg-[#080808] border border-[#E0D5CD]/12">
                <span className="font-display text-2xl font-bold text-[#E0D5CD] block">8</span>
                <small className="text-xs text-[#9E938B]">
                  {lang === 'ar' ? 'أقسام لحوم وشواية' : 'Butcher & Grill Depts'}
                </small>
              </div>
              <div className="p-4 rounded-xl bg-[#080808] border border-[#E0D5CD]/12">
                <span className="font-display text-2xl font-bold text-[#E0D5CD] block">100%</span>
                <small className="text-xs text-[#9E938B]">
                  {lang === 'ar' ? 'تقطيع طازج عند الطلب' : 'Cut Fresh to Order'}
                </small>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate('story')}
                className="h-12 px-6 rounded-full bg-[#A20000] text-xs sm:text-sm font-bold text-[#E0D5CD] hover:bg-[#E6061E]"
              >
                {lang === 'ar' ? 'اقرأ قصتنا الكاملة' : 'Read Our Full Story'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('mission')}
                className="h-12 px-6 rounded-full border border-[#E0D5CD]/25 text-xs sm:text-sm font-bold text-[#E0D5CD] hover:border-[#E0D5CD]"
              >
                {lang === 'ar' ? 'الرسالة والرؤية والقيم' : 'Mission & Vision'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED MEAT CATEGORIES (All 8 Departments) */}
      <section className="py-24 bg-black border-b border-[#E0D5CD]/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="bh-eyebrow">
                {lang === 'ar' ? 'أقسام الملحمة والشواية' : 'Butchery & Grill Departments'}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] mt-2">
                {lang === 'ar' ? 'اكتشف أقسام منتجات اللحوم' : 'Explore Our Meat Categories'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('categories')}
              className="text-xs font-bold text-[#E0D5CD] hover:text-[#E6061E] flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>{lang === 'ar' ? 'عرض جميع الأقسام بالتفصيل' : 'View All Categories'}</span>
              {lang === 'ar' ? (
                <ArrowLeft className="w-4 h-4 text-[#A20000]" />
              ) : (
                <ArrowRight className="w-4 h-4 text-[#A20000]" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategoryInCatalog(cat.id)}
                className="group cursor-pointer bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl overflow-hidden flex flex-col hover:border-[#A20000] transition-colors"
              >
                <div className="aspect-[4/3] bg-black overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={lang === 'ar' ? cat.nameAr : cat.nameEn}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#E0D5CD] group-hover:text-[#E6061E] transition-colors">
                      {lang === 'ar' ? cat.nameAr : cat.nameEn}
                    </h3>
                    <p className="text-xs text-[#9E938B] mt-1.5 line-clamp-2">
                      {lang === 'ar' ? cat.descAr : cat.descEn}
                    </p>
                  </div>
                  <span className="mt-4 pt-3 border-t border-[#E0D5CD]/10 text-xs font-bold text-[#E0D5CD] flex items-center justify-between">
                    <span>{lang === 'ar' ? 'تصفح القسم' : 'Explore Cut'}</span>
                    {lang === 'ar' ? (
                      <ArrowLeft className="w-3.5 h-3.5 text-[#A20000]" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-[#A20000]" />
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PRODUCTS */}
      <section className="py-24 bg-black border-b border-[#E0D5CD]/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="bh-eyebrow">
                {lang === 'ar' ? 'مختارات الملحمة والمتجر الإلكتروني' : 'Featured Butcher Selections'}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] mt-2">
                {lang === 'ar' ? 'أبرز القطعيات والمنتجات المختارة' : 'Signature Cuts & Curated Boxes'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('catalog')}
                className="h-11 px-6 rounded-full bg-[#A20000] text-xs font-bold text-[#E0D5CD] hover:bg-[#E6061E]"
              >
                {lang === 'ar' ? 'تصفح المتجر الكامل' : 'Open Full Online Store'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                onAddToCart={onAddToCart}
                onOpenDetail={(slug) => onNavigate('product-detail', slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. QUALITY & SOURCING PRINCIPLES + 10. BRAND VALUES */}
      <section className="py-24 bg-black border-b border-[#E0D5CD]/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="bh-eyebrow">
                {lang === 'ar' ? 'الجودة والمصدر والقيم' : 'Quality, Sourcing & Values'}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] mt-2">
                {lang === 'ar'
                  ? 'ركائز الجودة من المزرعة حتى التغليف'
                  : 'Six Pillars of Meat Quality & Safe Handling'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('quality')}
              className="h-11 px-5 rounded-full border border-[#E0D5CD]/25 text-xs font-bold text-[#E0D5CD] hover:border-[#A20000] self-start"
            >
              {lang === 'ar' ? 'صفحة الجودة والمصدر الكاملة' : 'Full Quality & Sourcing Page'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUALITY_PILLARS.map((p) => (
              <div
                key={p.id}
                className="p-6 rounded-2xl bg-[#080808] border border-[#E0D5CD]/15 space-y-2.5"
              >
                <span className="font-mono-num text-xs font-bold text-[#A20000]">{p.num}</span>
                <h3 className="font-display text-xl font-bold text-[#E0D5CD]">
                  {lang === 'ar' ? p.titleAr : p.titleEn}
                </h3>
                <p className="text-xs text-[#9E938B] leading-relaxed">
                  {lang === 'ar' ? p.descAr : p.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GRILL & SANDWICH CORNER SPOTLIGHT */}
      <section className="py-24 bg-black border-b border-[#E0D5CD]/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center space-y-6">
              <span className="bh-eyebrow">
                {lang === 'ar' ? 'ركن الشواية والسندوتشات' : 'Grill & Sandwich Corner'}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] leading-tight">
                {lang === 'ar'
                  ? 'سندوتشات ريب آي ومشويات طازجة من الشواية إليك.'
                  : 'Seared Ribeye Ciabatta Sandwiches & Skewers Off the Grill.'}
              </h2>
              <p className="text-sm text-[#9E938B] leading-relaxed">
                {lang === 'ar'
                  ? 'لا نكتفي بتجهيز اللحوم النيئة لمائدتك؛ بل نقدم لك في ركن الشواية بفرع BEEF HOUSE سندوتشات الستيك في خبز التشاباتا المحمص مع البصل المكرمل وجبن الشيدر، وأسياخ التندرلوين المشوية على الطلب.'
                  : 'Beyond raw butchery, our in-store Grill Corner sears fresh Ribeye Steak Sandwiches and Tenderloin Skewers to order at your preferred doneness.'}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('grill-menu')}
                  className="h-12 px-7 rounded-full bg-[#A20000] text-xs sm:text-sm font-bold text-[#E0D5CD] hover:bg-[#E6061E]"
                >
                  {lang === 'ar' ? 'استعرض قائمة الشواية والسندوتشات' : 'View Grill & Sandwich Menu'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 aspect-[4/3] lg:aspect-auto bg-black">
              <img
                src={BRAND_TOKENS.images.grillSandwichCorner}
                alt={lang === 'ar' ? 'سندوتش ريب آي ومشويات' : 'Grilled Ribeye Sandwich'}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. MEAT CUTS GUIDE PREVIEW */}
      <section className="py-24 bg-black border-b border-[#E0D5CD]/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="bh-eyebrow">
                {lang === 'ar' ? 'الدليل التعليمي للقطعيات' : 'Interactive Butcher Guide'}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] mt-2">
                {lang === 'ar'
                  ? 'دليل قطعيات اللحوم — اعرف قطعتك قبل أن تطلبها'
                  : 'Meat Cuts Guide — Know Your Cut Before You Order'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('cuts-guide')}
              className="h-11 px-6 rounded-full bg-[#A20000] text-xs font-bold text-[#E0D5CD] hover:bg-[#E6061E] self-start"
            >
              {lang === 'ar' ? 'افتح دليل القطعيات الكامل' : 'Open Full Cuts Guide'}
            </button>
          </div>

          <AnatomyDiagram
            lang={lang}
            activeZone="all"
            onSelectZone={() => onNavigate('cuts-guide')}
          />
        </div>
      </section>

      {/* 9. FEATURED RECIPES */}
      <section className="py-24 bg-black border-b border-[#E0D5CD]/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="bh-eyebrow">
                {lang === 'ar' ? 'مركز الوصفات وفنون الطهي' : 'Culinary & Recipe Center'}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] mt-2">
                {lang === 'ar' ? 'وصفات مختارة لتحضير لحوم BEEF HOUSE' : 'Signature Recipes & Cooking Guides'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('recipes')}
              className="h-11 px-5 rounded-full border border-[#E0D5CD]/25 text-xs font-bold text-[#E0D5CD] hover:border-[#A20000] self-start"
            >
              {lang === 'ar' ? 'جميع الوصفات' : 'View All Recipes'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RECIPES_DATA.slice(0, 2).map((rec) => (
              <div
                key={rec.id}
                onClick={() => onNavigate('recipe-detail', rec.slug)}
                className="group cursor-pointer bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl overflow-hidden flex flex-col hover:border-[#A20000] transition-colors"
              >
                <div className="aspect-[16/10] bg-black overflow-hidden">
                  <img
                    src={rec.image}
                    alt={lang === 'ar' ? rec.titleAr : rec.titleEn}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <span className="text-xs text-[#A20000] font-bold">
                    {lang === 'ar' ? rec.categoryLabelAr : rec.categoryLabelEn} ·{' '}
                    {rec.cookTimeMinutes} {lang === 'ar' ? 'دقيقة' : 'mins'}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#E0D5CD] group-hover:text-[#E6061E] transition-colors">
                    {lang === 'ar' ? rec.titleAr : rec.titleEn}
                  </h3>
                  <p className="text-xs text-[#9E938B]">
                    {lang === 'ar' ? rec.subtitleAr : rec.subtitleEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. VERIFIED CUSTOMER REVIEWS POLICY + 12. STORE LOCATION & LIVE OPENING HOURS */}
      <section className="py-24 bg-black border-b border-[#E0D5CD]/10">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Verified Reviews Transparency Block (Section 9.11 & Section 21) */}
          <div className="lg:col-span-5 bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="bh-eyebrow">
                {lang === 'ar' ? 'تقييمات العملاء الموثقة' : 'Verified Customer Reviews'}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#E0D5CD]">
                {lang === 'ar'
                  ? 'مصداقية التقييمات وعدم نشر آراء وهمية'
                  : 'Authentic Reviews Only — Zero Fabricated Testimonials'}
              </h3>
              <p className="text-xs sm:text-sm text-[#9E938B] leading-relaxed">
                {lang === 'ar'
                  ? 'التزاماً بأعلى معايير الشفافية، يعرض BEEF HOUSE فقط التقييمات الموثقة المرتبطة بملف المتجر الرسمي على خرائط Google والطلبات الفعلية المسجلة، ولا نقوم بإنشاء تقييمات أو أسماء عملاء افتراضية.'
                  : 'In commitment to complete transparency, BEEF HOUSE publishes only verified Google Business Profile reviews and confirmed customer feedback—never invented testimonials.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black border border-[#E0D5CD]/12 text-xs space-y-2">
              <strong className="text-[#E0D5CD] block">
                {lang === 'ar'
                  ? 'هل قمت بتجربة لحوم أو شواية BEEF HOUSE؟'
                  : 'Have you ordered from BEEF HOUSE?'}
              </strong>
              <p className="text-[#9E938B]">
                {lang === 'ar'
                  ? 'يسعدنا دائماً استقبال ملاحظاتك وتقييمك عبر صفحتنا على خرائط Google أو عند زيارتك للفرع في الرياض.'
                  : 'We welcome your honest feedback via our Google Maps listing or in-store in Riyadh.'}
              </p>
            </div>
          </div>

          {/* Live Location & Opening Hours Preview (Section 9.12 & Section 18) */}
          <div className="lg:col-span-7 bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl p-8 flex flex-col justify-between space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E0D5CD]/12">
              <div>
                <span className="bh-eyebrow">
                  {lang === 'ar' ? 'الموقع وساعات العمل الحية' : 'Store Location & Live Hours'}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#E0D5CD] mt-1">
                  {lang === 'ar' ? 'زُرنا في الرياض' : 'Visit BEEF HOUSE in Riyadh'}
                </h3>
              </div>

              <div className="px-4 py-2.5 rounded-xl bg-black border border-[#E0D5CD]/20 flex items-center gap-2.5 self-start">
                <span
                  className={`w-3 h-3 rounded-full ${
                    liveStatus.isOpen ? 'bg-[#25D366]' : 'bg-[#A20000]'
                  }`}
                />
                <div className="text-xs">
                  <strong className="text-[#E0D5CD] block">
                    {lang === 'ar' ? liveStatus.statusBadgeAr : liveStatus.statusBadgeEn}
                  </strong>
                  <span className="text-[#9E938B]">
                    {lang === 'ar' ? liveStatus.subStatusAr : liveStatus.subStatusEn}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1.5">
                <span className="text-[#9E938B] block">
                  {lang === 'ar' ? 'ساعات العمل اليومية (توقيت الرياض):' : 'Daily Schedule (Riyadh Time):'}
                </span>
                <strong className="text-sm text-[#E0D5CD] block">
                  {lang === 'ar'
                    ? '9:00 صباحاً – 12:00 منتصف الليل'
                    : '9:00 AM – 12:00 Midnight'}
                </strong>
                <span className="text-[#9E938B] block">
                  {lang === 'ar' ? 'طوال أيام الأسبوع' : '7 Days a Week'}
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[#9E938B] block">
                  {lang === 'ar' ? 'العنوان في الرياض:' : 'Riyadh Address:'}
                </span>
                <strong className="text-sm text-[#E0D5CD] block">
                  {lang === 'ar' ? verificationConfig.cityAr : verificationConfig.cityEn}
                </strong>
                <span className="text-[#9E938B] block">
                  {lang === 'ar'
                    ? verificationConfig.districtAndStreetAr
                    : verificationConfig.districtAndStreetEn}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="h-11 px-6 rounded-full bg-[#A20000] text-xs font-bold text-[#E0D5CD] hover:bg-[#E6061E]"
              >
                {lang === 'ar' ? 'عرض الخريطة وتفاصيل التواصل' : 'Open Map & Contact Page'}
              </button>
              <a
                href={verificationConfig.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-5 rounded-full border border-[#E0D5CD]/25 text-xs font-bold text-[#E0D5CD] inline-flex items-center gap-2 hover:border-[#E0D5CD]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'الاتجاهات على Google Maps' : 'Google Maps Directions'}</span>
              </a>
              <button
                type="button"
                onClick={onOpenStoreConfig}
                className="h-11 px-4 rounded-full border border-[#E0D5CD]/15 text-xs text-[#9E938B] hover:text-[#E0D5CD] inline-flex items-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'إعدادات الفرع' : 'Config'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQs SECTION */}
      <section className="py-24 bg-black border-b border-[#E0D5CD]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="bh-eyebrow">
              {lang === 'ar' ? 'إجابات واضحة' : 'Frequently Asked Questions'}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD]">
              {lang === 'ar' ? 'الأسئلة الشائعة' : 'Common Questions About BEEF HOUSE'}
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <details
                key={idx}
                className="group bg-[#080808] border border-[#E0D5CD]/15 rounded-2xl p-6"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-display text-lg sm:text-xl font-bold text-[#E0D5CD]">
                  <span>{lang === 'ar' ? item.qAr : item.qEn}</span>
                  <ChevronDown className="w-5 h-5 text-[#A20000] transition-transform group-open:rotate-180 shrink-0" />
                </summary>
                <p className="text-xs sm:text-sm text-[#9E938B] leading-relaxed mt-3 pt-3 border-t border-[#E0D5CD]/10">
                  {lang === 'ar' ? item.aAr : item.aEn}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FINAL SHOPPING CTA */}
      <section className="py-24 bg-black">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-[#0E0E0E] via-[#080808] to-black border border-[#A20000]/50 rounded-3xl p-8 sm:p-14 text-center space-y-6">
            <BrandLogo size="lg" className="mx-auto" />
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#E0D5CD] max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'جاهز لاختيار قطعيتك القادمة من BEEF HOUSE؟'
                : 'Ready to Choose Your Next Cut from BEEF HOUSE?'}
            </h2>
            <p className="text-sm sm:text-base text-[#9E938B] max-w-xl mx-auto">
              {lang === 'ar'
                ? 'تسوق الآن من متجر اللحوم الإلكتروني أو استعن بدليل القطعيات لاختيار القطعة المثالية لطريقة طهيك.'
                : 'Order online with custom butcher preparation or explore our Meat Cuts Guide to select the right cut for your table.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('catalog')}
                className="h-14 px-9 rounded-full bg-[#A20000] text-[#E0D5CD] font-bold text-base hover:bg-[#E6061E] transition-colors"
              >
                {lang === 'ar' ? 'تسوّق اللحوم الآن' : 'Shop Online Store'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('cuts-guide')}
                className="h-14 px-8 rounded-full border border-[#E0D5CD]/30 text-[#E0D5CD] font-bold text-base hover:border-[#E0D5CD]"
              >
                {lang === 'ar' ? 'دليل قطعيات اللحوم' : 'Meat Cuts Guide'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
