import type { HTMLAttributes, ReactNode } from "react";

export type ContainerProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Container({ children, className = "", ...props }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
