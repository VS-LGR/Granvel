import { Container } from "@/components/ui/container";

export function SupabaseSetupNotice() {
  return (
    <div className="border-b border-amber-500/40 bg-amber-50 py-3 text-center text-sm text-amber-950">
      <Container>
        Catálogo em modo demonstração: configure{" "}
        <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
        <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> e aplique o SQL em{" "}
        <code className="rounded bg-amber-100 px-1">supabase/schema.sql</code>.
      </Container>
    </div>
  );
}
