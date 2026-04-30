import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductImage from '../components/ProductImage';
import { UPSELLS, BRAND } from '../config/brand';
import { submitOrder } from '../utils/sheets';

interface StoredOrder {
  orderId: string;
  bundle: { id: number; label: string; price: number; qty: number };
  customerName: string;
  phone: string;
  city: string;
  orderData: Record<string, unknown>;
}

export default function ThankYouPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [upsellSubmitted, setUpsellSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  useEffect(() => {
    const stored = sessionStorage.getItem('savany_order');
    if (stored) {
      setOrder(JSON.parse(stored));
      // Show upsell modal after 2 seconds
      setTimeout(() => setShowModal(true), 2000);
    }
  }, []);

  const toggleUpsell = (id: string) => {
    setSelectedUpsells((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  const upsellTotal = selectedUpsells.length * 99;

  const handleUpsellSubmit = async () => {
    if (!order || selectedUpsells.length === 0) {
      setShowModal(false);
      setUpsellSubmitted(true);
      return;
    }

    setSubmitStatus('loading');
    try {
      const upsellNames = selectedUpsells
        .map((id) => UPSELLS.find((u) => u.id === id)?.nameAr)
        .join(' + ');

      await submitOrder({
        ...order.orderData as Parameters<typeof submitOrder>[0],
        order_id: order.orderId + '-UPSELL',
        upsells: upsellNames,
        upsells_total: upsellTotal,
        grand_total: order.bundle.price + upsellTotal,
        bundle: order.bundle.id,
        qty: order.bundle.qty,
        price_sar: order.bundle.price,
        call_center_notes: `UPSELL: ${upsellNames} (+${upsellTotal} ر.س) | أصل الطلب: ${order.orderId}`,
      });

      setSubmitStatus('done');
      setUpsellSubmitted(true);
      setTimeout(() => setShowModal(false), 1500);
    } catch {
      setSubmitStatus('idle');
    }
  };

  const whatsappMessage = order
    ? encodeURIComponent(
        `مرحباً سافاني بيوتي 👋\n\nرقم طلبي: ${order.orderId}\nالباقة: ${order.bundle.label}\nالسعر: ${order.bundle.price} ريال\n\nأريد الاستفسار عن طلبي.`
      )
    : '';

  if (!order) {
    return (
      <div dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }} className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen pt-16 px-4 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-black text-emerald-900 mb-3">تم استلام طلبك!</h1>
          <p className="text-gray-500 mb-6">سنتصل بك قريباً لتأكيد الطلب.</p>
          <Link to="/" className="btn-primary" style={{ maxWidth: '240px' }}>
            العودة للرئيسية
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
      <Navbar />

      {/* Upsell Modal */}
      {showModal && !upsellSubmitted && (
        <>
          <div className="overlay" onClick={() => setShowModal(false)} />
          <div
            className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-[1000] w-full md:w-[480px] rounded-2xl overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
          >
            <div
              className="text-center py-4 px-6"
              style={{ background: 'linear-gradient(135deg, #0d3d2e, #1a5c44)' }}
            >
              <p className="text-amber-400 font-bold text-xs tracking-wider mb-1">⚡ عرض خاص لكِ الآن فقط</p>
              <h3 className="text-white font-black text-lg">أكملي روتين جمالك!</h3>
            </div>

            <div className="bg-white p-5">
              <p className="text-center text-sm text-gray-500 mb-4">
                أضيفي هذه المنتجات لطلبك الحالي بسعر خاص حصري
              </p>

              <div className="space-y-3 mb-5">
                {UPSELLS.map((upsell) => (
                  <div
                    key={upsell.id}
                    onClick={() => toggleUpsell(upsell.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedUpsells.includes(upsell.id)
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          selectedUpsells.includes(upsell.id)
                            ? 'border-amber-500 bg-amber-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedUpsells.includes(upsell.id) && (
                          <span className="text-white text-xs font-bold">✓</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{upsell.emoji}</span>
                            <span className="font-bold text-sm text-gray-800">{upsell.nameAr}</span>
                          </div>
                          <div className="text-left">
                            <p className="text-xs text-gray-400 line-through">{upsell.originalPrice} ر.س</p>
                            <p className="font-black text-emerald-900">٩٩ ر.س</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{upsell.descAr}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedUpsells.length > 0 && (
                <div
                  className="rounded-xl p-3 mb-4 text-sm"
                  style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}
                >
                  <div className="flex justify-between">
                    <span className="text-gray-600">إضافة للطلب</span>
                    <span className="font-black text-emerald-900">{upsellTotal} ر.س</span>
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    وفرتِ {UPSELLS.filter(u => selectedUpsells.includes(u.id)).reduce((sum, u) => sum + (u.originalPrice - 99), 0)} ر.س
                  </p>
                </div>
              )}

              <button
                onClick={handleUpsellSubmit}
                className="btn-gold mb-2"
                disabled={submitStatus === 'loading'}
              >
                {submitStatus === 'loading'
                  ? 'جاري الإضافة...'
                  : submitStatus === 'done'
                  ? '✓ تمت الإضافة!'
                  : selectedUpsells.length > 0
                  ? `✅ أضيفي للطلب (+${upsellTotal} ر.س)`
                  : 'متابعة بدون إضافة'}
              </button>

              <button
                onClick={() => { setShowModal(false); setUpsellSubmitted(true); }}
                className="w-full text-center text-xs text-gray-400 hover:text-gray-600 py-2 transition"
              >
                لا شكراً، متابعة بدون إضافة
              </button>
            </div>
          </div>
        </>
      )}

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 pt-24 pb-16">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl"
            style={{ background: 'linear-gradient(135deg, #0d3d2e, #1a5c44)', boxShadow: '0 0 40px rgba(13,61,46,0.3)' }}
          >
            🎉
          </div>
          <h1 className="text-3xl font-black text-emerald-900 mb-2">
            تم استلام طلبك بنجاح!
          </h1>
          <p className="text-gray-500 mb-2">
            شكراً لكِ، {order.customerName.split(' ')[0]}! 💚
          </p>
          <div
            className="inline-block px-4 py-2 rounded-full text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e4c97e)', color: '#0d3d2e' }}
          >
            رقم الطلب: {order.orderId}
          </div>
        </div>

        {/* Order Details */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{
            background: 'linear-gradient(135deg, #faf7f2, #fff9ef)',
            border: '1px solid rgba(201,168,76,0.3)',
          }}
        >
          <h2 className="font-bold text-emerald-900 mb-4">تفاصيل طلبك</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">المنتج</span>
              <span className="font-medium">جاميز سافاني بيوتي للشعر والبشرة والأظافر</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">الباقة</span>
              <span className="font-bold text-emerald-900">{order.bundle.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">السعر</span>
              <span className="font-black text-emerald-900">{order.bundle.price} ر.س</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">طريقة الدفع</span>
              <span className="font-medium">نقداً عند الاستلام</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">مدينة التوصيل</span>
              <span className="font-medium">{order.city}</span>
            </div>
            {upsellSubmitted && selectedUpsells.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">إضافات</span>
                <span className="font-medium text-amber-600">+{upsellTotal} ر.س</span>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-2xl p-6 mb-6 bg-white border border-gray-100 shadow-sm">
          <h2 className="font-bold text-emerald-900 mb-4">🚀 الخطوات القادمة</h2>
          <div className="space-y-4">
            {[
              {
                icon: '📞',
                title: 'تأكيد الطلب',
                desc: 'سيتصل بك فريقنا خلال ساعات العمل (١٠ص – ١٠م) لتأكيد عنوانك وتفاصيل الطلب.',
              },
              {
                icon: '📦',
                title: 'التجهيز والشحن',
                desc: `سيُشحن طلبك فور التأكيد. التوصيل المتوقع: ${order.city === 'الرياض' || order.city === 'جدة' || order.city === 'الدمام' ? '٢-٣ أيام عمل' : '٣-٥ أيام عمل'}.`,
              },
              {
                icon: '💳',
                title: 'الدفع عند الاستلام',
                desc: `ادفعي مبلغ ${order.bundle.price}${selectedUpsells.length > 0 ? ' + ' + upsellTotal : ''} ريال نقداً عند استلام الطلب.`,
              },
              {
                icon: '✨',
                title: 'ابدئي رحلتك',
                desc: 'تناولي ٢ قطعة يومياً مع الأكل واستمتعي بجمالك من الداخل!',
              },
            ].map((step, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: '#f0fdf4', border: '2px solid #bbf7d0' }}
                >
                  {step.icon}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{step.title}</p>
                  <p className="text-gray-500 text-xs leading-relaxed mt-0.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Confirm */}
        <div className="rounded-2xl p-5 mb-6" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <p className="font-bold text-emerald-800 mb-2">📱 تابعي طلبك عبر واتساب</p>
          <p className="text-sm text-gray-500 mb-3">
            يمكنك التواصل معنا عبر واتساب لأي استفسار أو متابعة للطلب
          </p>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            تواصلي عبر واتساب – {BRAND.phone}
          </a>
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-4">
            هذا المنتج مكمل غذائي وليس دواءً. النتائج تختلف من شخص لآخر.
          </p>
          <Link
            to="/"
            className="text-amber-600 hover:text-amber-700 font-medium text-sm underline"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>

      {/* Upsell trigger (if modal was closed) */}
      {!showModal && !upsellSubmitted && (
        <div className="max-w-2xl mx-auto px-4 pb-8">
          <div
            className="rounded-2xl p-5"
            style={{ background: 'linear-gradient(135deg, #0d3d2e, #1a5c44)' }}
          >
            <p className="text-amber-400 font-bold text-xs mb-1">⚡ عرض خاص لليوم فقط</p>
            <h3 className="text-white font-bold mb-1">أكملي روتين جمالك</h3>
            <p className="text-gray-300 text-sm mb-3">أضيفي مستحضرات إضافية بسعر ٩٩ ر.س فقط</p>
            <button
              onClick={() => setShowModal(true)}
              className="btn-gold text-sm"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e4c97e)' }}
            >
              اعرضي العروض الخاصة ✨
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
