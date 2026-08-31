"use client";

import { useEffect, useRef, useState } from "react";
import { postProductionCredits } from "@/data/postProductionCredits";

export default function PostProductionCredits() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [canScroll, setCanScroll] = useState(false);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const updateScrollbar = () => {
    const element = scrollRef.current;
    if (!element) return;

    const { scrollHeight, clientHeight, scrollTop } = element;

    const scrollable = scrollHeight > clientHeight;
    setCanScroll(scrollable);

    if (!scrollable) return;

    const track = trackRef.current;
    if (!track) return;

    const trackHeight = track.clientHeight;

    const newThumbHeight = Math.max(
        24,
        (clientHeight / scrollHeight) * trackHeight
    );

    const maxScroll = scrollHeight - clientHeight;
    const maxThumbTravel = trackHeight - newThumbHeight;

    const newThumbTop =
        maxScroll > 0
        ? (scrollTop / maxScroll) * maxThumbTravel
        : 0;

    setThumbHeight(newThumbHeight);
    setThumbTop(
        Math.max(0, Math.min(newThumbTop, maxThumbTravel))
    );
    };

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
        requestAnimationFrame(updateScrollbar);
    });

    observer.observe(element);

    requestAnimationFrame(updateScrollbar);

    return () => observer.disconnect();
    }, []);

  const handleThumbPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    const element = scrollRef.current;
    if (!element) return;

    const startY = event.clientY;
    const startScrollTop = element.scrollTop;

    const maxScroll =
      element.scrollHeight - element.clientHeight;

    const track = trackRef.current;
        if (!track) return;

        const maxThumbTravel =
        track.clientHeight - thumbHeight;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaY = moveEvent.clientY - startY;

      if (maxThumbTravel <= 0) return;

      element.scrollTop =
        startScrollTop +
        (deltaY / maxThumbTravel) * maxScroll;
    };

    const handlePointerUp = () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );
      window.removeEventListener(
        "pointerup",
        handlePointerUp
      );
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    window.addEventListener(
      "pointerup",
      handlePointerUp
    );
  };

  return (
    <div className="mt-0 flex flex-col md:mt-6 md:min-h-0 md:flex-1 md:overflow-hidden">

      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="font-retro text-[12px] font-bold uppercase tracking-[0.04em] opacity-55 md:text-[13px]">
          Post-Production Credits
        </span>

        <span className="font-retro text-[9px] uppercase tracking-[0.06em] opacity-30">
          {String(postProductionCredits.length).padStart(2, "0")} Projects
        </span>
      </div>

      <div className="relative border-t border-[var(--line-light)] md:flex md:min-h-0 md:flex-1 md:flex-col md:overflow-hidden">

        {/* Credits */}
        <div
          ref={scrollRef}
          onScroll={updateScrollbar}
          className="retro-scroll-hidden md:h-full md:min-h-0 md:flex-1 md:overflow-y-auto md:pr-5"
        >
          {postProductionCredits.map((credit, index) => (
            <div
              key={`${credit.title}-${credit.role}-${index}`}
              className={`
                grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-0 py-2
                ${!showAllMobile && index >= 4 ? "hidden md:grid" : ""}
                ${
                  index !== postProductionCredits.length - 1
                    ? "border-b border-[var(--line-light)]"
                    : ""
                }
              `}
            >
              {/* Number */}
              <span className="font-retro text-[9px] opacity-30">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <p className="font-retro min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.03em]">
                {credit.title}
              </p>

              {/* Role */}
              <p className="max-w-[120px] truncate text-right text-[10px] opacity-50 md:hidden">
                {credit.role}
              </p>

              {/* Desktop role */}
              <div className="hidden md:block md:col-start-2">
                <p className="mt-0.5 text-[10px] opacity-45">
                  {credit.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View More / Less */}
        <div className="mt-2 flex justify-end md:hidden">
          <button
            type="button"
            onClick={() => setShowAllMobile((current) => !current)}
            className="font-retro w-auto shrink-0 appearance-none border-0 bg-transparent p-0 text-[8px] font-bold uppercase leading-none tracking-[0.04em] opacity-45 transition-opacity hover:opacity-70"
          >
            {showAllMobile ? "View Less ↑" : "View More ↓"}
          </button>
        </div>

        {/* Custom retro scrollbar — desktop only */}
        <div
          className={`absolute inset-y-0 right-0 hidden w-[7px] border border-[var(--line-light)] bg-[var(--paper-dark)] transition-opacity md:block ${
            canScroll
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <div
            ref={trackRef}
            className="absolute inset-[1px]"
          >
            <div
              onPointerDown={handleThumbPointerDown}
              className="absolute left-0 right-0 cursor-grab bg-[var(--ink-soft)] active:cursor-grabbing"
              style={{
                height: `${thumbHeight}px`,
                top: `${thumbTop}px`,
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}