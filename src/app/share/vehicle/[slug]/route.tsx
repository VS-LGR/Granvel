import { ImageResponse } from "next/og";
import { site } from "@/config/site";
import { formatBRLFromCents, formatKm } from "@/lib/format";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchVehicleBySlug } from "@/lib/vehicles/queries";

export const runtime = "nodejs";

const W = 1080;
const H = 1920;

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return new Response("Supabase not configured", { status: 500 });

  const vehicle = await fetchVehicleBySlug(supabase, slug);
  if (!vehicle) return new Response("Not found", { status: 404 });

  const title = `${vehicle.brand} ${vehicle.model}`;
  // Mantidos para o layout (futuro): hoje o template usa principalmente a foto e a marca.
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

  const imageSrc = await (async () => {
    if (!image) return null;
    try {
      const res = await fetch(image);
      const ct = res.headers.get("content-type") ?? "image/jpeg";
      const buf = await res.arrayBuffer();
      const b64 = Buffer.from(buf).toString("base64");
      return `data:${ct};base64,${b64}`;
    } catch {
      return null;
    }
  })();

  const opts = {
    width: W,
    height: H,
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="granvel-${vehicle.slug}.png"`,
    },
  } as const;

  const full = (
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
          height: 116,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "30px 44px",
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

      <div style={{ flex: 1, display: "flex", padding: "44px 44px 0 44px" }}>
        <div
          style={{
            flex: 1,
            borderRadius: 44,
            overflow: "hidden",
              background: "rgba(246,244,239,0.55)",
            border: "1px solid rgba(12,15,20,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
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
          padding: "30px 44px 40px 44px",
          background: deep,
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                fontSize: 56,
                fontWeight: 800,
                letterSpacing: -1.4,
                lineHeight: 1.05,
              }}
            >
              {vehicle.brand}
              <span style={{ opacity: 0.72, fontWeight: 700 }}> · </span>
              {vehicle.model}
            </div>
              <div style={{ marginTop: 18, display: "flex", gap: 16, flexWrap: "wrap" }}>
              {chips.map((c) => (
                <div
                  key={c}
                  style={{
                    padding: "14px 18px",
                    borderRadius: 18,
                      background: "rgba(229,162,69,0.18)",
                      border: "1px solid rgba(229,162,69,0.35)",
                    fontSize: 28,
                      color: "rgba(255,255,255,0.95)",
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
              <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", opacity: 0.72 }}>Preço</div>
              <div style={{ fontSize: 84, fontWeight: 900, color: accent, letterSpacing: -1.8, textShadow: "0 8px 28px rgba(0,0,0,0.22)" }}>{price}</div>
            <div
              style={{
                marginTop: 6,
                  padding: "16px 22px",
                  borderRadius: 20,
                background: accent,
                color: ink,
                  fontSize: 26,
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
              fontSize: 24,
          }}
        >
          <div>O seu próximo veículo a um clique de distância.</div>
          <div style={{ fontWeight: 700, color: "rgba(255,255,255,0.82)" }}>{vehicleUrl}</div>
        </div>
      </div>
    </div>
  );

  const fallback = (
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
          height: 116,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "30px 44px",
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

      <div style={{ flex: 1, display: "flex", padding: "44px 44px 0 44px" }}>
        <div
          style={{
            flex: 1,
            borderRadius: 44,
            overflow: "hidden",
            background: "rgba(246,244,239,0.55)",
            border: "1px solid rgba(12,15,20,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div style={{ fontSize: 34, color: "rgba(12,15,20,0.45)" }}>Sem foto</div>
        </div>
      </div>

      <div
        style={{
          padding: "30px 44px 40px 44px",
          background: deep,
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                fontSize: 56,
                fontWeight: 800,
                letterSpacing: -1.4,
                lineHeight: 1.05,
              }}
            >
              {vehicle.brand}
              <span style={{ opacity: 0.72, fontWeight: 700 }}> · </span>
              {vehicle.model}
            </div>
              <div style={{ marginTop: 18, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div
                style={{
                    padding: "14px 18px",
                    borderRadius: 18,
                    background: "rgba(229,162,69,0.18)",
                    border: "1px solid rgba(229,162,69,0.35)",
                    fontSize: 28,
                    color: "rgba(255,255,255,0.95)",
                }}
              >
                {year}
              </div>
              <div
                style={{
                    padding: "14px 18px",
                    borderRadius: 18,
                    background: "rgba(229,162,69,0.18)",
                    border: "1px solid rgba(229,162,69,0.35)",
                    fontSize: 28,
                    color: "rgba(255,255,255,0.95)",
                }}
              >
                {price}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
              <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", opacity: 0.72 }}>Ver</div>
            <div
              style={{
                marginTop: 6,
                  padding: "16px 22px",
                  borderRadius: 20,
                background: accent,
                color: ink,
                  fontSize: 26,
                fontWeight: 800,
              }}
            >
              detalhes
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
  );

  try {
    return new ImageResponse(full, opts);
  } catch {
    return new ImageResponse(fallback, opts);
  }
}

