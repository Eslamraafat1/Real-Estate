import { Property } from '@/types/property';

export const properties: Property[] = [
  {
    id: 1,
    title: 'فيلا فاخرة في التجمع الخامس',
    description: 'فيلا فاخرة بتصميم عصري في قلب التجمع الخامس، تتميز بمساحات واسعة وإطلالة ساحرة على المساحات الخضراء. تشمل حديقة خاصة ومسبح ونظام أمان متكامل.',
    price: 15000000,
    currency: 'جنيه',
    type: 'فيلا',
    status: 'للبيع',
    city: 'القاهرة',
    address: 'التجمع الخامس، القاهرة الجديدة',
    location: 'التجمع الخامس، القاهرة',
    area: 450,
    bedrooms: 5,
    bathrooms: 4,
    parking: 2,
    yearBuilt: 2023,
    imageUrl: 'https://images.unsplash.com/photo-1613490908836-9bfc2231ce81?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1613490908836-9bfc2231ce81?w=1920&q=90',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=90',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90',
    ],
    features: ['مسبح خاص', 'حديقة', 'نظام أمان', 'تكييف مركزي', 'مصعد', 'جراج مزدوج'],
    amenities: ['مسبح خاص', 'حديقة', 'نظام أمان', 'تكييف مركزي', 'مصعد', 'جراج مزدوج'],
    agent: {
      name: 'أحمد محمود',
      phone: '+201012345678',
      email: 'ahmed@aqarat.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    featured: true,
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'شقة مودرن بمدينتي',
    description: 'شقة فاخرة بإطلالة بانورامية على نهر النيل، تشطيب سوبر لوكس بأعلى المعايير. موقع استراتيجي في قلب القاهرة مع كافة الخدمات والمرافق.',
    price: 3500000,
    currency: 'جنيه',
    type: 'شقة',
    status: 'للبيع',
    city: 'القاهرة',
    address: 'مدينتي، القاهرة',
    location: 'مدينتي، القاهرة',
    area: 180,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    floor: 15,
    yearBuilt: 2022,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&q=90',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=90',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=90',
    ],
    features: ['إطلالة نيلية', 'تشطيب سوبر لوكس', 'أمن 24 ساعة', 'جيم ومسبح مشترك', 'بلكونة واسعة'],
    amenities: ['إطلالة نيلية', 'تشطيب سوبر لوكس', 'أمن 24 ساعة', 'جيم ومسبح مشترك', 'بلكونة واسعة'],
    agent: {
      name: 'سارة خالد',
      phone: '+201098765432',
      email: 'sara@aqarat.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    },
    featured: true,
    createdAt: '2024-02-20',
  },
  {
    id: 3,
    title: 'توين هاوس بالشيخ زايد',
    description: 'توين هاوس فريد من نوعه في أرقى أحياء الشيخ زايد، يتميز بتراس واسع مع إطلالة بانورامية، تصميم داخلي من أشهر المصممين.',
    price: 8500000,
    currency: 'جنيه',
    type: 'توين هاوس',
    status: 'للبيع',
    city: 'الجيزة',
    address: 'الشيخ زايد، بيفرلي هيلز',
    location: 'الشيخ زايد، الجيزة',
    area: 320,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    yearBuilt: 2024,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=90',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1920&q=90',
    ],
    features: ['تراس خاص', 'جاكوزي', 'مطبخ مفتوح', 'ذكاء منزلي'],
    amenities: ['تراس خاص', 'جاكوزي', 'مطبخ مفتوح', 'ذكاء منزلي'],
    agent: {
      name: 'محمد عبد الرحمن',
      phone: '+201155667788',
      email: 'mohamed@aqarat.com',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    },
    featured: true,
    createdAt: '2024-03-10',
  },
  {
    id: 4,
    title: 'بنتهاوس مطل على النيل',
    description: 'بنتهاوس بتصميم مودرن محاط بالمساحات الخضراء والمرافق الترفيهية. مثالي للعائلات الباحثة عن حياة هادئة ومتكاملة.',
    price: 12000000,
    currency: 'جنيه',
    type: 'بنتهاوس',
    status: 'للبيع',
    city: 'القاهرة',
    address: 'الزمالك، القاهرة',
    location: 'الزمالك، القاهرة',
    area: 250,
    bedrooms: 3,
    bathrooms: 3,
    parking: 1,
    yearBuilt: 2023,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=90',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=90',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1920&q=90',
    ],
    features: ['حديقة خاصة', 'نادي رياضي', 'أمن وحراسة', 'مساحات خضراء'],
    amenities: ['حديقة خاصة', 'نادي رياضي', 'أمن وحراسة', 'مساحات خضراء'],
    agent: {
      name: 'أحمد محمود',
      phone: '+201012345678',
      email: 'ahmed@aqarat.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    featured: true,
    createdAt: '2024-01-25',
  },
  {
    id: 5,
    title: 'شاليه بقرية مراسي',
    description: 'شاليه فندقي فاخر بإطلالة خلابة على البحر الأبيض المتوسط. استثمار مثالي في الساحل الشمالي.',
    price: 6500000,
    currency: 'جنيه',
    type: 'شاليه',
    status: 'للبيع',
    city: 'الساحل الشمالي',
    address: 'مراسي، الساحل الشمالي',
    location: 'الساحل الشمالي',
    area: 120,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    floor: 2,
    yearBuilt: 2025,
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&q=90',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1920&q=90',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1920&q=90',
    ],
    features: ['خدمات فندقية', 'إطلالة بحر', 'واي فاي مجاني', 'مسبح مشترك'],
    amenities: ['خدمات فندقية', 'إطلالة بحر', 'واي فاي مجاني', 'مسبح مشترك'],
    agent: {
      name: 'سارة خالد',
      phone: '+201098765432',
      email: 'sara@aqarat.com',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    },
    featured: true,
    createdAt: '2024-04-05',
  },
  {
    id: 6,
    title: 'قصر تاريخي بمصر الجديدة',
    description: 'قصر تاريخي أنيق في مصر الجديدة، تصميم معماري كلاسيكي مع مساحات معيشة واسعة وحديقة ضخمة.',
    price: 45000000,
    currency: 'جنيه',
    type: 'قصر',
    status: 'للبيع',
    city: 'القاهرة',
    address: 'مصر الجديدة، القاهرة',
    location: 'مصر الجديدة، القاهرة',
    area: 1200,
    bedrooms: 8,
    bathrooms: 6,
    parking: 4,
    yearBuilt: 1950,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=90',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=90',
      'https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=1920&q=90',
    ],
    features: ['حديقة كبيرة', 'حمام سباحة', 'تصميم كلاسيكي', 'أمن 24 ساعة', 'مساحات خضراء'],
    amenities: ['حديقة كبيرة', 'حمام سباحة', 'تصميم كلاسيكي', 'أمن 24 ساعة', 'مساحات خضراء'],
    agent: {
      name: 'محمد عبد الرحمن',
      phone: '+201155667788',
      email: 'mohamed@aqarat.com',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    },
    featured: true,
    createdAt: '2024-02-10',
  }
];

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'خالد إبراهيم',
    role: 'مستثمر عقاري',
    content: 'تجربة استثنائية مع عقارات! ساعدوني في إيجاد الفيلا المثالية لعائلتي في وقت قياسي. فريق محترف ومتعاون بشكل لا يُصدق.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    id: 2,
    name: 'نورا أحمد',
    role: 'رائدة أعمال',
    content: 'كنت أبحث عن مكتب لشركتي الناشئة ووجدت بالضبط ما أحتاجه من خلال عقارات. خدمة عملاء ممتازة ومتابعة مستمرة حتى بعد التعاقد.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    id: 3,
    name: 'عمر حسني',
    role: 'طبيب',
    content: 'منصة عقارات سهّلت عليا كتير عملية البحث. الصور عالية الجودة والمعلومات الدقيقة وفرت وقتي ومجهودي. أنصح الجميع بالتعامل معهم.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
  },
  {
    id: 4,
    name: 'فاطمة الزهراء',
    role: 'مهندسة معمارية',
    content: 'كمهندسة معمارية، أقدر الجودة والاهتمام بالتفاصيل. عقارات قدمت لي عقارات بمعايير عالية جداً وساعدوني في اتخاذ القرار الصحيح.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'أحمد محمود',
    role: 'المدير التنفيذي',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'خبرة أكثر من 15 عامًا في سوق العقارات المصري. قاد فريقنا نحو تحقيق أكثر من 5000 صفقة ناجحة.',
  },
  {
    id: 2,
    name: 'سارة خالد',
    role: 'مديرة المبيعات',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'متخصصة في العقارات الفاخرة مع سجل حافل في تحقيق أعلى معدلات رضا العملاء.',
  },
  {
    id: 3,
    name: 'محمد عبد الرحمن',
    role: 'رئيس قسم التطوير',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'مهندس معماري بخبرة واسعة في تطوير المشاريع السكنية والتجارية الكبرى.',
  },
  {
    id: 4,
    name: 'ليلى حسن',
    role: 'مديرة التسويق',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    bio: 'خبيرة تسويق رقمي متخصصة في التسويق العقاري مع استراتيجيات مبتكرة لتحقيق أقصى انتشار.',
  },
];

export const stats = [
  { label: 'عقار متاح', value: 2500 },
  { label: 'عميل سعيد', value: 8000 },
  { label: 'صفقة ناجحة', value: 5200 },
  { label: 'سنة خبرة', value: 15 },
];

export const services = [
  {
    id: 1,
    title: 'بيع العقارات',
    description: 'نساعدك في بيع عقارك بأفضل سعر ممكن مع استراتيجيات تسويق متقدمة تصل لأكبر عدد من المشترين المحتملين.',
    icon: 'Home',
  },
  {
    id: 2,
    title: 'شراء العقارات',
    description: 'نوفر لك مجموعة واسعة من العقارات المختارة بعناية لتجد منزل أحلامك مع استشارات مجانية ومتابعة شخصية.',
    icon: 'Key',
  },
  {
    id: 3,
    title: 'التأجير',
    description: 'خدمات تأجير شاملة للمالكين والمستأجرين مع ضمان حقوق الطرفين وعقود قانونية محكمة.',
    icon: 'Building',
  },
  {
    id: 4,
    title: 'الاستشارات العقارية',
    description: 'فريق من الخبراء يقدم استشارات متخصصة لمساعدتك في اتخاذ أفضل القرارات الاستثمارية في سوق العقارات.',
    icon: 'TrendingUp',
  },
  {
    id: 5,
    title: 'إدارة الممتلكات',
    description: 'نتولى إدارة ممتلكاتك العقارية بالكامل من صيانة وتحصيل إيجارات ومتابعة مستمرة لضمان أعلى عائد.',
    icon: 'Settings',
  },
  {
    id: 6,
    title: 'التمويل العقاري',
    description: 'نساعدك في الحصول على أفضل عروض التمويل العقاري من البنوك والمؤسسات المالية بأقل فوائد ممكنة.',
    icon: 'DollarSign',
  },
];

export const cities = ['القاهرة', 'الجيزة', 'العاصمة الإدارية', 'الساحل الشمالي'];
export const propertyTypes = ['شقة', 'فيلا', 'تاون هاوس', 'بنتهاوس', 'أرض', 'مكتب'];

export const faqs = [
  {
    question: 'كيف أبدأ عملية البحث عن عقار؟',
    answer: 'يمكنك البدء بتصفح قائمة العقارات المتاحة على موقعنا واستخدام فلاتر البحث المتقدمة لتحديد نوع العقار والموقع والميزانية. كما يمكنك التواصل مع أحد مستشارينا العقاريين للحصول على مساعدة شخصية.',
  },
  {
    question: 'هل تقدمون خدمات التمويل العقاري؟',
    answer: 'نعم، نتعاون مع أكبر البنوك والمؤسسات المالية في مصر لتقديم أفضل عروض التمويل العقاري. فريقنا سيساعدك في اختيار خطة التمويل المناسبة لك ومتابعة كافة الإجراءات.',
  },
  {
    question: 'ما هي رسوم خدماتكم؟',
    answer: 'تختلف رسومنا حسب نوع الخدمة المطلوبة. نقدم استشارات مجانية للمشترين لأول مرة. للبائعين، نتقاضى عمولة تنافسية عند إتمام الصفقة بنجاح. تواصل معنا للحصول على تفاصيل الأسعار.',
  },
  {
    question: 'كم يستغرق إتمام عملية البيع أو الشراء؟',
    answer: 'تختلف المدة حسب عوامل عديدة مثل حالة السوق ونوع العقار وطريقة الدفع. في المتوسط، تستغرق عملية البيع من 2 إلى 6 أسابيع بعد الاتفاق على السعر. نحرص على تسريع العملية مع ضمان كافة الحقوق.',
  },
  {
    question: 'هل يمكنني جدولة جولة لزيارة العقار؟',
    answer: 'بالتأكيد! يمكنك حجز موعد لزيارة أي عقار من خلال صفحة التفاصيل أو التواصل معنا مباشرة. نوفر جولات افتراضية 360° لبعض العقارات المميزة كخيار إضافي.',
  },
];
