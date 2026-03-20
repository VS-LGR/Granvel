import type { SupabaseClient } from "@supabase/supabase-js";

export const VEHICLE_IMAGES_BUCKET = "vehicle-images";

const MAX_FILES = 15;
const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function sanitizeExtension(filename: string): string {
  const raw = filename.split(".").pop()?.toLowerCase() ?? "";
  return /^[a-z0-9]+$/.test(raw) ? raw : "jpg";
}

export function collectImageFilesFromFormData(formData: FormData): File[] {
  const raw = formData.getAll("images");
  return raw.filter((item): item is File => item instanceof File && item.size > 0);
}

export async function uploadVehicleImageFiles(
  supabase: SupabaseClient,
  userId: string,
  files: File[],
): Promise<{ urls: string[]; error: string | null }> {
  if (files.length === 0) {
    return { urls: [], error: null };
  }

  if (files.length > MAX_FILES) {
    return { urls: [], error: `Envie no máximo ${MAX_FILES} imagens de uma vez.` };
  }

  const urls: string[] = [];

  for (const file of files) {
    if (!ALLOWED_TYPES.has(file.type)) {
      return {
        urls: [],
        error: "Formato inválido. Use JPG, PNG, WebP ou GIF.",
      };
    }
    if (file.size > MAX_BYTES) {
      return { urls: [], error: "Cada imagem deve ter no máximo 5 MB." };
    }

    const ext = sanitizeExtension(file.name);
    const objectPath = `${userId}/${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage.from(VEHICLE_IMAGES_BUCKET).upload(objectPath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "image/jpeg",
    });

    if (error) {
      return { urls: [], error: `Falha no upload: ${error.message}. Confira o bucket e as políticas em supabase/storage.sql.` };
    }

    const { data } = supabase.storage.from(VEHICLE_IMAGES_BUCKET).getPublicUrl(objectPath);
    urls.push(data.publicUrl);
  }

  return { urls, error: null };
}
