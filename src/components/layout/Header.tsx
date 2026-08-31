"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Language = "en" | "es" | "fr" | "zh";

const languages: {
  code: Language;
  label: string;
}[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "zh", label: "中文" },
];

export default function Header() {
  const pathname = usePathname();

  const isSound = pathname === "/sound";
  const isPodcast = pathname === "/podcast";

  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "portfolio-language"
    ) as Language | null;

    const initialLanguage =
      savedLanguage &&
      languages.some(
        (item) => item.code === savedLanguage
      )
        ? savedLanguage
        : "en";

    setLanguage(initialLanguage);

    document.documentElement.lang =
      initialLanguage === "zh"
        ? "zh-Hant"
        : initialLanguage;

    document.documentElement.dataset.language =
      initialLanguage;
  }, []);

  const selectLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);

    localStorage.setItem(
      "portfolio-language",
      newLanguage
    );

    document.documentElement.lang =
      newLanguage === "zh"
        ? "zh-Hant"
        : newLanguage;

    document.documentElement.dataset.language =
      newLanguage;
  };

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
          {languages.map((item, index) => (
            <div
              key={item.code}
              className="flex items-center gap-1"
            >
              {index > 0 && (
                <span className="font-retro text-[7px] opacity-20">
                  /
                </span>
              )}

              <button
                type="button"
                onClick={() =>
                  selectLanguage(item.code)
                }
                aria-pressed={
                  language === item.code
                }
                className={`font-retro text-[8px] font-bold tracking-[0.08em] transition-opacity ${
                  item.code !== "zh"
                    ? "uppercase"
                    : ""
                } ${
                  language === item.code
                    ? "opacity-100"
                    : "opacity-25 hover:opacity-60"
                }`}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>

      </div>
    </header>
  );
}