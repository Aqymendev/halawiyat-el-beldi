import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "right",
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "right" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-right", className)}>
      {eyebrow ? <p className="mb-4 text-xs tracking-[0.34em] text-brand-gold/85">{eyebrow}</p> : null}
      <h2 className="text-4xl leading-[1.25] sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-brand-cream/72">{description}</p> : null}
    </div>
  );
}
