"use client";

import { Select } from "@/components/ui/select";
import type { Locale } from "@/lib/i18n";
import { translateCategory } from "@/lib/i18n";

export function CategoryFilter({
  categories,
  value,
  onChange,
  locale,
  allLabel
}: {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
  locale: Locale;
  allLabel: string;
}) {
  return (
    <Select value={value} onChange={(event) => onChange(event.target.value)} aria-label="Filter by category">
      <option value="All">{allLabel}</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {translateCategory(category, locale)}
        </option>
      ))}
    </Select>
  );
}
