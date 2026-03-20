import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipe",
  robots: { index: false, follow: false },
};

export default function StaffSegmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="border-b border-white/10 py-4 text-center text-xs text-white/50">
        Área restrita — não indexada por motores de busca.
      </div>
      {children}
    </div>
  );
}
