"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isSound = pathname === "/sound";
  const isPodcast = pathname === "/podcast";

  return (
    <header className="border-b border-[var(--line)] px-6 md:px-10">
      <div className="mx-auto grid min-h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center">

        {/* Identity */}
        <Link
          href="/"
          className="font-retro justify-self-start text-xs font-bold uppercase tracking-[0.08em] transition-opacity hover:opacity-50"
        >
          Juan Gutierrez
        </Link>

        {/* Main navigation */}
        <nav className="flex items-center gap-2 justify-self-center">
          <Link
            href="/sound"
            className={`font-retro border border-[var(--line)] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition-all ${
              isSound
                ? "bg-[var(--lilac)]"
                : "bg-[var(--lilac)] opacity-40 hover:opacity-70"
            }`}
          >
            Sound
          </Link>

          <Link
            href="/podcast"
            className={`font-retro border border-[var(--line)] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition-all ${
              isPodcast
                ? "bg-[var(--sage)]"
                : "bg-[var(--sage)] opacity-40 hover:opacity-70"
            }`}
          >
            Podcast
          </Link>
        </nav>

        {/* Language selector */}
        <div
          className="flex items-center gap-1 justify-self-end"
          aria-label="Language selector"
        >
          <button
            type="button"
            className="font-retro text-[8px] font-bold uppercase tracking-[0.08em]"
            aria-pressed="true"
          >
            EN
          </button>

          <span className="font-retro text-[7px] opacity-20">/</span>

          <button
            type="button"
            disabled
            className="font-retro cursor-default text-[8px] font-bold uppercase tracking-[0.08em] opacity-20"
          >
            ES
          </button>

          <span className="font-retro text-[7px] opacity-20">/</span>

          <button
            type="button"
            disabled
            className="font-retro cursor-default text-[8px] font-bold uppercase tracking-[0.08em] opacity-20"
          >
            FR
          </button>
        </div>

      </div>
    </header>
  );
}