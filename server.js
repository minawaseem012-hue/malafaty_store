const express = require("express");
const helmet = require("helmet");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

// Sample catalog only. Replace with products and files you own before launch.
const products = [
  { id: 1, title: "قالب سيرة ذاتية عربي", category: "قوالب", format: "DOCX", price: 2, description: "قالب سيرة ذاتية قابل للتعديل بالعربية.", details: "يتضمن أقسامًا للنبذة والمهارات والمشروعات والتعليم واللغات. الملف النموذجي موجود داخل product-files." },
  { id: 2, title: "متتبع الميزانية الشهرية", category: "Excel", format: "XLSX", price: 2, description: "جدول لتسجيل المصروفات مع ملخص تلقائي.", details: "يتضمن ورقة للمصروفات وورقة ملخص بصيغ حسابية أساسية. خصصه حسب احتياجاتك." },
  { id: 3, title: "تقويم محتوى وسائل التواصل", category: "تسويق", format: "XLSX", price: 2, description: "نظّم مواعيد المنشورات والأفكار وحالة التنفيذ.", details: "يتضمن تقويمًا شهريًا وورقة أفكار مقترحة للمحتوى." },
  { id: 4, title: "قائمة تجهيز مشروع صغير", category: "أدلة", format: "DOCX", price: 2, description: "قائمة مراجعة عملية من الفكرة إلى الإطلاق.", details: "تغطي الجمهور والمنتج والتسعير والتسويق وخدمة العملاء. ليست استشارة قانونية أو مالية." },
  { id: 5, title: "مخطط مذاكرة أسبوعي", category: "تنظيم", format: "DOCX", price: 2, description: "قسّم المهام الدراسية وراجع تقدمك أسبوعيًا.", details: "قالب قابل للطباعة والتعديل لتنظيم المواد والمهام والمدة والمراجعة الأسبوعية." }
];

app.get("/api/products", (_req, res) => res.json(products));
app.get("/api/config", (_req, res) => res.json({
  currency: "USD",
  singleFilePrice: 2,
  monthlySubscriptionPrice: 15,
  paymentConfigured: false,
  note: "Demo storefront: payment and protected downloads are not enabled."
}));

app.post("/api/checkout", (req, res) => {
  const { productId, plan } = req.body || {};
  if (plan === "monthly") {
    return res.status(503).json({ error: "الاشتراك الشهري معروض للتجربة فقط؛ الدفع الحقيقي غير مفعّل." });
  }
  const product = products.find(p => p.id === Number(productId));
  if (!product) return res.status(400).json({ error: "اختَر ملفًا صحيحًا." });
  return res.status(503).json({ error: "الدفع والتنزيل غير مفعّلين. لن يتم تحصيل أي أموال." });
});

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(PORT, () => console.log(`Digital Files Store running on port ${PORT}`));
