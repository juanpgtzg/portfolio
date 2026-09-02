"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  postProductionCredits,
  type PostProductionCredit,
} from "@/data/postProductionCredits";

import ArrowIcon from "@/components/ui/ArrowIcon";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

import type { SoundRoleKey } from "@/types/soundRoles";
import type { PostProductionNoteKey } from "@/types/postProductionNotes";

interface PostProductionCreditsProps {
  activeCreditId?: string | null;

  isReelPlaying?: boolean;

  onSelectReelCredit?: (
    creditId: string
  ) => void;
}

const creditUi = {
  en: {
    reelCredits:
      "Demo Reel Credits",

    additionalCredits:
      "Additional Credits",

    restrictedNote:
      "Some projects cannot be included in this reel due to NDA, distribution, or footage-use restrictions.",

    playProject:
      "Play",
  },

  es: {
    reelCredits:
      "Créditos del Demo Reel",

    additionalCredits:
      "Créditos Adicionales",

    restrictedNote:
      "Algunos proyectos no pueden incluirse en este demo reel debido a acuerdos de confidencialidad, distribución o restricciones de uso de material.",

    playProject:
      "Reproducir",
  },

  fr: {
    reelCredits:
      "Crédits du Demo Reel",

    additionalCredits:
      "Crédits Supplémentaires",

    restrictedNote:
      "Certains projets ne peuvent pas être inclus dans ce demo reel en raison d’accords de confidentialité, de restrictions de distribution ou de droits d’utilisation des images.",

    playProject:
      "Lire",
  },

  zh: {
    reelCredits:
      "Demo Reel 作品",

    additionalCredits:
      "其他後期作品",

    restrictedNote:
      "部分專案因保密協議、發行限制或影像使用權限制，無法收錄於 Demo Reel。",

    playProject:
      "播放",
  },
} as const;

type ReelCredit =
  PostProductionCredit & {
    reel: {
      src: string;
      order: number;
    };
  };

const reelCredits =
  postProductionCredits
    .filter(
      (
        credit
      ): credit is ReelCredit =>
        credit.reel !== undefined
    )
    .sort(
      (a, b) =>
        a.reel.order -
        b.reel.order
    );

const additionalCredits =
  postProductionCredits.filter(
    (credit) =>
      credit.reel === undefined
  );

const displayCredits = [
  ...reelCredits,
  ...additionalCredits,
];

export default function PostProductionCredits({
  activeCreditId = null,
  isReelPlaying = false,
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

  const ui =
    creditUi[language];

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

  const [
    thumbTop,
    setThumbTop,
  ] = useState(0);

  const [
    canScroll,
    setCanScroll,
  ] = useState(false);

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
      scrollHeight >
      clientHeight;

    setCanScroll(
      scrollable
    );

    if (!scrollable) {
      return;
    }

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
        ? (scrollTop /
            maxScroll) *
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

    observer.observe(
      element
    );

    requestAnimationFrame(
      updateScrollbar
    );

    return () =>
      observer.disconnect();
  }, []);

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

    const activeIndex =
      displayCredits.findIndex(
        (credit) =>
          credit.id ===
          activeCreditId
      );

    if (activeIndex >= 4) {
      setShowAllMobile(
        true
      );
    }

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

  const imdbTooltipRef =
  useRef<HTMLSpanElement>(null);

  const [
    showImdbTooltip,
    setShowImdbTooltip,
  ] = useState(false);

  const [
    imdbTooltipPosition,
    setImdbTooltipPosition,
  ] = useState({
    x: 0,
    y: 0,
  });

  const filmCard =
  translations[language].sound
    .filmCard;

  const handleImdbMouseMove = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const tooltip =
      imdbTooltipRef.current;

    const offset = 12;

    let x =
      event.clientX + offset;

    let y =
      event.clientY + offset;

    if (tooltip) {
      const rect =
        tooltip.getBoundingClientRect();

      if (
        x + rect.width >
        window.innerWidth - 8
      ) {
        x =
          event.clientX -
          rect.width -
          offset;
      }

      if (
        y + rect.height >
        window.innerHeight - 8
      ) {
        y =
          event.clientY -
          rect.height -
          offset;
      }
    }

    setImdbTooltipPosition({
      x,
      y,
    });
  };

  return (
    <div className="mt-0 flex flex-col md:mt-6 md:min-h-0 md:flex-1 md:overflow-hidden">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="font-retro text-[12px] font-bold uppercase tracking-[0.04em] opacity-55 md:text-[13px]">
          {ui.reelCredits}
        </span>

        <span className="font-retro text-[9px] uppercase tracking-[0.06em] opacity-30">
          {String(
            postProductionCredits.length
          ).padStart(
            2,
            "0"
          )}{" "}
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
          {displayCredits.map(
            (
              credit,
              index
            ) => {
              const hasReel =
                credit.reel !==
                undefined;

              const isActive =
                activeCreditId ===
                credit.id;
              
              const isActivePlaying =
                isActive &&
                isReelPlaying;

              const isFirstAdditional =
                !hasReel &&
                index ===
                  reelCredits.length;

              const isLastReelCredit =
                hasReel &&
                index === reelCredits.length - 1;

              const hiddenOnMobile =
                !showAllMobile &&
                index >= 4;

              return (
                <div
                  key={
                    credit.id
                  }
                  className={
                    hiddenOnMobile
                      ? "hidden md:block"
                      : ""
                  }
                >
                  {/* Additional credits separator */}
                  {isFirstAdditional && (
                    <div className="relative py-4 md:py-5">
                      {/* Single full-width section divider */}
                      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-[var(--line)] md:-right-5" />

                      <p className="font-retro text-[9px] font-bold uppercase tracking-[0.07em] opacity-50 md:text-[10px]">
                        {ui.additionalCredits}
                      </p>

                      <p className="mt-2 max-w-sm text-[9px] leading-relaxed opacity-40 md:text-[10px]">
                        {ui.restrictedNote}
                      </p>
                    </div>
                  )}

                  <div
                    ref={(
                      element
                    ) => {
                      creditRefs.current[
                        credit.id
                      ] =
                        element;
                    }}
                    className="group relative"
                  >
                    {/* Active background */}
                    <div
                      className={`pointer-events-none absolute inset-y-0 left-0 right-0 md:-right-5 transition-opacity duration-200 ${
                        isActive
                          ? "bg-[var(--lilac)] opacity-25"
                          : "opacity-0"
                      }`}
                    />

                    {/* Hover background */}
                    {hasReel && (
                      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 bg-[var(--lilac)] opacity-0 transition-opacity duration-150 group-hover:opacity-10 md:-right-5" />
                    )}

                    {/* Row divider */}
                    {index !== displayCredits.length - 1 &&
                      !isLastReelCredit && (
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[var(--line-light)] md:-right-5" />
                    )}

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
                        aria-label={`${ui.playProject}: ${credit.title}`}
                        className="relative z-[1] block w-full cursor-pointer text-left"
                      >
                        <CreditContent
                          credit={credit}
                          index={index}
                          isActive={isActive}
                          isPlaying={
                            isActivePlaying
                          }
                          roles={roles}
                          notes={notes}
                          showPlay
                        />
                      </button>
                    ) : (
                      <div className="relative z-[1]">
                        <CreditContent
                          credit={
                            credit
                          }
                          index={
                            index
                          }
                          isActive={
                            false
                          }
                          roles={
                            roles
                          }
                          notes={
                            notes
                          }
                        />
                      </div>
                    )}

                    {credit.link && (
                      <a
                        href={credit.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${filmCard.viewOnImdb}: ${credit.title}`}
                        onMouseEnter={(event) => {
                          setShowImdbTooltip(true);
                          handleImdbMouseMove(event);
                        }}
                        onMouseMove={
                          handleImdbMouseMove
                        }
                        onMouseLeave={() =>
                          setShowImdbTooltip(false)
                        }
                        className="absolute bottom-2 right-0 z-[3] flex h-4 w-4 cursor-pointer items-center justify-center opacity-35 transition-opacity hover:opacity-100 md:right-1"
                      >
                        <ArrowIcon
                          name="external"
                          className="h-3 w-3"
                        />
                      </a>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Mobile View More / Less */}
        {additionalCredits.length >
          0 && (
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
        )}

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
      {/* IMDb cursor tooltip */}
      <span
        ref={imdbTooltipRef}
        style={{
          left: `${imdbTooltipPosition.x}px`,
          top: `${imdbTooltipPosition.y}px`,
        }}
        className={`pointer-events-none fixed z-50 border border-[var(--line)] bg-[var(--paper-light)] px-3 py-2 font-retro text-[9px] font-bold uppercase tracking-[0.08em] transition-opacity duration-150 ${
          showImdbTooltip
            ? "opacity-100"
            : "opacity-0"
        }`}
      >
        <span className="flex items-center gap-1.5">
          {filmCard.viewOnImdb}

          <ArrowIcon
            name="external"
            className="h-2.5 w-2.5"
          />
        </span>
      </span>
    </div>

  );
}

interface CreditContentProps {
  credit: PostProductionCredit;
  index: number;
  isActive: boolean;
  isPlaying?: boolean;

  roles: Record<
    SoundRoleKey,
    string
  >;

  notes: Record<
    PostProductionNoteKey,
    string
  >;

  showPlay?: boolean;
}

function CreditContent({
  credit,
  index,
  isActive,
  isPlaying = false,
  roles,
  notes,
  showPlay = false,
}: CreditContentProps) {
  return (
    <div className="grid w-full min-w-0 grid-cols-[24px_minmax(0,1fr)_24px] items-start gap-x-2 gap-y-0 py-2">
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
        ).padStart(2, "0")}
      </span>

      {/* Title */}
      <p className="font-retro col-start-2 row-start-1 min-w-0 truncate text-[11px] font-bold uppercase tracking-[0.03em]">
        {credit.title}
      </p>

      {/* Play / Pause indicator */}
      {showPlay && (
        <span
          className={`col-start-3 row-start-1 flex h-4 w-4 items-center justify-center justify-self-end transition-opacity ${
            isActive
              ? "opacity-100"
              : "opacity-30"
          }`}
          aria-hidden="true"
        >
          <ArrowIcon
            name={
              isPlaying
                ? "pause"
                : "play"
            }
            className="h-2.5 w-2.5"
          />
        </span>
      )}

      {/* Roles */}
      <p
        className={`col-start-2 col-end-4 row-start-2 mt-0.5 min-w-0 text-[10px] leading-relaxed transition-opacity ${
          credit.link
            ? "pr-6"
            : ""
        } ${
          isActive
            ? "opacity-75"
            : "opacity-45"
        }`}
      >
        {credit.roles
          .map(
            (role) =>
              roles[role]
          )
          .join(" · ")}
      </p>

      {/* Optional note */}
      {credit.note && (
        <p
          className={`font-retro col-start-2 col-end-4 row-start-3 mt-1 min-w-0 text-[8px] leading-relaxed tracking-[0.03em] transition-opacity md:text-[9px] ${
            credit.link
              ? "pr-6"
              : ""
          } ${
            isActive
              ? "opacity-50"
              : "opacity-30"
          }`}
        >
          {notes[credit.note]}
        </p>
      )}
    </div>
  );
}