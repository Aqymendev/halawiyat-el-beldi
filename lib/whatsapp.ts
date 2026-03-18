import { siteConfig } from "@/lib/site";

export function buildWhatsAppMessage(productName: string, customMessage?: string | null) {
  return customMessage?.trim() || `السلام عليكم، أود طلب ${productName}.`;
}

export function buildWhatsAppLink({
  productName,
  customMessage,
  number
}: {
  productName: string;
  customMessage?: string | null;
  number?: string;
}) {
  const message = buildWhatsAppMessage(productName, customMessage);
  const phone = (number || siteConfig.whatsappNumber).replace(/[^\d]/g, "");
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${phone}?${params.toString()}`;
}
