import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductImage from '../components/ProductImage';
import { BUNDLES, REVIEWS, HOW_IT_WORKS, TRUST_BADGES, COPY, BRAND } from '../config/brand';
import { trackSnapchatEvent } from '../utils/sheets';

export default function HomePage() {
  const navigate = useNavigate();
  const [urgencyTime, setUrgencyTime] = useState('٤:٥٧:٢٣');

  useEffect(() => {
    trackSnapchatEvent('VIEW_CONTENT', { page: 'home' });

    // Countdown timer (just for display)
    let seconds = 4 * 3600 + 57 * 60 + 23;
    const timer = setInterval(() => {
      seconds = Math.max(0, seconds - 1);
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      setUrgencyTime(
        `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const featuredReviews = REVIEWS.slice(0, 3);

  return (
    <div dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
      <Navbar />

      {/* Urgency Bar */}
      <div
        className="text-center py-2.5 px-4 text-sm font-bold"
        style={{ background: 'linear-gradient(135deg, #0d3d2e, #1a5c44)', color: '#e4c97e', marginTop: '64px' }}
      >
        ⏳ الشحن اليوم للطلبات المؤكدة قبل الساعة ٥ عصراً · المتبقي: {urgencyTime}
      </div>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden min-h-[90vh] flex items-center"
        style={{
          background: 'linear-gradient(150deg, #0d3d2e 0%, #1a5c44 40%, #0d3d2e 100%)',
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#c9a84c" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Text */}
          <div>
            <span className="badge-gold text-xs mb-4 inline-block">دفعة محدودة · {COPY.hero.badge}</span>
            <h1
              className="text-4xl md:text-5xl font-black leading-tight mb-4"
              style={{ color: 'white' }}
            >
              شعر أكثف.
              <br />
              <span className="gold-shimmer">بشرة أنعم.</span>
              <br />
              أظافر أقوى.
            </h1>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed max-w-md">
              {COPY.hero.subheadline}
            </p>

            {/* Benefits */}
            <div className="space-y-2 mb-8">
              {[
                '✓ بيوتين + كولاجين + فيتامينات',
                '✓ ٦٠ قطعة جاميز لشهر كامل',
                '✓ الدفع عند الاستلام في جميع مناطق المملكة',
                '✓ نتائج تبدأ من الأسبوع الثاني',
              ].map((item, i) => (
                <p key={i} className="text-gray-200 flex items-center gap-2 text-sm">
                  <span style={{ color: '#c9a84c' }}>{item.split(' ')[0]}</span>
                  {item.slice(2)}
                </p>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                trackSnapchatEvent('INITIATE_CHECKOUT');
                navigate('/product/hair-skin-nails-gummies');
              }}
              className="btn-gold text-base mb-3"
              style={{ maxWidth: '380px' }}
            >
              🛒 اطلبي الآن – من ١٩٩ ر.س
            </button>
            <p className="text-gray-400 text-xs">
              🔒 دفع آمن عند الاستلام · توصيل لجميع مناطق المملكة
            </p>

            {/* Mini review */}
            <div className="flex items-center gap-3 mt-5">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {['س', 'ن', 'ر', 'ل'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white"
                    style={{ background: `hsl(${i * 40 + 120}, 40%, 35%)`, color: 'white' }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-amber-400 text-sm">★★★★★</div>
                <p className="text-gray-300 text-xs">+٨٢٠ عميلة راضية</p>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="flex justify-center items-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-20"
                style={{ background: '#c9a84c', transform: 'scale(1.2)' }}
              />
              <ProductImage variant="hero" size="lg" />
              {/* Badges on image */}
              <div
                className="absolute top-8 -right-4 rounded-xl px-3 py-2 text-xs font-bold shadow-lg"
                style={{ background: 'white', color: '#0d3d2e' }}
              >
                <span className="block text-lg font-black">★ ٤.٩</span>
                <span className="text-gray-500">تقييم العملاء</span>
              </div>
              <div
                className="absolute bottom-20 -left-4 rounded-xl px-3 py-2 text-xs font-bold shadow-lg"
                style={{ background: '#c9a84c', color: '#0d3d2e' }}
              >
                <span className="block">الأكثر مبيعاً</span>
                <span className="text-emerald-800 font-normal">هذا الشهر</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 bg-white border-b border-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {TRUST_BADGES.map((badge, i) => (
              <div key={i} className="text-center">
                <div className="trust-icon">{badge.icon}</div>
                <p className="font-bold text-xs text-emerald-900">{badge.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "As Seen In" placeholder */}
      <section className="py-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-xs mb-4 uppercase tracking-wider">كما تحدثت عنه</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-30">
            {['BEAUTY ARABIA', 'GLAM SA', 'DERMA WEEKLY', 'LUXE GULF'].map((brand) => (
              <span
                key={brand}
                className="text-gray-700 font-bold tracking-wider text-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {brand}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-3">* للأغراض التوضيحية</p>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="badge-gold text-xs mb-3 inline-block">وعدنا لك</span>
            <h2 className="section-title">الجمال الحقيقي يبدأ من الداخل</h2>
            <p className="section-subtitle">نصيغة علمية مختارة بعناية لتعزيز جمالك الطبيعي</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔬',
                title: 'مكونات مختارة',
                desc: 'بيوتين، كولاجين، فيتامين C وE، زنك — كل ما تحتاجينه لجمال حقيقي من الداخل.',
              },
              {
                icon: '🌿',
                title: 'آمن وموثوق',
                desc: 'مكمل غذائي وليس دواءً. تركيبة آمنة للاستخدام اليومي.',
              },
              {
                icon: '💎',
                title: 'نتائج مرئية',
                desc: 'معظم عملائنا يلاحظن فرقاً ملموساً خلال ٢-٨ أسابيع من الاستخدام المنتظم.',
              },
            ].map((item, i) => (
              <div key={i} className="premium-card p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-emerald-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Seller Card */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #faf7f2 0%, #fff9ef 100%)' }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="badge-green text-xs mb-3 inline-block">الأكثر مبيعاً</span>
            <h2 className="section-title">سافاني بيوتي جاميز</h2>
            <p className="section-subtitle">شعر أكثف · بشرة أنعم · أظافر أقوى</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <ProductImage variant="box" size="lg" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-400">★★★★★</span>
                <span className="text-sm text-gray-500">(٨٢٠+ تقييم)</span>
              </div>
              <h3 className="text-2xl font-black text-emerald-900 mb-3">
                جاميز الشعر والبشرة والأظافر
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                ٦٠ قطعة جاميز بنكهة لذيذة — جرعة يومية من البيوتين والكولاجين والفيتامينات لجمال حقيقي من الداخل.
              </p>

              {/* Bundles */}
              <div className="space-y-3 mb-6">
                {BUNDLES.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between rounded-xl p-3 border"
                    style={{
                      borderColor: b.tag === 'best' ? '#c9a84c' : '#e5e7eb',
                      background: b.tag === 'best' ? 'linear-gradient(135deg, #faf7f2, #fff9ef)' : 'white',
                    }}
                  >
                    <div>
                      <span className="font-bold text-sm text-gray-700">{b.label}</span>
                      {b.badge && (
                        <span
                          className="mr-2 text-xs px-2 py-0.5 rounded-full font-bold"
                          style={{
                            background: b.tag === 'best' ? 'linear-gradient(135deg,#c9a84c,#e4c97e)' : '#0d3d2e',
                            color: b.tag === 'best' ? '#0d3d2e' : 'white',
                          }}
                        >
                          {b.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-gray-400 line-through block">{b.originalPrice} ر.س</span>
                      <span className="font-black text-emerald-900 text-lg">{b.price} ر.س</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/product/hair-skin-nails-gummies')}
                className="btn-primary mb-3"
              >
                اطلعي على التفاصيل والطلب
              </button>
              <p className="text-center text-xs text-gray-400">
                الدفع عند الاستلام · توصيل سريع لجميع مناطق المملكة
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title">كيف يعمل؟</h2>
          <p className="section-subtitle">بسيط، سهل، وسريع</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="text-center relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 left-0 w-full h-0.5"
                    style={{ background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }}
                  />
                )}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-4 relative z-10"
                  style={{
                    background: 'linear-gradient(135deg, #0d3d2e, #1a5c44)',
                    color: '#c9a84c',
                  }}
                >
                  {step.step}
                </div>
                <h4 className="font-bold text-emerald-900 mb-1 text-sm">{step.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #faf7f2, #fff9ef)' }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="badge-gold text-xs mb-3 inline-block">آراء العملاء</span>
            <h2 className="section-title">ماذا تقول عملاؤنا؟</h2>
            <p className="section-subtitle">تجارب حقيقية من نساء سعوديات</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredReviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #0d3d2e, #1a5c44)' }}
                    >
                      {review.name.slice(0, 1)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800">{review.name}</p>
                      <p className="text-xs text-gray-400">{review.city} · {review.date}</p>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="text-xs text-green-600 font-medium">✓ موثق</span>
                  )}
                </div>
                <div className="stars text-sm mb-2">{'★'.repeat(review.stars)}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                <span className="badge-gold text-xs mt-3 inline-block">{review.tag}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-amber-500 text-amber-700 font-bold text-sm hover:bg-amber-50 transition"
            >
              اقرئي جميع التقييمات ({REVIEWS.length}+)
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-16"
        style={{ background: 'linear-gradient(135deg, #0d3d2e, #1a5c44)' }}
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">
            ابدئي رحلتك اليوم
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            جاميز سافاني بيوتي — شعر أكثف، بشرة أنعم، أظافر أقوى. من ١٩٩ ريال فقط.
          </p>
          <button
            onClick={() => navigate('/product/hair-skin-nails-gummies')}
            className="btn-gold text-lg mb-4"
            style={{ maxWidth: '380px', margin: '0 auto 16px' }}
          >
            🛒 اطلبي الآن – دفع عند الاستلام
          </button>
          <p className="text-gray-400 text-xs">
            توصيل لجميع مناطق المملكة · خدمة عملاء {BRAND.workingHours}
          </p>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden sticky-cta">
        <button
          onClick={() => navigate('/product/hair-skin-nails-gummies')}
          className="btn-gold"
        >
          🛒 اطلبي الآن – من ١٩٩ ر.س
        </button>
      </div>

      <Footer />
    </div>
  );
}
