"use client";

import { useEffect, useRef, useState } from "react";
import { additionalCredits } from "@/data/additionalCredits";

function CreditTrack() {
  return (
    <div className="flex shrink-0 items-center">
      {additionalCredits.map((credit, index) => (
        <div
          key={`${credit.title}-${index}`}
          className="flex shrink-0 items-center"
        >
          <div className="flex items-baseline gap-3 px-6">
            <span className="font-retro whitespace-nowrap text-sm font-bold">
              {credit.title}
            </span>

            <span className="whitespace-nowrap text-xs opacity-50">
              {credit.role}
            </span>
          </div>

          <span
            className="font-retro text-xs opacity-30"
            aria-hidden="true"
          >
            /
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AdditionalCredits() {
  const trackRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const animate = (time: number) => {
    if (!isScrollingRef.current) return;

    const track = trackRef.current;

    if (!track) return;

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
    }

    const delta =
      (time - lastTimeRef.current) / 1000;

    lastTimeRef.current = time;

    /*
      Scrolling speed in pixels per second.
    */
    const speed = 60;

    offsetRef.current -= speed * delta;

    /*
      Since we render the list twice, the width
      of the first half is half the total track.
    */
    const loopWidth =
      track.scrollWidth / 2;

    if (
      loopWidth > 0 &&
      Math.abs(offsetRef.current) >= loopWidth
    ) {
      offsetRef.current += loopWidth;
    }

    track.style.transform =
      `translateX(${offsetRef.current}px)`;

    animationFrameRef.current =
      requestAnimationFrame(animate);
  };

  const startScrolling = () => {
    if (isScrollingRef.current) return;

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    if (reducedMotion) return;

    isScrollingRef.current = true;
    setIsScrolling(true);

    lastTimeRef.current = null;

    animationFrameRef.current =
      requestAnimationFrame(animate);
  };

  const stopScrolling = () => {
    isScrollingRef.current = false;
    setIsScrolling(false);

    lastTimeRef.current = null;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(
        animationFrameRef.current
      );

      animationFrameRef.current = null;
    }

    /*
      We deliberately DO NOT reset offsetRef.

      This is why the credits stay exactly
      where they stopped.
    */
  };

  return (
    <section className="mt-10">
      <div className="mb-3">
        <span className="retro-label opacity-50">
          Additional Credits
        </span>
      </div>

      <div
        className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--paper-light)]"
        tabIndex={0}
        onMouseEnter={startScrolling}
        onMouseLeave={stopScrolling}
        onFocus={startScrolling}
        onBlur={stopScrolling}
      >
        <div
          ref={trackRef}
          className="flex w-max py-4"
          style={{
            transform: "translateX(0px)",
            willChange: "transform",
          }}
        >
          <CreditTrack />
          <CreditTrack />
        </div>

        {/* Fade + dots */}
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 w-24 transition-opacity duration-200 ${
            isScrolling
              ? "opacity-0"
              : "opacity-100"
          }`}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--paper-light) 65%)",
            }}
          />

          <span className="font-retro absolute right-4 top-1/2 -translate-y-1/2 text-sm tracking-[0.15em]">
            •••
          </span>
        </div>
      </div>
    </section>
  );
}