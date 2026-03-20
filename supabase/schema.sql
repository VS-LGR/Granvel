-- Granvel vehicles + RLS. Run in Supabase SQL editor or via migration tooling.

create extension if not exists "pgcrypto";

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  brand text not null,
  model text not null,
  year int not null check (year >= 1990 and year <= 2035),
  price_cents int not null check (price_cents > 0),
  mileage_km int not null check (mileage_km >= 0),
  fuel text not null,
  transmission text not null,
  category text not null,
  description text,
  image_urls jsonb not null default '[]'::jsonb,
  is_featured_month boolean not null default false,
  is_promotion boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users (id)
);

create index if not exists vehicles_published_idx on public.vehicles (published);
create index if not exists vehicles_category_idx on public.vehicles (category);
create index if not exists vehicles_price_idx on public.vehicles (price_cents);
create index if not exists vehicles_year_idx on public.vehicles (year);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists vehicles_set_updated_at on public.vehicles;
create trigger vehicles_set_updated_at
before update on public.vehicles
for each row execute procedure public.set_updated_at();

alter table public.vehicles enable row level security;

drop policy if exists "vehicles_select_public" on public.vehicles;
drop policy if exists "vehicles_select_staff" on public.vehicles;
drop policy if exists "vehicles_insert_staff" on public.vehicles;
drop policy if exists "vehicles_update_staff" on public.vehicles;

create policy "vehicles_select_public"
on public.vehicles
for select
to anon
using (published = true);

create policy "vehicles_select_staff"
on public.vehicles
for select
to authenticated
using (true);

create policy "vehicles_insert_staff"
on public.vehicles
for insert
to authenticated
with check (true);

create policy "vehicles_update_staff"
on public.vehicles
for update
to authenticated
using (true)
with check (true);
