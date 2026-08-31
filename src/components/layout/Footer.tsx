"use client";

import Image from "next/image";
import ArrowIcon from "@/components/ui/ArrowIcon";
import {
  useLanguage,
  type Language,
} from "@/context/LanguageContext";

const footerTranslations: Record<
  Language,
  {
    portfolio: string;
    location: string;
    designed: string;
    by: string;
    rights: string;
  }
> = {
  en: {
    portfolio: "JG / Audio Portfolio / 2026",
    location: "Vancouver, BC",
    designed: "Designed & coded",
    by: "by Juan Gutierrez",
    rights: "All rights reserved.",
  },

  es: {
    portfolio: "JG / Portafolio de Audio / 2026",
    location: "Vancouver, BC",
    designed: "Diseñado y programado",
    by: "por Juan Gutierrez",
    rights: "Todos los derechos reservados.",
  },

  fr: {
    portfolio: "JG / Portfolio Audio / 2026",
    location: "Vancouver, C.-B.",
    designed: "Conçu et codé",
    by: "par Juan Gutierrez",
    rights: "Tous droits réservés.",
  },

  zh: {
    portfolio: "JG / 聲音作品集 / 2026",
    location: "加拿大溫哥華",
    designed: "設計與程式開發",
    by: "Juan Gutierrez",
    rights: "保留所有權利。",
  },
};

export default function Footer() {
  const { language } = useLanguage();
  const t = footerTranslations[language];

  return (
    <footer className="mt-8 border-t border-[var(--line)]">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="grid gap-5 py-5 md:grid-cols-[1fr_auto_1fr] md:items-end md:gap-4">
          {/* Left */}
          <div>
            <p className="retro-label opacity-35">
              {t.portfolio}
            </p>

            <p className="font-retro mt-1 text-[9px] uppercase tracking-[0.07em] opacity-30">
              {t.location}
            </p>
          </div>

          {/* Center */}
          <div className="flex items-center gap-5 md:justify-center md:gap-4">
            <a
              href="https://www.imdb.com/es-es/name/nm10061732/?ref_=ext_shr_lnk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-retro inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.06em] opacity-45 transition-opacity hover:opacity-100"
            >
              IMDb
              <ArrowIcon
                name="external"
                className="h-2.5 w-2.5"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/juanpgtzg/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-retro inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.06em] opacity-45 transition-opacity hover:opacity-100"
            >
              LinkedIn
              <ArrowIcon
                name="external"
                className="h-2.5 w-2.5"
              />
            </a>

            <a
              href="https://www.instagram.com/juanpgtzg/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-retro inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.06em] opacity-45 transition-opacity hover:opacity-100"
            >
              Instagram
              <ArrowIcon
                name="external"
                className="h-2.5 w-2.5"
              />
            </a>
          </div>

          {/* Right */}
          <div className="flex items-center justify-between border-t border-[var(--line-light)] pt-4 md:justify-self-end md:border-0 md:pt-0 md:text-right">
            <p className="font-retro text-[8px] uppercase leading-relaxed tracking-[0.05em] opacity-30 md:text-[9px] md:tracking-[0.06em]">
              {t.designed}
              <br />
              {t.by}
            </p>

            <Image
              src="/images/brand/juan-logo.png"
              alt="Juan Gutierrez logo"
              width={80}
              height={80}
              className="ml-4 h-auto w-9 md:w-10"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(48%) sepia(23%) saturate(1450%) hue-rotate(316deg) brightness(95%) contrast(80%)",
              }}
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--line-light)] py-3">
          <p className="font-retro text-center text-[8px] uppercase tracking-[0.08em] opacity-25 md:text-[9px]">
            © {new Date().getFullYear()} Juan Gutierrez. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}