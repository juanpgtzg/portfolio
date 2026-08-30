"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isSound = pathname === "/sound";
  const isPodcast = pathname === "/podcast";

  return (
    <header className="border-b border-[var(--line)] px-5 md:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 py-3 md:min-h-16 md:grid-cols-[1fr_auto_1fr] md:gap-0 md:py-0">

        {/* Identity */}
        <Link
          href="/"
          className="font-retro col-start-1 row-start-1 justify-self-start text-[10px] font-bold uppercase tracking-[0.08em] transition-opacity hover:opacity-50 md:text-xs"
        >
          Juan Gutierrez
        </Link>

        {/* Main navigation */}
        <nav className="col-span-2 row-start-2 grid w-full grid-cols-2 gap-2 md:col-span-1 md:col-start-2 md:row-start-1 md:flex md:w-auto md:items-center md:justify-self-center">
          <Link
            href="/sound"
            className={`font-retro border border-[var(--line)] px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.08em] transition-all md:px-4 md:text-xs ${
              isSound
                ? "bg-[var(--lilac)]"
                : "bg-[var(--lilac)] opacity-40 hover:opacity-70"
            }`}
          >
            Sound
          </Link>

          <Link
            href="/podcast"
            className={`font-retro border border-[var(--line)] px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.08em] transition-all md:px-4 md:text-xs ${
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
          className="col-start-2 row-start-1 flex items-center gap-1 justify-self-end md:col-start-3"
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