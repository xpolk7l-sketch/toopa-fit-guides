import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { BUSINESS } from "@/lib/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا — TOOPA" },
      { name: "description", content: "تواصل مع فريق دعم TOOPA عبر البريد الإلكتروني، الهاتف، أو واتساب." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const wa = BUSINESS.whatsapp.replace(/[^0-9]/g, "");
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <PageHeader
        eyebrow="تواصل معنا"
        title={<>نحن هنا <span className="gradient-text">لمساعدتك</span></>}
        description="فريق الدعم متاح للإجابة على استفساراتك ومتابعة طلبك."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <a href={`mailto:${BUSINESS.email}`} className="surface-card group p-6 transition hover:border-brand/60">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand"><Mail className="h-5 w-5" /></div>
          <h3 className="mt-4 text-base font-extrabold">البريد الإلكتروني</h3>
          <p className="mt-2 break-all text-sm text-muted-foreground group-hover:text-foreground">{BUSINESS.email}</p>
        </a>

        <a href={`https://wa.me/${wa}`} className="surface-card group p-6 transition hover:border-brand/60">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand"><MessageCircle className="h-5 w-5" /></div>
          <h3 className="mt-4 text-base font-extrabold">واتساب</h3>
          <p className="mt-2 text-sm text-muted-foreground group-hover:text-foreground" dir="ltr">{BUSINESS.whatsapp}</p>
        </a>

        <a href={`tel:${BUSINESS.phone}`} className="surface-card group p-6 transition hover:border-brand/60">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--accent-orange)]/15 text-[var(--accent-orange)]"><Phone className="h-5 w-5" /></div>
          <h3 className="mt-4 text-base font-extrabold">الهاتف</h3>
          <p className="mt-2 text-sm text-muted-foreground group-hover:text-foreground" dir="ltr">{BUSINESS.phone}</p>
        </a>
      </div>

      <div className="surface-card mt-8 flex items-start gap-4 p-6">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><MapPin className="h-5 w-5" /></div>
        <div>
          <h3 className="text-base font-extrabold">موقعنا</h3>
          <p className="mt-1 text-sm text-muted-foreground">{BUSINESS.location}</p>
          <p className="mt-3 text-xs text-muted-foreground">ساعات الدعم: من السبت إلى الخميس، 9 صباحاً – 9 مساءً بتوقيت جدة.</p>
        </div>
      </div>
    </div>
  );
}
