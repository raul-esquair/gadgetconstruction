"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { login } from "@/lib/actions/dashboard-auth";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await login(password);

    if (result.ok) {
      // Refresh so the layout gate re-runs with the new cookie.
      router.replace("/dashboard");
      router.refresh();
      return;
    }

    setSubmitting(false);
    setPassword("");
    setError(result.error);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        type="password"
        name="password"
        label="Password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={error ?? undefined}
      />
      <Button type="submit" variant="secondary" fullWidth disabled={submitting}>
        {submitting ? "Checking…" : "Sign In"}
      </Button>
    </form>
  );
}
