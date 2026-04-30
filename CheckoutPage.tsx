// ============================================================
// SAVANY BEAUTY - Brand Config
// A/B testing friendly: change copy here without touching components
// ============================================================

export const BRAND = {
  name: 'Savany Beauty',
  nameAr: 'سافاني بيوتي',
  tagline: 'الجمال من الداخل',
  taglineEn: 'Beauty from Within',
  phone: '+966500000000', // Replace with real
  whatsapp: '966500000000', // Replace with real
  email: 'support@savanybeauty.com',
  instagram: '@savanybeauty',
  snapchat: '@savanybeauty',
  address: 'المملكة العربية السعودية',
  workingHours: '١٠ص – ١٠م (أيام الأسبوع)',
  workingHoursEn: '10AM – 10PM (Weekdays)',
  deliveryEta: {
    major: '٢-٣ أيام عمل', // Riyadh, Jeddah, Dammam
    other: '٣-٥ أيام عمل',
  },
  googleSheetsWebhook: import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK || '',
  snapchatPixelId: import.meta.env.VITE_SNAPCHAT_PIXEL_ID || '',
};

export const PRODUCT = {
  name: 'Savany Beauty Hair, Skin & Nails Gummies',
  nameAr: 'جاميز سافاني للشعر والبشرة والأظافر',
  subtitle: '٦٠ قطعة – شهر كامل من العناية',
  subtitleEn: '60 Gummies – 30 Day Supply',
  category: 'مكمل غذائي',
  disclaimer:
    'هذا المنتج مكمل غذائي وليس دواءً. النتائج تختلف من شخص لآخر. استشيري طبيبك قبل الاستخدام إذا كنتِ حاملاً أو مرضعاً.',
  halalNote: 'مصدر الجيلاتين: يُرجى مراجعة بطاقة المنتج للتفاصيل.',
};

export const BUNDLES = [
  {
    id: 1,
    qty: 1,
    label: 'زجاجة واحدة',
    labelEn: '1 Bottle',
    price: 199,
    originalPrice: 250,
    saving: 51,
    savingPct: 20,
    badge: null,
    deliveryNote: 'توصيل سريع',
    perBottle: 199,
    tag: null,
  },
  {
    id: 2,
    qty: 2,
    label: 'زجاجتان',
    labelEn: '2 Bottles',
    price: 279,
    originalPrice: 400,
    saving: 121,
    savingPct: 30,
    badge: 'الأكثر مبيعاً',
    deliveryNote: 'توصيل مجاني',
    perBottle: 139,
    tag: 'popular',
  },
  {
    id: 3,
    qty: 3,
    label: 'ثلاث زجاجات',
    labelEn: '3 Bottles',
    price: 349,
    originalPrice: 600,
    saving: 251,
    savingPct: 42,
    badge: 'الأفضل قيمة',
    deliveryNote: 'توصيل مجاني + هدية',
    perBottle: 116,
    tag: 'best',
  },
];

export const UPSELLS = [
  {
    id: 'collagen-glow',
    nameAr: 'كولاجين جلو ساشيه (٧ أيام)',
    nameEn: 'Collagen Glow Sachets (7 days)',
    descAr:
      'جرعة تركيز من الكولاجين البحري لنضارة فورية. خاص لعملائنا اليوم فقط.',
    price: 99,
    originalPrice: 180,
    emoji: '✨',
  },
  {
    id: 'scalp-serum',
    nameAr: 'سيروم الفروة – هير ريفايف',
    nameEn: 'Scalp Revive Serum',
    descAr:
      'سيروم متخصص لتغذية فروة الرأس وتحفيز نمو الشعر. عرض حصري مع طلبك.',
    price: 99,
    originalPrice: 160,
    emoji: '💆‍♀️',
  },
];

export const SAUDI_CITIES = [
  { value: 'riyadh', label: 'الرياض', group: 'major' },
  { value: 'jeddah', label: 'جدة', group: 'major' },
  { value: 'dammam', label: 'الدمام', group: 'major' },
  { value: 'mecca', label: 'مكة المكرمة', group: 'major' },
  { value: 'medina', label: 'المدينة المنورة', group: 'major' },
  { value: 'khobar', label: 'الخبر', group: 'major' },
  { value: 'taif', label: 'الطائف', group: 'other' },
  { value: 'tabuk', label: 'تبوك', group: 'other' },
  { value: 'abha', label: 'أبها', group: 'other' },
  { value: 'khamismushait', label: 'خميس مشيط', group: 'other' },
  { value: 'hofuf', label: 'الهفوف', group: 'other' },
  { value: 'buraydah', label: 'بريدة', group: 'other' },
  { value: 'jubail', label: 'الجبيل', group: 'other' },
  { value: 'yanbu', label: 'ينبع', group: 'other' },
  { value: 'najran', label: 'نجران', group: 'other' },
  { value: 'jizan', label: 'جازان', group: 'other' },
  { value: 'hail', label: 'حائل', group: 'other' },
  { value: 'arar', label: 'عرعر', group: 'other' },
  { value: 'qassim', label: 'القصيم', group: 'other' },
  { value: 'other', label: 'مدينة أخرى', group: 'other' },
];

export const MAJOR_CITIES = ['riyadh', 'jeddah', 'dammam', 'mecca', 'medina', 'khobar'];

export const REVIEWS = [
  {
    id: 1,
    name: 'سارة المطيري',
    city: 'الرياض',
    stars: 5,
    date: 'منذ أسبوعين',
    text: 'والله ما توقعت الفرق يكون بهالسرعة! بعد شهر ونص شعري صار أكثف وما بقى يتكسر. بشرتي كمان صارت أنعم. المنتج رائع وجاني بسرعة.',
    verified: true,
    tag: 'شعر + بشرة',
  },
  {
    id: 2,
    name: 'نورة العتيبي',
    city: 'جدة',
    stars: 5,
    date: 'منذ ٣ أسابيع',
    text: 'جربت كثير منتجات من قبل بس هذا الأفضل. ظافري وقف يتكسر بعد أسبوعين! وشعري بدأ يطول أسرع. أنصح فيه بشدة.',
    verified: true,
    tag: 'أظافر',
  },
  {
    id: 3,
    name: 'ريم الشمري',
    city: 'الدمام',
    stars: 5,
    date: 'منذ شهر',
    text: 'المنتج ممتاز والتوصيل كان سريع. بشرتي بدأت تتحسن ملحوظ. الجاميز طعمها حلو كمان مو كأنك تاخذين دواء.',
    verified: true,
    tag: 'بشرة',
  },
  {
    id: 4,
    name: 'لمى القحطاني',
    city: 'الرياض',
    stars: 5,
    date: 'منذ أسبوع',
    text: 'طلبي وصل بسرعة والتغليف فاخر. بدأت شهر واحد وحاسة فرق بشعري. ما شاء الله على المنتج.',
    verified: true,
    tag: 'شعر',
  },
  {
    id: 5,
    name: 'هيا السبيعي',
    city: 'مكة المكرمة',
    stars: 5,
    date: 'منذ شهرين',
    text: 'اشتريت ٣ زجاجات ووفرت مبلغ كبير. النتيجة ممتازة، شعري كثف وبشرتي نضرت. أوصي كل بنت تجربه.',
    verified: true,
    tag: 'شعر + بشرة',
  },
  {
    id: 6,
    name: 'عهود المالكي',
    city: 'المدينة المنورة',
    stars: 4,
    date: 'منذ ٣ أسابيع',
    text: 'منتج ممتاز. ملاحظ فرق في الأظافر والشعر. التوصيل كان في الموعد. سأشتري مرة ثانية بالتأكيد.',
    verified: true,
    tag: 'أظافر + شعر',
  },
  {
    id: 7,
    name: 'بسمة الزهراني',
    city: 'الطائف',
    stars: 5,
    date: 'منذ ٤ أسابيع',
    text: 'ما توقعت يكون فاخر لهالدرجة! التغليف رائع والمنتج أفضل من توقعاتي. شعري بدأ يقل تساقطه.',
    verified: true,
    tag: 'شعر',
  },
  {
    id: 8,
    name: 'دلال العنزي',
    city: 'الخبر',
    stars: 5,
    date: 'منذ شهر ونص',
    text: 'من أفضل منتجات الجاميز اللي جربتها. الفرق واضح في البشرة والأظافر. سعرها معقول مقارنة بالنتيجة.',
    verified: true,
    tag: 'بشرة + أظافر',
  },
  {
    id: 9,
    name: 'منال الدوسري',
    city: 'الدمام',
    stars: 5,
    date: 'منذ أسبوعين',
    text: 'كانت توصيتي من صاحبتي وفعلاً النتيجة حلوة. بشرتي أنعم وشعري أقل تكسر. خدمة العملاء ممتازة كمان.',
    verified: true,
    tag: 'شعر + بشرة',
  },
  {
    id: 10,
    name: 'غادة الحربي',
    city: 'جدة',
    stars: 5,
    date: 'منذ شهر',
    text: 'طلبتها وجاتني خلال يومين. ممتازة والدفع عند الاستلام كان راحة. النتيجة حلوة في الأظافر خصوصاً.',
    verified: true,
    tag: 'أظافر',
  },
  {
    id: 11,
    name: 'أميرة الرشيد',
    city: 'الرياض',
    stars: 5,
    date: 'منذ ٣ أشهر',
    text: 'على طول أجدد طلبيتي. النتيجة واضحة ومستمرة. شعري أكثف وبشرتي أنضر. منتج ثابت عندي.',
    verified: true,
    tag: 'شعر + بشرة',
  },
  {
    id: 12,
    name: 'وفاء البقمي',
    city: 'أبها',
    stars: 5,
    date: 'منذ أسبوعين',
    text: 'وصلني المنتج بحالة ممتازة. بدأت آخذه ومبسوطة جداً. التعبئة فاخرة ومحترمة. ننتظر النتيجة الكاملة.',
    verified: true,
    tag: 'جديدة',
  },
];

export const FAQS = [
  {
    q: 'متى تظهر النتائج؟',
    a: 'معظم العملاء يلاحظون فرقاً ملموساً خلال ٢-٨ أسابيع من الاستخدام المنتظم. الأظافر عادةً الأسرع تحسناً، يليها الشعر والبشرة. النتائج تختلف من شخص لآخر.',
  },
  {
    q: 'هل المنتج مناسب للحامل أو المرضع؟',
    a: 'يُنصح باستشارة الطبيب قبل استخدام أي مكمل غذائي أثناء الحمل أو الرضاعة الطبيعية. سلامة طفلك أهم شيء.',
  },
  {
    q: 'هل المنتج حلال؟',
    a: 'يُرجى مراجعة بطاقة المنتج الموجودة في العبوة للاطلاع على تفاصيل مصدر المكونات. نحرص على توفير منتجات تلبي متطلبات عملائنا.',
  },
  {
    q: 'كيفية الاستخدام؟',
    a: 'تناولي ٢ قطعة يومياً مع الأكل. يُفضل في الصباح. للحصول على أفضل نتائج، استمري في الاستخدام لمدة ٣ أشهر على الأقل.',
  },
  {
    q: 'ما مدة التوصيل؟',
    a: 'الرياض، جدة، الدمام، مكة، المدينة، الخبر: ٢-٣ أيام عمل. بقية المناطق: ٣-٥ أيام عمل.',
  },
  {
    q: 'هل يمكن الإرجاع أو الاستبدال؟',
    a: 'نعم، الاستبدال والإرجاع متاح وفق الشروط والأحكام المعتمدة. للاستفسار تواصلي معنا عبر واتساب أو الهاتف.',
  },
  {
    q: 'هل هو دواء؟',
    a: 'لا، Savany Beauty جاميز هو مكمل غذائي وليس دواءً. لا يهدف لتشخيص أو علاج أي مرض. للحالات الصحية الخاصة يُرجى مراجعة الطبيب.',
  },
  {
    q: 'هل يتعارض مع أدوية أخرى؟',
    a: 'إذا كنتِ تتناولين أي أدوية، يُرجى استشارة الطبيب أو الصيدلاني قبل استخدام المكمل الغذائي.',
  },
];

export const INGREDIENTS = [
  {
    name: 'البيوتين',
    nameEn: 'Biotin',
    icon: '💎',
    desc: 'يُساهم في المحافظة على صحة الشعر والأظافر وبشرة نضرة طبيعية.',
  },
  {
    name: 'الكولاجين',
    nameEn: 'Collagen',
    icon: '✨',
    desc: 'يدعم مرونة البشرة وكثافة الشعر.',
  },
  {
    name: 'فيتامين C',
    nameEn: 'Vitamin C',
    icon: '🍋',
    desc: 'مضاد للأكسدة يُعزز إنتاج الكولاجين ويحمي البشرة.',
  },
  {
    name: 'فيتامين E',
    nameEn: 'Vitamin E',
    icon: '🌿',
    desc: 'يُغذي الشعر ويحمي الخلايا من الأكسدة.',
  },
  {
    name: 'الزنك',
    nameEn: 'Zinc',
    icon: '⚡',
    desc: 'عنصر أساسي لنمو الشعر والأظافر وصحة البشرة.',
  },
  {
    name: 'أوميغا',
    nameEn: 'Omega Blend',
    icon: '🐟',
    desc: 'أحماض دهنية أساسية تُعزز لمعة الشعر وترطيب البشرة.',
  },
];

export const HOW_IT_WORKS = [
  {
    step: '١',
    title: 'اختاري باقتك',
    desc: 'اختاري العدد المناسب لك وأتممي الطلب في أقل من دقيقة.',
  },
  {
    step: '٢',
    title: 'تأكيد الطلب',
    desc: 'سيتصل بك فريقنا لتأكيد العنوان وتفاصيل التوصيل.',
  },
  {
    step: '٣',
    title: 'الاستلام والدفع',
    desc: 'يصلك المنتج في ٢-٥ أيام. ادفعي عند الاستلام بكل راحة.',
  },
  {
    step: '٤',
    title: 'النتائج',
    desc: 'ابدئي رحلتك وتمتعي بشعر أكثف وبشرة أنعم وأظافر أقوى.',
  },
];

export const TRUST_BADGES = [
  { icon: '🚚', title: 'توصيل لجميع مناطق المملكة', desc: '٢-٥ أيام عمل' },
  { icon: '💳', title: 'الدفع عند الاستلام', desc: 'COD آمن ومريح' },
  { icon: '📞', title: 'دعم عملاء سعودي', desc: '١٠ص – ١٠م' },
  { icon: '🔒', title: 'طلب آمن ومحمي', desc: 'بياناتك بأمان تام' },
  { icon: '✅', title: 'منتج موثوق', desc: 'جودة معتمدة' },
  { icon: '↩️', title: 'سياسة استرجاع', desc: 'حسب الشروط' },
];

export const COPY = {
  hero: {
    headline: 'شعر أكثف. بشرة أنعم. أظافر أقوى.',
    headlineEn: 'Thicker Hair. Glowing Skin. Stronger Nails.',
    subheadline: 'المكمل الغذائي الفاخر الذي تحبه النساء في المملكة. نتائج حقيقية تبدأ من الداخل.',
    cta: 'اطلبي الآن – الدفع عند الاستلام',
    urgency: 'الشحن اليوم للطلبات المؤكدة قبل الساعة ٥ عصراً',
    badge: 'دفعة محدودة',
  },
  promise: {
    title: 'وعدنا لك',
    items: [
      'مكونات مختارة بعناية لأفضل النتائج',
      'تركيبة علمية للجمال من الداخل',
      'مكمل غذائي وليس دواء — آمن وموثوق',
      'نتائج مرئية خلال ٢-٨ أسابيع',
      'عملاء راضون في جميع مناطق المملكة',
    ],
  },
};
