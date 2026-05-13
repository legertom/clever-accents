import Link from "next/link";

/**
 * The shared top bar — Clever-flavoured wordmark and navigation.
 * Kept as a server component; no client state needed.
 */
export function BrandHeader({ subtitle }: { subtitle?: string }) {
  return (
    <header className="w-full border-b border-clever-sky/70 bg-clever-paper/70 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 sm:px-10">
        <Link
          href="/"
          aria-label="Clever Accents — home"
          className="group flex items-baseline gap-3"
        >
          <Wordmark />
          {subtitle && (
            <span className="hidden text-[13px] uppercase tracking-[0.18em] text-clever-muted sm:block">
              {subtitle}
            </span>
          )}
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 text-[14px] font-medium">
          <NavLink href="/">Lessons</NavLink>
          <NavLink href="/practice">Practice</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3 py-2 text-clever-ink hover:bg-clever-sky/60"
    >
      {children}
    </Link>
  );
}

function Wordmark() {
  return (
    <span className="flex items-baseline gap-2">
      <span
        className="font-serif text-[26px] leading-none tracking-tight text-clever-ink"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Clever
      </span>
      <span
        className="text-[22px] leading-none text-clever-blue"
        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
      >
        Accents
      </span>
      <span className="inline-flex items-center gap-1 pl-1">
        <span className="hex-dot bg-clever-orange" aria-hidden />
        <span className="hex-dot bg-clever-sun" aria-hidden />
        <span className="hex-dot bg-clever-mint" aria-hidden />
      </span>
    </span>
  );
}
