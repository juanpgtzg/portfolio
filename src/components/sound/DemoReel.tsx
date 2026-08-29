"use client";

import { useRef, useState } from "react";
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

  const {
    registerMediaElement,
    resumeAudio,
  } = useAudioEngine();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

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
    <div className="w-full">
      {/* Video */}
      <div className="retro-media-frame relative aspect-video">
        <video
          ref={videoRef}
          src="/video/sound/demo-reel.mp4"
          preload="metadata"
          playsInline
          className="h-full w-full object-contain"
          onTimeUpdate={(event) =>
            setCurrentTime(event.currentTarget.currentTime)
          }
          onLoadedMetadata={(event) =>
            setDuration(event.currentTarget.duration)
          }
          onDurationChange={(event) =>
            setDuration(event.currentTarget.duration)
          }
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
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
      </div>

      {/* Retro transport controls */}
      <div className="mt-2 grid grid-cols-[52px_1fr_auto_54px] border border-[var(--line)] bg-[var(--paper-light)]">

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
        <div className="flex min-w-0 items-center px-4">
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            onChange={(event) =>
              handleSeek(Number(event.target.value))
            }
            className="w-full"
            aria-label="Demo reel playback position"
          />
        </div>

        {/* Time */}
        <div className="font-retro flex h-11 items-center border-l border-[var(--line)] px-4 text-[10px] tabular-nums">
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