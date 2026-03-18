import Link from "next/link";
import { MessageCircleMore } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppButton({
  productName,
  whatsappMessage,
  label = "Order on WhatsApp",
  className,
  number
}: {
  productName: string;
  whatsappMessage?: string | null;
  label?: string;
  className?: string;
  number?: string;
}) {
  return (
    <Button asChild className={className}>
      <Link href={buildWhatsAppLink({ productName, customMessage: whatsappMessage, number })} target="_blank">
        <MessageCircleMore className="h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}
