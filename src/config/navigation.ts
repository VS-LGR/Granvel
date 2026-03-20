export type NavItem = {
  href: string;
  label: string;
};

export const mainNav: NavItem[] = [
  { href: "/", label: "Início" },
  { href: "/inventory", label: "Estoque" },
  { href: "/highlight", label: "Carro do mês" },
  { href: "/promotions", label: "Promoções" },
  { href: "/financing", label: "Facilitação" },
  { href: "/join", label: "Venha ser Granvel" },
];
