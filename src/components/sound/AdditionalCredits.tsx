"use client";

import { useEffect, useRef, useState } from "react";
import { additionalCredits } from "@/data/additionalCredits";

export default function AdditionalCredits() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const offsetRef = useRef(0);

  const directionRef = useRef(-1);
  const isScrollingRef = useRef(false);

  const [isScrolling, setIsScrolling] = useState(false);

  const speed = 30;

  const CreditTrack = () => (
    <div className="flex shrink-0 items-center">
      {additionalCredits.map((credit, index) => (
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
            {credit.role}
          </span>

          <span className="mx-5 text-[9px] opacity-20">
            •
          </span>
        </div>
      ))}
    </div>
  );

  const animate = (time: number) => {
    if (!isScrollingRef.current || !trackRef.current) return;

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
    }

    const delta = (time - lastTimeRef.current) / 1000;
    lastTimeRef.current = time;

    const loopWidth = trackRef.current.scrollWidth / 2;

    offsetRef.current +=
      speed * directionRef.current * delta;

    if (offsetRef.current <= -loopWidth) {
      offsetRef.current += loopWidth;
    }

    if (offsetRef.current > 0) {
      offsetRef.current -= loopWidth;
    }

    trackRef.current.style.transform =
      `translateX(${offsetRef.current}px)`;

    animationFrameRef.current =
      requestAnimationFrame(animate);
  };

  const startScrolling = () => {
    if (isScrollingRef.current) return;

    isScrollingRef.current = true;
    setIsScrolling(true);

    // Default automatic direction
    directionRef.current = -1;

    lastTimeRef.current = null;
    animationFrameRef.current =
      requestAnimationFrame(animate);
  };

  const stopScrolling = () => {
    isScrollingRef.current = false;
    setIsScrolling(false);

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    lastTimeRef.current = null;
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const position = mouseX / rect.width;

    /*
      Left 35%  → reverse
      Middle    → normal automatic scroll
      Right 35% → forward
    */

    if (position < 0.35) {
      directionRef.current = 1;
    } else {
      directionRef.current = -1;
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section className="mt-7">
      <div className="mb-2 flex items-center justify-between">
        <span className="retro-label opacity-45">
          More Credits
        </span>

        <span
          className={`font-retro text-[11px] uppercase tracking-[0.08em] transition-opacity ${
            isScrolling ? "opacity-30" : "opacity-20"
          }`}
        >
          Hover to explore
        </span>
      </div>

      <div
        className="relative overflow-hidden border-t border-[var(--line-light)] py-4"
        onMouseEnter={startScrolling}
        onMouseLeave={stopScrolling}
        onMouseMove={handleMouseMove}
        onFocus={startScrolling}
        onBlur={stopScrolling}
        tabIndex={0}
      >
        <div
          ref={trackRef}
          className="flex w-max will-change-transform"
        >
          <CreditTrack />
          <CreditTrack />
        </div>

        {/* Right-side hint */}
        <div
          className={`pointer-events-none absolute right-0 top-0 flex h-full items-center pl-14 transition-opacity duration-200 ${
            isScrolling ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background:
              "linear-gradient(to right, transparent, var(--paper) 65%)",
          }}
        >
          <span className="font-retro pr-1 text-xs opacity-30">
            •••
          </span>
        </div>
      </div>
    </section>
  );
}