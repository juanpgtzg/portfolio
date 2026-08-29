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
    <section className="border-y border-black/10 py-5">
      <audio
        ref={audioRef}
        src={podcast.trailer}
        preload="metadata"
      />

      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-black transition-colors hover:bg-black hover:text-white"
          aria-label={isPlaying ? "Pause trailer" : "Play trailer"}
        >
          {isPlaying ? "Ⅱ" : "▶"}
        </button>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] opacity-50">
                Listen
              </p>

              <p className="font-medium">
                Villam Podcast Trailer
              </p>
            </div>

            <p className="shrink-0 text-xs tabular-nums opacity-50">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={(event) =>
              handleSeek(Number(event.target.value))
            }
            className="w-full cursor-pointer accent-black"
            aria-label="Trailer playback position"
          />
        </div>
      </div>
    </section>
  );
}