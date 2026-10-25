import React, { useState } from 'react';
import { X, Check, ShieldCheck } from 'lucide-react';
import { Language, StoreOwnerVerificationConfig } from '../config/siteConfig';

interface StoreConfigModalProps {
  lang: Language;
  config: StoreOwnerVerificationConfig;
  onSave: (updated: StoreOwnerVerificationConfig) => Promise<void>;
  onClose: () => void;
}

export const StoreConfigModal: React.FC<StoreConfigModalProps> = ({
  lang,
  config,
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState<StoreOwnerVerificationConfig>(config);
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#080808] border border-[#E0D5CD]/20 rounded-2xl overflow-hidden shadow-2xl my-8">
        <div className="p-6 bg-black border-b border-[#E0D5CD]/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#A20000]" />
            <div>
              <h3 className="font-display text-xl font-bold text-[#E0D5CD]">
                {lang === 'ar'
                  ? 'إعدادات البيانات الموثقة لـ BEEF HOUSE'
                  : 'BEEF HOUSE Verified Business Configuration'}
              </h3>
              <p className="text-xs text-[#9E938B]">
                {lang === 'ar'
                  ? 'البيانات المركزية القابلة للتعديل (الهاتف، واتساب، العنوان، المصادر، وحسابات التواصل)'
                  : 'Centralized editable fields for verified phone, WhatsApp, address, sourcing, and social accounts'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#9E938B] hover:text-[#E0D5CD]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#E0D5CD] mb-1.5">
                {lang === 'ar' ? 'رقم الهاتف الرسمي (مثال: +9665XXXXXXXX)' : 'Verified Phone Number'}
              </label>
              <input
                type="text"
                dir="ltr"
                value={form.phoneNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phoneNumber: e.target.value,
                    phoneVerified: e.target.value.trim().length >= 7,
                  })
                }
                placeholder="+966 5X XXX XXXX"
                className="w-full h-11 px-3.5 rounded-xl bg-black border border-[#E0D5CD]/20 text-sm text-[#E0D5CD]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#25D366] mb-1.5">
                {lang === 'ar'
                  ? 'رقم واتساب الرسمي (مثال: 9665XXXXXXXX)'
                  : 'Verified WhatsApp Number'}
              </label>
              <input
                type="text"
                dir="ltr"
                value={form.whatsappNumber}
                onChange={(e) =>
                  setForm({
                    ...form,
                    whatsappNumber: e.target.value,
                    whatsappVerified: e.target.value.replace(/\D/g, '').length >= 8,
                  })
                }
                placeholder="9665XXXXXXXX"
                className="w-full h-11 px-3.5 rounded-xl bg-black border border-[#25D366]/40 text-sm text-[#E0D5CD]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#E0D5CD] mb-1.5">
                {lang === 'ar' ? 'العنوان التفصيلي في الرياض (عربي)' : 'Riyadh Street Address (Arabic)'}
              </label>
              <input
                type="text"
                value={form.districtAndStreetAr}
                onChange={(e) =>
                  setForm({
                    ...form,
                    districtAndStreetAr: e.target.value,
                    addressVerified: true,
                  })
                }
                className="w-full h-11 px-3.5 rounded-xl bg-black border border-[#E0D5CD]/20 text-sm text-[#E0D5CD]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#E0D5CD] mb-1.5">
                {lang === 'ar' ? 'العنوان التفصيلي في الرياض (إنجليزي)' : 'Riyadh Street Address (English)'}
              </label>
              <input
                type="text"
                dir="ltr"
                value={form.districtAndStreetEn}
                onChange={(e) =>
                  setForm({
                    ...form,
                    districtAndStreetEn: e.target.value,
                    addressVerified: true,
                  })
                }
                className="w-full h-11 px-3.5 rounded-xl bg-black border border-[#E0D5CD]/20 text-sm text-[#E0D5CD]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#E0D5CD] mb-1.5">
                {lang === 'ar' ? 'بلد المنشأ والمصادر الموثقة' : 'Verified Country of Origin & Sourcing'}
              </label>
              <textarea
                rows={2}
                value={form.verifiedOriginsAr}
                onChange={(e) =>
                  setForm({
                    ...form,
                    verifiedOriginsAr: e.target.value,
                    supplierDetailsVerified: true,
                  })
                }
                className="w-full p-3 rounded-xl bg-black border border-[#E0D5CD]/20 text-xs text-[#E0D5CD]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#E0D5CD] mb-1.5">
                {lang === 'ar' ? 'الموردون والشهادات المعتمدة' : 'Verified Suppliers & Certifications'}
              </label>
              <textarea
                rows={2}
                value={form.verifiedCertificationsAr}
                onChange={(e) =>
                  setForm({
                    ...form,
                    verifiedCertificationsAr: e.target.value,
                    supplierDetailsVerified: true,
                  })
                }
                className="w-full p-3 rounded-xl bg-black border border-[#E0D5CD]/20 text-xs text-[#E0D5CD]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#E0D5CD] mb-2">
              {lang === 'ar'
                ? 'روابط حسابات التواصل الاجتماعي الرسمية (تظهر فقط عند إدخال رابط فعلي موثق)'
                : 'Verified Social Media Profile URLs (Only displayed when verified URL is provided)'}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {form.socialLinks.map((s, idx) => (
                <div key={s.platform}>
                  <span className="block text-[11px] text-[#9E938B] mb-1">{s.label}</span>
                  <input
                    type="url"
                    dir="ltr"
                    placeholder={`https://${s.platform}.com/beefhouse...`}
                    value={s.url}
                    onChange={(e) => {
                      const next = [...form.socialLinks];
                      next[idx] = {
                        ...s,
                        url: e.target.value,
                        verified: e.target.value.trim().startsWith('http'),
                      };
                      setForm({ ...form, socialLinks: next });
                    }}
                    className="w-full h-10 px-3 rounded-xl bg-black border border-[#E0D5CD]/20 text-xs text-[#E0D5CD]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E0D5CD]/15 flex items-center justify-between gap-4">
            {savedNotice ? (
              <span className="text-xs text-[#25D366] flex items-center gap-1.5 font-semibold">
                <Check className="w-4 h-4" />
                {lang === 'ar' ? 'تم حفظ البيانات الموثقة بنجاح' : 'Verified settings saved'}
              </span>
            ) : (
              <span className="text-xs text-[#9E938B]">
                {lang === 'ar'
                  ? 'يتم حفظ الإعدادات مباشرة في الخادم المركزي'
                  : 'Settings persist directly on the backend server'}
              </span>
            )}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#E0D5CD]/20 text-xs font-semibold text-[#E0D5CD]"
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-[#A20000] text-[#E0D5CD] text-xs font-bold hover:bg-[#E6061E] transition-colors"
              >
                {saving
                  ? lang === 'ar'
                    ? 'جاري الحفظ...'
                    : 'Saving...'
                  : lang === 'ar'
                  ? 'حفظ واعتماد البيانات'
                  : 'Save Verified Details'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
