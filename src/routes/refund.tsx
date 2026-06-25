import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { BUSINESS } from "@/lib/products";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "سياسة الاسترداد — TOOPA" },
      { name: "description", content: "سياسة الاسترداد للمنتجات الرقمية في TOOPA — ضمان رضا 7 أيام." },
    ],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <PageHeader eyebrow="السياسات" title="سياسة الاسترداد" description="ضمان رضا 7 أيام للمنتجات الرقمية." />
      <article className="surface-card mt-10 space-y-6 p-6 text-sm leading-8 text-muted-foreground sm:p-8">
        <section>
          <h2 className="text-base font-extrabold text-foreground">١. طبيعة المنتجات</h2>
          <p className="mt-2">جميع منتجات {BUSINESS.name} هي منتجات رقمية بصيغة PDF يتم تسليمها إلكترونياً بعد التحقق من التحويل البنكي. لا توجد منتجات شحن مادية.</p>
        </section>
        <section>
          <h2 className="text-base font-extrabold text-foreground">٢. ضمان الرضا (٧ أيام)</h2>
          <p className="mt-2">نقدم لك ضمان رضا لمدة <span className="font-bold text-foreground">7 أيام</span> من تاريخ تسليم المنتج الرقمي. إذا لم يلبِّ الدليل توقعاتك، يحق لك طلب استرداد كامل المبلغ خلال هذه الفترة.</p>
        </section>
        <section>
          <h2 className="text-base font-extrabold text-foreground">٣. كيف تطلب الاسترداد</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pr-5">
            <li>أرسل بريداً إلى <a className="text-brand hover:underline" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> خلال 7 أيام من تاريخ التسليم.</li>
            <li>اذكر رقم الطلب والاسم وسبب طلب الاسترداد.</li>
            <li>سيتواصل معك فريق الدعم خلال 48 ساعة عمل.</li>
            <li>تتم إعادة المبلغ عبر تحويل بنكي خلال 5–7 أيام عمل بعد الموافقة.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-base font-extrabold text-foreground">٤. الحالات غير المشمولة</h2>
          <ul className="mt-2 list-disc space-y-1.5 pr-5">
            <li>الطلبات المقدمة بعد مرور 7 أيام من التسليم.</li>
            <li>إساءة استخدام المنتج أو إعادة توزيعه دون إذن.</li>
            <li>طلبات الاسترداد دون تقديم سبب واضح بعد تجاوز فترة الضمان.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-base font-extrabold text-foreground">٥. دعم العملاء</h2>
          <p className="mt-2">قبل طلب الاسترداد، يسعدنا مساعدتك في الاستفادة الكاملة من الدليل. تواصل معنا في أي وقت عبر <a className="text-brand hover:underline" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> أو واتساب <span dir="ltr">{BUSINESS.whatsapp}</span>.</p>
        </section>
      </article>
    </div>
  );
}
