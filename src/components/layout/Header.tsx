"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isSound = pathname === "/sound";
  const isPodcast = pathname === "/podcast";

  return (
    <header className="px-6 pt-5 md:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-t-[10px] border border-[var(--line)] bg-[var(--paper-light)]">

        {/* Tiny browser / equipment strip */}
        <div className="flex h-5 items-center justify-between border-b border-[var(--line)] bg-[var(--ink)] px-3 text-[9px] text-[var(--paper)]">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--paper)] opacity-80" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--paper)] opacity-60" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--paper)] opacity-40" />
          </div>

          <span className="font-retro uppercase tracking-[0.12em] opacity-70">
            JG / Audio Portfolio
          </span>
        </div>

        {/* Main navigation */}
        <nav className="flex min-h-14 items-end justify-between">
          <Link
            href="/"
            className="font-retro px-4 pb-4 pt-4 text-sm font-bold uppercase tracking-[0.08em] transition-opacity hover:opacity-50 md:px-5"
          >
            Juan Gutierrez
          </Link>

          <div className="flex self-stretch">
            <Link
              href="/sound"
              className="font-retro flex min-w-[92px] items-center justify-center border-l border-[var(--line)] px-5 text-xs font-bold uppercase tracking-[0.08em] transition-colors md:min-w-[120px]"
              style={{
                background: isSound
                  ? "var(--lilac)"
                  : "var(--paper-light)",
              }}
            >
              Sound
            </Link>

            <Link
              href="/podcast"
              className="font-retro flex min-w-[92px] items-center justify-center border-l border-[var(--line)] px-5 text-xs font-bold uppercase tracking-[0.08em] transition-colors md:min-w-[120px]"
              style={{
                background: isPodcast
                  ? "var(--sage)"
                  : "var(--paper-light)",
              }}
            >
              Podcast
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}