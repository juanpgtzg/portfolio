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
          DEMO REEL
          ===================================================== */}

      <section className="w-full">
        {/* ===================================================
            SECTION HEADING
            Outside the media box
            =================================================== */}

        <div className="mb-5 flex items-end justify-between gap-4 md:mb-6">
          <div className="min-w-0">
            <span className="retro-tag retro-tag-lilac">
              {reel.tag}
            </span>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              {reel.title}
            </h2>
          </div>

          {/* Master Play / Pause */}
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
            className={`
              font-retro
              flex h-11 w-11 shrink-0
              items-center justify-center
              border border-[var(--line)]
              text-[10px]
              font-bold uppercase
              tracking-[0.08em]
              transition-colors
              md:h-12 md:w-auto md:gap-2 md:px-5
              ${
                isReelPlaying
                  ? "bg-[var(--lilac)]"
                  : "bg-[var(--paper-light)] hover:bg-[var(--lilac)]"
              }
            `}
          >
            <ArrowIcon
              name={
                isReelPlaying
                  ? "pause"
                  : "play"
              }
              className="h-3.5 w-3.5"
            />

            <span className="hidden md:inline">
              {isReelPlaying
                ? reel.pause
                : reel.play}
            </span>
          </button>
        </div>

        {/* ===================================================
            MEDIA CONSOLE
            =================================================== */}

        <div className="w-full overflow-hidden border border-[var(--line)] bg-[var(--paper-light)]">
          {/* =================================================
              CONSOLE BODY

              Desktop:
              video establishes the height;
              left panel is constrained to it.
              ================================================= */}

          <div className="relative min-w-0">
            {/* ===============================================
                VIDEO
                =============================================== */}

            <div className="w-full min-w-0 bg-black md:ml-[41.86%] md:w-[58.14%]">
              <DemoReel
                embedded
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

            {/* ===============================================
                INFORMATION / CREDITS
                =============================================== */}

            <div
              className="
                flex min-w-0 flex-col
                border-t border-[var(--line)]
                md:absolute
                md:inset-y-0
                md:left-0
                md:w-[41.86%]
                md:min-h-0
                md:overflow-hidden
                md:border-r
                md:border-t-0
              "
            >
              {/* Description */}
              <div className="shrink-0 px-4 py-5 md:px-6 md:py-5">
                <p className="max-w-md text-sm leading-relaxed opacity-70">
                  {reel.description}
                </p>
              </div>

              {/* Credits */}
              <div className="min-h-0 border-t border-[var(--line-light)] px-4 pb-4 pt-3 md:flex md:flex-1 md:flex-col md:overflow-hidden md:px-6 md:pb-4">
                <PostProductionCredits
                  activeCreditId={
                    activeCreditId
                  }
                  onSelectReelCredit={
                    handleSelectReelCredit
                  }
                />
              </div>
            </div>
          </div>

          {/* =================================================
              TECHNICAL FOOTER
              ================================================= */}

          <div className="font-retro grid gap-2 border-t border-[var(--line)] px-4 py-3 text-[9px] uppercase tracking-[0.06em] opacity-50 md:grid-cols-[1fr_auto] md:items-center md:px-6 md:text-[10px]">
            <span>
              {reel.disciplines}
            </span>

            <span className="whitespace-nowrap">
              Stereo / 48 kHz

              <span className="mx-2 opacity-40">
                /
              </span>

              {reel.technicalLabel}
            </span>
          </div>
        </div>
      </section>

      <hr className="retro-divider-strong my-8" />
    </>
  );
}