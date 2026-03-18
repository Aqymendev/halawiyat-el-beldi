import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="shell section-spacing">
      <div className="panel premium-border flex flex-col items-start gap-5 p-10 text-right">
        <p className="text-xs tracking-[0.32em] text-brand-gold/80">صفحة غير موجودة</p>
        <h1 className="text-5xl">تعذر العثور على هذه الصفحة</h1>
        <p className="max-w-xl text-sm leading-7 text-brand-cream/70">
          ربما تم نقل الصفحة أو أن المنتج لم يعد متوفراً حالياً.
        </p>
        <Button asChild>
          <Link href="/ar/products">تصفح المنتجات</Link>
        </Button>
      </div>
    </section>
  );
}
