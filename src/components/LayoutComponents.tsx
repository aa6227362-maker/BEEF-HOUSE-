import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Globe,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Plus,
  Minus,
  Settings,
  ExternalLink,
  Check,
} from 'lucide-react';
import {
  Language,
  PageId,
  LiveBusinessStatus,
  ProductItem,
  StoreOwnerVerificationConfig,
  BRAND_TOKENS,
} from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';

export interface CartLineItem {
  key: string;
  product: ProductItem;
  weightId: string;
  prepId: string;
  quantity: number;
  customCuttingNote: string;
}

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  activePage: PageId;
  onNavigate: (page: PageId, slug?: string) => void;
  cartCount: number;
  cartBump: boolean;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  liveStatus: LiveBusinessStatus;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  activePage,
  onNavigate,
  cartCount,
  cartBump,
  onOpenCart,
  onOpenSearch,
  liveStatus,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems: { id: PageId; labelAr: string; labelEn: string }[] = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home' },
    { id: 'story', labelAr: 'قصتنا', labelEn: 'Our Story' },
    { id: 'categories', labelAr: 'منتجات اللحوم', labelEn: 'Meat Products' },
    { id: 'cuts-guide', labelAr: 'دليل القطعيات', labelEn: 'Cuts Guide' },
    { id: 'catalog', labelAr: 'المتجر الإلكتروني', labelEn: 'Online Store' },
    { id: 'grill-menu', labelAr: 'الشواية والسندوتشات', labelEn: 'Grill & Sandwiches' },
    { id: 'quality', labelAr: 'الجودة والمصدر', labelEn: 'Quality & Sourcing' },
    { id: 'recipes', labelAr: 'الوصفات', labelEn: 'Recipes' },
    { id: 'contact', labelAr: 'تواصل معنا', labelEn: 'Contact Us' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-[#E0D5CD]/15 shadow-2xl'
            : 'bg-gradient-to-b from-black/95 via-black/70 to-transparent border-b border-[#E0D5CD]/10'
        }`}
      >
        {/* Top Slim Live Riyadh Schedule Bar (Section 18) */}
        <div className="bg-[#080808] border-b border-[#E0D5CD]/10 text-xs py-1.5 px-4">
          <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  liveStatus.isOpen ? 'bg-[#25D366]' : 'bg-[#A20000]'
                }`}
                aria-hidden="true"
              />
              <span className="font-bold text-[#E0D5CD] whitespace-nowrap">
                {lang === 'ar' ? liveStatus.statusBadgeAr : liveStatus.statusBadgeEn}
              </span>
              <span className="text-[#9E938B]" aria-hidden="true">
                ·
              </span>
              <span className="text-[#9E938B] truncate">
                {lang === 'ar' ? liveStatus.subStatusAr : liveStatus.subStatusEn}
              </span>
              {liveStatus.riyadhTimeFormattedAr && (
                <>
                  <span className="hidden sm:inline text-[#9E938B]" aria-hidden="true">
                    ·
                  </span>
                  <span className="hidden sm:inline text-[#9E938B] whitespace-nowrap">
                    {lang === 'ar'
                      ? `توقيت الرياض الآن: ${liveStatus.riyadhTimeFormattedAr}`
                      : `Riyadh Time: ${liveStatus.riyadhTimeFormattedEn}`}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('mission')}
                className="hidden md:inline text-[#9E938B] hover:text-[#E0D5CD] transition-colors whitespace-nowrap"
              >
                {lang === 'ar' ? 'الرسالة والرؤية' : 'Mission & Vision'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('faq')}
                className="hidden md:inline text-[#9E938B] hover:text-[#E0D5CD] transition-colors whitespace-nowrap"
              >
                {lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}
              </button>
              <button
                type="button"
                onClick={onToggleLang}
                className="inline-flex items-center gap-1.5 text-[#E0D5CD] hover:text-[#E6061E] font-semibold transition-colors whitespace-nowrap"
                aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                <Globe className="w-3.5 h-3.5 text-[#A20000]" />
                <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Reference-Inspired Navigation Row */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Zone 1: Original BEEF HOUSE Logo */}
          <BrandLogo
            size="md"
            showWordmark={true}
            onClick={() => onNavigate('home')}
            className="shrink-0"
          />

          {/* Zone 2: Desktop Navigation Links */}
          <nav
            className="hidden xl:flex items-center gap-1"
            aria-label={lang === 'ar' ? 'التنقل الرئيسي' : 'Main Navigation'}
          >
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#E0D5CD] bg-[#A20000]/25 border border-[#A20000]'
                      : 'text-[#E0D5CD]/85 hover:text-[#E0D5CD] hover:bg-[#E0D5CD]/10'
                  }`}
                >
                  {lang === 'ar' ? item.labelAr : item.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Search, Cart & Mobile Drawer Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              className="w-11 h-11 rounded-full border border-[#E0D5CD]/25 text-[#E0D5CD] flex items-center justify-center hover:border-[#A20000] hover:bg-[#A20000]/15 transition-colors"
              aria-label={lang === 'ar' ? 'بحث في المنتجات' : 'Search Products'}
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className={`relative h-11 px-4 rounded-full border border-[#E0D5CD]/30 bg-[#080808] text-[#E0D5CD] flex items-center gap-2 hover:border-[#A20000] transition-transform ${
                cartBump ? 'scale-110' : 'scale-100'
              }`}
              aria-label={lang === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}
            >
              <ShoppingBag className="w-4 h-4 text-[#A20000]" />
              <span className="hidden sm:inline text-xs font-semibold whitespace-nowrap">
                {lang === 'ar' ? 'السلة' : 'Cart'}
              </span>
              <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#A20000] text-[#E0D5CD] text-xs font-bold font-mono-num flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('catalog')}
              className="hidden sm:inline-flex items-center justify-center h-11 px-5 rounded-full bg-[#A20000] text-[#E0D5CD] text-xs md:text-sm font-bold hover:bg-[#E6061E] transition-colors whitespace-nowrap"
            >
              {lang === 'ar' ? 'تسوّق اللحوم' : 'Shop Meats'}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden w-11 h-11 rounded-full border border-[#E0D5CD]/25 text-[#E0D5CD] flex items-center justify-center"
              aria-label={lang === 'ar' ? 'القائمة' : 'Menu'}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Reference-Inspired Fullscreen Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black text-[#E0D5CD] flex flex-col p-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-6 border-b border-[#E0D5CD]/15">
            <BrandLogo
              size="md"
              showWordmark={true}
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 rounded-full bg-[#0E0E0E] border border-[#E0D5CD]/20 flex items-center justify-center text-[#E0D5CD]"
              aria-label={lang === 'ar' ? 'إغلاق القائمة' : 'Close Menu'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 flex flex-col divide-y divide-[#E0D5CD]/10">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(item.id);
                }}
                className={`py-3.5 text-start font-display text-2xl font-bold transition-colors ${
                  activePage === item.id ? 'text-[#E6061E]' : 'text-[#E0D5CD] hover:text-[#A20000]'
                }`}
              >
                {lang === 'ar' ? item.labelAr : item.labelEn}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('mission');
              }}
              className="py-3.5 text-start font-display text-xl font-bold text-[#9E938B] hover:text-[#E0D5CD]"
            >
              {lang === 'ar' ? 'الرسالة والرؤية' : 'Mission & Vision'}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('faq');
              }}
              className="py-3.5 text-start font-display text-xl font-bold text-[#9E938B] hover:text-[#E0D5CD]"
            >
              {lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}
            </button>
          </div>

          <div className="mt-auto pt-6 border-t border-[#E0D5CD]/15 grid gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('catalog');
              }}
              className="w-full h-12 rounded-full bg-[#A20000] text-[#E0D5CD] font-bold text-sm"
            >
              {lang === 'ar' ? 'تسوّق اللحوم الآن' : 'Shop Meats Now'}
            </button>
            <button
              type="button"
              onClick={() => {
                onToggleLang();
                setMobileMenuOpen(false);
              }}
              className="w-full h-12 rounded-full border border-[#E0D5CD]/25 text-[#E0D5CD] font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4 text-[#A20000]" />
              {lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

interface BreadcrumbsProps {
  lang: Language;
  items: { labelAr: string; labelEn: string; page?: PageId; slug?: string }[];
  onNavigate: (page: PageId, slug?: string) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ lang, items, onNavigate }) => {
  const Separator = lang === 'ar' ? ChevronLeft : ChevronRight;
  return (
    <nav
      aria-label={lang === 'ar' ? 'مسار الصفحة' : 'Breadcrumb'}
      className="pt-32 pb-4 max-w-[1240px] mx-auto px-4 sm:px-6"
    >
      <ol className="flex items-center flex-wrap gap-2 text-xs text-[#9E938B]">
        <li>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-[#E0D5CD] transition-colors"
          >
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </button>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <Separator className="w-3.5 h-3.5 text-[#A20000]" />
            {item.page && idx < items.length - 1 ? (
              <button
                type="button"
                onClick={() => onNavigate(item.page!, item.slug)}
                className="hover:text-[#E0D5CD] transition-colors"
              >
                {lang === 'ar' ? item.labelAr : item.labelEn}
              </button>
            ) : (
              <span className="text-[#E0D5CD] font-medium">
                {lang === 'ar' ? item.labelAr : item.labelEn}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

interface ProductCardProps {
  product: ProductItem;
  lang: Language;
  onAddToCart: (
    product: ProductItem,
    weightId: string,
    prepId: string,
    qty: number,
    note?: string
  ) => void;
  onOpenDetail: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onAddToCart,
  onOpenDetail,
}) => {
  const [selectedWeightId, setSelectedWeightId] = useState(product.weights[0]?.id || '');
  const [selectedPrepId, setSelectedPrepId] = useState(product.prepOptions[0]?.id || '');
  const [addedFlash, setAddedFlash] = useState(false);

  const selectedWeight =
    product.weights.find((w) => w.id === selectedWeightId) || product.weights[0];
  const selectedPrep =
    product.prepOptions.find((p) => p.id === selectedPrepId) || product.prepOptions[0];

  const estimatedUnitPrice = Math.round(
    product.basePriceSar * (selectedWeight?.priceMultiplier || 1) +
      (selectedPrep?.extraPrice || 0)
  );

  const handleQuickAdd = () => {
    onAddToCart(product, selectedWeight.id, selectedPrep.id, 1, '');
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1200);
  };

  return (
    <article className="group bg-[#080808] border border-[#E0D5CD]/12 rounded-2xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#E0D5CD]/30">
      {/* Local Product Image */}
      <div
        onClick={() => onOpenDetail(product.slug)}
        className="relative aspect-[4/3] w-full bg-black overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={lang === 'ar' ? product.nameAr : product.nameEn}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-xs text-[#E0D5CD]/90">
          <span>
            {product.inStock
              ? lang === 'ar'
                ? 'متوفر للتجهيز الطازج'
                : 'Available Fresh'
              : lang === 'ar'
              ? 'نفد حالياً'
              : 'Out of Stock'}
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono-num">
            {product.basePriceSar} {lang === 'ar' ? product.pricingUnitLabelAr : product.pricingUnitLabelEn}
          </span>
        </div>
      </div>

      {/* Product Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div
          onClick={() => onOpenDetail(product.slug)}
          className="cursor-pointer group-hover:text-[#E6061E] transition-colors"
        >
          <h3 className="font-display text-xl font-bold text-[#E0D5CD] leading-snug">
            {lang === 'ar' ? product.nameAr : product.nameEn}
          </h3>
          <span className="block text-xs text-[#9E938B] mt-0.5">
            {lang === 'ar' ? product.nameEn : product.nameAr}
          </span>
        </div>

        <p className="text-xs text-[#9E938B] mt-2.5 line-clamp-2 leading-relaxed">
          {lang === 'ar' ? product.shortDescAr : product.shortDescEn}
        </p>

        {/* Weight & Prep Selectors */}
        <div className="mt-4 space-y-2.5 pt-3 border-t border-[#E0D5CD]/10">
          <div>
            <label className="block text-[11px] text-[#9E938B] mb-1">
              {lang === 'ar' ? 'الوزن / الباقة:' : 'Weight / Package:'}
            </label>
            <select
              value={selectedWeightId}
              onChange={(e) => setSelectedWeightId(e.target.value)}
              className="w-full h-9 px-2.5 rounded-lg bg-black border border-[#E0D5CD]/20 text-xs text-[#E0D5CD] focus:outline-none focus:border-[#A20000]"
            >
              {product.weights.map((w) => (
                <option key={w.id} value={w.id}>
                  {lang === 'ar' ? w.labelAr : w.labelEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] text-[#9E938B] mb-1">
              {lang === 'ar' ? 'خيار التجهيز والتقطيع:' : 'Preparation Option:'}
            </label>
            <select
              value={selectedPrepId}
              onChange={(e) => setSelectedPrepId(e.target.value)}
              className="w-full h-9 px-2.5 rounded-lg bg-black border border-[#E0D5CD]/20 text-xs text-[#E0D5CD] focus:outline-none focus:border-[#A20000]"
            >
              {product.prepOptions.map((p) => (
                <option key={p.id} value={p.id}>
                  {lang === 'ar' ? p.labelAr : p.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer Price + Actions */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <div>
            <div className="font-mono-num text-lg font-bold text-[#E0D5CD]">
              {estimatedUnitPrice} <span className="text-xs font-normal">{lang === 'ar' ? 'ر.س' : 'SAR'}</span>
            </div>
            <span className="block text-[10px] text-[#9E938B]">
              {product.isWeightBased
                ? lang === 'ar'
                  ? 'تقديري حسب الوزن المختار'
                  : 'Estimated by selected weight'
                : lang === 'ar'
                ? 'سعر استرشادي للباقة'
                : 'Illustrative package price'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenDetail(product.slug)}
              className="h-10 px-3 rounded-full border border-[#E0D5CD]/25 text-xs font-semibold text-[#E0D5CD] hover:border-[#E0D5CD] transition-colors whitespace-nowrap"
            >
              {lang === 'ar' ? 'التفاصيل' : 'Details'}
            </button>
            <button
              type="button"
              disabled={!product.inStock}
              onClick={handleQuickAdd}
              className={`h-10 px-4 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                addedFlash
                  ? 'bg-[#25D366] text-black'
                  : 'bg-[#A20000] text-[#E0D5CD] hover:bg-[#E6061E]'
              }`}
            >
              {addedFlash ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'أُضيف' : 'Added'}</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'أضف للسلة' : 'Add'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

interface CartDrawerProps {
  lang: Language;
  cart: CartLineItem[];
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onClose: () => void;
  onProceedToCheckout: () => void;
  onOpenFullCartPage: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  lang,
  cart,
  onUpdateQty,
  onRemove,
  onClose,
  onProceedToCheckout,
  onOpenFullCartPage,
}) => {
  const subtotal = cart.reduce((sum, item) => {
    const w =
      item.product.weights.find((x) => x.id === item.weightId) || item.product.weights[0];
    const p =
      item.product.prepOptions.find((x) => x.id === item.prepId) ||
      item.product.prepOptions[0];
    const unit = Math.round(item.product.basePriceSar * w.priceMultiplier + p.extraPrice);
    return sum + unit * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#080808] border-s border-[#E0D5CD]/15 h-full flex flex-col">
        <div className="p-5 bg-black border-b border-[#E0D5CD]/15 flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-bold text-[#E0D5CD]">
              {lang === 'ar' ? 'سلة تسوق BEEF HOUSE' : 'Your BEEF HOUSE Cart'}
            </h3>
            <p className="text-xs text-[#9E938B]">
              {lang === 'ar'
                ? 'تجهيز طازج حسب طلبك مع حفظ سلسلة التبريد'
                : 'Freshly prepared to order with cold-chain protection'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#9E938B] hover:text-[#E0D5CD]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#9E938B] mx-auto stroke-1" />
              <p className="text-sm text-[#9E938B]">
                {lang === 'ar'
                  ? 'سلة التسوق فارغة حالياً. اكتشف قطعيات الستيك والشواء الطازجة.'
                  : 'Your shopping cart is empty. Explore our fresh steak and grilling cuts.'}
              </p>
            </div>
          ) : (
            cart.map((item) => {
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
                  className="p-3.5 rounded-xl bg-black border border-[#E0D5CD]/12 flex gap-3.5"
                >
                  <img
                    src={item.product.image}
                    alt={lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display text-sm font-bold text-[#E0D5CD] truncate">
                        {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemove(item.key)}
                        className="text-[#9E938B] hover:text-[#E6061E]"
                        aria-label={lang === 'ar' ? 'حذف' : 'Remove'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#9E938B] mt-1">
                      {lang === 'ar' ? w.labelAr : w.labelEn} · {lang === 'ar' ? p.labelAr : p.labelEn}
                    </p>
                    {item.customCuttingNote && (
                      <p className="text-[11px] text-[#E0D5CD]/80 mt-1">
                        {lang === 'ar' ? 'ملاحظة تقطيع: ' : 'Note: '}
                        {item.customCuttingNote}
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 bg-[#080808] border border-[#E0D5CD]/20 rounded-full px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.key, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#E0D5CD]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono-num text-xs font-bold px-1">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.key, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#E0D5CD]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-mono-num text-sm font-bold text-[#E0D5CD]">
                        {unitPrice * item.quantity} {lang === 'ar' ? 'ر.س' : 'SAR'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 bg-black border-t border-[#E0D5CD]/15 space-y-3">
            <div className="p-3 rounded-xl bg-[#080808] border border-[#E0D5CD]/10 text-[11px] text-[#9E938B] leading-relaxed">
              {lang === 'ar'
                ? 'تنويه الأوزان: المنتجات المعتمدة على الوزن تُحسب هنا بالوزن التقديري، ويتم تأكيد الوزن الفعلي النهائي بعد التقطيع والتنظيف قبل الدفع.'
                : 'Weight Notice: Weight-based cuts show estimated pricing; final weight is confirmed after trimming prior to payment.'}
            </div>

            <div className="flex items-center justify-between text-base font-bold text-[#E0D5CD]">
              <span>{lang === 'ar' ? 'المجموع التقديري:' : 'Estimated Subtotal:'}</span>
              <span className="font-mono-num text-xl">
                {subtotal} {lang === 'ar' ? 'ر.س' : 'SAR'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={onOpenFullCartPage}
                className="h-11 rounded-full border border-[#E0D5CD]/30 text-xs font-bold text-[#E0D5CD] hover:border-[#E0D5CD]"
              >
                {lang === 'ar' ? 'مراجعة السلة الكاملة' : 'View Full Cart'}
              </button>
              <button
                type="button"
                onClick={onProceedToCheckout}
                className="h-11 rounded-full bg-[#A20000] text-xs font-bold text-[#E0D5CD] hover:bg-[#E6061E]"
              >
                {lang === 'ar' ? 'إتمام الطلب' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface FooterProps {
  lang: Language;
  liveStatus: LiveBusinessStatus;
  verificationConfig: StoreOwnerVerificationConfig;
  onNavigate: (page: PageId) => void;
  onOpenStoreConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  liveStatus,
  verificationConfig,
  onNavigate,
  onOpenStoreConfig,
}) => {
  const verifiedSocials = verificationConfig.socialLinks.filter(
    (s) => s.verified && s.url.startsWith('http')
  );

  return (
    <footer className="bg-black border-t border-[#E0D5CD]/15 text-[#E0D5CD] pt-16 pb-24">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#E0D5CD]/12">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <BrandLogo size="lg" showWordmark={true} onClick={() => onNavigate('home')} />
            <p className="text-xs text-[#9E938B] leading-relaxed">
              {lang === 'ar'
                ? 'الفرق يبدأ من المصدر. ملحمة فاخرة وركن شواية وسندوتشات في الرياض، نجمع بين جودة القطعية، دقة التجهيز، والشفافية الكاملة.'
                : 'The difference starts at the source. Premium butcher shop & grill corner in Riyadh dedicated to quality cuts, precision preparation, and transparency.'}
            </p>
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  liveStatus.isOpen ? 'bg-[#25D366]' : 'bg-[#A20000]'
                }`}
              />
              <span className="font-bold">
                {lang === 'ar' ? liveStatus.statusBadgeAr : liveStatus.statusBadgeEn}
              </span>
              <span className="text-[#9E938B]">·</span>
              <span className="text-[#9E938B]">
                {lang === 'ar'
                  ? BRAND_TOKENS.schedule.publishedHoursAr
                  : BRAND_TOKENS.schedule.publishedHoursEn}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display text-lg font-bold text-[#E0D5CD] mb-4">
              {lang === 'ar' ? 'عالم BEEF HOUSE' : 'Explore BEEF HOUSE'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9E938B]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#E0D5CD]"
                >
                  {lang === 'ar' ? 'قصتنا وفلسفتنا' : 'Our Brand Story'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('mission')}
                  className="hover:text-[#E0D5CD]"
                >
                  {lang === 'ar' ? 'الرسالة والرؤية والقيم' : 'Mission, Vision & Values'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('quality')}
                  className="hover:text-[#E0D5CD]"
                >
                  {lang === 'ar' ? 'الجودة والمصدر وسلسلة التبريد' : 'Quality & Sourcing'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('cuts-guide')}
                  className="hover:text-[#E0D5CD]"
                >
                  {lang === 'ar'
                    ? 'دليل قطعيات اللحوم التفاعلي'
                    : 'Interactive Meat Cuts Guide'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('recipes')}
                  className="hover:text-[#E0D5CD]"
                >
                  {lang === 'ar' ? 'مركز الوصفات وطرق الطهي' : 'Recipe & Culinary Center'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Store & Categories */}
          <div>
            <h4 className="font-display text-lg font-bold text-[#E0D5CD] mb-4">
              {lang === 'ar' ? 'المتجر والأقسام' : 'Store & Menu'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9E938B]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#E0D5CD]"
                >
                  {lang === 'ar' ? 'المتجر الإلكتروني الكامل' : 'Full Online Butcher Store'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('categories')}
                  className="hover:text-[#E0D5CD]"
                >
                  {lang === 'ar' ? 'أقسام اللحوم والباقات' : 'Meat Categories & Bundles'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('grill-menu')}
                  className="hover:text-[#E0D5CD]"
                >
                  {lang === 'ar' ? 'ركن الشواية والسندوتشات' : 'Grill & Sandwich Corner'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('cart')}
                  className="hover:text-[#E0D5CD]"
                >
                  {lang === 'ar' ? 'سلة التسوق وإتمام الطلب' : 'Shopping Cart & Checkout'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#E0D5CD]"
                >
                  {lang === 'ar' ? 'الأسئلة الشائعة وسياسة الأوزان' : 'FAQs & Weight Policy'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Verified Socials */}
          <div className="space-y-3">
            <h4 className="font-display text-lg font-bold text-[#E0D5CD] mb-4">
              {lang === 'ar' ? 'الموقع والتواصل — الرياض' : 'Location & Contact — Riyadh'}
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-[#9E938B]">
              <MapPin className="w-4 h-4 text-[#A20000] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#E0D5CD]">
                  {lang === 'ar' ? verificationConfig.cityAr : verificationConfig.cityEn}
                </strong>
                <span>
                  {lang === 'ar'
                    ? verificationConfig.districtAndStreetAr
                    : verificationConfig.districtAndStreetEn}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[#9E938B]">
              <Clock className="w-4 h-4 text-[#A20000] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#E0D5CD]">
                  {lang === 'ar' ? 'ساعات العمل الرسمية' : 'Official Opening Hours'}
                </strong>
                <span>
                  {lang === 'ar'
                    ? 'يومياً: 9:00 صباحاً – 12:00 منتصف الليل'
                    : 'Daily: 9:00 AM – 12:00 Midnight'}
                </span>
              </div>
            </div>

            {/* Social Media Section (Section 20: Only link verified accounts; never invent profile URLs) */}
            <div className="pt-2">
              <span className="block text-[11px] text-[#9E938B] mb-2">
                {lang === 'ar' ? 'الحسابات الرسمية:' : 'Official Social Channels:'}
              </span>
              {verifiedSocials.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {verifiedSocials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#080808] border border-[#E0D5CD]/20 text-xs text-[#E0D5CD] hover:border-[#A20000] inline-flex items-center gap-1.5"
                    >
                      <span>{s.label}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-[#9E938B]">
                  {lang === 'ar'
                    ? 'بانتظار ربط روابط الحسابات الموثقة (Instagram / TikTok / Snapchat / X) من الإدارة.'
                    : 'Awaiting verified social profile URLs from store management.'}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onOpenStoreConfig}
              className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#E0D5CD]/80 hover:text-[#E6061E] border border-[#E0D5CD]/15 px-3 py-1.5 rounded-lg"
            >
              <Settings className="w-3.5 h-3.5 text-[#A20000]" />
              <span>
                {lang === 'ar'
                  ? 'لوحة إعدادات البيانات الموثقة'
                  : 'Verified Store Data Settings'}
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Legal & Policy Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E938B]">
          <p>
            © {new Date().getFullYear()} BEEF HOUSE | بيف هاوس — الرياض، المملكة العربية السعودية.
          </p>
          <div className="flex items-center flex-wrap gap-5">
            <button
              type="button"
              onClick={() => onNavigate('privacy')}
              className="hover:text-[#E0D5CD]"
            >
              {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('terms')}
              className="hover:text-[#E0D5CD]"
            >
              {lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="hover:text-[#E0D5CD]"
            >
              {lang === 'ar' ? 'الموقع وساعات العمل' : 'Location & Hours'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
