import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Sparkles, Send, X, PhoneCall, Settings, AlertCircle } from 'lucide-react';
import { Language, StoreOwnerVerificationConfig, PageId } from '../config/siteConfig';

interface FloatingWidgetsProps {
  lang: Language;
  verificationConfig: StoreOwnerVerificationConfig;
  onOpenStoreConfig: () => void;
  onNavigate: (page: PageId) => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({
  lang,
  verificationConfig,
  onOpenStoreConfig,
  onNavigate,
}) => {
  const [aiOpen, setAiOpen] = useState(false);
  const [waInfoOpen, setWaInfoOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiConfigured, setAiConfigured] = useState<boolean>(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text:
        lang === 'ar'
          ? 'مرحباً بك في BEEF HOUSE | بيف هاوس. أنا مساعدك الذكي للإجابة عن قطعيات اللحوم، طرق الطهي، الأسعار الاسترشادية، وساعات العمل في الرياض. كيف يمكنني خدمتك اليوم؟'
          : 'Welcome to BEEF HOUSE in Riyadh. I am your AI Butcher & Culinary Assistant—ask me about steak cuts, cooking methods, weights, prices, or opening hours.',
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aiOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, aiOpen]);

  const quickQuestions =
    lang === 'ar'
      ? [
          'ما الفرق بين الريب آي والستريب لوين؟',
          'ما هي أفضل قطعية للكبسة والطبخ البطيء؟',
          'كيف يتم حساب السعر للمنتجات الموزونة؟',
          'ما هي ساعات عمل BEEF HOUSE الآن؟',
        ]
      : [
          'What is the difference between Ribeye and Striploin?',
          'Which cut is best for traditional Saudi Kabsa?',
          'How does estimated vs. final weight pricing work?',
          'What are your opening hours in Riyadh right now?',
        ];

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query || loading) return;

    const updatedHistory: ChatMessage[] = [...messages, { role: 'user', text: query }];
    setMessages(updatedHistory);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: updatedHistory.slice(-6),
          lang,
        }),
      });
      const data = await res.json();
      if (data.aiConfigured === false) {
        setAiConfigured(false);
      }
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text:
              data.error ||
              (lang === 'ar'
                ? 'تعذر الاتصال بالمساعد الذكي حالياً. يمكنك تصفح دليل القطعيات أو التواصل معنا عبر واتساب.'
                : 'Unable to reach the AI assistant right now. You can browse our Cuts Guide or contact us via WhatsApp.'),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text:
            lang === 'ar'
              ? 'حدث خطأ في الشبكة. يرجى المحاولة مرة أخرى أو استخدام خيار التواصل المباشر.'
              : 'Network error occurred. Please try again or use direct WhatsApp support.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const whatsappGreeting =
    lang === 'ar'
      ? verificationConfig.whatsappDefaultGreetingAr
      : verificationConfig.whatsappDefaultGreetingEn;

  const cleanWaNumber = (verificationConfig.whatsappNumber || '').replace(/[^\d]/g, '');
  const hasVerifiedWhatsApp = verificationConfig.whatsappVerified && cleanWaNumber.length >= 8;
  const whatsappHref = hasVerifiedWhatsApp
    ? `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(whatsappGreeting)}`
    : undefined;

  return (
    <>
      {/* Persistent Floating Action Cluster (Bottom Corner) */}
      <div
        className={`fixed bottom-5 z-40 flex flex-col gap-3 ${
          lang === 'ar' ? 'left-5 items-start' : 'right-5 items-end'
        }`}
      >
        {/* AI Customer Assistant Trigger Button */}
        <button
          type="button"
          onClick={() => {
            setAiOpen((v) => !v);
            setWaInfoOpen(false);
          }}
          className="group flex items-center gap-2.5 h-12 px-4 rounded-full bg-[#0E0E0E] text-[#E0D5CD] border border-[#A20000] shadow-xl hover:bg-[#A20000] transition-colors whitespace-nowrap"
          aria-label={lang === 'ar' ? 'مساعد BEEF HOUSE الذكي' : 'BEEF HOUSE AI Assistant'}
        >
          <Sparkles className="w-4 h-4 text-[#E0D5CD] shrink-0" />
          <span className="text-xs md:text-sm font-semibold">
            {lang === 'ar' ? 'مستشار اللحوم الذكي (AI)' : 'AI Butcher Assistant'}
          </span>
        </button>

        {/* MANDATORY OFFICIAL GREEN WHATSAPP FLOATING ICON (#25D366) */}
        {hasVerifiedWhatsApp ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 h-14 px-5 rounded-full bg-[#25D366] text-black font-bold shadow-2xl hover:brightness-105 transition-transform active:scale-95 whitespace-nowrap"
            aria-label={lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
          >
            <MessageCircle className="w-6 h-6 fill-black text-[#25D366] shrink-0" />
            <span className="text-sm font-bold text-black">
              {lang === 'ar' ? 'واتساب مباشر' : 'WhatsApp Us'}
            </span>
          </a>
        ) : (
          <button
            type="button"
            onClick={() => {
              setWaInfoOpen((v) => !v);
              setAiOpen(false);
            }}
            className="flex items-center gap-2.5 h-14 px-5 rounded-full bg-[#25D366] text-black font-bold shadow-2xl hover:brightness-105 transition-transform active:scale-95 whitespace-nowrap"
            aria-label={lang === 'ar' ? 'تواصل عبر واتساب (بانتظار ربط الرقم)' : 'WhatsApp Configuration'}
          >
            <MessageCircle className="w-6 h-6 fill-black text-[#25D366] shrink-0" />
            <span className="text-sm font-bold text-black">
              {lang === 'ar' ? 'واتساب BEEF HOUSE' : 'WhatsApp'}
            </span>
          </button>
        )}
      </div>

      {/* WhatsApp Verification Transparency Popover (when real number is not yet supplied) */}
      {waInfoOpen && (
        <div
          className={`fixed bottom-24 z-50 w-[min(380px,calc(100vw-40px))] bg-[#080808] border border-[#25D366]/60 rounded-2xl p-5 shadow-2xl text-[#E0D5CD] ${
            lang === 'ar' ? 'left-5' : 'right-5'
          }`}
        >
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E0D5CD]/15">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#25D366] text-black flex items-center justify-center font-bold">
                <MessageCircle className="w-5 h-5" />
              </span>
              <div>
                <h4 className="font-display text-base font-bold text-[#E0D5CD]">
                  {lang === 'ar' ? 'التواصل عبر واتساب الرسمي' : 'Official WhatsApp Channel'}
                </h4>
                <span className="text-xs text-[#25D366]">
                  {lang === 'ar' ? 'بانتظار إدخال الرقم الرسمي الموثق' : 'Awaiting Verified Business Number'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setWaInfoOpen(false)}
              className="p-1.5 rounded-lg text-[#9E938B] hover:text-[#E0D5CD]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#9E938B] leading-relaxed mt-3">
            {lang === 'ar'
              ? 'التزاماً بالشفافية وعدم اختلاق أرقام تواصل غير موثقة، تم تجهيز ربط واتساب الرسمي مع رسالة الترحيب التلقائية وهو بانتظار إدخال رقم BEEF HOUSE الموثق من الإدارة.'
              : 'In compliance with strict data accuracy, we never invent unverified phone numbers. This official WhatsApp integration is wired and awaiting the store owner’s verified number.'}
          </p>

          <div className="mt-3 p-3 rounded-xl bg-black border border-[#E0D5CD]/10 text-xs text-[#E0D5CD]/90">
            <span className="block text-[11px] text-[#9E938B] mb-1">
              {lang === 'ar' ? 'رسالة البدء التلقائية المجهزة:' : 'Prefilled Greeting Message:'}
            </span>
            "{whatsappGreeting}"
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setWaInfoOpen(false);
                onOpenStoreConfig();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-black font-bold text-xs flex items-center justify-center gap-2 hover:brightness-105"
            >
              <Settings className="w-4 h-4" />
              {lang === 'ar'
                ? 'إدخال رقم واتساب الموثق (لوحة الإدارة)'
                : 'Configure Verified WhatsApp Number'}
            </button>
            <button
              type="button"
              onClick={() => {
                setWaInfoOpen(false);
                setAiOpen(true);
              }}
              className="w-full py-2 px-4 rounded-xl bg-black border border-[#E0D5CD]/20 text-[#E0D5CD] text-xs font-medium hover:border-[#E0D5CD]/50"
            >
              {lang === 'ar'
                ? 'اسأل مستشار اللحوم الذكي الآن'
                : 'Ask AI Butcher Assistant Instead'}
            </button>
          </div>
        </div>
      )}

      {/* AI Customer Assistant Drawer / Window */}
      {aiOpen && (
        <div
          className={`fixed bottom-24 z-50 w-[min(420px,calc(100vw-32px))] h-[min(580px,calc(100vh-130px))] bg-[#080808] border border-[#E0D5CD]/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden ${
            lang === 'ar' ? 'left-4' : 'right-4'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-black border-b border-[#E0D5CD]/15 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#A20000] text-[#E0D5CD] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-[#E0D5CD]">
                  {lang === 'ar' ? 'مستشار BEEF HOUSE الذكي' : 'BEEF HOUSE AI Assistant'}
                </h3>
                <p className="text-[11px] text-[#9E938B]">
                  {lang === 'ar'
                    ? 'متصل ببيانات القطعيات والأسعار وساعات العمل'
                    : 'Connected to approved cuts, prices & Riyadh hours'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAiOpen(false)}
              className="p-1.5 rounded-lg text-[#9E938B] hover:text-[#E0D5CD] hover:bg-[#E0D5CD]/10"
              aria-label={lang === 'ar' ? 'إغلاق' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black">
            {!aiConfigured && (
              <div className="p-3 rounded-xl bg-[#A20000]/20 border border-[#A20000] text-xs text-[#E0D5CD] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#E6061E] shrink-0 mt-0.5" />
                <div>
                  {lang === 'ar'
                    ? 'ملاحظة: خدمة الذكاء الاصطناعي الحية تتطلب ضبط GEMINI_API_KEY في الخادم. لا نستخدم ردوداً نصية وهمية.'
                    : 'Note: Live AI requires GEMINI_API_KEY configured on the server. We never fake static scripts as live AI.'}
                </div>
              </div>
            )}

            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-[#A20000] text-[#E0D5CD]'
                      : 'bg-[#0E0E0E] text-[#E0D5CD] border border-[#E0D5CD]/12'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#0E0E0E] border border-[#E0D5CD]/12 rounded-2xl px-4 py-3 text-xs text-[#9E938B]">
                  {lang === 'ar'
                    ? 'جاري مراجعة بيانات BEEF HOUSE والرد...'
                    : 'Checking BEEF HOUSE catalog & responding...'}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Starter Chips */}
          <div className="px-3 py-2 bg-[#080808] border-t border-[#E0D5CD]/10 flex gap-1.5 overflow-x-auto">
            {quickQuestions.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => sendMessage(q)}
                disabled={loading}
                className="px-2.5 py-1 rounded-lg bg-black border border-[#E0D5CD]/15 text-[11px] text-[#E0D5CD]/85 hover:border-[#A20000] whitespace-nowrap shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input + Human Fallback */}
          <div className="p-3 bg-[#080808] border-t border-[#E0D5CD]/15 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  lang === 'ar'
                    ? 'اسأل عن أي قطعية، طريقة طهي، أو سعر...'
                    : 'Ask about any cut, recipe, price, or policy...'
                }
                className="flex-1 h-10 px-3.5 rounded-xl bg-black border border-[#E0D5CD]/20 text-xs md:text-sm text-[#E0D5CD] placeholder:text-[#9E938B] focus:outline-none focus:border-[#A20000]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-10 w-10 rounded-xl bg-[#A20000] text-[#E0D5CD] flex items-center justify-center hover:bg-[#E6061E] disabled:opacity-40 transition-colors shrink-0"
                aria-label={lang === 'ar' ? 'إرسال' : 'Send'}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Human Support & WhatsApp Fallback Bar */}
            <div className="flex items-center justify-between text-[11px] text-[#9E938B] pt-1">
              <span>
                {lang === 'ar' ? 'تفضل التحدث مع جزار مختص؟' : 'Need human butcher support?'}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setAiOpen(false);
                    onNavigate('contact');
                  }}
                  className="text-[#E0D5CD] underline hover:text-[#E6061E] inline-flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  {lang === 'ar' ? 'صفحة التواصل' : 'Contact Us'}
                </button>
                {hasVerifiedWhatsApp ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-semibold hover:underline"
                  >
                    {lang === 'ar' ? 'واتساب مباشر' : 'WhatsApp'}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAiOpen(false);
                      setWaInfoOpen(true);
                    }}
                    className="text-[#25D366] font-semibold hover:underline"
                  >
                    {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
