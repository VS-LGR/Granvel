export function StaffImageField() {
  return (
    <div className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-zinc-100">Fotos do veículo (upload)</span>
      <input
        type="file"
        name="images"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="block w-full cursor-pointer rounded-[var(--radius-md)] border border-zinc-400 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-zinc-200 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-zinc-900 hover:file:bg-zinc-300 [color-scheme:light]"
      />
      <span className="text-xs text-zinc-400">
        Até 15 ficheiros, 5 MB cada. A ordem selecionada é a ordem da galeria (a primeira é a capa).
      </span>
    </div>
  );
}
