import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Copy, Upload, Loader2, FileCheck2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { BANK, BUSINESS } from "@/lib/products";

export const Route = createFileRoute("/order/$id")({
  head: () => ({
    meta: [
      { title: "تم استلام طلبك — TOOPA" },
      { name: "description", content: "تعليمات إكمال الدفع عبر التحويل البنكي ورفع الإيصال." },
    ],
  }),
  component: OrderPage,
});

function CopyField({ label, value }: { label: string; value: string }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("تم النسخ");
    } catch {
      toast.error("تعذر النسخ");
    }
  };
  return (
    <div className="rounded-xl border border-border bg-background/60 p-3">
      <div className="text-xs font-bold text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center justify-between gap-2">
        <div className="truncate text-sm font-bold" dir="ltr">{value}</div>
        <button type="button" onClick={copy} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border hover:border-brand/60 hover:text-brand" aria-label="نسخ">
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function OrderPage() {
  const { id } = Route.useParams();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFile = (f: File | null) => {
    if (!f) return setFile(null);
    const ok = ["image/png", "image/jpeg", "image/jpg", "image/webp", "application/pdf"].includes(f.type);
    if (!ok) {
      toast.error("الملف يجب أن يكون صورة (PNG/JPG/WEBP) أو PDF");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      toast.error("الحد الأقصى لحجم الملف 10MB");
      return;
    }
    setFile(f);
  };

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("اختر ملف الإيصال أولاً");
      return;
    }
    setUploading(true);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
      const path = `${id}/receipt-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("receipts").upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (upErr) {
        console.error(upErr);
        toast.error("تعذر رفع الإيصال، حاول مرة أخرى");
        return;
      }
      const { error: updErr } = await supabase
        .from("orders")
        .update({ receipt_url: path })
        .eq("id", id);
      if (updErr) {
        console.error(updErr);
        toast.error("تم رفع الإيصال ولكن تعذر ربطه بالطلب — تواصل مع الدعم");
        return;
      }
      setUploaded(true);
      toast.success("تم استلام الإيصال بنجاح");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="surface-card overflow-hidden">
        <div className="border-b border-border bg-brand-soft p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl btn-brand">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-black sm:text-2xl">تم استلام طلبك</h1>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                تم استلام طلبك. يرجى تحويل المبلغ إلى الحساب البنكي الموضح أدناه ثم رفع إيصال التحويل. سيتم التحقق من الحوالة وتسليم المنتج الرقمي بعد المراجعة.
              </p>
              <div className="mt-3 text-xs text-muted-foreground">
                رقم الطلب: <span className="font-mono font-bold text-foreground" dir="ltr">{id.slice(0, 8).toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2">
          <div>
            <h2 className="text-base font-extrabold">بيانات التحويل البنكي</h2>
            <div className="mt-3 space-y-2.5">
              <CopyField label="اسم البنك" value={BANK.name} />
              <CopyField label="اسم صاحب الحساب" value={BANK.accountName} />
              <CopyField label="رقم الحساب" value={BANK.accountNumber} />
              <CopyField label="رقم الآيبان (IBAN)" value={BANK.iban} />
            </div>
          </div>

          <div>
            <h2 className="text-base font-extrabold">رفع إيصال التحويل</h2>
            {uploaded ? (
              <div className="mt-3 rounded-xl border border-brand/40 bg-brand-soft p-5 text-sm leading-7">
                <div className="flex items-center gap-2 font-bold text-brand">
                  <FileCheck2 className="h-5 w-5" />
                  تم استلام الإيصال بنجاح
                </div>
                <p className="mt-2 text-muted-foreground">
                  سيتم التحقق من الحوالة وإرسال المنتج الرقمي إلى بريدك الإلكتروني بعد المراجعة (عادةً خلال 24 ساعة عمل).
                </p>
                <Link to="/" className="mt-4 inline-flex rounded-xl btn-brand px-5 py-2.5 text-sm">العودة للرئيسية</Link>
              </div>
            ) : (
              <form onSubmit={upload} className="mt-3 space-y-3">
                <label className="block cursor-pointer rounded-xl border-2 border-dashed border-border bg-background/40 p-6 text-center transition hover:border-brand/60">
                  <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                  <div className="mt-2 text-sm font-bold">{file ? file.name : "اختر صورة أو ملف PDF"}</div>
                  <div className="mt-1 text-xs text-muted-foreground">PNG · JPG · WEBP · PDF (حتى 10MB)</div>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                  />
                </label>
                <button
                  type="submit"
                  disabled={!file || uploading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl btn-brand px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading ? <><Loader2 className="h-4 w-4 animate-spin" /> جارٍ رفع الإيصال…</> : "رفع الإيصال"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-border bg-background/40 p-6 text-xs leading-7 text-muted-foreground sm:p-8">
          هل تحتاج مساعدة؟ تواصل معنا عبر البريد <a href={`mailto:${BUSINESS.email}`} className="font-bold text-brand hover:underline">{BUSINESS.email}</a> أو واتساب <a href={`https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, "")}`} className="font-bold text-brand hover:underline" dir="ltr">{BUSINESS.whatsapp}</a>.
        </div>
      </div>
    </div>
  );
}
