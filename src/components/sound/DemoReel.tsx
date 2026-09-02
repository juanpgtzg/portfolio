"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useAudioEngine } from "@/components/audio/AudioProvider";
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

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const frameRef =
    useRef<HTMLDivElement>(null);

  const progressFrameRef =
    useRef<number | null>(null);

  const lastActiveCreditRef =
    useRef<string | null>(null);

  const lastPlayRequestRef =
    useRef(0);

  const lastTransportRequestRef =
    useRef(transportRequest);

  const legacyDemoReelSrc =
    process.env
      .NEXT_PUBLIC_DEMO_REEL_URL ||
    "/video/sound/demo-reel.mp4";

  const selectedIndex =
    activeCreditId
      ? reelCredits.findIndex(
          (credit) =>
            credit.id ===
            activeCreditId
        )
      : -1;

  const currentIndex =
    selectedIndex >= 0
      ? selectedIndex
      : 0;

  const currentCredit =
    reelCredits[currentIndex] ??
    null;

  const currentSrc =
    currentCredit?.reel.src ??
    legacyDemoReelSrc;

  const {
    registerMediaElement,
    resumeAudio,
  } = useAudioEngine();

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
     LOAD SELECTED CREDIT
     ========================================== */

  useEffect(() => {
    if (
      !activeCreditId ||
      !currentCredit
    ) {
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

    if (
      !activeChanged &&
      !playRequested
    ) {
      return;
    }

    const video =
      videoRef.current;

    if (!video) return;

    let cancelled = false;

    const startSelectedClip =
      async () => {
        video.pause();

        setIsPlaying(false);
        onPlayingChange(false);

        setCurrentTime(0);
        setDuration(0);

        video.load();

        registerMediaElement(
          video
        );

        await resumeAudio();

        try {
          await video.play();
        } catch {
          if (!cancelled) {
            setIsPlaying(false);
            onPlayingChange(false);
          }
        }
      };

    void startSelectedClip();

    return () => {
      cancelled = true;
    };
  }, [
    activeCreditId,
    currentCredit,
    currentSrc,
    onPlayingChange,
    playRequest,
    registerMediaElement,
    resumeAudio,
  ]);

  /* ==========================================
     PLAY / PAUSE
     ========================================== */

  const togglePlay =
    useCallback(async () => {
      const video =
        videoRef.current;

      if (!video) return;

      if (video.paused) {
        if (
          currentCredit &&
          activeCreditId !==
            currentCredit.id
        ) {
          lastActiveCreditRef.current =
            currentCredit.id;

          lastPlayRequestRef.current =
            playRequest;

          onActiveCreditChange(
            currentCredit.id
          );
        }

        if (video.ended) {
          video.currentTime = 0;
        }

        registerMediaElement(
          video
        );

        await resumeAudio();

        try {
          await video.play();
        } catch {
          setIsPlaying(false);
          onPlayingChange(false);
        }
      } else {
        video.pause();
      }
    }, [
      activeCreditId,
      currentCredit,
      onActiveCreditChange,
      onPlayingChange,
      playRequest,
      registerMediaElement,
      resumeAudio,
    ]);

  /* ==========================================
     MASTER CONSOLE PLAY BUTTON
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
     SMOOTH PROGRESS
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
  }, [isPlaying]);

  /* ==========================================
     AUTO ADVANCE
     ========================================== */

  const handleEnded = () => {
    if (
      currentCredit &&
      reelCredits.length > 0
    ) {
      const nextCredit =
        reelCredits[
          currentIndex + 1
        ];

      if (nextCredit) {
        setIsPlaying(false);
        onPlayingChange(false);

        setCurrentTime(0);

        onActiveCreditChange(
          nextCredit.id
        );

        return;
      }
    }

    setIsPlaying(false);
    onPlayingChange(false);

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
     DISPLAY VALUES
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
          preload="metadata"
          playsInline
          className="absolute inset-0 h-full w-full cursor-pointer object-contain"
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
            syncVideoMetadata
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
          onSeeking={
            syncVideoMetadata
          }
          onSeeked={
            syncVideoMetadata
          }
          onEnded={
            handleEnded
          }
          onClick={
            togglePlay
          }
        />

        {/* Reel index */}
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

        {/* Fullscreen */}
        <button
          type="button"
          onClick={(
            event
          ) => {
            event.stopPropagation();

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

      {/* Only show standalone footer outside the console */}
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