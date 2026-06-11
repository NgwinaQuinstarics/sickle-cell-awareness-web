export function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-480px w-480px rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--coral-soft), transparent)" }}
      />
      <div className="container-page relative py-20 md:py-28">
        <p className="font-display text-sm uppercase tracking-[0.25em] text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
