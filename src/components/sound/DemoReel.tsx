"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useAudioEngine } from "@/components/audio/AudioProvider";
import ArrowIcon from "@/components/ui/ArrowIcon";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

import {
  postProductionCredits,
  type PostProductionCredit,
} from "@/data/postProductionCredits";

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

interface DemoReelProps {
  embedded?: boolean;

  activeCreditId: string | null;

  playRequest: number;

  transportRequest: number;

  onActiveCreditChange: (
    creditId: string
  ) => void;

  onPlayingChange: (
    isPlaying: boolean
  ) => void;
}

const navigationLabels = {
  en: {
    previous: "Previous project",
    next: "Next project",
  },

  es: {
    previous: "Proyecto anterior",
    next: "Siguiente proyecto",
  },

  fr: {
    previous: "Projet précédent",
    next: "Projet suivant",
  },

  zh: {
    previous: "上一個作品",
    next: "下一個作品",
  },
} as const;

function wait(
  milliseconds: number
) {
  return new Promise<void>(
    (resolve) => {
      window.setTimeout(
        resolve,
        milliseconds
      );
    }
  );
}

export default function DemoReel({
  embedded = false,
  activeCreditId,
  playRequest,
  transportRequest,
  onActiveCreditChange,
  onPlayingChange,
}: DemoReelProps) {
  const { language } =
    useLanguage();

  const t =
    translations[language].sound
      .demoReel;

  const roles =
    translations[language].sound
      .roles;

  const navigation =
    navigationLabels[language];

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const frameRef =
    useRef<HTMLDivElement>(null);

  const progressFrameRef =
    useRef<number | null>(null);

  const volumeFrameRef =
    useRef<number | null>(null);

  const lastActiveCreditRef =
    useRef<string | null>(null);

  const lastPlayRequestRef =
    useRef(playRequest);

  const lastTransportRequestRef =
    useRef(transportRequest);

  const transitionTokenRef =
    useRef(0);

  const nearEndFadingRef =
    useRef(false);

  const internalNavigationRef =
    useRef<{
      id: string;
      autoplay: boolean;
    } | null>(null);

  const pendingStartRef =
    useRef<{
      token: number;
      autoplay: boolean;
    } | null>(null);

  const legacyDemoReelSrc =
    process.env
      .NEXT_PUBLIC_DEMO_REEL_URL ||
    "/video/sound/demo-reel.mp4";

  const initialCredit =
    reelCredits[0] ?? null;

  const [
    displayedCreditId,
    setDisplayedCreditId,
  ] = useState<string | null>(
    initialCredit?.id ?? null
  );

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const [
    currentTime,
    setCurrentTime,
  ] = useState(0);

  const [
    duration,
    setDuration,
  ] = useState(0);

  const [
    isFullscreen,
    setIsFullscreen,
  ] = useState(false);

  const [
    videoVisible,
    setVideoVisible,
  ] = useState(true);

  const displayedIndex =
    displayedCreditId
      ? reelCredits.findIndex(
          (credit) =>
            credit.id ===
            displayedCreditId
        )
      : -1;

  const currentIndex =
    displayedIndex >= 0
      ? displayedIndex
      : 0;

  const currentCredit =
    reelCredits[currentIndex] ??
    null;

  const currentSrc =
    currentCredit?.reel.src ??
    legacyDemoReelSrc;

  const previousCredit =
    currentIndex > 0
      ? reelCredits[
          currentIndex - 1
        ]
      : null;

  const nextCredit =
    currentIndex <
    reelCredits.length - 1
      ? reelCredits[
          currentIndex + 1
        ]
      : null;

  const {
    registerMediaElement,
    resumeAudio,
  } = useAudioEngine();

  /* ==========================================
     AUDIO FADE
     ========================================== */

  const fadeVolume =
      useCallback(
        (
          video: HTMLVideoElement,
          targetVolume: number,
          durationMs: number
        ) => {
          if (
            volumeFrameRef.current !==
            null
          ) {
            cancelAnimationFrame(
              volumeFrameRef.current
            );

            volumeFrameRef.current =
              null;
          }

          const startVolume =
            Math.min(
              1,
              Math.max(
                0,
                video.volume
              )
            );

          const safeTargetVolume =
            Math.min(
              1,
              Math.max(
                0,
                targetVolume
              )
            );

          const startTime =
            performance.now();

          const tick = (
            now: number
          ) => {
            const progress =
              Math.min(
                1,
                Math.max(
                  0,
                  (now - startTime) /
                    durationMs
                )
              );

            const nextVolume =
              startVolume +
              (safeTargetVolume -
                startVolume) *
                progress;

            /*
            * HTMLMediaElement.volume
            * MUST stay between 0 and 1.
            */
            video.volume =
              Math.min(
                1,
                Math.max(
                  0,
                  nextVolume
                )
              );

            if (progress < 1) {
              volumeFrameRef.current =
                requestAnimationFrame(
                  tick
                );
            } else {
              video.volume =
                safeTargetVolume;

              volumeFrameRef.current =
                null;
            }
          };

          volumeFrameRef.current =
            requestAnimationFrame(
              tick
            );
        },
        []
  );

  useEffect(() => {
    return () => {
      if (
        volumeFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          volumeFrameRef.current
        );
      }
    };
  }, []);

  /* ==========================================
     FULLSCREEN STATE
     ========================================== */

  useEffect(() => {
    const handleFullscreenChange =
      () => {
        setIsFullscreen(
          document.fullscreenElement !==
            null
        );
      };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  /* ==========================================
     METADATA
     ========================================== */

  const syncVideoMetadata =
    useCallback(() => {
      const video =
        videoRef.current;

      if (!video) return;

      if (
        Number.isFinite(
          video.duration
        ) &&
        video.duration > 0
      ) {
        setDuration(
          video.duration
        );
      }

      setCurrentTime(
        video.currentTime
      );
    }, []);

  /* ==========================================
     LOAD CURRENT SOURCE
     ========================================== */

  useEffect(() => {
    const video =
      videoRef.current;

    if (!video) return;

    video.load();
  }, [currentSrc]);

  /* ==========================================
     PRELOAD NEXT CLIP
     ========================================== */

  useEffect(() => {
    if (!nextCredit) {
      return;
    }

    const preloadVideo =
      document.createElement(
        "video"
      );

    preloadVideo.preload =
      "auto";

    preloadVideo.crossOrigin =
      "anonymous";

    preloadVideo.src =
      nextCredit.reel.src;

    preloadVideo.load();

    return () => {
      preloadVideo.removeAttribute(
        "src"
      );

      preloadVideo.load();
    };
  }, [nextCredit]);

  /* ==========================================
     TRANSITION TO ANOTHER CLIP
     ========================================== */

  const transitionToCredit =
    useCallback(
      async (
        creditId: string,
        autoplay: boolean
      ) => {
        const target =
          reelCredits.find(
            (credit) =>
              credit.id ===
              creditId
          );

        if (!target) return;

        const video =
          videoRef.current;

        const token =
          ++transitionTokenRef.current;

        /*
         * Fade the current picture and
         * audio before changing source.
         *
         * If the clip already ended,
         * it has already been faded by
         * the near-end transition.
         */
        if (
          video &&
          !video.ended
        ) {
          setVideoVisible(false);

          fadeVolume(
            video,
            0,
            140
          );

          await wait(140);

          if (
            token !==
            transitionTokenRef.current
          ) {
            return;
          }
        } else {
          setVideoVisible(false);
        }

        if (video) {
          video.pause();
        }

        setIsPlaying(false);

        onPlayingChange(false);

        setCurrentTime(0);
        setDuration(0);

        nearEndFadingRef.current =
          false;

        pendingStartRef.current = {
          token,
          autoplay,
        };

        /*
         * Clicking the same credit
         * again restarts that clip.
         */
        if (
          displayedCreditId ===
          target.id
        ) {
          if (video) {
            video.currentTime = 0;
            video.load();
          }

          return;
        }

        setDisplayedCreditId(
          target.id
        );
      },
      [
        displayedCreditId,
        fadeVolume,
        onPlayingChange,
      ]
    );

  /* ==========================================
     RESPOND TO CREDIT SELECTION
     ========================================== */

  useEffect(() => {
    if (!activeCreditId) {
      return;
    }

    const exists =
      reelCredits.some(
        (credit) =>
          credit.id ===
          activeCreditId
      );

    if (!exists) {
      return;
    }

    const activeChanged =
      lastActiveCreditRef.current !==
      activeCreditId;

    const playRequested =
      lastPlayRequestRef.current !==
      playRequest;

    lastActiveCreditRef.current =
      activeCreditId;

    lastPlayRequestRef.current =
      playRequest;

    const internalRequest =
      internalNavigationRef.current;

    let autoplay =
      playRequested;

    if (
      internalRequest &&
      internalRequest.id ===
        activeCreditId
    ) {
      autoplay =
        internalRequest.autoplay;

      internalNavigationRef.current =
        null;
    }

    if (
      !activeChanged &&
      !playRequested &&
      !internalRequest
    ) {
      return;
    }

    void transitionToCredit(
      activeCreditId,
      autoplay
    );
  }, [
    activeCreditId,
    playRequest,
    transitionToCredit,
  ]);

  /* ==========================================
     START NEW CLIP ON CAN PLAY
     ========================================== */

  const handleCanPlay =
    useCallback(async () => {
      const video =
        videoRef.current;

      if (!video) return;

      syncVideoMetadata();

      const pending =
        pendingStartRef.current;

      if (!pending) {
        video.volume = 1;
        setVideoVisible(true);

        return;
      }

      if (
        pending.token !==
        transitionTokenRef.current
      ) {
        return;
      }

      pendingStartRef.current =
        null;

      video.currentTime = 0;

      if (!pending.autoplay) {
        video.pause();
        video.volume = 1;

        setIsPlaying(false);
        onPlayingChange(false);

        requestAnimationFrame(
          () => {
            setVideoVisible(true);
          }
        );

        return;
      }

      registerMediaElement(
        video
      );

      await resumeAudio();

      video.volume = 0;

      requestAnimationFrame(
        () => {
          setVideoVisible(true);
        }
      );

      try {
        await video.play();

        fadeVolume(
          video,
          1,
          170
        );
      } catch {
        video.volume = 1;

        setIsPlaying(false);
        onPlayingChange(false);

        setVideoVisible(true);
      }
    }, [
      fadeVolume,
      onPlayingChange,
      registerMediaElement,
      resumeAudio,
      syncVideoMetadata,
    ]);

  /* ==========================================
     PLAY / PAUSE
     ========================================== */

  const togglePlay =
    useCallback(async () => {
      const video =
        videoRef.current;

      if (!video) return;

      if (
        pendingStartRef.current
      ) {
        return;
      }

      if (video.paused) {
        /*
         * First interaction:
         * highlight clip 01.
         */
        if (
          currentCredit &&
          activeCreditId !==
            currentCredit.id
        ) {
          lastActiveCreditRef.current =
            currentCredit.id;

          onActiveCreditChange(
            currentCredit.id
          );
        }

        if (video.ended) {
          video.currentTime = 0;
        }

        nearEndFadingRef.current =
          false;

        registerMediaElement(
          video
        );

        await resumeAudio();

        video.volume = 0;
        setVideoVisible(true);

        try {
          await video.play();

          fadeVolume(
            video,
            1,
            150
          );
        } catch {
          video.volume = 1;

          setIsPlaying(false);
          onPlayingChange(false);
        }
      } else {
        video.pause();
      }
    }, [
      activeCreditId,
      currentCredit,
      fadeVolume,
      onActiveCreditChange,
      onPlayingChange,
      registerMediaElement,
      resumeAudio,
    ]);

  /* ==========================================
     MASTER PLAY / PAUSE BUTTON
     ========================================== */

  useEffect(() => {
    if (
      lastTransportRequestRef.current ===
      transportRequest
    ) {
      return;
    }

    lastTransportRequestRef.current =
      transportRequest;

    void togglePlay();
  }, [
    transportRequest,
    togglePlay,
  ]);

  /* ==========================================
     SMOOTH PROGRESS + END FADE
     ========================================== */

  useEffect(() => {
    const video =
      videoRef.current;

    if (!video) return;

    const updateProgress =
      () => {
        setCurrentTime(
          video.currentTime
        );

        if (
          Number.isFinite(
            video.duration
          ) &&
          video.duration > 0 &&
          !video.paused &&
          !video.ended
        ) {
          const remaining =
            video.duration -
            video.currentTime;

          /*
           * Very short fade before the
           * next reel replaces this one.
           */
          if (
            remaining <= 0.18 &&
            remaining > 0 &&
            !nearEndFadingRef.current
          ) {
            nearEndFadingRef.current =
              true;

            setVideoVisible(false);

            fadeVolume(
              video,
              0,
              Math.max(
                80,
                remaining * 1000
              )
            );
          }

          if (
            remaining > 0.3 &&
            nearEndFadingRef.current
          ) {
            nearEndFadingRef.current =
              false;

            setVideoVisible(true);

            fadeVolume(
              video,
              1,
              80
            );
          }
        }

        if (
          !video.paused &&
          !video.ended
        ) {
          progressFrameRef.current =
            requestAnimationFrame(
              updateProgress
            );
        }
      };

    if (isPlaying) {
      progressFrameRef.current =
        requestAnimationFrame(
          updateProgress
        );
    } else {
      setCurrentTime(
        video.currentTime
      );
    }

    return () => {
      if (
        progressFrameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          progressFrameRef.current
        );

        progressFrameRef.current =
          null;
      }
    };
  }, [
    fadeVolume,
    isPlaying,
  ]);

  /* ==========================================
     REEL NAVIGATION
     ========================================== */

  const requestCreditChange = (
    credit: ReelCredit,
    autoplay: boolean
  ) => {
    internalNavigationRef.current = {
      id: credit.id,
      autoplay,
    };

    onActiveCreditChange(
      credit.id
    );
  };

  const handlePrevious = () => {
    if (!previousCredit) return;

    requestCreditChange(
      previousCredit,
      true
    );
  };

  const handleNext = () => {
    if (!nextCredit) return;

    requestCreditChange(
      nextCredit,
      true
    );
  };

  /* ==========================================
     AUTO ADVANCE
     ========================================== */

  const handleEnded = () => {
    setIsPlaying(false);
    onPlayingChange(false);

    setCurrentTime(0);

    /*
     * Normal clip:
     * continue automatically.
     */
    if (nextCredit) {
      requestCreditChange(
        nextCredit,
        true
      );

      return;
    }

    /*
     * Last reel:
     * return to clip 01,
     * load its first frame,
     * but leave it paused.
     */
    const firstCredit =
      reelCredits[0];

    if (firstCredit) {
      requestCreditChange(
        firstCredit,
        false
      );

      return;
    }

    syncVideoMetadata();
  };

  /* ==========================================
     FULLSCREEN
     ========================================== */

  const toggleFullscreen =
    async () => {
      const frame =
        frameRef.current;

      const video =
        videoRef.current;

      if (
        !frame ||
        !video
      ) {
        return;
      }

      if (
        document.fullscreenElement
      ) {
        await document.exitFullscreen();

        return;
      }

      if (
        frame.requestFullscreen
      ) {
        await frame.requestFullscreen();

        return;
      }

      const iosVideo =
        video as HTMLVideoElement & {
          webkitEnterFullscreen?: () => void;
        };

      iosVideo.webkitEnterFullscreen?.();
    };

  /* ==========================================
     DISPLAY
     ========================================== */

  const reelNumber =
    currentCredit
      ? currentIndex + 1
      : 1;

  const reelTotal =
    reelCredits.length > 0
      ? reelCredits.length
      : 1;

  const progress =
    duration > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (currentTime /
              duration) *
              100
          )
        )
      : 0;

  return (
    <div className="w-full min-w-0">
      <div
        ref={frameRef}
        className={
          embedded
            ? "relative aspect-video w-full overflow-hidden bg-black"
            : "retro-media-frame relative aspect-video w-full"
        }
      >
        <video
          ref={videoRef}
          crossOrigin="anonymous"
          src={currentSrc}
          preload="auto"
          playsInline
          className={`absolute inset-0 h-full w-full cursor-pointer object-contain transition-opacity duration-150 ease-out ${
            videoVisible
              ? "opacity-100"
              : "opacity-0"
          }`}
          onLoadedMetadata={
            syncVideoMetadata
          }
          onLoadedData={
            syncVideoMetadata
          }
          onDurationChange={
            syncVideoMetadata
          }
          onCanPlay={
            handleCanPlay
          }
          onTimeUpdate={(
            event
          ) => {
            setCurrentTime(
              event.currentTarget
                .currentTime
            );
          }}
          onPlay={() => {
            setIsPlaying(true);
            onPlayingChange(true);

            syncVideoMetadata();
          }}
          onPause={() => {
            setIsPlaying(false);
            onPlayingChange(false);

            syncVideoMetadata();
          }}
          onEnded={
            handleEnded
          }
          onClick={
            togglePlay
          }
        />

        {/* Reel counter */}
        <div className="pointer-events-none absolute left-3 top-3 z-20">
          <span className="font-retro bg-black/60 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-white">
            JG / Reel{" "}
            {String(
              reelNumber
            ).padStart(
              2,
              "0"
            )}{" "}
            /{" "}
            {String(
              reelTotal
            ).padStart(
              2,
              "0"
            )}
          </span>
        </div>

        {/* Project title + roles */}
        {currentCredit && (
          <div className="pointer-events-none absolute bottom-7 left-3 z-20 flex max-w-[75%] flex-col items-start gap-1">
            {/* Title */}
            <span className="font-retro bg-black/60 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
              {currentCredit.title}
            </span>

            {/* Roles */}
            <span className="font-retro bg-black/60 px-2 py-1 text-[8px] leading-relaxed tracking-[0.06em] text-white md:text-[9px]">
              {currentCredit.roles
                .map((role) => roles[role])
                .join(" · ")}
            </span>
          </div>
        )}

        {/* Previous — completely absent on reel 01 */}
        {previousCredit && (
          <button
            type="button"
            onClick={
              handlePrevious
            }
            aria-label={
              navigation.previous
            }
            className="absolute cursor-pointer left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/60 bg-black/35 text-white opacity-70 backdrop-blur-[2px] transition-all hover:bg-black/65 hover:opacity-100"
          >
            <ArrowIcon
              name="left"
              className="h-3.5 w-3.5"
            />
          </button>
        )}

        {/* Next — absent on final reel */}
        {nextCredit && (
          <button
            type="button"
            onClick={
              handleNext
            }
            aria-label={
              navigation.next
            }
            className="absolute cursor-pointer right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-white/60 bg-black/35 text-white opacity-70 backdrop-blur-[2px] transition-all hover:bg-black/65 hover:opacity-100"
          >
            <ArrowIcon
              name="right"
              className="h-3.5 w-3.5"
            />
          </button>
        )}

        {/* Fullscreen */}
        <button
          type="button"
          onClick={() => {
            void toggleFullscreen();
          }}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center border border-white/70 bg-black/40 text-white transition-colors hover:bg-black/65"
          aria-label={
            isFullscreen
              ? t.exitFullscreen
              : t.fullscreen
          }
        >
          {isFullscreen ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 fill-none stroke-current"
              strokeWidth="2"
            >
              <path d="M9 3v6H3" />
              <path d="M15 3v6h6" />
              <path d="M9 21v-6H3" />
              <path d="M15 21v-6h6" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 fill-none stroke-current"
              strokeWidth="2"
            >
              <path d="M3 9V3h6" />
              <path d="M15 3h6v6" />
              <path d="M3 15v6h6" />
              <path d="M21 15v6h-6" />
            </svg>
          )}
        </button>

        {/* Clip progress */}
        <div
          className="pointer-events-none absolute bottom-3 left-3 right-3 z-20 h-[2px] overflow-hidden bg-white/25"
          aria-hidden="true"
        >
          <div
            className="h-full bg-white"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {!embedded && (
        <div className="font-retro mt-2 flex justify-between text-[9px] uppercase tracking-[0.1em] opacity-35">
          <span>
            Stereo / 48 kHz
          </span>

          <span>
            {t.technicalLabel}
          </span>
        </div>
      )}
    </div>
  );
}