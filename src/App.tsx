/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Language,
  PageId,
  ProductItem,
  PRODUCTS_DATA,
  INITIAL_VERIFICATION_CONFIG,
  StoreOwnerVerificationConfig,
  getRiyadhBusinessStatus,
  LiveBusinessStatus,
  BRAND_TOKENS,
} from './config/siteConfig';
import {
  Header,
  Footer,
  CartDrawer,
  CartLineItem,
} from './components/LayoutComponents';
import { HomePage } from './components/HomePage';
import {
  CatalogPage,
  CategoriesPage,
  ProductDetailPage,
  CartAndCheckoutView,
  OrderConfirmationPage,
} from './components/CommercePages';
import {
  CutsGuidePage,
  CutDetailPage,
  GrillMenuPage,
  RecipesListPage,
  RecipeDetailPage,
  BrandStoryPage,
  QualitySourcingPage,
  ContactLocationPage,
  FaqLegalOr404Page,
} from './components/ContentPages';
import { FloatingWidgets } from './components/FloatingWidgets';
import { StoreConfigModal } from './components/StoreConfigModal';

const VALID_PAGES: PageId[] = [
  'home',
  'catalog',
  'categories',
  'product-detail',
  'cart',
  'checkout',
  'order-confirmation',
  'cuts-guide',
  'cut-detail',
  'grill-menu',
  'story',
  'mission',
  'quality',
  'recipes',
  'recipe-detail',
  'contact',
  'faq',
  'privacy',
  'terms',
  '404',
];

function loadSavedCart(): CartLineItem[] {
  try {
    const raw = localStorage.getItem('bh_cart_v1');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item: any) => {
        const product = PRODUCTS_DATA.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          key: item.key,
          product,
          weightId: item.weightId || product.weights[0]?.id || '',
          prepId: item.prepId || product.prepOptions[0]?.id || '',
          quantity: Number(item.quantity) || 1,
          customCuttingNote: item.customCuttingNote || '',
        };
      })
      .filter(Boolean) as CartLineItem[];
  } catch {
    return [];
  }
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') === 'en' ? 'en' : 'ar';
  });

  const [activePage, setActivePage] = useState<PageId>(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('page') as PageId | null;
    if (!p) return 'home';
    return VALID_PAGES.includes(p) ? p : '404';
  });

  const [activeSlug, setActiveSlug] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('slug') || '';
  });

  const [catalogCategoryFilter, setCatalogCategoryFilter] = useState<string>('all');
  const [catalogSearchQuery, setCatalogSearchQuery] = useState<string>('');

  const [cart, setCart] = useState<CartLineItem[]>(() => loadSavedCart());
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [liveStatus, setLiveStatus] = useState<LiveBusinessStatus>(() =>
    getRiyadhBusinessStatus(new Date())
  );
  const [verificationConfig, setVerificationConfig] =
    useState<StoreOwnerVerificationConfig>(INITIAL_VERIFICATION_CONFIG);
  const [storeConfigModalOpen, setStoreConfigModalOpen] = useState(false);

  // Sync HTML dir & lang attributes + Dynamic Page Title & Meta Description (SEO Section 21)
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const titlesAr: Record<PageId, string> = {
      home: BRAND_TOKENS.fullTitleAr,
      catalog: 'المتجر الإلكتروني وكتالوج اللحوم | BEEF HOUSE الرياض',
      categories: 'أقسام اللحوم، الستيك، والشواية | BEEF HOUSE الرياض',
      'product-detail': 'تفاصيل المنتج والتجهيز | BEEF HOUSE الرياض',
      cart: 'سلة التسوق | BEEF HOUSE الرياض',
      checkout: 'إتمام الطلب والتوصيل المبرد | BEEF HOUSE الرياض',
      'order-confirmation': 'تأكيد الطلب الرسمي | BEEF HOUSE الرياض',
      'cuts-guide': 'دليل قطعيات اللحوم — اعرف قطعتك قبل أن تطلبها | BEEF HOUSE',
      'cut-detail': 'دليل القطعية وطرق الطهي | BEEF HOUSE الرياض',
      'grill-menu': 'ركن الشواية والسندوتشات | BEEF HOUSE الرياض',
      story: 'قصتنا — عالم BEEF HOUSE | الرياض',
      mission: 'الرسالة والرؤية والقيم | BEEF HOUSE الرياض',
      quality: 'الجودة والمصدر وسلسلة التبريد | BEEF HOUSE الرياض',
      recipes: 'مركز الوصفات وفنون طهي اللحوم | BEEF HOUSE',
      'recipe-detail': 'وصفة وطريقة التحضير | BEEF HOUSE الرياض',
      contact: 'الموقع وساعات العمل والتواصل | BEEF HOUSE الرياض',
      faq: 'الأسئلة الشائعة | BEEF HOUSE الرياض',
      privacy: 'سياسة الخصوصية | BEEF HOUSE الرياض',
      terms: 'الشروط والأحكام وسياسة الأوزان | BEEF HOUSE الرياض',
      '404': 'الصفحة غير موجودة | BEEF HOUSE',
    };

    const titlesEn: Record<PageId, string> = {
      home: BRAND_TOKENS.fullTitleEn,
      catalog: 'Online Butcher Store & Meat Catalog | BEEF HOUSE Riyadh',
      categories: 'Meat Cuts & Grill Categories | BEEF HOUSE Riyadh',
      'product-detail': 'Product Details & Custom Prep | BEEF HOUSE Riyadh',
      cart: 'Shopping Cart | BEEF HOUSE Riyadh',
      checkout: 'Checkout & Chilled Delivery | BEEF HOUSE Riyadh',
      'order-confirmation': 'Order Confirmation | BEEF HOUSE Riyadh',
      'cuts-guide': 'Meat Cuts Guide — Know Your Cut | BEEF HOUSE Riyadh',
      'cut-detail': 'Cut Anatomy & Cooking Guide | BEEF HOUSE Riyadh',
      'grill-menu': 'Grill & Sandwich Corner Menu | BEEF HOUSE Riyadh',
      story: 'Our Story — The World of BEEF HOUSE | Riyadh',
      mission: 'Mission, Vision & Core Values | BEEF HOUSE Riyadh',
      quality: 'Quality, Sourcing & Cold-Chain | BEEF HOUSE Riyadh',
      recipes: 'Recipe & Culinary Center | BEEF HOUSE Riyadh',
      'recipe-detail': 'Recipe & Cooking Method | BEEF HOUSE Riyadh',
      contact: 'Location, Live Hours & Contact | BEEF HOUSE Riyadh',
      faq: 'Frequently Asked Questions | BEEF HOUSE Riyadh',
      privacy: 'Privacy Policy | BEEF HOUSE Riyadh',
      terms: 'Terms, Conditions & Weight Policy | BEEF HOUSE Riyadh',
      '404': 'Page Not Found | BEEF HOUSE',
    };

    document.title = lang === 'ar' ? titlesAr[activePage] : titlesEn[activePage];
  }, [lang, activePage]);

  // Save cart to localStorage
  useEffect(() => {
    try {
      const serializable = cart.map((c) => ({
        key: c.key,
        productId: c.product.id,
        weightId: c.weightId,
        prepId: c.prepId,
        quantity: c.quantity,
        customCuttingNote: c.customCuttingNote,
      }));
      localStorage.setItem('bh_cart_v1', JSON.stringify(serializable));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  // Live Riyadh Opening Hours Auto-Updater (Section 18: updates every 15s and at exact 9 AM / Midnight boundaries)
  useEffect(() => {
    const updateRiyadhClock = () => {
      setLiveStatus(getRiyadhBusinessStatus(new Date()));
    };
    updateRiyadhClock();
    const intervalId = setInterval(updateRiyadhClock, 15000);
    return () => clearInterval(intervalId);
  }, []);

  // Load centralized backend store verification config
  useEffect(() => {
    fetch('/api/config')
      .then((r) => r.json())
      .then((data) => {
        if (data?.verificationConfig) {
          setVerificationConfig(data.verificationConfig);
        }
        if (data?.liveStatus) {
          setLiveStatus(data.liveStatus);
        }
      })
      .catch(() => {
        // Fallback to local config if offline
      });
  }, []);

  // Browser History Popstate Handler
  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const p = (params.get('page') as PageId) || 'home';
      const s = params.get('slug') || '';
      setActivePage(VALID_PAGES.includes(p) ? p : '404');
      setActiveSlug(s);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback(
    (page: PageId, slug: string = '') => {
      setActivePage(page);
      setActiveSlug(slug);
      const url = new URL(window.location.href);
      if (page === 'home') {
        url.searchParams.delete('page');
      } else {
        url.searchParams.set('page', page);
      }
      if (slug) {
        url.searchParams.set('slug', slug);
      } else {
        url.searchParams.delete('slug');
      }
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const toggleLanguage = () => {
    const nextLang: Language = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', nextLang);
    window.history.replaceState({}, '', url.toString());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const handleAddToCart = (
    product: ProductItem,
    weightId: string,
    prepId: string,
    qty: number = 1,
    customCuttingNote: string = ''
  ) => {
    const lineKey = `${product.id}|${weightId}|${prepId}|${customCuttingNote.trim()}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === lineKey);
      if (existing) {
        return prev.map((item) =>
          item.key === lineKey ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          key: lineKey,
          product,
          weightId,
          prepId,
          quantity: qty,
          customCuttingNote: customCuttingNote.trim(),
        },
      ];
    });
    setCartBump(true);
    setTimeout(() => setCartBump(false), 450);
    showToast(
      lang === 'ar'
        ? `أُضيف "${product.nameAr}" إلى سلة التسوق`
        : `Added "${product.nameEn}" to cart`
    );
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev.flatMap((item) => {
        if (item.key !== key) return [item];
        const nextQty = item.quantity + delta;
        return nextQty <= 0 ? [] : [{ ...item, quantity: nextQty }];
      })
    );
  };

  const handleRemoveCartItem = (key: string) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const handleSaveStoreConfig = async (updated: StoreOwnerVerificationConfig) => {
    const res = await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    const data = await res.json();
    if (data?.verificationConfig) {
      setVerificationConfig(data.verificationConfig);
    } else {
      setVerificationConfig(updated);
    }
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-[#E0D5CD] flex flex-col">
      {/* 1. Premium Navigation Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLanguage}
        activePage={activePage}
        onNavigate={(p, s) => {
          if (p === 'catalog') {
            setCatalogCategoryFilter('all');
          }
          navigate(p, s);
        }}
        cartCount={totalCartItems}
        cartBump={cartBump}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenSearch={() => {
          setCatalogCategoryFilter('all');
          navigate('catalog');
        }}
        liveStatus={liveStatus}
      />

      {/* Main Page Router (All 20 Required Pages in Section 22) */}
      <main className="flex-1 bg-black">
        {activePage === 'home' && (
          <HomePage
            lang={lang}
            liveStatus={liveStatus}
            verificationConfig={verificationConfig}
            onNavigate={navigate}
            onSelectCategoryInCatalog={(catId) => {
              setCatalogCategoryFilter(catId);
              navigate('catalog');
            }}
            onAddToCart={handleAddToCart}
            onOpenStoreConfig={() => setStoreConfigModalOpen(true)}
          />
        )}

        {activePage === 'catalog' && (
          <CatalogPage
            key={catalogCategoryFilter}
            lang={lang}
            initialCategory={catalogCategoryFilter}
            initialSearch={catalogSearchQuery}
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'categories' && (
          <CategoriesPage
            lang={lang}
            onNavigate={navigate}
            onSelectCategoryInCatalog={(catId) => {
              setCatalogCategoryFilter(catId);
              navigate('catalog');
            }}
          />
        )}

        {activePage === 'product-detail' && (
          <ProductDetailPage
            key={activeSlug}
            lang={lang}
            slug={activeSlug}
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {(activePage === 'cart' || activePage === 'checkout') && (
          <CartAndCheckoutView
            mode={activePage}
            lang={lang}
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemove={handleRemoveCartItem}
            onNavigate={navigate}
            onOrderConfirmed={(order) => {
              setConfirmedOrder(order);
              setCart([]);
              navigate('order-confirmation');
            }}
          />
        )}

        {activePage === 'order-confirmation' && (
          <OrderConfirmationPage
            lang={lang}
            order={confirmedOrder}
            onNavigate={navigate}
          />
        )}

        {activePage === 'cuts-guide' && (
          <CutsGuidePage lang={lang} onNavigate={navigate} />
        )}

        {activePage === 'cut-detail' && (
          <CutDetailPage
            key={activeSlug}
            lang={lang}
            slug={activeSlug}
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'grill-menu' && (
          <GrillMenuPage
            lang={lang}
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {(activePage === 'story' || activePage === 'mission') && (
          <BrandStoryPage
            lang={lang}
            mode={activePage}
            onNavigate={navigate}
          />
        )}

        {activePage === 'quality' && (
          <QualitySourcingPage
            lang={lang}
            verificationConfig={verificationConfig}
            onOpenStoreConfig={() => setStoreConfigModalOpen(true)}
            onNavigate={navigate}
          />
        )}

        {activePage === 'recipes' && (
          <RecipesListPage lang={lang} onNavigate={navigate} />
        )}

        {activePage === 'recipe-detail' && (
          <RecipeDetailPage
            key={activeSlug}
            lang={lang}
            slug={activeSlug}
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePage === 'contact' && (
          <ContactLocationPage
            lang={lang}
            liveStatus={liveStatus}
            verificationConfig={verificationConfig}
            onOpenStoreConfig={() => setStoreConfigModalOpen(true)}
            onNavigate={navigate}
          />
        )}

        {(activePage === 'faq' ||
          activePage === 'privacy' ||
          activePage === 'terms' ||
          activePage === '404') && (
          <FaqLegalOr404Page
            mode={activePage}
            lang={lang}
            onNavigate={navigate}
          />
        )}
      </main>

      {/* 15. Premium Footer */}
      <Footer
        lang={lang}
        liveStatus={liveStatus}
        verificationConfig={verificationConfig}
        onNavigate={navigate}
        onOpenStoreConfig={() => setStoreConfigModalOpen(true)}
      />

      {/* Slide-Over Cart Drawer */}
      {cartDrawerOpen && (
        <CartDrawer
          lang={lang}
          cart={cart}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemoveCartItem}
          onClose={() => setCartDrawerOpen(false)}
          onOpenFullCartPage={() => {
            setCartDrawerOpen(false);
            navigate('cart');
          }}
          onProceedToCheckout={() => {
            setCartDrawerOpen(false);
            navigate('checkout');
          }}
        />
      )}

      {/* Store Owner Verified Configuration Modal */}
      {storeConfigModalOpen && (
        <StoreConfigModal
          lang={lang}
          config={verificationConfig}
          onSave={handleSaveStoreConfig}
          onClose={() => setStoreConfigModalOpen(false)}
        />
      )}

      {/* Persistent Official Green WhatsApp Icon (#25D366) + Gemini AI Assistant */}
      <FloatingWidgets
        lang={lang}
        verificationConfig={verificationConfig}
        onOpenStoreConfig={() => setStoreConfigModalOpen(true)}
        onNavigate={navigate}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
          <div className="px-5 py-3 rounded-full bg-[#A20000] text-[#E0D5CD] text-xs sm:text-sm font-bold shadow-2xl border border-[#E0D5CD]/25">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
