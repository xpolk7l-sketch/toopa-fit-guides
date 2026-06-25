import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { BUSINESS } from "@/lib/products";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "الشروط والأحكام — TOOPA" },
      { name: "description", content: "الشروط والأحكام الخاصة باستخدام متجر TOOPA للأدلة الرقمية." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <PageHeader eyebrow="السياسات" title="الشروط والأحكام" description="يرجى قراءة هذه الشروط بعناية قبل استخدام الموقع." />
      <article className="surface-card mt-10 space-y-6 p-6 text-sm leading-8 text-muted-foreground sm:p-8">
        <section>
          <h2 className="text-base font-extrabold text-foreground">١. قبول الشروط</h2>
          <p className="mt-2">باستخدامك لموقع {BUSINESS.name} أو شراء أي منتج رقمي، فإنك توافق على الالتزام بهذه الشروط والأحكام.</p>
        </section>

        <section>
          <h2 className="text-base font-extrabold text-foreground">٢. الملكية الفكرية</h2>
          <p className="mt-2">جميع المحتويات (الأدلة، الوصفات، النصوص، التصاميم) هي ملكية حصرية لـ {BUSINESS.name} ومحمية بموجب قوانين حقوق الملكية الفكرية. يُمنع منعاً باتاً:</p>
          <ul className="mt-2 list-disc space-y-1.5 pr-5">
            <li>إعادة بيع الأدلة أو توزيعها بأي شكل من الأشكال.</li>
            <li>مشاركة ملفات PDF مع أطراف ثالثة.</li>
            <li>نسخ المحتوى ونشره على منصات أخرى دون إذن خطي.</li>
            <li>استخدام المحتوى لأغراض تجارية دون ترخيص.</li>
          </ul>
          <p className="mt-2">يُعد أي انتهاك لهذه الحقوق مخالفاً وقد يعرض المخالف للمساءلة القانونية.</p>
        </section>

        <section>
          <h2 className="text-base font-extrabold text-foreground">٣. إخلاء المسؤولية الطبية</h2>
          <p className="mt-2">المعلومات الواردة في أدلة {BUSINESS.name} لأغراض تعليمية وإرشادية فقط، ولا تُعد بديلاً عن الاستشارة الطبية المتخصصة. قبل البدء بأي برنامج غذائي أو تدريبي:</p>
          <ul className="mt-2 list-disc space-y-1.5 pr-5">
            <li>استشر طبيباً مختصاً، خاصة إذا كنت تعاني من حالة صحية مزمنة.</li>
            <li>الحوامل والمرضعات ومن لديهم حساسية غذائية ينبغي مراجعة المختص.</li>
            <li>لا يتحمل {BUSINESS.name} أي مسؤولية عن نتائج تطبيق المحتوى دون استشارة مهنية.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-extrabold text-foreground">٤. الدفع والتسليم</h2>
          <ul className="mt-2 list-disc space-y-1.5 pr-5">
            <li>وسيلة الدفع المتاحة حالياً هي التحويل البنكي إلى الحساب الموضح عند الدفع.</li>
            <li>يتم تسليم المنتج الرقمي عبر البريد الإلكتروني بعد التحقق من إيصال التحويل.</li>
            <li>قد تستغرق عملية المراجعة حتى 24 ساعة عمل.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-extrabold text-foreground">٥. الاستخدام المسموح</h2>
          <p className="mt-2">يحق لك استخدام الأدلة المُشترَاة للاستخدام الشخصي فقط. أي استخدام تجاري أو تعليمي جماعي يتطلب ترخيصاً خاصاً.</p>
        </section>

        <section>
          <h2 className="text-base font-extrabold text-foreground">٦. تعديل الشروط</h2>
          <p className="mt-2">يحتفظ {BUSINESS.name} بحق تعديل هذه الشروط في أي وقت، ويسري التعديل من تاريخ نشره على الموقع.</p>
        </section>

        <section>
          <h2 className="text-base font-extrabold text-foreground">٧. القانون المعمول به</h2>
          <p className="mt-2">تخضع هذه الشروط لأنظمة المملكة العربية السعودية، وأي نزاع يُحل ودياً أولاً، ثم عبر الجهات المختصة في {BUSINESS.location}.</p>
        </section>
      </article>
    </div>
  );
}
