"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { buildWeightLabel, calculatePriceFromKg, formatComputedPrice, type WeightOption } from "@/lib/pricing";
import type { Dictionary } from "@/lib/i18n";

export function ProductWeightSelector({
  productName,
  pricePerKg,
  whatsappNumber,
  dictionary
}: {
  productName: string;
  pricePerKg: number;
  whatsappNumber: string;
  dictionary: Dictionary;
}) {
  const [weight, setWeight] = useState<WeightOption>("200g");
  const [customGrams, setCustomGrams] = useState("750");

  const resolvedGrams = useMemo(() => {
    if (weight === "200g") return 200;
    if (weight === "500g") return 500;
    if (weight === "1kg") return 1000;

    const parsed = Number(customGrams);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }, [weight, customGrams]);

  const estimatedPrice = resolvedGrams ? calculatePriceFromKg(pricePerKg, resolvedGrams) : null;

  const orderMessage = resolvedGrams
    ? `السلام عليكم، أود طلب ${productName} بوزن ${buildWeightLabel(weight, resolvedGrams)}. السعر التقديري هو ${formatComputedPrice(estimatedPrice ?? 0)}.`
    : dictionary.pricing.enterCustomWeight;

  const weightOptions = [
    { value: "200g", label: dictionary.pricing.weight200 },
    { value: "500g", label: dictionary.pricing.weight500 },
    { value: "1kg", label: dictionary.pricing.weight1kg },
    { value: "custom", label: dictionary.pricing.customOption }
  ] as const;

  return (
    <div className="rounded-[1.75rem] border border-brand-gold/18 bg-brand-cream/5 p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-brand-gold/78">{dictionary.pricing.soldByWeight}</p>
          <p className="mt-2 text-lg text-brand-sand">
            {dictionary.pricing.pricePerKg}: {formatComputedPrice(pricePerKg)}
          </p>
        </div>
        {estimatedPrice !== null ? (
          <div className="rounded-full border border-brand-gold/20 bg-brand-black/30 px-4 py-2 text-sm text-brand-cream/85">
            {dictionary.pricing.estimatedPrice}: <span className="text-brand-sand">{formatComputedPrice(estimatedPrice)}</span>
          </div>
        ) : null}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[220px_1fr]">
        <div className="space-y-2">
          <label htmlFor="weight-option" className="text-sm text-brand-cream/80">
            {dictionary.pricing.chooseWeight}
          </label>
          <Select id="weight-option" value={weight} onChange={(event) => setWeight(event.target.value as WeightOption)}>
            {weightOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        {weight === "custom" ? (
          <div className="space-y-2">
            <label htmlFor="custom-grams" className="text-sm text-brand-cream/80">
              {dictionary.pricing.customWeight}
            </label>
            <Input
              id="custom-grams"
              type="number"
              min="50"
              step="10"
              value={customGrams}
              onChange={(event) => setCustomGrams(event.target.value)}
              placeholder={dictionary.pricing.gramsPlaceholder}
            />
            <p className="text-xs text-brand-cream/55">{dictionary.pricing.customWeightHint}</p>
          </div>
        ) : null}
      </div>

      {resolvedGrams ? (
        <Button asChild className="mt-5 w-full">
          <Link
            href={buildWhatsAppLink({
              productName,
              customMessage: orderMessage,
              number: whatsappNumber
            })}
            target="_blank"
          >
            {dictionary.pricing.orderThisWeight}
          </Link>
        </Button>
      ) : (
        <Button className="mt-5 w-full" type="button" disabled>
          {dictionary.pricing.enterCustomWeight}
        </Button>
      )}
    </div>
  );
}
