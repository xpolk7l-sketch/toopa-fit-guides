import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Trash2, Plus, Minus, ShoppingBag, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { BUSINESS } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "السلة والدفع — TOOPA" },
      { name: "description", content: "أكمل طلبك من متجر TOOPA — الدفع عبر التحويل البنكي." },
    ],
  }),
  component: CheckoutPage,
});

const schema = z.object({
  customer_name: z.string().trim().min(3, "الاسم مطلوب (3 أحرف على الأقل)").max(80),
  email: z.string().trim().email("البريد الإلكتروني غير صالح").max(120),
  phone: z
    .string()
    .trim()
    .min(8, "رقم الجوال غير صالح")
    .max(20)
    .regex(/^[+0-9\s-]+$/u, "أدخل رقم جوال صحيح"),
});

function CheckoutPage() {
  const { detailed, subtotal, count, setQty, remove, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customer_name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (count === 0) {
      toast.error("سلتك فارغة");
      return;
    }
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "يرجى مراجعة البيانات");
      return;
    }
    setSubmitting(true);
    try {
      const items = detailed.map((i) => ({
        product_id: i.productId,
        title: i.product.title,
        price: i.product.price,
        quantity: i.quantity,
      }));
      const { data, error } = await supabase
        .from("orders")
        .insert({
          customer_name: parsed.data.customer_name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          items,
          total: subtotal,
        })
        .select("id, order_number")
        .single();

      if (error || !data) {
        console.error(error);
        toast.error("تعذر إنشاء الطلب، حاول مرة أخرى");
        return;
      }

      clear();
      navigate({ to: "/order/$id", params: { id: data.id } });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="chip"><ShoppingBag className="h-3.5 w-3.5" /> إتمام الشراء</span>
        <h1 className="mt-4 text-3xl font-black sm:text-4xl">السلة والدفع</h1>
        <p className="mt-2 text-sm text-muted-foreground">راجع طلبك، أدخل بياناتك، ثم أكمل التحويل البنكي.</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]">
        {/* LEFT: cart + form */}
        <div className="space-y-6">
          <div className="surface-card p-5 sm:p-6">
            <h2 className="text-lg font-extrabold">سلتك ({count})</h2>
            {detailed.length === 0 ? (
              <div className="mt-6 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                سلتك فارغة. <Link to="/" className="font-bold text-brand hover:underline">تصفح الأدلة</Link>
              </div>
            ) : (
              <ul className="mt-4 divide-y divide-border">
                {detailed.map((i) => (
                  <li key={i.productId} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4 sm:flex sm:justify-between">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold">{i.product.title}</div>
                      <div className="text-xs text-muted-foreground">{i.product.price} {BUSINESS.currency} × {i.quantity}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <div className="flex items-center rounded-lg border border-border bg-background">
                        <button type="button" onClick={() => setQty(i.productId, i.quantity - 1)} className="grid h-9 w-9 place-items-center hover:bg-accent" aria-label="إنقاص">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{i.quantity}</span>
                        <button type="button" onClick={() => setQty(i.productId, i.quantity + 1)} className="grid h-9 w-9 place-items-center hover:bg-accent" aria-label="زيادة">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button type="button" onClick={() => remove(i.productId)} className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:border-destructive hover:text-destructive" aria-label="حذف">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <form onSubmit={onSubmit} className="surface-card space-y-4 p-5 sm:p-6">
            <h2 className="text-lg font-extrabold">بيانات العميل</h2>
            <div>
              <label className="mb-1.5 block text-sm font-bold">الاسم الكامل</label>
              <input
                type="text"
                required
                value={form.customer_name}
                onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand"
                placeholder="مثال: عبدالله العتيبي"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand"
                placeholder="name@example.com"
                dir="ltr"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-bold">رقم الجوال</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand"
                placeholder="+9665XXXXXXXX"
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              disabled={submitting || count === 0}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl btn-brand px-6 py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> جارٍ إنشاء الطلب…</> : "تأكيد الطلب والمتابعة للدفع"}
            </button>
            <p className="text-xs leading-6 text-muted-foreground">
              بالنقر على «تأكيد الطلب» فإنك توافق على <Link to="/terms" className="text-brand hover:underline">الشروط والأحكام</Link> و <Link to="/privacy" className="text-brand hover:underline">سياسة الخصوصية</Link>.
            </p>
          </form>
        </div>

        {/* RIGHT: summary */}
        <aside className="surface-card sticky top-20 h-fit p-5 sm:p-6">
          <h2 className="text-lg font-extrabold">ملخص الطلب</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>المجموع الفرعي</span>
              <span className="font-bold text-foreground">{subtotal.toFixed(2)} {BUSINESS.currency}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>التوصيل</span>
              <span>منتج رقمي</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="text-base font-extrabold">الإجمالي</span>
              <span className="text-xl font-black gradient-text">{subtotal.toFixed(2)} {BUSINESS.currency}</span>
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-border bg-background/60 p-4 text-xs leading-7 text-muted-foreground">
            <div className="font-bold text-foreground">طريقة الدفع: تحويل بنكي</div>
            ستظهر تفاصيل الحساب البنكي وحقل رفع الإيصال بعد تأكيد الطلب.
          </div>
        </aside>
      </div>
    </div>
  );
}
