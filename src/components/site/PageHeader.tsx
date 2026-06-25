import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: ReactNode; description?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && <span className="chip">{eyebrow}</span>}
      <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">{title}</h1>
      {description && <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">{description}</p>}
    </div>
  );
}
