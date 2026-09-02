"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import LanguageSelector from "@/components/language/LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

type Side =
  | "sound"
  | "podcast";

export default function MobileHero() {
  const router = useRouter();

  const {
    language,
    localizedPath,
  } = useLanguage();

  const t =
    translations[language];

  const [
    selected,
    setSelected,
  ] = useState<Side | null>(
    null
  );

  const [
    isPressed,
    setIsPressed,
  ] = useState(false);

  const [
    exitDirection,
    setExitDirection,
  ] = useState<
    "left" | "right" | null
  >(null);

  const navigateTo = (
    side: Side
  ) => {
    if (exitDirection) return;

    /*
     * Remember which direction
     * the destination should enter.
     */
    sessionStorage.setItem(
      "portfolio-transition",
      side
    );

    setIsPressed(true);

    /*
     * Sound is on the left →
     * hero exits right.
     *
     * Podcast is on the right →
     * hero exits left.
     */
    setExitDirection(
      side === "sound"
        ? "right"
        : "left"
    );

    window.setTimeout(() => {
      router.push(
        localizedPath(
          `/${side}`
        )
      );
    }, 420);
  };

  const enterSelected = () => {
    if (!selected) return;

    navigateTo(selected);
  };

  const handleScreenSelect = (
    side: Side
  ) => {
    if (selected === side) {
      navigateTo(side);
      return;
    }

    setSelected(side);
  };

  return (
    <section
      className="language-hero retro-texture flex min-h-screen flex-col justify-center overflow-hidden px-5 py-8"
      style={{
        transform:
          exitDirection === "right"
            ? "translateX(100%)"
            : exitDirection ===
                "left"
              ? "translateX(-100%)"
              : "translateX(0)",
        opacity:
          exitDirection
            ? 0
            : 1,
        transition:
          "transform 400ms cubic-bezier(0.76, 0, 0.24, 1), opacity 300ms ease",
        willChange:
          "transform, opacity",
      }}
    >
      {/* Intro */}
      <div className="mx-auto mb-6 w-full max-w-sm">
        {/* Language selector */}
        <div className="mb-3 flex justify-end">
          <LanguageSelector />
        </div>

        {/* Portfolio label */}
        <span className="retro-tag retro-tag-pink">
          {t.hero.portfolioLabel}
        </span>

        <h1 className="mt-4 text-4xl font-bold leading-none tracking-tight">
          Juan Gutierrez
        </h1>

        <p className="font-retro mt-2 text-[10px] uppercase tracking-[0.08em] opacity-45">
          {t.hero.subtitle}
        </p>
      </div>

      {/* Device */}
      <div className="ipod-float mx-auto w-full max-w-[330px]">
        <div
          className="mobile-hero-device rounded-[34px] border-2 border-[var(--line)] bg-[var(--paper-dark)] p-4 shadow-[7px_9px_0_rgba(60,48,45,0.12)] transition-transform duration-300 ease-out"
          style={{
            transform:
              isPressed
                ? "scale(0.985)"
                : selected ===
                    "sound"
                  ? "rotate(-0.5deg)"
                  : selected ===
                      "podcast"
                    ? "rotate(0.5deg)"
                    : "rotate(0deg)",
          }}
        >
          {/* Screen */}
          <div className="mobile-hero-screen overflow-hidden rounded-[10px] border-2 border-[var(--line)] bg-[var(--paper-light)]">
            {/* Screen top bar */}
            <div className="flex items-center justify-between border-b border-[var(--line)] px-3 py-2">
              <span className="font-retro text-[8px] font-bold uppercase tracking-[0.08em]">
                JG / Portfolio
              </span>

              <span className="font-retro text-[8px] uppercase tracking-[0.08em] opacity-40">
                {t.hero.menu}
              </span>
            </div>

            {/* Screen title */}
            <div className="px-3 pb-2 pt-3">
              <p className="retro-label opacity-35">
                {
                  t.hero
                    .selectAndEnter
                }
              </p>
            </div>

            {/* Sound */}
            <button
              type="button"
              onClick={() =>
                handleScreenSelect(
                  "sound"
                )
              }
              className={`flex w-full items-center justify-between border-t border-[var(--line-light)] px-3 py-4 transition-colors ${
                selected === "sound"
                  ? "bg-[var(--lilac)]"
                  : "bg-transparent"
              }`}
            >
              {/* Left arrow */}
              {selected ===
              "sound" ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 fill-[var(--ink)]"
                >
                  <path d="M15.5 5 8.5 12l7 7Z" />
                </svg>
              ) : (
                <span className="h-4 w-4 shrink-0" />
              )}

              {/* Sound label */}
              <div className="text-right">
                <span className="font-retro block text-[9px] uppercase tracking-[0.08em] opacity-45">
                  {t.hero.sideA}
                </span>

                <span className="font-retro mt-0.5 block text-sm font-bold uppercase tracking-[0.06em]">
                  {t.hero.sound}
                </span>
              </div>
            </button>

            {/* Podcast */}
            <button
              type="button"
              onClick={() =>
                handleScreenSelect(
                  "podcast"
                )
              }
              className={`flex w-full items-center justify-between border-t border-[var(--line-light)] px-3 py-4 text-left transition-colors ${
                selected ===
                "podcast"
                  ? "bg-[var(--sage)]"
                  : "bg-transparent"
              }`}
            >
              <div>
                <span className="font-retro block text-[9px] uppercase tracking-[0.08em] opacity-45">
                  {t.hero.sideB}
                </span>

                <span className="font-retro mt-0.5 block text-sm font-bold uppercase tracking-[0.06em]">
                  {t.hero.podcast}
                </span>
              </div>

              {selected ===
                "podcast" && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-[var(--ink)]"
                >
                  <path d="m8.5 5 7 7-7 7Z" />
                </svg>
              )}
            </button>

            {/* Screen footer */}
            <div className="flex items-center justify-between border-t border-[var(--line)] px-3 py-2">
              <span className="font-retro text-[7px] uppercase tracking-[0.08em] opacity-30">
                {t.hero.stereo}
              </span>

              <span className="font-retro text-[7px] uppercase tracking-[0.08em] opacity-30">
                01 / 02
              </span>
            </div>
          </div>

          {/* Click wheel */}
          <div className="mobile-hero-wheel relative mx-auto mt-5 aspect-square w-[74%] rounded-full border-2 border-[var(--line)] bg-[var(--paper-light)]">
            {/* Menu label */}
            <span className="font-retro pointer-events-none absolute left-1/2 top-[11%] -translate-x-1/2 text-[9px] font-bold uppercase tracking-[0.08em] opacity-45">
              {t.hero.menu}
            </span>

            {/* Previous / Sound */}
            <button
              type="button"
              onClick={() =>
                setSelected("sound")
              }
              onTouchStart={() =>
                setSelected("sound")
              }
              aria-label="Select Sound"
              className={`absolute left-[9%] top-1/2 flex h-12 w-12 -translate-y-1/2 touch-manipulation select-none items-center justify-center rounded-full transition-all ${
                selected === "sound"
                  ? "bg-[var(--lilac)]"
                  : ""
              }`}
              style={{
                WebkitTapHighlightColor:
                  "transparent",
              }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-[var(--ink)]"
              >
                <path d="M15.5 5 8.5 12l7 7Z" />
              </svg>
            </button>

            {/* Next / Podcast */}
            <button
              type="button"
              onClick={() =>
                setSelected(
                  "podcast"
                )
              }
              onTouchStart={() =>
                setSelected(
                  "podcast"
                )
              }
              aria-label="Select Podcast"
              className={`absolute right-[9%] top-1/2 flex h-12 w-12 -translate-y-1/2 touch-manipulation select-none items-center justify-center rounded-full transition-all ${
                selected ===
                "podcast"
                  ? "bg-[var(--sage)]"
                  : ""
              }`}
              style={{
                WebkitTapHighlightColor:
                  "transparent",
              }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-[var(--ink)]"
              >
                <path d="m8.5 5 7 7-7 7Z" />
              </svg>
            </button>

            {/* Bottom label */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[11%] left-1/2 flex -translate-x-1/2 items-center gap-[2px] opacity-35"
            >
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3 fill-[var(--ink)]"
              >
                <path d="M3 2 10 6 3 10Z" />
              </svg>

              <span className="h-3 w-[2px] bg-[var(--ink)]" />

              <span className="h-3 w-[2px] bg-[var(--ink)]" />
            </div>

            {/* Center button */}
            <button
              type="button"
              onClick={() => {
                if (!selected)
                  return;

                enterSelected();
              }}
              aria-label={
                selected
                  ? `${t.hero.enter} ${selected}`
                  : t.hero.enter
              }
              className="absolute left-1/2 top-1/2 flex aspect-square w-[42%] -translate-x-1/2 -translate-y-1/2 touch-manipulation select-none items-center justify-center rounded-full border-2 border-[var(--line)] bg-[var(--paper-dark)] transition-transform active:scale-95"
              style={{
                WebkitTapHighlightColor:
                  "transparent",
              }}
            >
              <span className="font-retro text-[8px] font-bold uppercase tracking-[0.08em] opacity-60">
                {t.hero.enter}
              </span>
            </button>
          </div>

          {/* Device label */}
          <div className="mt-4 flex items-center justify-between px-1">
            <span className="font-retro text-[7px] uppercase tracking-[0.08em] opacity-30">
              JG-01
            </span>

            <span className="font-retro text-[7px] uppercase tracking-[0.08em] opacity-30">
              {
                t.hero
                  .madeInMexico
              }
            </span>
          </div>
        </div>
      </div>

      <p className="font-retro mx-auto mt-5 text-center text-[8px] uppercase tracking-[0.1em] opacity-30">
        {t.hero.selectSide} /{" "}
        {t.hero.enter}
      </p>
    </section>
  );
}