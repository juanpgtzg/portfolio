"use client";

import Link from "next/link";
import { useState } from "react";

type Side = "sound" | "podcast" | null;

export default function Hero() {
  const [activeSide, setActiveSide] = useState<Side>(null);
  const [isPressed, setIsPressed] = useState(false);

  const [transportDirection, setTransportDirection] =
  useState<"sound" | "podcast">("sound");

  return (
    <section className="retro-texture flex min-h-screen items-center justify-center px-6 py-10 md:px-10">
      <div className="w-full max-w-5xl">

        {/* =====================================================
            INTRO
            ===================================================== */}

        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <span className="retro-tag retro-tag-pink">
              Audio Portfolio / 2026
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              Juan Gutierrez
            </h1>

            <p className="font-retro mt-2 text-[10px] uppercase tracking-[0.12em] opacity-40">
              Sound / Podcast / Vancouver BC
            </p>
          </div>

          <div className="hidden text-right md:block">
            <p className="retro-label opacity-35">
              JG — 01
            </p>

            <p className="font-retro mt-1 text-[9px] uppercase tracking-[0.1em] opacity-30">
              Select a side
            </p>
          </div>
        </div>

        {/* =====================================================
            CASSETTE
            ===================================================== */}

        <div
          className="relative mx-auto aspect-[1.62/1] w-full max-w-4xl overflow-hidden rounded-[24px] border-2 border-[var(--line)] bg-[var(--paper-dark)] shadow-[8px_10px_0_rgba(60,48,45,0.12)] transition-transform duration-300 ease-out"
          style={{
            transform: isPressed
              ? "perspective(1200px) scale(0.992)"
              : activeSide === "sound"
                ? "perspective(1200px) rotateZ(-0.35deg) translateX(-2px)"
                : activeSide === "podcast"
                  ? "perspective(1200px) rotateZ(0.35deg) translateX(2px)"
                  : "perspective(1200px) rotateZ(0deg)",
          }}
        >

          {/* Outer inset line */}
          <div className="pointer-events-none absolute inset-[2.2%] rounded-[18px] border border-[var(--line)] opacity-30" />

          {/* =================================================
              TOP LABEL
              ================================================= */}

          <div className="absolute left-[7%] right-[7%] top-[7%] h-[29%] overflow-hidden rounded-[7px] border border-[var(--line)] bg-[var(--paper-light)]">

            {/* pastel upper strip */}
            <div className="absolute inset-x-0 top-0 flex h-[31%]">
              <div className="w-1/2 border-r border-[var(--line)] bg-[var(--lilac)]" />
              <div className="w-1/2 bg-[var(--sage)]" />
            </div>

            <div className="absolute left-[4%] top-[9%] font-retro text-[8px] font-bold uppercase tracking-[0.12em] md:text-[10px]">
              Side A / Sound
            </div>

            <div className="absolute right-[4%] top-[9%] font-retro text-[8px] font-bold uppercase tracking-[0.12em] md:text-[10px]">
              Side B / Podcast
            </div>

            <div className="absolute left-1/2 top-[43%] -translate-x-1/2 text-center">
              <p className="font-retro text-[8px] uppercase tracking-[0.22em] opacity-45 md:text-[10px]">
                Juan Gutierrez
              </p>

              <p className="font-retro mt-1 text-[7px] uppercase tracking-[0.16em] opacity-30 md:text-[9px]">
                Stereo / Audio Portfolio
              </p>
            </div>

            {/* ruled lines */}
            <div className="absolute bottom-[18%] left-[6%] right-[6%] border-t border-[var(--line)] opacity-25" />
            <div className="absolute bottom-[9%] left-[6%] right-[6%] border-t border-[var(--line)] opacity-15" />
          </div>

          {/* =================================================
              REELS
              ================================================= */}

          {/* Left reel */}
          <div
            className={`absolute left-[19%] top-[34%] aspect-square w-[18%] rounded-full border-[3px] border-[var(--line)] bg-[var(--paper-light)] ${
              transportDirection === "sound"
                ? "cassette-reel-spin"
                : "cassette-reel-spin-reverse"
            } ${
              activeSide
                ? "cassette-reel-fast"
                : "cassette-reel-slow"
            }`}
          >
            <div className="absolute inset-[18%] rounded-full border-2 border-[var(--line)] opacity-60" />

            <div className="absolute left-1/2 top-[10%] h-[25%] w-[8%] -translate-x-1/2 bg-[var(--line)] opacity-70" />
            <div className="absolute bottom-[10%] left-1/2 h-[25%] w-[8%] -translate-x-1/2 bg-[var(--line)] opacity-70" />
            <div className="absolute left-[10%] top-1/2 h-[8%] w-[25%] -translate-y-1/2 bg-[var(--line)] opacity-70" />
            <div className="absolute right-[10%] top-1/2 h-[8%] w-[25%] -translate-y-1/2 bg-[var(--line)] opacity-70" />

            <div className="absolute inset-[39%] rounded-full bg-[var(--line)]" />
          </div>

          {/* Right reel */}
          <div
            className={`absolute right-[19%] top-[34%] aspect-square w-[18%] rounded-full border-[3px] border-[var(--line)] bg-[var(--paper-light)] ${
              transportDirection === "sound"
                ? "cassette-reel-spin"
                : "cassette-reel-spin-reverse"
            } ${
              activeSide
                ? "cassette-reel-fast"
                : "cassette-reel-slow"
            }`}
          >
            <div className="absolute inset-[18%] rounded-full border-2 border-[var(--line)] opacity-60" />

            <div className="absolute left-1/2 top-[10%] h-[25%] w-[8%] -translate-x-1/2 bg-[var(--line)] opacity-70" />
            <div className="absolute bottom-[10%] left-1/2 h-[25%] w-[8%] -translate-x-1/2 bg-[var(--line)] opacity-70" />
            <div className="absolute left-[10%] top-1/2 h-[8%] w-[25%] -translate-y-1/2 bg-[var(--line)] opacity-70" />
            <div className="absolute right-[10%] top-1/2 h-[8%] w-[25%] -translate-y-1/2 bg-[var(--line)] opacity-70" />

            <div className="absolute inset-[39%] rounded-full bg-[var(--line)]" />
          </div>

          {/* Tape window */}
          <div className="absolute left-1/2 top-[42%] h-[12%] w-[29%] -translate-x-1/2 overflow-hidden rounded-full border-2 border-[var(--line)] bg-[var(--paper)]">

            {/* Moving tape */}
            <div
              className={`absolute top-1/2 h-[3px] w-[160%] -translate-y-1/2 opacity-55 ${
                transportDirection === "sound"
                  ? "cassette-tape-move"
                  : "cassette-tape-move-reverse"
              } ${
                activeSide
                  ? "cassette-tape-fast"
                  : "cassette-tape-slow"
              }`}
              style={{
                background:
                  "repeating-linear-gradient(90deg, var(--line) 0px, var(--line) 8px, rgba(81,68,64,0.35) 8px, rgba(81,68,64,0.35) 13px)",
              }}
            />

            {/* Window center marking */}
            <div className="absolute left-1/2 top-1/2 h-[10px] w-px -translate-x-1/2 -translate-y-1/2 bg-[var(--line)] opacity-30" />
          </div>

          {/* Center divider */}
          <div className="absolute bottom-[25%] left-1/2 top-[21%] w-px -translate-x-1/2 bg-[var(--line)] opacity-15" />

          {/* =================================================
              BOTTOM MECHANISM
              ================================================= */}

          <div
            className="absolute bottom-[7%] left-1/2 h-[19%] w-[59%] -translate-x-1/2 border-2 border-[var(--line)] bg-[#c9bfad]"
            style={{
              clipPath:
                "polygon(8% 0, 92% 0, 100% 100%, 0 100%)",
            }}
          >
            <div className="absolute bottom-[23%] left-[25%] h-2.5 w-2.5 rounded-full border border-[var(--line)] bg-[var(--paper-light)]" />
            <div className="absolute bottom-[23%] right-[25%] h-2.5 w-2.5 rounded-full border border-[var(--line)] bg-[var(--paper-light)]" />

            <div className="absolute bottom-[28%] left-1/2 h-[8px] w-[23%] -translate-x-1/2 border border-[var(--line)] bg-[var(--paper)]" />
          </div>

          {/* Hover color washes */}
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 z-[1] w-1/2 bg-[var(--lilac)] transition-opacity duration-300 ${
              activeSide === "sound" ? "opacity-[0.10]" : "opacity-0"
            }`}
          />

          <div
            className={`pointer-events-none absolute inset-y-0 right-0 z-[1] w-1/2 bg-[var(--sage)] transition-opacity duration-300 ${
              activeSide === "podcast" ? "opacity-[0.10]" : "opacity-0"
            }`}
          />

          {/* =================================================
              NAVIGATION
              ================================================= */}

          <Link
            href="/sound"
            aria-label="View sound portfolio"
            onMouseEnter={() => {
              setActiveSide("sound");
              setTransportDirection("sound");
            }}
            onMouseLeave={() => {
              setActiveSide(null);
              setIsPressed(false);
            }}
            onPointerDown={() => setIsPressed(true)}
            onPointerUp={() => setIsPressed(false)}
            onPointerCancel={() => setIsPressed(false)}
            className="group absolute inset-y-0 left-0 z-10 w-1/2"
          >
            <div
              className={`absolute bottom-[24%] left-[10%] transition-transform duration-200 ${
                activeSide === "sound"
                  ? "translate-y-[2px]"
                  : ""
              }`}
            >
              <span
                className={`retro-tag transition-all duration-200 ${
                  activeSide === "sound"
                    ? "bg-[var(--lilac)] shadow-[inset_0_2px_0_rgba(60,48,45,0.15)]"
                    : "bg-[var(--paper-light)]"
                }`}
              >
                Side A
              </span>

              <div className="relative mt-2 inline-block">
                <p className="font-retro text-2xl font-bold uppercase tracking-tight md:text-4xl">
                  Sound
                </p>

                <div
                  className={`absolute -bottom-1 left-0 h-px bg-[var(--line)] transition-all duration-300 ${
                    activeSide === "sound"
                      ? "w-full opacity-60"
                      : "w-0 opacity-0"
                  }`}
                />
              </div>

              <span
                className={`font-retro mt-2 block text-[9px] uppercase tracking-[0.12em] transition-all duration-200 ${
                  activeSide === "sound"
                    ? "translate-x-1 opacity-50"
                    : "opacity-0"
                }`}
              >
                Enter →
              </span>
            </div>
          </Link>

          <Link
            href="/podcast"
            aria-label="View podcast portfolio"
            onMouseEnter={() => {
              setActiveSide("podcast");
              setTransportDirection("podcast");
            }}
            onMouseLeave={() => {
              setActiveSide(null);
              setIsPressed(false);
            }}
            onPointerDown={() => setIsPressed(true)}
            onPointerUp={() => setIsPressed(false)}
            onPointerCancel={() => setIsPressed(false)}
            className="group absolute inset-y-0 right-0 z-10 w-1/2"
          >
            <div
              className={`absolute bottom-[24%] right-[10%] text-right transition-transform duration-200 ${
                activeSide === "podcast"
                  ? "translate-y-[2px]"
                  : ""
              }`}
            >
              <span
                className={`retro-tag transition-all duration-200 ${
                  activeSide === "podcast"
                    ? "bg-[var(--sage)] shadow-[inset_0_2px_0_rgba(60,48,45,0.15)]"
                    : "bg-[var(--paper-light)]"
                }`}
              >
                Side B
              </span>

              <div className="relative mt-2 inline-block">
                <p className="font-retro text-2xl font-bold uppercase tracking-tight md:text-4xl">
                  Podcast
                </p>

                <div
                  className={`absolute -bottom-1 right-0 h-px bg-[var(--line)] transition-all duration-300 ${
                    activeSide === "podcast"
                      ? "w-full opacity-60"
                      : "w-0 opacity-0"
                  }`}
                />
              </div>

              <span
                className={`font-retro mt-2 block text-[9px] uppercase tracking-[0.12em] transition-all duration-200 ${
                  activeSide === "podcast"
                    ? "-translate-x-1 opacity-50"
                    : "opacity-0"
                }`}
              >
                ← Enter
              </span>
            </div>
          </Link>

          {/* =================================================
              MICRO DETAILS
              ================================================= */}

          <div className="pointer-events-none absolute left-[5%] top-[4%] font-retro text-[7px] uppercase tracking-[0.14em] opacity-40 md:text-[9px]">
            JG-01
          </div>

          <div className="pointer-events-none absolute right-[5%] top-[4%] font-retro text-[7px] uppercase tracking-[0.14em] opacity-40 md:text-[9px]">
            Type I / Stereo
          </div>

          <div className="pointer-events-none absolute bottom-[2.5%] left-1/2 -translate-x-1/2 font-retro text-[7px] uppercase tracking-[0.16em] opacity-45 md:text-[9px]">
            Made in Mexico
          </div>
        </div>

        {/* =====================================================
            BOTTOM CAPTION
            ===================================================== */}

        <div className="mt-5 flex items-center justify-between border-t border-[var(--line)] pt-3">
          <span className="retro-label opacity-35">
            Choose a side
          </span>

          <span className="font-retro text-[9px] uppercase tracking-[0.1em] opacity-30">
            Sound ← / → Podcast
          </span>
        </div>
      </div>
    </section>
  );
}