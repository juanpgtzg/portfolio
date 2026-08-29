"use client";

import { useEffect, useRef, useState } from "react";
import { postProductionCredits } from "@/data/postProductionCredits";

export default function PostProductionCredits() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

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
    <div className="mt-6 flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="mb-2 flex items-center justify-between">
        <span className="retro-label opacity-45">
          Post-Production Credits
        </span>

        <span className="font-retro text-[8px] uppercase tracking-[0.08em] opacity-25">
          {String(postProductionCredits.length).padStart(2, "0")} Projects
        </span>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden border-t border-[var(--line-light)]">
        {/* Credits */}
        <div
          ref={scrollRef}
          onScroll={updateScrollbar}
          className="retro-scroll-hidden h-full min-h-0 flex-1 overflow-y-auto pr-5"
        >
          {postProductionCredits.map((credit, index) => (
            <div
              key={`${credit.title}-${credit.role}-${index}`}
              className={`grid grid-cols-[24px_1fr] gap-2 py-2 ${
                index !== postProductionCredits.length - 1
                  ? "border-b border-[var(--line-light)]"
                  : ""
              }`}
            >
              <span className="font-retro text-[8px] opacity-25">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <p className="font-retro truncate text-[10px] font-bold uppercase tracking-[0.04em]">
                  {credit.title}
                </p>

                <p className="mt-0.5 text-[10px] opacity-45">
                  {credit.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Custom retro scrollbar */}
        <div
        className={`absolute inset-y-0 right-0 w-[7px] border border-[var(--line-light)] bg-[var(--paper-dark)] transition-opacity ${
            canScroll ? "opacity-100" : "pointer-events-none opacity-0"
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