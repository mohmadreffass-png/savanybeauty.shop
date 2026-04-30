import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutForm from '../components/CheckoutForm';
import { BUNDLES } from '../config/brand';

export default function CheckoutPage() {
  const [selectedBundle, setSelectedBundle] = useState(2);

  return (
    <div dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }} className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="progress-step done">✓</div>
          <div className="h-px bg-amber-400 w-12" />
          <div className="progress-step active">٢</div>
          <div className="h-px bg-gray-300 w-12" />
          <div className="progress-step inactive">٣</div>
        </div>
        <div className="flex items-center justify-center gap-16 mb-10 text-xs text-gray-400">
          <span className="text-amber-600 font-medium">المنتج</span>
          <span className="text-emerald-700 font-bold">بياناتك</span>
          <span>التأكيد</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Form - wider */}
          <div className="md:col-span-3">
            <div
              className="rounded-2xl p-6"
              style={{ background: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <h1 className="text-xl font-black text-emerald-900 mb-1">إتمام الطلب</h1>
              <p className="text-sm text-gray-500 mb-6">الدفع نقداً عند الاستلام · بدون بطاقة</p>
              <CheckoutForm bundleId={selectedBundle} />
            </div>
          </div>

          {/* Order Summary - sidebar */}
          <div className="md:col-span-2">
            <div
              className="rounded-2xl p-6 sticky top-24"
              style={{
                background: 'linear-gradient(135deg, #faf7f2, #fff9ef)',
                border: '1px solid rgba(201,168,76,0.3)',
              }}
            >
              <h3 className="font-bold text-emerald-900 mb-4">ملخص طلبك</h3>

              {/* Bundle selector */}
              <div className="space-y-2 mb-4">
                {BUNDLES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBundle(b.id)}
                    className={`w-full text-right p-3 rounded-xl border-2 transition-all ${
                      selectedBundle === b.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">{b.label}</span>
                      <span className="font-black text-emerald-900">{b.price} ر.س</span>
                    </div>
                    {b.badge && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-bold mt-1 inline-block"
                        style={{
                          background: b.tag === 'best' ? 'linear-gradient(135deg,#c9a84c,#e4c97e)' : '#0d3d2e',
                          color: b.tag === 'best' ? '#0d3d2e' : 'white',
                        }}
                      >
                        {b.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <hr className="gold-divider mb-4" />

              {/* Selected summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">المنتج</span>
                  <span className="font-medium">جاميز سافاني بيوتي</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">الباقة</span>
                  <span className="font-medium">{BUNDLES.find((b) => b.id === selectedBundle)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">التوصيل</span>
                  <span className="font-medium text-green-600">
                    {selectedBundle > 1 ? 'مجاني' : 'محسوب عند الاستلام'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">طريقة الدفع</span>
                  <span className="font-medium">COD – دفع عند الاستلام</span>
                </div>
              </div>

              <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(201,168,76,0.3)' }}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">المجموع الكلي</span>
                  <span className="font-black text-2xl text-emerald-900">
                    {BUNDLES.find((b) => b.id === selectedBundle)?.price} ر.س
                  </span>
                </div>
                {(BUNDLES.find((b) => b.id === selectedBundle)?.saving ?? 0) > 0 && (
                  <p className="text-green-600 text-xs mt-1 font-medium">
                    وفرتِ {BUNDLES.find((b) => b.id === selectedBundle)?.saving} ر.س
                  </p>
                )}
              </div>

              {/* Trust */}
              <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(13,61,46,0.04)' }}>
                <p className="text-xs text-gray-500 leading-relaxed">
                  🔒 طلبك آمن ومحمي<br />
                  💳 دفع عند الاستلام فقط<br />
                  📞 سنتصل بك للتأكيد خلال ساعات العمل
                </p>
              </div>

              <div className="mt-3 text-center">
                <Link
                  to="/product/hair-skin-nails-gummies"
                  className="text-xs text-amber-600 hover:text-amber-700 underline"
                >
                  ← العودة للمنتج
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
