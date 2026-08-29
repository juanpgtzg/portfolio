"use client";

import { useEffect, useRef, useState } from "react";
import { podcast } from "@/data/podcast";
import { useAudioEngine } from "@/components/audio/AudioProvider";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

export default function PodcastTrailer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    registerMediaElement,
    resumeAudio,
  } = useAudioEngine();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      registerMediaElement(audio);

      await resumeAudio();

      await audio.play();
    } else {
      audio.pause();
    }
  };

  const handleSeek = (value: number) => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = value;
    setCurrentTime(value);
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="w-full">
      <audio
        ref={audioRef}
        src={podcast.trailer}
        preload="metadata"
      />

      <div className="mb-2 flex items-center justify-between">
        <span className="retro-label opacity-40">
          Audio / Trailer
        </span>

        <span className="font-retro text-[9px] uppercase tracking-[0.08em] opacity-30">
          MP3
        </span>
      </div>

      <div className="grid grid-cols-[52px_1fr_auto] border border-[var(--line)] bg-[var(--paper-light)]">
        <button
          type="button"
          onClick={togglePlay}
          className="font-retro flex h-12 items-center justify-center border-r border-[var(--line)] text-xs transition-colors hover:bg-[var(--lilac)]"
          aria-label={
            isPlaying
              ? "Pause Villam trailer"
              : "Play Villam trailer"
          }
        >
          {isPlaying ? "Ⅱ" : "▶"}
        </button>

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
            aria-label="Trailer playback position"
          />
        </div>

        <div className="font-retro flex h-12 items-center border-l border-[var(--line)] px-4 text-[10px] tabular-nums">
          {formatTime(currentTime)}

          <span className="mx-1 opacity-30">
            /
          </span>

          <span className="opacity-50">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}