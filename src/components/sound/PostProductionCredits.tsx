"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { postProductionCredits } from "@/data/postProductionCredits";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

interface PostProductionCreditsProps {
  activeCreditId?: string | null;

  onSelectReelCredit?: (
    creditId: string
  ) => void;
}

export default function PostProductionCredits({
  activeCreditId = null,
  onSelectReelCredit,
}: PostProductionCreditsProps) {
  const { language } =
    useLanguage();

  const t =
    translations[language].sound
      .postProduction;

  const roles =
    translations[language].sound
      .roles;

  const notes =
    translations[language].sound
      .postProductionNotes;

  const scrollRef =
    useRef<HTMLDivElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const creditRefs =
    useRef<
      Record<
        string,
        HTMLDivElement | null
      >
    >({});

  const [
    thumbHeight,
    setThumbHeight,
  ] = useState(0);

  const [thumbTop, setThumbTop] =
    useState(0);

  const [canScroll, setCanScroll] =
    useState(false);

  const [
    showAllMobile,
    setShowAllMobile,
  ] = useState(false);

  const updateScrollbar = () => {
    const element =
      scrollRef.current;

    if (!element) return;

    const {
      scrollHeight,
      clientHeight,
      scrollTop,
    } = element;

    const scrollable =
      scrollHeight > clientHeight;

    setCanScroll(scrollable);

    if (!scrollable) return;

    const track =
      trackRef.current;

    if (!track) return;

    const trackHeight =
      track.clientHeight;

    const newThumbHeight =
      Math.max(
        24,
        (clientHeight /
          scrollHeight) *
          trackHeight
      );

    const maxScroll =
      scrollHeight -
      clientHeight;

    const maxThumbTravel =
      trackHeight -
      newThumbHeight;

    const newThumbTop =
      maxScroll > 0
        ? (scrollTop / maxScroll) *
          maxThumbTravel
        : 0;

    setThumbHeight(
      newThumbHeight
    );

    setThumbTop(
      Math.max(
        0,
        Math.min(
          newThumbTop,
          maxThumbTravel
        )
      )
    );
  };

  useEffect(() => {
    const element =
      scrollRef.current;

    if (!element) return;

    const observer =
      new ResizeObserver(() => {
        requestAnimationFrame(
          updateScrollbar
        );
      });

    observer.observe(element);

    requestAnimationFrame(
      updateScrollbar
    );

    return () =>
      observer.disconnect();
  }, []);

  /*
   * Keep the active reel credit
   * visible as playback advances.
   */
  useEffect(() => {
    if (!activeCreditId) {
      return;
    }

    const activeElement =
      creditRefs.current[
        activeCreditId
      ];

    if (!activeElement) {
      return;
    }

    /*
     * If the currently playing project
     * is below the four-credit mobile
     * cutoff, reveal the complete list.
     */
    const activeIndex =
      postProductionCredits.findIndex(
        (credit) =>
          credit.id ===
          activeCreditId
      );

    if (activeIndex >= 4) {
      setShowAllMobile(true);
    }

    /*
     * Desktop:
     * gently keep the active project
     * inside the credits viewport.
     */
    activeElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });

    requestAnimationFrame(
      updateScrollbar
    );
  }, [activeCreditId]);

  const handleThumbPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    const element =
      scrollRef.current;

    if (!element) return;

    const startY =
      event.clientY;

    const startScrollTop =
      element.scrollTop;

    const maxScroll =
      element.scrollHeight -
      element.clientHeight;

    const track =
      trackRef.current;

    if (!track) return;

    const maxThumbTravel =
      track.clientHeight -
      thumbHeight;

    const handlePointerMove = (
      moveEvent: PointerEvent
    ) => {
      const deltaY =
        moveEvent.clientY -
        startY;

      if (
        maxThumbTravel <= 0
      ) {
        return;
      }

      element.scrollTop =
        startScrollTop +
        (deltaY /
          maxThumbTravel) *
          maxScroll;
    };

    const handlePointerUp =
      () => {
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
          {t.creditsTitle}
        </span>

        <span className="font-retro text-[9px] uppercase tracking-[0.06em] opacity-30">
          {String(
            postProductionCredits.length
          ).padStart(2, "0")}{" "}
          {t.projects}
        </span>
      </div>

      <div className="relative border-t border-[var(--line-light)] md:flex md:min-h-0 md:flex-1 md:flex-col md:overflow-hidden">
        {/* Credits */}
        <div
          ref={scrollRef}
          onScroll={
            updateScrollbar
          }
          className="retro-scroll-hidden md:h-full md:min-h-0 md:flex-1 md:overflow-y-auto md:pr-5"
        >
          {postProductionCredits.map(
            (
              credit,
              index
            ) => {
              const hasReel =
                Boolean(
                  credit.reel
                );

              const isActive =
                activeCreditId ===
                credit.id;

              const rowClasses = `
                relative
                ${
                  !showAllMobile &&
                  index >= 4
                    ? "hidden md:block"
                    : ""
                }
                ${
                  index !==
                  postProductionCredits.length -
                    1
                    ? "border-b border-[var(--line-light)]"
                    : ""
                }
              `;

              const content = (
                <div className="grid grid-cols-[24px_minmax(0,1fr)_auto] items-start gap-x-2 gap-y-0 py-2">
                  {/* Number */}
                  <span
                    className={`font-retro col-start-1 row-start-1 pt-[1px] text-[9px] transition-opacity ${
                      isActive
                        ? "opacity-100"
                        : "opacity-30"
                    }`}
                  >
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  {/* Title */}
                  <p className="font-retro col-start-2 row-start-1 min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.03em]">
                    {credit.title}
                  </p>

                  {/* Reel indicator */}
                  {hasReel && (
                    <span
                      className={`col-start-3 row-start-1 flex h-4 w-4 items-center justify-center transition-opacity ${
                        isActive
                          ? "opacity-100"
                          : "opacity-25"
                      }`}
                      aria-hidden="true"
                    >
                      <ArrowIcon
                        name={
                          isActive
                            ? "play"
                            : "right"
                        }
                        className="h-2.5 w-2.5"
                      />
                    </span>
                  )}

                  {/* Role */}
                  <p
                    className={`col-start-2 col-span-2 row-start-2 mt-0.5 min-w-0 text-[10px] transition-opacity ${
                      isActive
                        ? "opacity-75"
                        : "opacity-45"
                    }`}
                  >
                    {
                      roles[
                        credit.role
                      ]
                    }
                  </p>

                  {/* Optional note */}
                  {credit.note && (
                    <p
                      className={`font-retro col-start-2 col-span-2 row-start-3 mt-1 min-w-0 text-[8px] leading-relaxed tracking-[0.03em] transition-opacity md:text-[9px] ${
                        isActive
                          ? "opacity-50"
                          : "opacity-30"
                      }`}
                    >
                      {
                        notes[
                          credit.note
                        ]
                      }
                    </p>
                  )}
                </div>
              );

              return (
                <div
                  key={credit.id}
                  ref={(element) => {
                    creditRefs.current[
                      credit.id
                    ] = element;
                  }}
                  className={rowClasses}
                >
                  {/* Active background */}
                  <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${
                      isActive
                        ? "bg-[var(--lilac)] opacity-25"
                        : "opacity-0"
                    }`}
                  />

                  {hasReel ? (
                    <button
                      type="button"
                      onClick={() =>
                        onSelectReelCredit?.(
                          credit.id
                        )
                      }
                      aria-pressed={
                        isActive
                      }
                      aria-label={`Play ${credit.title}`}
                      className="relative z-[1] block w-full text-left transition-opacity hover:opacity-75"
                    >
                      {content}
                    </button>
                  ) : (
                    <div className="relative z-[1]">
                      {content}
                    </div>
                  )}

                  {/* External link stays separate
                      so we never nest <a> inside <button> */}
                  {credit.link && (
                    <a
                      href={
                        credit.link
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.openProject}: ${credit.title}`}
                      className="absolute right-0 top-2 z-[2] flex h-4 w-4 items-center justify-center opacity-30 transition-opacity hover:opacity-80 md:right-1"
                    >
                      <ArrowIcon
                        name="external"
                        className="h-3 w-3"
                      />
                    </a>
                  )}
                </div>
              );
            }
          )}
        </div>

        {/* Mobile View More / Less */}
        <div className="mt-2 flex justify-center md:hidden">
          <button
            type="button"
            onClick={() =>
              setShowAllMobile(
                (current) =>
                  !current
              )
            }
            className="font-retro origin-center scale-[0.72] appearance-none border-0 bg-transparent p-0 text-[8px] font-bold uppercase leading-none tracking-[0.04em] opacity-45 transition-opacity hover:opacity-70"
          >
            <span className="flex items-center gap-1">
              {showAllMobile
                ? t.viewLess
                : t.viewMore}

              <ArrowIcon
                name={
                  showAllMobile
                    ? "up"
                    : "down"
                }
                className="h-2.5 w-2.5"
              />
            </span>
          </button>
        </div>

        {/* Custom scrollbar */}
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
              onPointerDown={
                handleThumbPointerDown
              }
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