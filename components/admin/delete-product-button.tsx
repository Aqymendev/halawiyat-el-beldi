"use client";

import { Trash2 } from "lucide-react";

import { deleteProductAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export function DeleteProductButton({ id }: { id: string }) {
  return (
    <form
      action={deleteProductAction}
      onSubmit={(event) => {
        if (!window.confirm("Delete this product? This action cannot be undone.")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="destructive" size="sm">
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
    </form>
  );
}
