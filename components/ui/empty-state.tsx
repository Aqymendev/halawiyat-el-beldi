import Link from "next/link";

import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  ctaLabel,
  ctaHref
}: {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <div className="panel premium-border flex flex-col items-start gap-4 p-8">
      <div>
        <h3 className="text-2xl">{title}</h3>
        <p className="mt-2 max-w-xl text-sm text-brand-cream/70">{description}</p>
      </div>
      {ctaLabel && ctaHref ? (
        <Button asChild variant="secondary">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}
