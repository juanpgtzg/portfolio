import Image from "next/image";
import { podcast } from "@/data/podcast";

export default function PodcastFeature() {
  return (
    <section className="mt-8">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.2fr_1fr] lg:gap-10">

        {/* Artwork */}
        <div>
          <div className="relative aspect-square overflow-hidden bg-black/5">
            <Image
              src={podcast.artwork}
              alt={`${podcast.title} artwork`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 28vw"
            />
          </div>

          <div className="mt-4 flex gap-5 text-sm">
            <a
              href={podcast.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-opacity hover:opacity-50"
            >
              Spotify ↗
            </a>

            <a
              href={podcast.apple}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-opacity hover:opacity-50"
            >
              Apple Podcasts ↗
            </a>
          </div>
        </div>

        {/* Main Information */}
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] opacity-50">
            Podcast Production
          </p>

          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            {podcast.title}
          </h2>

          <p className="mt-1 opacity-60">
            {podcast.subtitle}
          </p>

          <div className="mt-5">
            {podcast.roles.map((role) => (
              <p key={role}>
                {role}
              </p>
            ))}
          </div>

          <p className="mt-5 text-sm leading-relaxed opacity-60">
            {podcast.services.join(" · ")}
          </p>

          <p className="mt-2 text-sm opacity-60">
            {podcast.episodes} episodes
          </p>

          <div className="mt-6 max-w-xl space-y-3 text-sm leading-relaxed opacity-75">
            <p>
              {podcast.description}
            </p>

            <p>
              {podcast.community}
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="border-t border-black/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="mb-5 text-xs uppercase tracking-[0.2em] opacity-50">
            Highlights
          </p>

          <div className="space-y-5">
            {podcast.highlights.map((highlight) => (
              <p
                key={highlight}
                className="text-sm leading-relaxed"
              >
                {highlight}
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}