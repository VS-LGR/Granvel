# Granvel — relatório de arquitetura

## Objetivo do produto

Site institucional para a concessionária **Granvel**, com foco em conversão (WhatsApp / telefone), estoque filtrável, destaques (carro do mês, promoções), facilitação de crédito e página “Venha ser Granvel”. Área **`/staff`** para cadastro de veículos, **sem links públicos**, protegida por **middleware + Supabase Auth**, com dados em **Postgres + RLS**.

---

## Estrutura de pastas (`/src`)

| Pasta | Função |
|--------|--------|
| [`src/app`](src/app) | App Router: rotas públicas `(marketing)`, rotas `(staff)`, `robots.ts`, `sitemap.ts`, `layout.tsx` raiz. |
| [`src/components/layout`](src/components/layout) | Shell público: header, footer, logo, `MarketingShell` (sem regra de negócio). |
| [`src/components/sections`](src/components/sections) | Blocos de página: hero, grids, filtros, CTAs — recebem **dados/copy via props** (copy institucional vem de `config`). |
| [`src/components/ui`](src/components/ui) | Primitivos reutilizáveis (botão, card, inputs, container) com **props tipadas**. |
| [`src/components/staff`](src/components/staff) | Formulários client-only necessários (login Supabase, formulário de veículo com `useActionState`). |
| [`src/lib`](src/lib) | Supabase server/browser clients, queries de veículos, filtros, formatação, server actions da equipe. |
| [`src/config`](src/config) | Navegação, filtros estáticos, dados de contato, **textos de marketing** (`site-content.ts`). |
| [`src/styles`](src/styles) | `globals.css` — tokens de cor, motion com `prefers-reduced-motion`, utilitários leves. |
| [`src/assets`](src/assets) | Placeholder para logos/arquivos estáticos versionados. |
| [`supabase/schema.sql`](supabase/schema.sql) | DDL + políticas RLS (executar no Supabase). |
| [`supabase/storage.sql`](supabase/storage.sql) | Bucket público `vehicle-images` + políticas de leitura/escrita para fotos. |

---

## Mapa de rotas

| Rota | Papel |
|------|--------|
| `/` | Home narrativa + novidades do pátio + prova social/autoridade + CTA duplo. |
| `/inventory` | Filtros via **GET** (`searchParams` compartilháveis) + grade + empty state com WhatsApp. |
| `/highlight` | Carro do mês imersivo (galeria + ficha) ou fallback com CTA. |
| `/promotions` | Lista `is_promotion` + CTAs. |
| `/financing` | Facilitação em etapas + confiança + CTA. |
| `/join` | Parceria + carreira + autoridade + CTA. |
| `/staff/login` | Login (Supabase Auth). **Não** aparece no sitemap; **robots** bloqueia `/staff`. |
| `/staff` | Lista interna de veículos (inclui não publicados). |
| `/staff/vehicles/new` | Criação de veículo (Server Action). |
| `/staff/vehicles/[id]/edit` | Edição (slug não é alterado no update). |

---

## Mapa de componentes (resumo)

- **Layout**: `SiteHeader`, `SiteFooter`, `Logo`, `MarketingShell`.
- **Sections**: `HeroHome`, `AboutStrip`, `PillarsGrid`, `VehicleGrid`, `TrustStrip`, `AuthorityBlock`, `CtaDual`, `PageIntro`, `InventoryFiltersForm`, `InventoryResults`, `HighlightImmersive`, `PromotionsGrid`, `FinancingContent`, `JoinBlocks`, `SupabaseSetupNotice`.
- **UI**: `Button`, `Container`, `Card`, `Badge`, `Input`, `SelectField`, `Textarea`.
- **Staff**: `StaffLoginForm`, `VehicleForm`.

---

## Onde está a lógica

| Tema | Local |
|------|--------|
| Cliente Supabase (SSR/cookies) | [`src/lib/supabase/server.ts`](src/lib/supabase/server.ts) |
| Cliente Supabase (browser) | [`src/lib/supabase/client.ts`](src/lib/supabase/client.ts) |
| Leitura normalizada de veículos | [`src/lib/vehicles/queries.ts`](src/lib/vehicles/queries.ts) |
| Parse/filtro de query string | [`src/lib/vehicles/filters.ts`](src/lib/vehicles/filters.ts) |
| Tipos + mapa para cards | [`src/lib/types/vehicle.ts`](src/lib/types/vehicle.ts) |
| Moeda / km | [`src/lib/format.ts`](src/lib/format.ts) |
| Slug | [`src/lib/staff/slug.ts`](src/lib/staff/slug.ts) |
| Login / CRUD staff / revalidação | [`src/lib/staff/actions.ts`](src/lib/staff/actions.ts) |
| Upload de fotos (Storage) | [`src/lib/staff/upload-images.ts`](src/lib/staff/upload-images.ts) |
| Proteção `/staff` | [`src/middleware.ts`](src/middleware.ts) |

---

## Estratégia de SEO

- **`metadataBase`** e template de título no [`src/app/layout.tsx`](src/app/layout.tsx).
- **Metadata por rota** nas páginas de marketing (title + description únicos).
- **`lang="pt-BR"`** no `<html>`.
- **Um `<h1>` por página** (home: hero; demais: `PageIntro` ou `HighlightImmersive`).
- [`src/app/sitemap.ts`](src/app/sitemap.ts): apenas URLs públicas.
- [`src/app/robots.ts`](src/app/robots.ts): `allow: /`, `disallow: /staff`.
- Layout `(staff)` com `robots: { index: false, follow: false }`.
- Variável **`NEXT_PUBLIC_SITE_URL`** para URL canônica em produção.

---

## Diferenciação de UX (implementado)

- Identidade visual com **Syne + DM Sans**, fundo papel, **accent** queimado e hero escuro com gradiente editorial.
- Motion leve em **CSS** + respeito a **`prefers-reduced-motion`**.
- **Home** em narrativa (quem somos → pilares → pátio → confiança → autoridade → CTA).
- **Highlight** com layout imersivo (galeria + painel de compra).
- **Inventory** com filtros claros, URLs compartilháveis e **empty state** orientado a conversão.

---

## Segurança e dados (Supabase)

- **Anon**: `SELECT` apenas onde `published = true`.
- **Authenticated**: `SELECT` em todos os registros, `INSERT`/`UPDATE` em `vehicles`.
- Aplicar o script [`supabase/schema.sql`](supabase/schema.sql) no projeto Supabase.
- Criar utilizadores staff em **Authentication**; sem link público para `/staff`.

---

## Pontos de expansão futura

- **Storage**: compressão no cliente, apagar objetos ao remover veículo, ou bucket privado com URLs assinadas.
- Página de detalhe **`/inventory/[slug]`** + JSON-LD `Product` / `Vehicle`.
- Webhook / CRM nos CTAs de WhatsApp (UTMs, origem).
- Política RLS mais restritiva (p.ex. role `staff` em `app_metadata`).

---

## Observações técnicas

- Dependências extra além do template: `@supabase/supabase-js`, `@supabase/ssr` (justificadas por Auth + RLS + CRUD).
- Sem bibliotecas de animação de terceiros; formulários staff com **Server Actions** e **`useActionState`** para erros.
- Se `NEXT_PUBLIC_SUPABASE_*` não estiver definido, o marketing mostra **faixa de aviso** e o catálogo fica vazio; o middleware redireciona `/staff` → `/staff/login`.
- Imagens de veículos usam `<img>` com URLs dinâmicas para evitar lista infinita de hosts no `next/image`.

---

## Variáveis de ambiente

Ver [`.env.example`](.env.example).
