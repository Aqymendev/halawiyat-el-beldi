import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/sections/section-header";
import type { Dictionary, Locale } from "@/lib/i18n";

export function ReviewsSection({ dictionary }: { dictionary: Dictionary; locale: Locale }) {
  const testimonials = [
    {
      name: "نادية ت.",
      quote: "كل علبة تبدو مدروسة بعناية، من الشكل الخارجي إلى توازن النكهة. فعلاً تجربة راقية."
    },
    {
      name: "سمير ك.",
      quote: "طلبنا للعيد وكان التقديم أنيقاً جداً والجودة واضحة. الضيوف سألوا مباشرة عن المصدر."
    },
    {
      name: "إيمان ر.",
      quote: "الطلب عبر واتساب سهل وسريع، والحلويات فيها لمسة يدوية جميلة وتفاصيل مميزة."
    }
  ];

  return (
    <section className="section-spacing">
      <div className="shell space-y-10">
        <Reveal>
          <SectionHeader
            eyebrow={dictionary.reviews.eyebrow}
            title={dictionary.reviews.title}
            description={dictionary.reviews.description}
            align="center"
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.06}>
              <div className="panel premium-border h-full p-6 text-right">
                <p className="text-lg leading-9 text-brand-cream/80">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="mt-6 text-xs tracking-[0.28em] text-brand-gold/75">{testimonial.name}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
