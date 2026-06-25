import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { BUSINESS } from "@/lib/products";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-border/60 bg-background/60 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl btn-brand text-base">T</span>
            <span className="text-xl font-extrabold">{BUSINESS.name}</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
            {BUSINESS.tagline}. ندعم رحلتك نحو لياقة أفضل بأدلة عملية مبنية على الخبرة والوضوح.
          </p>
          <div className="mt-5 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand" />
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-foreground">{BUSINESS.email}</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand" />
              <a href={`https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, "")}`} className="hover:text-foreground" dir="ltr">
                {BUSINESS.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand" />
              <span>{BUSINESS.location}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-extrabold text-foreground">روابط</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">الرئيسية</Link></li>
            <li><Link to="/about" className="hover:text-foreground">من نحن</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">تواصل معنا</Link></li>
            <li><Link to="/checkout" className="hover:text-foreground">السلة والدفع</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-extrabold text-foreground">السياسات</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground">سياسة الخصوصية</Link></li>
            <li><Link to="/refund" className="hover:text-foreground">سياسة الاسترداد</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">الشروط والأحكام</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {year} {BUSINESS.name}. جميع الحقوق محفوظة.</p>
          <p>طرق الدفع المتاحة: تحويل بنكي</p>
        </div>
      </div>
    </footer>
  );
}
