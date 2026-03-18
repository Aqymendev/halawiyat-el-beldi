import { Badge } from "@/components/ui/badge";

export function StatusBanner({
  status,
  message
}: {
  status?: "success" | "error" | "info";
  message?: string | null;
}) {
  if (!message) {
    return null;
  }

  const variant = status === "error" ? "danger" : status === "success" ? "success" : "default";

  return (
    <div className="panel mb-6 flex items-center gap-3 px-5 py-4">
      <Badge variant={variant}>{status ?? "Info"}</Badge>
      <p className="text-sm text-brand-cream/80">{message}</p>
    </div>
  );
}
