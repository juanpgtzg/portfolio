"use client";

import { useEffect, useRef, useState } from "react";
import { postProductionCredits } from "@/data/postProductionCredits";
import ArrowIcon from "@/components/ui/ArrowIcon";

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
                grid grid-cols-[24px_minmax(0,1fr)_auto] items-start gap-x-2 gap-y-0 py-2
                ${!showAllMobile && index >= 4 ? "hidden md:grid" : ""}
                ${
                  index !== postProductionCredits.length - 1
                    ? "border-b border-[var(--line-light)]"
                    : ""
                }
              `}
            >
              {/* Number */}
              <span className="font-retro col-start-1 row-start-1 pt-[1px] text-[9px] opacity-30">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <p className="font-retro col-start-2 row-start-1 min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.03em]">
                {credit.title}
              </p>

              {/* External link */}
              {credit.link && (
                <a
                  href={credit.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${credit.title} in a new tab`}
                  className="col-start-3 row-start-1 flex h-4 w-4 shrink-0 items-center justify-center opacity-30 transition-opacity hover:opacity-80"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3 fill-none stroke-current"
                    strokeWidth="1.8"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    aria-hidden="true"
                  >
                    <path d="M14 5h5v5" />
                    <path d="M19 5l-8 8" />
                    <path d="M17 13v6H5V7h6" />
                  </svg>
                </a>
              )}

              {/* Role */}
              <p className="col-start-2 col-span-2 row-start-2 mt-0.5 min-w-0 text-[10px] opacity-45">
                {credit.role}
              </p>

              {/* Optional note */}
              {credit.note && (
                <p className="font-retro col-start-2 col-span-2 row-start-3 mt-1 min-w-0 text-[8px] leading-relaxed tracking-[0.03em] opacity-30 md:text-[9px]">
                  {credit.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Mobile View More / Less */}
        <div className="mt-2 flex justify-center md:hidden">
          <button
            type="button"
            onClick={() => setShowAllMobile((current) => !current)}
            className="font-retro origin-center scale-[0.72] appearance-none border-0 bg-transparent p-0 text-[8px] font-bold uppercase leading-none tracking-[0.04em] opacity-45 transition-opacity hover:opacity-70"
          >
            <span className="flex items-center gap-1">
              {showAllMobile ? "View Less" : "View More"}

              <ArrowIcon
                name={showAllMobile ? "up" : "down"}
                className="h-2.5 w-2.5"
              />
            </span>
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