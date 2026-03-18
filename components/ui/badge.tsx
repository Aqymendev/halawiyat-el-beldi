import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]",
  {
    variants: {
      variant: {
        default: "border-brand-gold/30 bg-brand-gold/12 text-brand-sand",
        featured: "border-brand-gold/40 bg-brand-gold/14 text-brand-gold",
        success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
        muted: "border-brand-cream/15 bg-brand-cream/8 text-brand-cream/70",
        danger: "border-red-500/30 bg-red-500/10 text-red-300"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
