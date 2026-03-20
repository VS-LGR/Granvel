"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function StaffLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");
    const password = String(new FormData(form).get("password") ?? "");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signError } = await supabase.auth.signInWithPassword({ email, password });
      if (signError) {
        setError(signError.message);
        setPending(false);
        return;
      }
      router.replace("/staff");
      router.refresh();
    } catch {
      setError("Não foi possível conectar ao Supabase. Verifique as variáveis de ambiente.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex max-w-md flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-8">
      <Input name="email" type="email" label="E-mail" autoComplete="username" required />
      <Input name="password" type="password" label="Senha" autoComplete="current-password" required />
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
