import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ShieldCheck,
  Download,
  Sparkles,
  BookOpen,
  Zap,
  RefreshCw,
  Lock,
  Star,
  ArrowLeft,
  Users,
  FileText,
  Award,
} from "lucide-react";
import { PRODUCTS, BUSINESS } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOOPA — أدلة لياقة وتغذية رقمية باللغة العربية" },
      {
        name: "description",
        content:
          "اكتشف أدلة TOOPA الرقمية: دليل التنشيف والوصفات الصحية، ودليل تضخيم العضلات ووصفات الطاقة. PDF عربي عالي الجودة.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { add } = useCart();

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-200px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]" />
        <div className="absolute right-[-100px] top-[100px] h-[400px] w-[400px] rounded-full bg-[var(--accent-orange)]/10 blur-[120px]" />
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
            <div className="animate-fade-in">
              <span className="chip">
                <Sparkles className="h-3.5 w-3.5" /> أدلة رقمية بصيغة PDF · تسليم فوري
              </span>
              <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl">
                ابنِ جسماً <span className="gradient-text">أقوى</span>
                <br />
                وتغذية <span className="gradient-text-orange">أذكى</span>.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                أدلة عربية احترافية تجمع بين خطط التغذية، الوصفات الصحية، ونصائح التدريب —
                مصممة لتوصلك إلى أهدافك بأبسط الطرق وأكثرها فعالية.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 rounded-2xl btn-brand px-7 py-3.5 text-sm"
                >
                  <BookOpen className="h-4 w-4" /> تصفح الأدلة
                  <ArrowLeft className="h-4 w-4" />
                </a>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border bg-surface/60 px-7 py-3.5 text-sm font-bold backdrop-blur transition hover:-translate-y-0.5 hover:border-brand/60 hover:bg-surface"
                >
                  تعرف على TOOPA
                </Link>
              </div>

              {/* Trust row */}
              <div className="mt-10 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1 rtl:space-x-reverse">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[var(--accent-orange)] text-[var(--accent-orange)]"
                      />
                    ))}
                  </div>
                  <span className="font-bold text-foreground">4.9/5</span>
                  <span>من +1200 عميل</span>
                </div>
                <div className="hidden h-4 w-px bg-border sm:block" />
                <div className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-brand" /> دفع آمن
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-brand" /> تسليم فوري
                </div>
              </div>
            </div>

            {/* Hero mockup */}
            <div className="relative animate-fade-in [animation-delay:120ms]">
              <div className="relative">
                {/* Main card */}
                <div className="surface-card relative overflow-hidden p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
                  <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-brand/25 blur-3xl" />
                  <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-[var(--accent-orange)]/20 blur-3xl" />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-[var(--accent-orange)]/70" />
                      <div className="h-2.5 w-2.5 rounded-full bg-brand/70" />
                      <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      TOOPA · PDF
                    </span>
                  </div>

                  <div className="relative mt-5 space-y-3">
                    {PRODUCTS.map((p, i) => (
                      <div
                        key={p.id}
                        className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-2.5 backdrop-blur transition hover:-translate-y-0.5 hover:border-brand/40"
                        style={{ animationDelay: `${200 + i * 80}ms` }}
                      >
                        <img
                          src={p.image}
                          alt={p.title}
                          width={64}
                          height={64}
                          loading="lazy"
                          className="h-16 w-16 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-bold">{p.title}</div>
                          <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <FileText className="h-3 w-3" /> دليل PDF احترافي
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-sm font-black">
                            {p.price}{" "}
                            <span className="text-xs font-bold text-muted-foreground">
                              {BUSINESS.currency}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-3 text-xs text-muted-foreground">
                      <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                      دفع آمن عبر التحويل البنكي · تسليم بعد المراجعة
                    </div>
                  </div>
                </div>

                {/* Floating badge 1 */}
                <div className="absolute -bottom-5 -left-5 hidden animate-fade-in items-center gap-2 rounded-2xl border border-border bg-surface-elevated/95 px-4 py-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl [animation-delay:400ms] sm:flex">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-black">تسليم فوري</div>
                    <div className="text-[10px] text-muted-foreground">
                      بعد التحقق من التحويل
                    </div>
                  </div>
                </div>

                {/* Floating badge 2 */}
                <div className="absolute -top-5 -right-3 hidden animate-fade-in items-center gap-2 rounded-2xl border border-border bg-surface-elevated/95 px-4 py-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl [animation-delay:500ms] sm:flex">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--accent-orange)]/15 text-[var(--accent-orange)]">
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs font-black">4.9 من 5</div>
                    <div className="text-[10px] text-muted-foreground">تقييمات العملاء</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="surface-card grid grid-cols-2 gap-px overflow-hidden bg-border/50 sm:grid-cols-4">
            {[
              { icon: Users, k: "+1,200", v: "عميل سعيد" },
              { icon: Download, k: "+3,500", v: "عملية تحميل" },
              { icon: BookOpen, k: "2", v: "أدلة احترافية" },
              { icon: Award, k: "98%", v: "نسبة الرضا" },
            ].map((s) => (
              <div
                key={s.v}
                className="flex flex-col items-center gap-2 bg-surface px-4 py-8 text-center"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft text-brand">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="text-3xl font-black tracking-tight sm:text-4xl">{s.k}</div>
                <div className="text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">لماذا TOOPA</span>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            كل ما تحتاجه <span className="gradient-text">في مكان واحد</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            محتوى موثوق، تجربة شراء بسيطة، وضمانات واضحة تحمي وقتك ومالك.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "محتوى موثوق",
              desc: "أدلة عملية مبنية على أسس تغذوية وتدريبية صحيحة.",
              accent: "brand",
            },
            {
              icon: Zap,
              title: "تسليم فوري",
              desc: "استلم الدليل بصيغة PDF عالية الجودة فور التحقق من التحويل.",
              accent: "orange",
            },
            {
              icon: Lock,
              title: "دفع آمن",
              desc: "تحويل بنكي مباشر عبر بنوك موثوقة داخل المملكة.",
              accent: "brand",
            },
            {
              icon: RefreshCw,
              title: "تحديثات مستمرة",
              desc: "نضيف وصفات ومحتوى جديد ونطور الأدلة باستمرار.",
              accent: "orange",
            },
            {
              icon: Award,
              title: "ضمان الرضا",
              desc: "ضمان رضا 7 أيام على المنتجات الرقمية وفق سياسة الاسترداد.",
              accent: "brand",
            },
            {
              icon: Users,
              title: "دعم مباشر",
              desc: "فريق دعم متاح عبر البريد والواتساب للإجابة على استفساراتك.",
              accent: "orange",
            },
          ].map((f) => {
            const isOrange = f.accent === "orange";
            return (
              <div
                key={f.title}
                className="group surface-card relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_20px_60px_-30px_var(--brand-soft)]"
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${
                    isOrange
                      ? "bg-[var(--accent-orange)]/12 text-[var(--accent-orange)]"
                      : "bg-brand-soft text-brand"
                  }`}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{f.desc}</p>
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-brand/5 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="relative">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="chip">المنتجات</span>
            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              أدلة <span className="gradient-text">TOOPA</span> الرقمية
            </h2>
            <p className="mt-4 text-muted-foreground">
              اختر الدليل المناسب لهدفك وابدأ اليوم.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {PRODUCTS.map((p) => {
              const isOrange = p.accent === "orange";
              return (
                <article
                  key={p.id}
                  className="group surface-card relative flex flex-col overflow-hidden transition duration-500 hover:-translate-y-1"
                  style={{
                    boxShadow: isOrange
                      ? "0 30px 60px -30px rgba(255,122,0,0.25)"
                      : "0 30px 60px -30px rgba(0,255,136,0.25)",
                  }}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      width={1024}
                      height={640}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <div className="absolute right-4 top-4">
                      <span
                        className={`chip backdrop-blur ${
                          isOrange
                            ? "!bg-[var(--accent-orange)]/20 !text-[var(--accent-orange)] !border-[var(--accent-orange)]/40"
                            : ""
                        }`}
                      >
                        {p.badge}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-end justify-between gap-3">
                      <h3 className="text-2xl font-extrabold leading-snug">{p.title}</h3>
                      <div className="shrink-0 text-left">
                        <div className="text-3xl font-black leading-none">
                          {p.price}
                          <span className="mr-1 text-sm font-bold text-muted-foreground">
                            {BUSINESS.currency}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {p.description}
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm">
                          <CheckCircle2
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                              isOrange ? "text-[var(--accent-orange)]" : "text-brand"
                            }`}
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          add(p.id);
                          toast.success("تمت الإضافة إلى السلة");
                        }}
                        className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm ${
                          isOrange ? "btn-orange" : "btn-brand"
                        }`}
                      >
                        أضف إلى السلة
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <Link
                        to="/checkout"
                        className="inline-flex items-center justify-center rounded-2xl border border-border bg-surface/70 px-5 py-3.5 text-sm font-bold backdrop-blur transition hover:border-brand/50"
                      >
                        السلة
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="surface-card relative overflow-hidden p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl" />
            <div className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[var(--accent-orange)]/15 blur-3xl" />
          </div>
          <div className="relative">
            <span className="chip">ابدأ رحلتك الآن</span>
            <h3 className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
              استثمر في صحتك اليوم — <span className="gradient-text">احصل على دليلك فوراً</span>
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              PDF عربي احترافي · تسليم فوري بعد التحقق · ضمان رضا 7 أيام
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-2xl btn-brand px-8 py-3.5 text-sm"
              >
                تصفح الأدلة <ArrowLeft className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-surface/70 px-8 py-3.5 text-sm font-bold backdrop-blur hover:border-brand/50"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
