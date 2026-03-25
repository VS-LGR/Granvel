import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { formatBRLFromCents, formatKm } from "@/lib/format";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchVehicleBySlug } from "@/lib/vehicles/queries";

export const runtime = "edge";

const W = 1080;
const H = 1920;

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return new NextResponse("Supabase not configured", { status: 500 });

  const vehicle = await fetchVehicleBySlug(supabase, slug);
  if (!vehicle) return new NextResponse("Not found", { status: 404 });

  const title = `${vehicle.brand} ${vehicle.model}`;
  const price = formatBRLFromCents(vehicle.price_cents);
  const km = formatKm(vehicle.mileage_km).replace(" km", "");
  const year = String(vehicle.year);
  const image = (vehicle.image_urls ?? [])[0] ?? null;
  const vehicleUrl = `${site.url.replace(/\/$/, "")}/veiculo/${vehicle.slug}`;
  const chips: string[] = [year, `Km ${km}`, vehicle.fuel];

  const accent = "#E5A245";
  const ink = "#0c0f14";
  const deep = "#0b1220";
  const paper = "#f6f4ef";

  const png = new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          flexDirection: "column",
          background: paper,
        }}
      >
        <div
          style={{
            height: 124,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "36px 56px",
            background: deep,
            color: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>{site.name}</div>
            <div style={{ fontSize: 22, opacity: 0.72, letterSpacing: 6, textTransform: "uppercase" }}>motors</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.14)",
              fontSize: 20,
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: 999, background: accent }} />
            Promoção
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", padding: "56px 56px 0 56px" }}>
          <div
            style={{
              flex: 1,
              borderRadius: 44,
              overflow: "hidden",
              background: "rgba(12,15,20,0.04)",
              border: "1px solid rgba(12,15,20,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div style={{ fontSize: 34, color: "rgba(12,15,20,0.45)" }}>Sem foto</div>
            )}
            <div
              style={{
                position: "absolute",
                left: 26,
                top: 26,
                padding: "12px 16px",
                borderRadius: 18,
                background: "rgba(0,0,0,0.55)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: 18,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {site.name}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "38px 56px 54px 56px",
            background: deep,
            color: "white",
          }}
        >
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 50, fontWeight: 800, letterSpacing: -1.2, lineHeight: 1.05 }}>
                {vehicle.brand}
                <span style={{ opacity: 0.72, fontWeight: 700 }}> · </span>
                {vehicle.model}
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
                {chips.map((c) => (
                  <div
                    key={c}
                    style={{
                      padding: "10px 14px",
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.09)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      fontSize: 22,
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
              <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", opacity: 0.72 }}>Preço</div>
              <div style={{ fontSize: 64, fontWeight: 900, color: accent, letterSpacing: -1.4 }}>{price}</div>
              <div
                style={{
                  marginTop: 6,
                  padding: "12px 16px",
                  borderRadius: 16,
                  background: accent,
                  color: ink,
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                Ver detalhes
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 26,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              color: "rgba(255,255,255,0.72)",
              fontSize: 20,
            }}
          >
            <div>O seu próximo veículo a um clique de distância.</div>
            <div style={{ fontWeight: 700, color: "rgba(255,255,255,0.82)" }}>{vehicleUrl}</div>
          </div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
    },
  );

  return new NextResponse(png.body, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Content-Disposition": `attachment; filename=\"granvel-${vehicle.slug}.png\"`,
    },
  });
}

