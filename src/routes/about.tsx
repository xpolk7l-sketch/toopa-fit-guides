import { createFileRoute } from "@tanstack/react-router";
import { Target, Users, ShieldCheck, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { BUSINESS } from "@/lib/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن — TOOPA" },
      { name: "description", content: "تعرف على TOOPA: مهمتنا، قيمنا، ولماذا نقدم أدلة لياقة وتغذية رقمية باللغة العربية." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <PageHeader
        eyebrow="من نحن"
        title={<>قصة <span className="gradient-text">{BUSINESS.name}</span></>}
        description="نحن فريق شغوف بصحة الإنسان واللياقة، نقدم محتوى عربياً عملياً يساعدك على تحقيق أهدافك دون تعقيد."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="surface-card p-6">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand"><Target className="h-5 w-5" /></div>
          <h3 className="mt-4 text-lg font-extrabold">مهمتنا</h3>
          <p className="mt-2 text-sm leading-8 text-muted-foreground">
            تقديم أدلة رقمية واضحة وعملية باللغة العربية تدعم رحلتك في التنشيف، التضخيم، والتغذية الصحية، بأسلوب مبسط وفعّال.
          </p>
        </div>
        <div className="surface-card p-6">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--accent-orange)]/15 text-[var(--accent-orange)]"><Sparkles className="h-5 w-5" /></div>
          <h3 className="mt-4 text-lg font-extrabold">رؤيتنا</h3>
          <p className="mt-2 text-sm leading-8 text-muted-foreground">
            أن نكون المرجع العربي الأول للأدلة الرقمية في مجالات اللياقة والتغذية، نمكّن كل شخص من اتخاذ قرارات أفضل لصحته.
          </p>
        </div>
        <div className="surface-card p-6">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand"><Users className="h-5 w-5" /></div>
          <h3 className="mt-4 text-lg font-extrabold">قيمنا</h3>
          <ul className="mt-2 space-y-2 text-sm leading-8 text-muted-foreground">
            <li>· الوضوح والبساطة في تقديم المعلومة.</li>
            <li>· الالتزام بمحتوى موثوق ومبني على الخبرة.</li>
            <li>· احترام وقت العميل وثقته.</li>
          </ul>
        </div>
        <div className="surface-card p-6">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--accent-orange)]/15 text-[var(--accent-orange)]"><ShieldCheck className="h-5 w-5" /></div>
          <h3 className="mt-4 text-lg font-extrabold">لماذا TOOPA؟</h3>
          <ul className="mt-2 space-y-2 text-sm leading-8 text-muted-foreground">
            <li>· أدلة عربية احترافية بصيغة PDF عالية الجودة.</li>
            <li>· دعم مباشر عبر البريد والواتساب.</li>
            <li>· ضمان رضا لمدة 7 أيام وفق السياسة.</li>
          </ul>
        </div>
      </div>

      <div className="surface-card mt-10 p-6 text-center">
        <p className="text-sm leading-8 text-muted-foreground">
          نعمل من <span className="font-bold text-foreground">{BUSINESS.location}</span> ونخدم العملاء في جميع أنحاء المنطقة.
        </p>
      </div>
    </div>
  );
}
