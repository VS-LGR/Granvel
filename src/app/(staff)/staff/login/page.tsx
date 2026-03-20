import Link from "next/link";
import { StaffLoginForm } from "@/components/staff/login-form";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

export default function StaffLoginPage() {
  const env = getSupabasePublicEnv();

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-lg flex-col justify-center px-4 py-16">
      <Link
        href="/"
        className="mb-8 text-sm font-medium text-zinc-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      >
        ← Voltar ao site
      </Link>
      <h1 className="font-[family-name:var(--font-syne)] text-3xl font-semibold text-zinc-50">Acesso da equipe</h1>
      <p className="mt-2 text-sm text-zinc-400">Use o e-mail e senha cadastrados no Supabase Auth.</p>
      {!env ? (
        <p className="mt-6 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-100">
          Defina <code className="rounded bg-black/30 px-1">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
          <code className="rounded bg-black/30 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> para habilitar o login.
        </p>
      ) : (
        <div className="mt-8">
          <StaffLoginForm />
        </div>
      )}
    </div>
  );
}
