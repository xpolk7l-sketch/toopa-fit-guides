export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  highlights: string[];
  badge: string;
  accent: "brand" | "orange";
};

export const PRODUCTS: Product[] = [
  {
    id: "cutting-guide",
    title: "دليل التنشيف والوصفات الصحية",
    description:
      "خطة عملية متكاملة لخسارة الدهون والحفاظ على الكتلة العضلية، مع وصفات صحية لذيذة تناسب نمط حياتك اليومي.",
    price: 59,
    badge: "الأكثر طلباً",
    accent: "brand",
    highlights: [
      "خطة تغذية يومية مدروسة لمدة 8 أسابيع",
      "أكثر من 40 وصفة صحية بسعرات محسوبة",
      "جداول السعرات والماكروز جاهزة للطباعة",
      "نصائح للحفاظ على الوزن بعد التنشيف",
    ],
  },
  {
    id: "bulking-guide",
    title: "دليل تضخيم العضلات ووصفات الطاقة",
    description:
      "برنامج تضخيم احترافي يجمع بين التغذية الذكية ووصفات عالية الطاقة لبناء عضلات نظيفة وزيادة القوة.",
    price: 59,
    badge: "موصى به",
    accent: "orange",
    highlights: [
      "خطة تضخيم مرحلية لمدة 12 أسبوعاً",
      "وصفات طاقة عالية البروتين والكربوهيدرات",
      "إرشادات وقت التمرين قبل وبعد",
      "نصائح المكملات الأساسية فقط",
    ],
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const BUSINESS = {
  name: "TOOPA",
  tagline: "أدلة لياقة وتغذية رقمية باللغة العربية",
  email: "toopa.support@gmail.com",
  phone: "+966554305391",
  whatsapp: "+966554305391",
  location: "الرياض، المملكة العربية السعودية",
  currency: "ر.س",
};

export const BANK = {
  name: "مصرف الراجحي",
  accountName: "عبدالرحمن الزهراني",
  accountNumber: "618000010006086189759",
  iban: "SA3880000618608016189759",
};
