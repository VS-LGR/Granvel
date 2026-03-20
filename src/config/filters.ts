export const vehicleCategories = [
  "hatch",
  "sedan",
  "suv",
  "pickup",
  "wagon",
  "coupe",
] as const;

export type VehicleCategory = (typeof vehicleCategories)[number];

export const categoryLabels: Record<VehicleCategory, string> = {
  hatch: "Hatch",
  sedan: "Sedan",
  suv: "SUV",
  pickup: "Picape",
  wagon: "Perua",
  coupe: "Cupê",
};

export const fuelOptions = [
  { value: "flex", label: "Flex" },
  { value: "gasoline", label: "Gasolina" },
  { value: "diesel", label: "Diesel" },
  { value: "hybrid", label: "Híbrido" },
  { value: "electric", label: "Elétrico" },
] as const;

export const transmissionOptions = [
  { value: "manual", label: "Manual" },
  { value: "automatic", label: "Automático" },
  { value: "cvt", label: "CVT" },
] as const;
