import type { Product } from "@/types/product";

export const weightOptions = [
  { value: "200g", grams: 200 },
  { value: "500g", grams: 500 },
  { value: "1kg", grams: 1000 },
  { value: "custom", grams: null }
] as const;

export type WeightOption = (typeof weightOptions)[number]["value"];

export function hasWeightPricing(product: Product) {
  return typeof product.pricePerKg === "number" && Number.isFinite(product.pricePerKg) && product.pricePerKg > 0;
}

export function calculatePriceFromKg(pricePerKg: number, grams: number) {
  return Number(((pricePerKg * grams) / 1000).toFixed(2));
}

export function formatComputedPrice(value: number) {
  return value % 1 === 0 ? `${value}` : value.toFixed(2);
}

export function buildWeightLabel(option: WeightOption, customGrams?: number) {
  if (option === "custom" && customGrams) {
    return `${customGrams}g`;
  }

  return option;
}
