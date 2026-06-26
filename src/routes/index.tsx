import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, Download, Sparkles, BookOpen, Heart } from "lucide-react";
import { PRODUCTS, BUSINESS } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOOPA — أدلة لياقة وتغذية رقمية باللغة العربية" },
      { name: "description", content: "اكتشف أدلة TOOPA الرقمية: دليل التنشيف والوصفات الصحية، ودليل تضخيم العضلات ووصفات الطاقة. PDF عربي عالي الجودة." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { add } = useCart();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="chip">
                <Sparkles className="h-3.5 w-3.5" /> أدلة رقمية بصيغة PDF
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
                ابنِ جسماً <span className="gradient-text">أقوى</span>،<br className="hidden sm:block" />
                وتغذية <span className="gradient-text-orange">أذكى</span>.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                أدلة عربية احترافية تجمع بين خطط التغذية، الوصفات الصحية، ونصائح التدريب — مصممة لتوصلك إلى أهدافك بأبسط الطرق وأكثرها فعالية.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#products" className="inline-flex items-center gap-2 rounded-xl btn-brand px-6 py-3 text-sm">
                  <BookOpen className="h-4 w-4" /> تصفح الأدلة
                </a>
                <Link to="/about" className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-bold hover:border-brand/50">
                  تعرف على TOOPA
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                {[
                  { k: "+1200", v: "عميل سعيد" },
                  { k: "7 أيام", v: "ضمان رضا" },
                  { k: "PDF", v: "تسليم فوري بعد التحقق" },
                ].map((s) => (
                  <div key={s.v} className="surface-card px-3 py-4">
                    <div className="text-lg font-black text-brand sm:text-xl">{s.k}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="surface-card relative overflow-hidden p-6">
                <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand/20 blur-3xl" />
                <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[var(--accent-orange)]/20 blur-3xl" />
                <div className="relative space-y-4">
                  {PRODUCTS.map((p) => (
                    <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-2">
                      <img
                        src={p.image}
                        alt={p.title}
                        width={64}
                        height={64}
                        loading="lazy"
                        className="h-16 w-16 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-bold">{p.title}</div>
                        <div className="text-xs text-muted-foreground">دليل PDF احترافي</div>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-black">{p.price} {BUSINESS.currency}</div>
                      </div>
                    </div>
                  ))}
                  <div className="rounded-xl border border-dashed border-border p-3 text-center text-xs text-muted-foreground">
                    الدفع الآمن عبر التحويل البنكي · تسليم رقمي بعد المراجعة
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {[
            { icon: ShieldCheck, title: "محتوى موثوق", desc: "أدلة عملية مبنية على أسس تغذوية وتدريبية صحيحة." },
            { icon: Download, title: "تسليم رقمي", desc: "تستلم الدليل بصيغة PDF عالية الجودة بعد التحقق من التحويل." },
            { icon: Heart, title: "ضمان الرضا", desc: "ضمان رضا 7 أيام للمنتجات الرقمية وفق سياسة الاسترداد." },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold">{f.title}</div>
                <p className="mt-1 text-sm leading-7 text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">المنتجات</span>
          <h2 className="mt-4 text-3xl font-black sm:text-4xl">أدلة TOOPA الرقمية</h2>
          <p className="mt-3 text-muted-foreground">اختر الدليل المناسب لهدفك وابدأ اليوم.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((p) => (
            <article key={p.id} className="surface-card relative flex flex-col overflow-hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border/60">
                <img
                  src={p.image}
                  alt={p.title}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <span className={`chip ${p.accent === "orange" ? "!bg-[var(--accent-orange)]/15 !text-[var(--accent-orange)] !border-[var(--accent-orange)]/40" : ""}`}>
                  {p.badge}
                </span>
                <div className="text-left">
                  <div className="text-3xl font-black">{p.price}<span className="mr-1 text-sm font-bold text-muted-foreground">{BUSINESS.currency}</span></div>
                </div>
              </div>

              <h3 className="mt-4 text-xl font-extrabold leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{p.description}</p>

              <ul className="mt-5 space-y-2.5">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${p.accent === "orange" ? "text-[var(--accent-orange)]" : "text-brand"}`} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => { add(p.id); toast.success("تمت الإضافة إلى السلة"); }}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm ${p.accent === "orange" ? "btn-orange" : "btn-brand"}`}
                >
                  أضف إلى السلة
                </button>
                <Link to="/checkout" className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-5 py-3 text-sm font-bold hover:border-brand/50">
                  السلة
                </Link>
              </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="surface-card flex flex-col items-center gap-4 p-8 text-center sm:p-12">
          <span className="chip">ابدأ رحلتك الآن</span>
          <h3 className="max-w-2xl text-2xl font-black leading-snug sm:text-3xl">
            استثمر في صحتك اليوم — احصل على دليل TOOPA بصيغة PDF فوراً بعد التحقق من التحويل.
          </h3>
          <a href="#products" className="mt-2 inline-flex rounded-xl btn-brand px-7 py-3 text-sm">تصفح الأدلة</a>
        </div>
      </section>
    </div>
  );
}
