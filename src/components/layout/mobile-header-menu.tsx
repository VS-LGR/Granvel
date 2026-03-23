"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { mainNav } from "@/config/navigation";
import { Container } from "@/components/ui/container";

export function MobileHeaderMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const panel =
    open && mounted ? (
      <>
        <div
          className="fixed bottom-0 left-0 right-0 top-[4.5rem] z-40 bg-[var(--color-ink)]/45 lg:hidden"
          aria-hidden
          onClick={() => setOpen(false)}
        />
        <nav
          id={menuId}
          className="fixed left-0 right-0 top-[4.5rem] z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-[var(--color-line)] bg-[var(--color-paper)] shadow-[var(--shadow-soft)] lg:hidden"
          aria-label="Seções do site"
        >
          <Container className="py-5">
            <ul className="flex flex-col gap-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/80 px-4 py-3 text-base font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)]/40 hover:bg-white focus-ring"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      </>
    ) : null;

  return (
    <>
      <button
        type="button"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white/80 text-[var(--color-ink)] transition-colors hover:bg-white focus-ring lg:hidden"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Fechar menu de navegação" : "Abrir menu de navegação"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">Menu</span>
        <span className="flex h-5 w-5 flex-col justify-center gap-1.5" aria-hidden>
          <span
            className={`h-0.5 w-full rounded-full bg-[var(--color-ink)] transition-transform duration-[var(--motion-duration)] ease-[var(--motion-ease)] ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full rounded-full bg-[var(--color-ink)] transition-opacity duration-[var(--motion-duration)] ease-[var(--motion-ease)] ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full rounded-full bg-[var(--color-ink)] transition-transform duration-[var(--motion-duration)] ease-[var(--motion-ease)] ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>
      {mounted && panel ? createPortal(panel, document.body) : null}
    </>
  );
}
