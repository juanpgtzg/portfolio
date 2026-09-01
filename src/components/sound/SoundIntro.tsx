"use client";

import { useState } from "react";

import DemoReel from "@/components/sound/DemoReel";
import GrainVisualizer from "@/components/audio/GrainVisualizer";
import PostProductionCredits from "@/components/sound/PostProductionCredits";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function SoundIntro() {
  const { language } = useLanguage();

  const t = translations[language];
  const sound = t.sound;
  const reel = sound.demoReel;

  const [
    activeCreditId,
    setActiveCreditId,
  ] = useState<string | null>(null);

  const [
    reelPlayRequest,
    setReelPlayRequest,
  ] = useState(0);

  /*
   * Master Play / Pause button beside
   * the Demo Reel title.
   */
  const [
    transportRequest,
    setTransportRequest,
  ] = useState(0);

  const [
    isReelPlaying,
    setIsReelPlaying,
  ] = useState(false);

  const handleSelectReelCredit = (
    creditId: string
  ) => {
    setActiveCreditId(creditId);

    setReelPlayRequest(
      (current) => current + 1
    );
  };

  return (
    <>
      {/* =====================================================
          PAGE INTRO
          ===================================================== */}

      <section className="grid items-end gap-4 md:grid-cols-2 md:gap-8">
        <div className="relative">
          <span className="retro-tag retro-tag-pink">
            {sound.sideLabel}
          </span>

          <h1 className="relative z-10 mt-3 text-4xl font-bold tracking-tight md:mt-4 md:text-7xl">
            {t.nav.sound}
          </h1>

          <div className="md:hidden">
            <GrainVisualizer
              mobileOverlay
            />
          </div>
        </div>

        <div className="hidden md:block">
          <GrainVisualizer />
        </div>
      </section>

      <hr className="retro-divider-strong my-5 md:my-7" />

      {/* =====================================================
          SOUND DESIGN
          ===================================================== */}

      <section className="grid grid-cols-[minmax(0,1fr)] items-start gap-y-5 md:grid-cols-[0.9fr_1.25fr] md:items-stretch md:gap-10">
        {/* Information */}
        <div className="contents md:flex md:min-h-0 md:flex-col md:overflow-hidden md:[contain:size]">
          <div className="order-1 md:order-none">
            <span className="retro-tag retro-tag-lilac">
              {reel.tag}
            </span>

            {/* Demo Reel title + master transport */}
            <div className="mt-4 flex items-center gap-4">
              <h2 className="text-3xl font-bold">
                {reel.title}
              </h2>

              <button
                type="button"
                onClick={() =>
                  setTransportRequest(
                    (current) =>
                      current + 1
                  )
                }
                aria-label={
                  isReelPlaying
                    ? reel.pause
                    : reel.play
                }
                aria-pressed={
                  isReelPlaying
                }
                className="flex h-12 w-12 shrink-0 items-center justify-center border border-[var(--line)] bg-[var(--paper-light)] transition-colors hover:bg-[var(--lilac)]"
              >
                <ArrowIcon
                  name={
                    isReelPlaying
                      ? "pause"
                      : "play"
                  }
                  className="h-4 w-4"
                />
              </button>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed opacity-70">
              {reel.description}
            </p>
          </div>

          <div className="order-3 min-h-0 md:order-none md:flex md:flex-1 md:flex-col md:overflow-hidden">
            <PostProductionCredits
              activeCreditId={
                activeCreditId
              }
              onSelectReelCredit={
                handleSelectReelCredit
              }
            />
          </div>

          <div className="order-4 mt-0 border-t border-[var(--line-light)] pt-3 md:order-none md:mt-auto md:pt-4">
            <p className="font-retro max-w-none whitespace-nowrap text-[9px] uppercase tracking-[-0.02em] opacity-55 md:text-[11px] md:tracking-[0.01em]">
              {reel.disciplines}
            </p>
          </div>
        </div>

        {/* Reel */}
        <div className="order-2 min-w-0 w-full md:order-none">
          <DemoReel
            activeCreditId={
              activeCreditId
            }
            playRequest={
              reelPlayRequest
            }
            transportRequest={
              transportRequest
            }
            onActiveCreditChange={
              setActiveCreditId
            }
            onPlayingChange={
              setIsReelPlaying
            }
          />
        </div>
      </section>

      <hr className="retro-divider-strong my-8" />
    </>
  );
}