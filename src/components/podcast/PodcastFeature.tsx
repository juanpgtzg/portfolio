import Image from "next/image";
import { podcast } from "@/data/podcast";
import PodcastTrailer from "@/components/podcast/PodcastTrailer";

export default function PodcastFeature() {
  return (
    <section>
      {/* Case study header */}
      <div className="mb-4 grid items-end gap-4 lg:mb-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* Villam information */}
        <div>
            <span className="retro-tag retro-tag-sage">
            Production Notes / 01
            </span>

            <h2 className="mt-3 text-3xl font-bold md:mt-4 md:text-4xl">
            {podcast.title}
            </h2>

            <p className="mt-1 text-sm opacity-55">
            {podcast.subtitle}
            </p>

            <p className="retro-label mt-2 opacity-35 md:mt-3">
            {podcast.episodes} Episodes / Villam
            </p>
        </div>

        {/* Trailer */}
        <PodcastTrailer />
        </div>

      {/* Main dossier */}
      <div className="grid border border-[var(--line)] bg-[var(--paper-light)] lg:grid-cols-[0.8fr_1.15fr_1fr]">

        {/* Artwork */}
        <div className="border-b border-[var(--line)] p-2.5 md:p-3 lg:border-b-0 lg:border-r">
          <div className="relative aspect-square overflow-hidden border border-[var(--line)]">
            <Image
              src={podcast.artwork}
              alt={`${podcast.title} artwork`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 30vw"
            />
          </div>

          {/* Listening links */}
          <div className="mt-3 grid grid-cols-2 border border-[var(--line)]">
            <a
              href={podcast.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="font-retro flex min-h-9 items-center justify-center border-r border-[var(--line)] text-[9px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-[var(--sage)] md:min-h-10 md:text-[10px]"
            >
              Spotify ↗
            </a>

            <a
              href={podcast.apple}
              target="_blank"
              rel="noopener noreferrer"
              className="font-retro flex min-h-9 items-center justify-center border-r border-[var(--line)] text-[9px] font-bold uppercase tracking-[0.08em] transition-colors hover:bg-[var(--sage)] md:min-h-10 md:text-[10px]"
            >
              Apple ↗
            </a>
          </div>
        </div>

        {/* Role / description */}
        <div className="border-b border-[var(--line)] lg:border-b-0 lg:border-r">
          <div className="border-b border-[var(--line)] p-5">
            <p className="retro-label mb-4 opacity-45">
              My Role
            </p>

            <div className="space-y-1">
              {podcast.roles.map((role, index) => (
                <div
                  key={role}
                  className="flex items-baseline gap-3"
                >
                  <span className="font-retro text-[9px] opacity-30">
                    0{index + 1}
                  </span>

                  <p className="font-retro text-sm font-bold">
                    {role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5">
            <p className="retro-label mb-4 opacity-45">
              Project
            </p>

            <div className="space-y-4 text-sm leading-relaxed opacity-70">
              <p>{podcast.description}</p>
              <p>{podcast.community}</p>
            </div>
          </div>

          <div className="border-t border-[var(--line)] p-4">
            <p className="font-retro text-[10px] uppercase leading-relaxed tracking-[0.06em] opacity-45">
              {podcast.services.join(" / ")}
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div>
          <div className="border-b border-[var(--line)] bg-[var(--lilac)] px-5 py-3">
            <p className="retro-label">
              Highlights
            </p>
          </div>

          <div>
            {podcast.highlights.map((highlight, index) => (
              <div
                key={highlight}
                className="grid grid-cols-[42px_1fr] border-b border-[var(--line)] last:border-b-0"
              >
                <div className="font-retro flex items-start justify-center border-r border-[var(--line)] pt-4 text-lg font-bold opacity-45">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <p className="p-4 text-sm leading-relaxed">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}