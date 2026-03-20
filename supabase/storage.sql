-- Supabase Storage: bucket público para fotos dos veículos.
-- Execute no SQL Editor depois de schema.sql.
-- Storage → Policies também pode ser ajustado no dashboard se necessário.

insert into storage.buckets (id, name, public)
values ('vehicle-images', 'vehicle-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "vehicle_images_select_anon" on storage.objects;
drop policy if exists "vehicle_images_select_authenticated" on storage.objects;
drop policy if exists "vehicle_images_insert_authenticated" on storage.objects;
drop policy if exists "vehicle_images_update_authenticated" on storage.objects;
drop policy if exists "vehicle_images_delete_authenticated" on storage.objects;

create policy "vehicle_images_select_anon"
on storage.objects for select to anon
using (bucket_id = 'vehicle-images');

create policy "vehicle_images_select_authenticated"
on storage.objects for select to authenticated
using (bucket_id = 'vehicle-images');

create policy "vehicle_images_insert_authenticated"
on storage.objects for insert to authenticated
with check (bucket_id = 'vehicle-images');

create policy "vehicle_images_update_authenticated"
on storage.objects for update to authenticated
using (bucket_id = 'vehicle-images')
with check (bucket_id = 'vehicle-images');

create policy "vehicle_images_delete_authenticated"
on storage.objects for delete to authenticated
using (bucket_id = 'vehicle-images');
