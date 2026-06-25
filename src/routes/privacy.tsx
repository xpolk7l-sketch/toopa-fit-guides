import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { BUSINESS } from "@/lib/products";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "سياسة الخصوصية — TOOPA" },
      { name: "description", content: "سياسة الخصوصية الخاصة بمتجر TOOPA للأدلة الرقمية." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <PageHeader eyebrow="السياسات" title="سياسة الخصوصية" description="نلتزم بحماية بياناتك الشخصية وفق أعلى المعايير." />
      <article className="surface-card mt-10 space-y-6 p-6 text-sm leading-8 text-muted-foreground sm:p-8">
        <section>
          <h2 className="text-base font-extrabold text-foreground">١. مقدمة</h2>
          <p className="mt-2">تشرح هذه السياسة كيفية جمع واستخدام وحماية بياناتك عند استخدامك لموقع {BUSINESS.name}. باستخدامك للموقع فإنك توافق على ما ورد فيها.</p>
        </section>
        <section>
          <h2 className="text-base font-extrabold text-foreground">٢. البيانات التي نجمعها</h2>
          <ul className="mt-2 list-disc space-y-1.5 pr-5">
            <li>الاسم الكامل عند إنشاء الطلب.</li>
            <li>البريد الإلكتروني لإرسال المنتج الرقمي وتأكيدات الطلب.</li>
            <li>رقم الجوال للتواصل بشأن طلبك.</li>
            <li>إيصال التحويل البنكي الذي ترفعه للتحقق من الدفع.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-base font-extrabold text-foreground">٣. كيفية استخدام البيانات</h2>
          <p className="mt-2">نستخدم بياناتك حصراً لمعالجة طلبك، التحقق من التحويل، تسليم المنتج الرقمي، وتقديم الدعم. لا نقوم ببيع أو مشاركة بياناتك مع أي طرف ثالث لأغراض تسويقية.</p>
        </section>
        <section>
          <h2 className="text-base font-extrabold text-foreground">٤. حماية البيانات</h2>
          <p className="mt-2">نتبع إجراءات أمنية تقنية وتنظيمية مناسبة لحماية بياناتك من الوصول أو الاستخدام غير المصرح به.</p>
        </section>
        <section>
          <h2 className="text-base font-extrabold text-foreground">٥. ملفات تعريف الارتباط</h2>
          <p className="mt-2">نستخدم تخزيناً محلياً بسيطاً في متصفحك لحفظ محتويات سلتك فقط. لا نستخدم أدوات تتبع إعلانية.</p>
        </section>
        <section>
          <h2 className="text-base font-extrabold text-foreground">٦. حقوقك</h2>
          <p className="mt-2">يحق لك طلب الاطلاع على بياناتك أو حذفها بالتواصل معنا عبر <a className="text-brand hover:underline" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.</p>
        </section>
        <section>
          <h2 className="text-base font-extrabold text-foreground">٧. التعديلات</h2>
          <p className="mt-2">قد نقوم بتحديث هذه السياسة من وقت لآخر، وسيتم نشر النسخة المحدثة على هذه الصفحة.</p>
        </section>
      </article>
    </div>
  );
}
