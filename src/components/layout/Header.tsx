"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useDirectionalTransition } from "@/components/transitions/DirectionalPageTransition";
import LanguageSelector from "@/components/language/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function Header() {
  const pathname = usePathname();
  const { navigateTo, isTransitioning } =
    useDirectionalTransition();
    
  const { language } = useLanguage();
  const t = translations[language];
  const { localizedPath } = useLanguage();

  const isSound = pathname === "/sound";
  const isPodcast = pathname === "/podcast";


  return (
    <header className="border-b border-[var(--line)] px-5 md:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 py-3 md:min-h-16 md:grid-cols-[1fr_auto_1fr] md:gap-0 md:py-0">

        {/* Identity */}
        <Link
          href={localizedPath("/")}
          className="font-retro col-start-1 row-start-1 justify-self-start text-[10px] font-bold uppercase tracking-[0.08em] transition-opacity hover:opacity-50 md:text-xs"
        >
          Juan Gutierrez
        </Link>

        {/* Main navigation */}
        <nav className="col-span-2 row-start-2 grid w-full grid-cols-2 gap-2 md:col-span-1 md:col-start-2 md:row-start-1 md:flex md:w-auto md:items-center md:justify-self-center">
          <Link
            href={localizedPath("/sound")}
            onClick={(event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              ) {
                return;
              }

              if (isSound || isTransitioning) {
                event.preventDefault();
                return;
              }

              event.preventDefault();
              navigateTo("sound");
            }}
            className={`font-retro border border-[var(--line)] px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.08em] transition-all md:px-4 md:text-xs ${
              isSound
                ? "bg-[var(--lilac)]"
                : "bg-[var(--lilac)] opacity-40 hover:opacity-70"
            }`}
          >
            {t.nav.sound}
          </Link>

          <Link
            href={localizedPath("/podcast")}
            onClick={(event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              ) {
                return;
              }

              if (isPodcast || isTransitioning) {
                event.preventDefault();
                return;
              }

              event.preventDefault();
              navigateTo("podcast");
            }}
            className={`font-retro border border-[var(--line)] px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.08em] transition-all md:px-4 md:text-xs ${
              isPodcast
                ? "bg-[var(--sage)]"
                : "bg-[var(--sage)] opacity-40 hover:opacity-70"
            }`}
          >
            {t.nav.podcast}
          </Link>
        </nav>

        {/* Language selector */}
        <div className="col-start-2 row-start-1 justify-self-end md:col-start-3">
          <LanguageSelector />
        </div>

      </div>
    </header>
  );
}