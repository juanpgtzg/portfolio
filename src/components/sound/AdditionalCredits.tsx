"use client";

import {
  useEffect,
  useRef,
} from "react";

import { additionalCredits } from "@/data/additionalCredits";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

const sectionTitles = {
  en: "More Production Sound Credits",
  es: "Más Créditos de Sonido Directo",
  fr: "Autres Crédits de Son Direct",
  zh: "更多現場收音作品",
} as const;

export default function AdditionalCredits() {
  const { language } =
    useLanguage();

  const roles =
    translations[language].sound
      .roles;

  const title =
    sectionTitles[language];

  const trackRef =
    useRef<HTMLDivElement>(null);

  const animationFrameRef =
    useRef<number | null>(null);

  const lastTimeRef =
    useRef<number | null>(null);

  const offsetRef =
    useRef(0);

  const speed = 30;

  const CreditTrack = () => (
    <div className="flex shrink-0 items-center">
      {additionalCredits.map(
        (credit, index) => (
          <div
            key={`${credit.title}-${index}`}
            className="flex shrink-0 items-center"
          >
            <span className="font-retro whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.06em]">
              {credit.title}
            </span>

            <span className="mx-2 text-[10px] opacity-30">
              /
            </span>

            <span className="whitespace-nowrap text-[10px] opacity-50">
              {
                roles[
                  credit.role
                ]
              }
            </span>

            <span className="mx-5 text-[9px] opacity-20">
              •
            </span>
          </div>
        )
      )}
    </div>
  );

  useEffect(() => {
    const track =
      trackRef.current;

    if (!track) return;

    /*
     * Respect reduced-motion preferences.
     */
    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    if (
      reducedMotion.matches
    ) {
      track.style.transform =
        "translateX(0px)";

      return;
    }

    let running = true;

    const animate = (
      time: number
    ) => {
      if (
        !running ||
        !trackRef.current
      ) {
        return;
      }

      if (
        lastTimeRef.current ===
        null
      ) {
        lastTimeRef.current =
          time;
      }

      const delta =
        (time -
          lastTimeRef.current) /
        1000;

      lastTimeRef.current =
        time;

      const loopWidth =
        trackRef.current
          .scrollWidth / 2;

      offsetRef.current -=
        speed * delta;

      /*
       * Seamlessly move back to the
       * equivalent position in the
       * duplicated track.
       */
      if (
        offsetRef.current <=
        -loopWidth
      ) {
        offsetRef.current +=
          loopWidth;
      }

      trackRef.current.style.transform =
        `translateX(${offsetRef.current}px)`;

      animationFrameRef.current =
        requestAnimationFrame(
          animate
        );
    };

    animationFrameRef.current =
      requestAnimationFrame(
        animate
      );

    return () => {
      running = false;

      if (
        animationFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current =
          null;
      }

      lastTimeRef.current =
        null;
    };
  }, []);

  return (
    <section className="mt-4 md:mt-7">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="retro-label opacity-45">
          {title}
        </span>
      </div>

      {/* Automatically scrolling credits */}
      <div className="relative w-full max-w-full min-w-0 overflow-hidden border-t border-[var(--line-light)] py-3 md:py-4 [contain:inline-size]">
        <div
          ref={trackRef}
          className="flex w-max will-change-transform"
        >
          <CreditTrack />
          <CreditTrack />
        </div>
      </div>
    </section>
  );
}