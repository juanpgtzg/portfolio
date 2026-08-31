"use client";

import { useEffect, useRef, useState } from "react";
import { useAudioEngine } from "@/components/audio/AudioProvider";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

export default function DemoReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const progressFrameRef = useRef<number | null>(null);

  const demoReelSrc =
    process.env.NEXT_PUBLIC_DEMO_REEL_URL ||
    "/video/sound/demo-reel.mp4";

  const {
    registerMediaElement,
    resumeAudio,
  } = useAudioEngine();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
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

  const togglePlay = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      // Connect the actual video to our Web Audio engine
      // during the user's interaction.
      registerMediaElement(video);

      // Make sure the AudioContext is active.
      await resumeAudio();

      await video.play();
    } else {
      video.pause();
    }
  };

  const toggleFullscreen = async () => {
    const frame = frameRef.current;
    const video = videoRef.current;

    if (!frame || !video) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    if (frame.requestFullscreen) {
      await frame.requestFullscreen();
      return;
    }

    // iPhone Safari fallback
    const iosVideo = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
    };

    iosVideo.webkitEnterFullscreen?.();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setCurrentTime(video.currentTime);

      if (!video.paused && !video.ended) {
        progressFrameRef.current =
          requestAnimationFrame(updateProgress);
      }
    };

    if (isPlaying) {
      progressFrameRef.current =
        requestAnimationFrame(updateProgress);
    } else {
      setCurrentTime(video.currentTime);
    }

    return () => {
      if (progressFrameRef.current !== null) {
        cancelAnimationFrame(progressFrameRef.current);
        progressFrameRef.current = null;
      }
    };
  }, [isPlaying]);

  const syncVideoMetadata = () => {
    const video = videoRef.current;
    if (!video) return;

    if (Number.isFinite(video.duration) && video.duration > 0) {
      setDuration(video.duration);
    }

    setCurrentTime(video.currentTime);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <div className="w-full min-w-0">
      {/* Video */}
      <div
        ref={frameRef}
        className="retro-media-frame relative aspect-video w-full"
      >
        <video
          ref={videoRef}
          src={demoReelSrc}
          preload="metadata"
          playsInline
          className="absolute inset-0 h-full w-full object-contain"

          onLoadedMetadata={syncVideoMetadata}
          onLoadedData={syncVideoMetadata}
          onDurationChange={syncVideoMetadata}
          onCanPlay={syncVideoMetadata}

          onTimeUpdate={(event) => {
            setCurrentTime(event.currentTarget.currentTime);
          }}

          onPlay={() => {
            setIsPlaying(true);
            syncVideoMetadata();
          }}

          onPause={() => {
            setIsPlaying(false);
            syncVideoMetadata();
          }}

          onSeeking={syncVideoMetadata}
          onSeeked={syncVideoMetadata}

          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}

          onClick={togglePlay}
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors hover:bg-black/25"
            aria-label="Play demo reel"
          >
            <span className="font-retro flex h-16 w-16 items-center justify-center border border-[var(--paper)] bg-black/20 text-xl text-[var(--paper)]">
              ▶
            </span>
          </button>
        )}

        {/* Tiny screen label */}
        <div className="pointer-events-none absolute left-3 top-3">
          <span className="font-retro bg-black/60 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-white">
            JG / Reel 01
          </span>
        </div>

        {/* Fullscreen button */}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            toggleFullscreen();
          }}
          className="absolute right-2 top-2 z-20 flex h-7 w-7 items-center justify-center border border-[var(--paper)] bg-black/40 text-[var(--paper)] transition-colors hover:bg-black/60 md:right-3 md:top-3 md:h-8 md:w-8"
          aria-label={
            isFullscreen
              ? "Exit fullscreen"
              : "View demo reel fullscreen"
          }
        >
          {isFullscreen ? (
            /* Exit fullscreen */
            <svg
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
            /* Enter fullscreen */
            <svg
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
      </div>

      {/* Retro transport controls */}
      <div className="mt-2 grid grid-cols-[44px_minmax(0,1fr)_44px] border border-[var(--line)] bg-[var(--paper-light)] md:grid-cols-[52px_minmax(0,1fr)_auto_54px]">

        {/* Play / Pause */}
        <button
          type="button"
          onClick={togglePlay}
          className="font-retro flex h-11 items-center justify-center border-r border-[var(--line)] text-xs transition-colors hover:bg-[var(--lilac)]"
          aria-label={isPlaying ? "Pause demo reel" : "Play demo reel"}
        >
          {isPlaying ? "Ⅱ" : "▶"}
        </button>

        {/* Timeline */}
        <div className="flex min-w-0 items-center px-3 md:px-4">
          <input
            type="range"
            min={0}
            max={duration > 0 ? duration : 1}
            step={0.01}
            value={Math.min(
              currentTime,
              duration > 0 ? duration : 1
            )}
            onChange={(event) =>
              handleSeek(Number(event.target.value))
            }
            className="w-full"
            aria-label="Demo reel playback position"
          />
        </div>

        {/* Time */}
        <div className="font-retro hidden h-11 items-center border-l border-[var(--line)] px-4 text-[10px] tabular-nums md:flex">
          {formatTime(currentTime)}
          <span className="mx-1 opacity-35">/</span>
          <span className="opacity-50">
            {formatTime(duration)}
          </span>
        </div>

        {/* Volume */}
        <button
          type="button"
          onClick={toggleMute}
          className="font-retro flex h-11 items-center justify-center border-l border-[var(--line)] text-[10px] transition-colors hover:bg-[var(--pink)]"
          aria-label={isMuted ? "Unmute demo reel" : "Mute demo reel"}
        >
          {isMuted ? "MUTE" : "VOL"}
        </button>
      </div>

      {/* Technical footer */}
      <div className="mt-2 flex justify-between font-retro text-[9px] uppercase tracking-[0.1em] opacity-35">
        <span>Stereo / 48 kHz</span>
        <span>Sound Design Reel</span>
      </div>
    </div>
  );
}