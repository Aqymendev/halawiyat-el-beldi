"use client";

import { useActionState } from "react";

import { loginAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState = {
  status: "idle" as const,
  message: ""
};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-brand-cream/80">
          Email
        </label>
        <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm text-brand-cream/80">
          Password
        </label>
        <Input id="password" name="password" type="password" required />
      </div>
      {state.status === "error" ? <p className="text-sm text-red-300">{state.message}</p> : null}
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
