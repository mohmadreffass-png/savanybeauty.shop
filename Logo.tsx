import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BUNDLES, SAUDI_CITIES, MAJOR_CITIES, BRAND } from '../config/brand';
import { normalizeSaudiPhone, validateSaudiPhone, captureUTM, generateOrderId } from '../utils/phone';
import { submitOrder } from '../utils/sheets';
import { trackSnapchatEvent } from '../utils/sheets';

interface FormData {
  name: string;
  phone: string;
  phoneConfirm: string;
  city: string;
  district: string;
  address: string;
  landmark: string;
  deliveryTime: string;
  notes: string;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  phone?: string;
  phoneConfirm?: string;
  city?: string;
  address?: string;
  consent?: string;
}

interface CheckoutFormProps {
  bundleId: number;
  onClose?: () => void;
}

export default function CheckoutForm({ bundleId }: CheckoutFormProps) {
  const navigate = useNavigate();
  const bundle = BUNDLES.find((b) => b.id === bundleId) || BUNDLES[1];
  const [selectedBundle, setSelectedBundle] = useState(bundle);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    phoneConfirm: '',
    city: '',
    district: '',
    address: '',
    landmark: '',
    deliveryTime: '',
    notes: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [phoneFormatted, setPhoneFormatted] = useState('');

  useEffect(() => {
    setSelectedBundle(BUNDLES.find((b) => b.id === bundleId) || BUNDLES[1]);
  }, [bundleId]);

  // Phone formatter
  useEffect(() => {
    if (form.phone.length >= 7) {
      const normalized = normalizeSaudiPhone(form.phone);
      if (validateSaudiPhone(form.phone)) {
        const digits = normalized.slice(4); // 5XXXXXXXX
        setPhoneFormatted(`0${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7)}`);
      } else {
        setPhoneFormatted('');
      }
    } else {
      setPhoneFormatted('');
    }
  }, [form.phone]);

  const cityDeliveryEta = () => {
    if (!form.city) return null;
    return MAJOR_CITIES.includes(form.city) ? BRAND.deliveryEta.major : BRAND.deliveryEta.other;
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim() || form.name.trim().length < 3) {
      newErrors.name = 'الرجاء إدخال الاسم الكامل (٣ أحرف على الأقل)';
    }
    if (!validateSaudiPhone(form.phone)) {
      newErrors.phone = 'رقم الجوال غير صحيح. مثال: 0512345678';
    }
    if (form.phoneConfirm !== form.phone) {
      newErrors.phoneConfirm = 'رقم الجوال غير متطابق. الرجاء التحقق.';
    }
    if (!form.city) {
      newErrors.city = 'الرجاء اختيار المدينة';
    }
    if (!form.address.trim() || form.address.trim().length < 10) {
      newErrors.address = 'الرجاء إدخال العنوان الكامل (١٠ أحرف على الأقل)';
    }
    if (!form.consent) {
      newErrors.consent = 'يجب الموافقة على تأكيد رقمك الصحيح';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const utm = captureUTM();
      const orderId = generateOrderId();
      const phoneE164 = normalizeSaudiPhone(form.phone);
      const cityLabel = SAUDI_CITIES.find((c) => c.value === form.city)?.label || form.city;
      const eta = cityDeliveryEta();

      const callCenterNotes = [
        `باقة: ${selectedBundle.label} (${selectedBundle.price} ريال)`,
        `المدينة: ${cityLabel}`,
        `الحي: ${form.district || 'غير محدد'}`,
        `العنوان: ${form.address}`,
        `معلم قريب: ${form.landmark || 'غير محدد'}`,
        `وقت التوصيل: ${form.deliveryTime || 'غير محدد'}`,
        `ملاحظات: ${form.notes || 'لا يوجد'}`,
        `ETA: ${eta || 'غير محدد'}`,
      ].join(' | ');

      const orderData = {
        order_id: orderId,
        bundle: selectedBundle.id,
        qty: selectedBundle.qty,
        price_sar: selectedBundle.price,
        upsells: '',
        upsells_total: 0,
        grand_total: selectedBundle.price,
        name: form.name.trim(),
        phone_raw: form.phone,
        phone_e164: phoneE164,
        city: cityLabel,
        district: form.district,
        address: form.address.trim(),
        landmark: form.landmark,
        delivery_time_pref: form.deliveryTime,
        notes: form.notes,
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        utm_content: utm.utm_content,
        utm_term: utm.utm_term,
        referrer: utm.referrer,
        user_agent: utm.user_agent,
        consent_checkbox: form.consent,
        call_center_notes: callCenterNotes,
      };

      // Track pixel
      trackSnapchatEvent('PURCHASE', {
        price: selectedBundle.price,
        currency: 'SAR',
        item_ids: [`bundle-${selectedBundle.id}`],
      });

      await submitOrder(orderData);

      // Store in session for thank you page + upsell
      sessionStorage.setItem(
        'savany_order',
        JSON.stringify({ orderId, bundle: selectedBundle, customerName: form.name, phone: phoneE164, city: cityLabel, orderData })
      );

      navigate('/thank-you');
    } catch (error) {
      console.error('Order submission error:', error);
      alert('حدث خطأ. الرجاء المحاولة مجدداً أو التواصل معنا عبر واتساب.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div style={{ fontFamily: 'Cairo, sans-serif' }} dir="rtl">
      {/* Bundle selector at top of form */}
      <div className="mb-6">
        <p className="font-bold text-gray-700 mb-3 text-sm">اختاري باقتك:</p>
        <div className="grid grid-cols-3 gap-2">
          {BUNDLES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBundle(b)}
              className={`relative p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                selectedBundle.id === b.id
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-gray-200 bg-white hover:border-amber-300'
              }`}
            >
              {b.badge && (
                <span className="absolute -top-2 right-1/2 translate-x-1/2 text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap"
                  style={{ background: b.tag === 'best' ? 'linear-gradient(135deg,#c9a84c,#e4c97e)' : '#0d3d2e', color: b.tag === 'best' ? '#0d3d2e' : 'white' }}>
                  {b.badge}
                </span>
              )}
              <p className="font-bold text-xs text-gray-700 mt-1">{b.label}</p>
              <p className="text-lg font-black" style={{ color: '#0d3d2e' }}>{b.price}<span className="text-xs"> ر.س</span></p>
              {b.saving > 0 && (
                <p className="text-xs text-green-600 font-medium">وفري {b.saving} ر.س</p>
              )}
            </button>
          ))}
        </div>
      </div>

      <hr className="gold-divider mb-6" />

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="mb-4">
          <label className="form-label">
            الاسم الكامل <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="مثال: سارة عبدالله المطيري"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            autoComplete="name"
          />
          {errors.name && <p className="form-error">⚠ {errors.name}</p>}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="form-label">
            رقم الجوال السعودي <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              className={`form-input ${errors.phone ? 'error' : ''}`}
              placeholder="0512345678"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              maxLength={15}
              autoComplete="tel"
              dir="ltr"
              style={{ textAlign: 'right' }}
            />
          </div>
          {phoneFormatted && (
            <p className="text-xs text-green-600 mt-1 font-medium">✓ {phoneFormatted}</p>
          )}
          {errors.phone && <p className="form-error">⚠ {errors.phone}</p>}
          <p className="text-xs text-gray-400 mt-1">مثال: 0512345678 أو +9665XXXXXXXX</p>
        </div>

        {/* Phone Confirm */}
        <div className="mb-4">
          <label className="form-label">
            تأكيد رقم الجوال <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            className={`form-input ${errors.phoneConfirm ? 'error' : ''}`}
            placeholder="أعيدي كتابة رقمك"
            value={form.phoneConfirm}
            onChange={(e) => update('phoneConfirm', e.target.value)}
            maxLength={15}
            dir="ltr"
            style={{ textAlign: 'right' }}
          />
          {errors.phoneConfirm && <p className="form-error">⚠ {errors.phoneConfirm}</p>}
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="form-label">
            المدينة <span className="text-red-500">*</span>
          </label>
          <select
            className={`form-input ${errors.city ? 'error' : ''}`}
            value={form.city}
            onChange={(e) => update('city', e.target.value)}
          >
            <option value="">اختاري مدينتك</option>
            <optgroup label="المدن الرئيسية">
              {SAUDI_CITIES.filter((c) => c.group === 'major').map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </optgroup>
            <optgroup label="مدن أخرى">
              {SAUDI_CITIES.filter((c) => c.group === 'other').map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </optgroup>
          </select>
          {errors.city && <p className="form-error">⚠ {errors.city}</p>}
          {cityDeliveryEta() && (
            <p className="text-xs text-green-600 mt-1 font-medium">
              🚚 التوصيل المتوقع: {cityDeliveryEta()}
            </p>
          )}
        </div>

        {/* District */}
        <div className="mb-4">
          <label className="form-label">الحي / المنطقة</label>
          <input
            type="text"
            className="form-input"
            placeholder="مثال: حي النخيل، حي العليا"
            value={form.district}
            onChange={(e) => update('district', e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-1">مهم لتسريع التوصيل</p>
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="form-label">
            العنوان التفصيلي <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`form-input min-h-[80px] resize-none ${errors.address ? 'error' : ''}`}
            placeholder="مثال: شارع الأمير محمد بن سلمان، مبنى رقم ٢٤، شقة ٣"
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            rows={3}
          />
          {errors.address && <p className="form-error">⚠ {errors.address}</p>}
        </div>

        {/* Landmark */}
        <div className="mb-4">
          <label className="form-label">معلم قريب (اختياري)</label>
          <input
            type="text"
            className="form-input"
            placeholder="مثال: بجانب صيدلية النهدي، قريب من مسجد..."
            value={form.landmark}
            onChange={(e) => update('landmark', e.target.value)}
          />
        </div>

        {/* Delivery Time */}
        <div className="mb-4">
          <label className="form-label">وقت التوصيل المفضل (اختياري)</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'morning', label: '🌅 صباحاً (٨ص - ١٢م)' },
              { value: 'evening', label: '🌆 مساءً (٤م - ١٠م)' },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update('deliveryTime', form.deliveryTime === opt.value ? '' : opt.value)}
                className={`py-2.5 px-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  form.deliveryTime === opt.value
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="form-label">ملاحظات للمندوب (اختياري)</label>
          <input
            type="text"
            className="form-input"
            placeholder="أي تعليمات خاصة للمندوب"
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
          />
        </div>

        {/* Order Summary */}
        <div className="rounded-xl p-4 mb-5" style={{ background: 'linear-gradient(135deg, #faf7f2, #fff9ef)', border: '1px solid rgba(201,168,76,0.3)' }}>
          <h4 className="font-bold text-gray-700 mb-3 text-sm">ملخص الطلب</h4>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">{selectedBundle.label}</span>
            <span className="font-bold" style={{ color: '#0d3d2e' }}>{selectedBundle.price} ر.س</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">التوصيل</span>
            <span className="font-medium text-green-600">
              {selectedBundle.id > 1 ? 'مجاني 🎁' : 'محسوب عند الاستلام'}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">طريقة الدفع</span>
            <span className="font-medium">نقداً عند الاستلام</span>
          </div>
          {selectedBundle.saving > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600 font-medium">وفرتِ</span>
              <span className="text-green-600 font-bold">{selectedBundle.saving} ر.س</span>
            </div>
          )}
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(201,168,76,0.3)' }}>
            <div className="flex justify-between">
              <span className="font-bold text-gray-800">المجموع</span>
              <span className="font-black text-xl" style={{ color: '#0d3d2e' }}>{selectedBundle.price} ر.س</span>
            </div>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className={`rounded-xl p-4 mb-5 ${errors.consent ? 'bg-red-50 border border-red-200' : 'bg-emerald-50 border border-emerald-200'}`}>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="custom-check mt-0.5"
              checked={form.consent}
              onChange={(e) => update('consent', e.target.checked)}
            />
            <span className="text-sm font-medium text-gray-700 leading-relaxed">
              أؤكد أن رقمي صحيح وسأرد على اتصال التأكيد من فريق سافاني بيوتي
            </span>
          </label>
          {errors.consent && <p className="form-error mt-2">⚠ {errors.consent}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gold"
          style={{ fontSize: '1.05rem' }}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              جاري إرسال طلبك...
            </span>
          ) : (
            <>
              🛒 تأكيد الطلب – {selectedBundle.price} ر.س
            </>
          )}
        </button>

        {/* Security note */}
        <p className="text-center text-xs text-gray-400 mt-3">
          🔒 معلوماتك محمية وآمنة تماماً. الدفع فقط عند الاستلام.
        </p>

        {/* WhatsApp alt */}
        <div className="mt-4">
          <p className="text-center text-xs text-gray-400 mb-2">أو اطلبي مباشرة عبر</p>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`مرحباً، أريد الطلب:\n• الباقة: ${selectedBundle.label}\n• السعر: ${selectedBundle.price} ريال\nالاسم: ${form.name || '...'}\nالمدينة: ${SAUDI_CITIES.find(c => c.value === form.city)?.label || '...'}\nالعنوان: ${form.address || '...'}\nالجوال: ${form.phone || '...'}\n\n#سافاني_بيوتي`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            اطلبي عبر واتساب
          </a>
        </div>
      </form>
    </div>
  );
}
