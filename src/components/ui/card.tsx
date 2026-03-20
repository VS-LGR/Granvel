import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-white/70 backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
