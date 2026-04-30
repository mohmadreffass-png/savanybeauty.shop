import { useState, useEffect, useRef } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductImage from '../components/ProductImage';
import CheckoutForm from '../components/CheckoutForm';
import { BUNDLES, REVIEWS, FAQS, INGREDIENTS, TRUST_BADGES, COPY } from '../config/brand';
import { trackSnapchatEvent } from '../utils/sheets';

export default function ProductPage() {
  const [selectedBundle, setSelectedBundle] = useState(2); // default: 2 bottles (most popular)
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackSnapchatEvent('VIEW_CONTENT', { page: 'product', item_id: 'hair-skin-nails-gummies' });

    const handleScroll = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom ?? 0;
      setShowStickyBar(heroBottom < 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrderNow = (bundleId: number) => {
    setSelectedBundle(bundleId);
    trackSnapchatEvent('INITIATE_CHECKOUT', { bundle: bundleId });
    setTimeout(() => {
      checkoutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const currentBundle = BUNDLES.find((b) => b.id === selectedBundle) || BUNDLES[1];

  return (
    <div dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }} className="bg-white">
      <Navbar />

      {/* Urgency bar */}
      <div
        className="text-center py-2 px-4 text-sm font-bold"
        style={{ background: 'linear-gradient(135deg, #0d3d2e, #1a5c44)', color: '#e4c97e', marginTop: '64px' }}
      >
        ⚡ {COPY.hero.urgency} · دفعة محدودة المخزون
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-10 md:py-16"
        style={{ background: 'linear-gradient(150deg, #faf7f2 0%, #fff9ef 50%, #faf7f2 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Image */}
          <div className="flex justify-center sticky top-20">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-15"
                style={{ background: '#c9a84c', transform: 'scale(0.8)' }}
              />
              <ProductImage variant="hero" size="lg" />

              {/* Floating badges */}
              <div
                className="absolute top-4 -right-3 md:-right-6 rounded-xl px-3 py-2 text-xs shadow-lg"
                style={{ background: 'white', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                <div className="flex items-center gap-1">
                  <span className="text-amber-500">★</span>
                  <span className="font-black text-emerald-900">٤.٩</span>
                </div>
                <p className="text-gray-400 text-xs">٨٢٠+ تقييم</p>
              </div>

              <div
                className="absolute bottom-24 -left-3 md:-left-6 rounded-xl px-3 py-2 text-xs shadow-lg animate-float"
                style={{ background: '#0d3d2e', color: '#c9a84c' }}
              >
                <p className="font-bold">✓ جودة معتمدة</p>
                <p className="text-gray-300 text-xs">GMP Standard</p>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div>
            {/* Breadcrumb */}
            <p className="text-xs text-gray-400 mb-3">
              الرئيسية / المنتجات / جاميز الشعر والبشرة والأظافر
            </p>

            <div className="flex items-center gap-2 mb-2">
              <span className="badge-gold text-xs">{COPY.hero.badge}</span>
              <span className="badge-green text-xs">الأكثر مبيعاً</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-emerald-900 mb-2 leading-tight">
              جاميز سافاني بيوتي<br />
              <span style={{ color: '#c9a84c' }}>للشعر والبشرة والأظافر</span>
            </h1>
            <p className="text-gray-500 text-sm mb-3">٦٠ قطعة · إمداد ٣٠ يوم</p>

            {/* Stars */}
            <div className="flex items-center gap-2 mb-4">
              <span className="stars text-base">★★★★★</span>
              <span className="text-gray-500 text-sm">٤.٩ من ٥ · (٨٢٠+ تقييم موثق)</span>
            </div>

            {/* Benefit Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['💇‍♀️ شعر أكثف', '✨ بشرة أنعم', '💅 أظافر أقوى', '🌿 طبيعي آمن', '🍊 طعم لذيذ'].map((b) => (
                <span
                  key={b}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ background: '#f0fdf4', color: '#0d3d2e', border: '1px solid #bbf7d0' }}
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="mb-5">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black" style={{ color: '#0d3d2e' }}>
                  {currentBundle.price}
                </span>
                <span className="text-lg font-bold text-gray-600">ر.س</span>
                <span className="text-gray-400 line-through text-sm">{currentBundle.originalPrice} ر.س</span>
                <span className="badge-gold text-xs">وفري {currentBundle.saving} ر.س</span>
              </div>
              {currentBundle.id > 1 && (
                <p className="text-green-600 text-xs font-medium mt-1">🚚 توصيل مجاني</p>
              )}
            </div>

            {/* Bundle Selector */}
            <div className="mb-6">
              <p className="font-bold text-gray-700 mb-3 text-sm">اختاري كميتك:</p>
              <div className="space-y-3">
                {BUNDLES.map((b) => (
                  <label
                    key={b.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedBundle === b.id
                        ? 'bundle-selected'
                        : 'border-gray-200 bg-white hover:border-amber-300'
                    }`}
                    onClick={() => setSelectedBundle(b.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedBundle === b.id
                            ? 'border-amber-500 bg-amber-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedBundle === b.id && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-700">{b.label}</span>
                          {b.badge && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-bold"
                              style={{
                                background: b.tag === 'best' ? 'linear-gradient(135deg,#c9a84c,#e4c97e)' : '#0d3d2e',
                                color: b.tag === 'best' ? '#0d3d2e' : 'white',
                              }}
                            >
                              {b.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">{b.deliveryNote} · {b.perBottle} ر.س للزجاجة</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-400 line-through">{b.originalPrice} ر.س</p>
                      <p className="font-black text-lg" style={{ color: '#0d3d2e' }}>{b.price} ر.س</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={() => handleOrderNow(selectedBundle)}
              className="btn-gold mb-3 text-base"
            >
              🛒 اطلبي الآن – {currentBundle.price} ر.س
            </button>

            <p className="text-center text-xs text-gray-400 mb-4">
              🔒 دفع آمن عند الاستلام · بياناتك محمية
            </p>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '🚚', label: 'توصيل سريع' },
                { icon: '💳', label: 'COD آمن' },
                { icon: '↩️', label: 'ضمان الاستبدال' },
              ].map((t) => (
                <div
                  key={t.label}
                  className="text-center py-2 rounded-lg"
                  style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}
                >
                  <p className="text-lg">{t.icon}</p>
                  <p className="text-xs font-medium text-emerald-700">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title">لماذا سافاني بيوتي؟</h2>
          <p className="section-subtitle">فوائد مثبتة لجمال حقيقي من الداخل</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: '🌱',
                title: 'شعر أكثف وأقوى',
                desc: 'تركيبتنا تدعم نمو الشعر من الجذور وتقلل التساقط للحصول على شعر أكثف وأكثر حيوية.',
              },
              {
                icon: '✨',
                title: 'بشرة نضرة ومتوهجة',
                desc: 'الكولاجين وفيتامين C يعملان معاً لتعزيز إنتاج الكولاجين الطبيعي للبشرة وتوحيد لونها.',
              },
              {
                icon: '💎',
                title: 'أظافر صحية وقوية',
                desc: 'البيوتين والزنك يوقفان هشاشة الأظافر ويعززان نموها بشكل أسرع وأقوى.',
              },
              {
                icon: '🍊',
                title: 'نكهة رائعة وسهلة',
                desc: 'لا حبوب، لا شراب مر — فقط جاميز لذيذة تتناولينها بسهولة وتستمتعين بها يومياً.',
              },
              {
                icon: '🔬',
                title: 'مكونات نقية مختارة',
                desc: 'كل مكون يُختار بعناية لضمان أعلى جودة وأكثر فاعلية. شفافية كاملة في المكونات.',
              },
              {
                icon: '⚡',
                title: 'نتائج ملحوظة',
                desc: 'معظم العملاء يلاحظن بداية التحسن خلال ٢-٤ أسابيع مع الاستخدام المنتظم.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl premium-card">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #0d3d2e 0%, #1a5c44 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-white mb-2">المكونات الرئيسية</h2>
            <p className="text-gray-300 text-sm">تركيبة علمية متكاملة لجمالك</p>
            <p className="text-gray-400 text-xs mt-2">* نقدم المكونات الرئيسية. للتفاصيل الكاملة راجعي بطاقة المنتج.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {INGREDIENTS.map((ing, i) => (
              <div
                key={i}
                className="text-center p-5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}
              >
                <div className="text-3xl mb-3">{ing.icon}</div>
                <h4 className="font-bold text-white mb-1">{ing.name}</h4>
                <p className="text-gray-300 text-xs leading-relaxed">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title">لمن هذا المنتج؟</h2>
          <p className="section-subtitle">مثالي لكِ إذا كنتِ...</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                ✅ مناسب لكِ
              </h4>
              <ul className="space-y-2">
                {[
                  'تعانين من تساقط الشعر أو ضعفه',
                  'تريدين بشرة أكثر نضارة وإشراقاً',
                  'أظافرك هشة أو تتكسر بسهولة',
                  'تبحثين عن مكمل غذائي يومي لطيف',
                  'تريدين نتائج من الداخل لا مجرد منتج خارجي',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-xl" style={{ background: '#fef9ee', border: '1px solid #fde68a' }}>
              <h4 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
                ⚠️ استشيري طبيبك أولاً
              </h4>
              <ul className="space-y-2">
                {[
                  'الحوامل والمرضعات',
                  'من تتناولن أدوية موصوفة',
                  'من يعانين من حساسية من أي مكون',
                  'تحت سن ١٨ عاماً',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-400 mt-3">
                هذا المنتج مكمل غذائي وليس دواءً
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How To Use */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="section-title">كيفية الاستخدام</h2>
          <div className="grid grid-cols-3 gap-6 mt-8">
            {[
              { icon: '☀️', step: 'الخطوة ١', desc: 'تناولي ٢ قطعة يومياً' },
              { icon: '🍽️', step: 'الخطوة ٢', desc: 'مع وجبة (يفضل الصباح)' },
              { icon: '📅', step: 'الخطوة ٣', desc: 'استمري لمدة ٣٠ يوماً على الأقل' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <p className="font-bold text-xs text-amber-600 mb-1">{item.step}</p>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-6">
            ملاحظة: لا تتجاوزي الجرعة الموصى بها. استشيري طبيبك في حالات خاصة.
          </p>
        </div>
      </section>

      {/* Social Proof / Reviews */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #faf7f2, #fff9ef)' }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="section-title">قصص نجاح حقيقية</h2>
          <p className="section-subtitle">
            تجارب عملائنا — النتائج تختلف من شخص لآخر
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS.slice(0, 6).map((review) => (
              <div key={review.id} className="review-card">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ background: 'linear-gradient(135deg, #0d3d2e, #1a5c44)' }}
                  >
                    {review.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.city} · {review.date}</p>
                  </div>
                </div>
                <div className="stars text-sm mb-2">{'★'.repeat(review.stars)}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="badge-gold text-xs">{review.tag}</span>
                  {review.verified && (
                    <span className="text-green-600 text-xs font-medium">✓ موثق</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            * النتائج تختلف من شخص لآخر. هذا المنتج مكمل غذائي وليس دواءً.
          </p>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-12 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div
            className="text-center p-8 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #faf7f2, #fff9ef)', border: '2px solid rgba(201,168,76,0.3)' }}
          >
            <div className="text-5xl mb-4">🛡️</div>
            <h3 className="text-xl font-black text-emerald-900 mb-3">ضمان رضاك</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              نؤمن بجودة منتجنا. إذا لم تكوني راضية، تواصلي معنا وسنعمل على إيجاد أفضل حل وفق سياسة الاستبدال والإرجاع المعتمدة لدينا.
            </p>
            <p className="text-xs text-gray-400">
              * الاستبدال/الاسترجاع حسب الشروط والأحكام المعتمدة. تواصلي معنا للتفاصيل.
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section
        ref={checkoutRef}
        id="checkout-section"
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #faf7f2, #fff9ef)' }}
      >
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="badge-gold text-xs mb-3 inline-block">الخطوة الأخيرة</span>
            <h2 className="section-title">أتممي طلبك الآن</h2>
            <p className="section-subtitle">سنتصل بك لتأكيد العنوان خلال ساعات العمل</p>
          </div>

          <div
            className="rounded-2xl p-6 md:p-8"
            style={{ background: 'white', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 8px 40px rgba(13,61,46,0.08)' }}
          >
            <CheckoutForm bundleId={selectedBundle} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="section-title">الأسئلة الشائعة</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: activeFaq === i ? '#c9a84c' : '#e5e7eb' }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-right font-bold text-gray-800 hover:bg-amber-50 transition"
                >
                  <span className="text-sm">{faq.q}</span>
                  <span
                    className="text-xl flex-shrink-0 mr-2 transition-transform"
                    style={{
                      color: '#c9a84c',
                      transform: activeFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    }}
                  >
                    +
                  </span>
                </button>
                {activeFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 bg-gray-50 border-t border-amber-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {TRUST_BADGES.map((badge, i) => (
              <div key={i} className="text-center">
                <div className="trust-icon">{badge.icon}</div>
                <p className="font-bold text-xs text-emerald-900 leading-tight">{badge.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      {showStickyBar && (
        <div className="md:hidden sticky-cta">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-black text-emerald-900 text-sm">جاميز سافاني بيوتي</p>
              <p className="text-xs text-gray-500">{currentBundle.label} – {currentBundle.price} ر.س</p>
            </div>
            <button
              onClick={() => handleOrderNow(selectedBundle)}
              className="btn-gold text-sm py-3 px-6 flex-shrink-0"
              style={{ width: 'auto' }}
            >
              اطلبي الآن
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
