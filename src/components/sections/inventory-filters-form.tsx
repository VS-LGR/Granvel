import {
  categoryLabels,
  fuelOptions,
  transmissionOptions,
  vehicleCategories,
} from "@/config/filters";
import type { InventorySearchParams } from "@/lib/vehicles/filters";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select";

export type InventoryFiltersFormProps = {
  initial: InventorySearchParams;
};

const categoryOptions = [
  { value: "", label: "Todas" },
  ...vehicleCategories.map((c) => ({ value: c, label: categoryLabels[c] })),
];

const fuelSelectOptions = [{ value: "", label: "Todos" }, ...fuelOptions.map((f) => ({ ...f }))];

const transmissionSelectOptions = [
  { value: "", label: "Todas" },
  ...transmissionOptions.map((t) => ({ ...t })),
];

export function InventoryFiltersForm({ initial }: InventoryFiltersFormProps) {
  return (
    <section className="border-b border-[var(--color-line)] bg-white/50 py-10">
      <Container>
        <Card className="p-6 sm:p-8">
          <form action="/inventory" method="get" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <SelectField
              label="Categoria"
              name="category"
              defaultValue={initial.category ?? ""}
              options={categoryOptions}
            />
            <SelectField
              label="Combustível"
              name="fuel"
              defaultValue={initial.fuel ?? ""}
              options={fuelSelectOptions}
            />
            <SelectField
              label="Câmbio"
              name="transmission"
              defaultValue={initial.transmission ?? ""}
              options={transmissionSelectOptions}
            />
            <Input
              label="Marca (contém)"
              name="brand"
              type="text"
              defaultValue={initial.brand ?? ""}
              placeholder="Ex.: Volkswagen"
            />
            <Input
              label="Preço mín. (R$)"
              name="minPrice"
              type="number"
              min={0}
              step={1000}
              defaultValue={initial.minPrice ?? ""}
            />
            <Input
              label="Preço máx. (R$)"
              name="maxPrice"
              type="number"
              min={0}
              step={1000}
              defaultValue={initial.maxPrice ?? ""}
            />
            <Input
              label="Ano mín."
              name="minYear"
              type="number"
              min={1990}
              max={2035}
              defaultValue={initial.minYear ?? ""}
            />
            <Input
              label="Ano máx."
              name="maxYear"
              type="number"
              min={1990}
              max={2035}
              defaultValue={initial.maxYear ?? ""}
            />
            <div className="flex flex-wrap items-end gap-3 md:col-span-2 lg:col-span-4">
              <Button type="submit">Aplicar filtros</Button>
              <a
                href="/inventory"
                className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] px-4 text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] focus-ring"
              >
                Limpar
              </a>
            </div>
          </form>
        </Card>
      </Container>
    </section>
  );
}
