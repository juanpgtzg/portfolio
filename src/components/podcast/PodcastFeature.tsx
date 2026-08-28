import Image from "next/image";
import { podcast } from "@/data/podcast";

export default function PodcastFeature() {
  return (
    <section>
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        {/* Artwork */}
        <div className="relative aspect-square overflow-hidden bg-black/5">
          <Image
            src={podcast.artwork}
            alt={`${podcast.title} artwork`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Podcast Information */}
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] opacity-50">
            Podcast Production
          </p>

          <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
            {podcast.title}
          </h2>

          <p className="mt-2 text-lg opacity-60">
            {podcast.subtitle}
          </p>

          {/* Roles */}
          <div className="mt-8">
            {podcast.roles.map((role) => (
              <p key={role} className="text-lg">
                {role}
              </p>
            ))}
          </div>

          {/* Services */}
          <p className="mt-8 text-sm leading-relaxed opacity-60">
            {podcast.services.join(" · ")}
          </p>

          {/* Episodes */}
          <p className="mt-3 text-sm opacity-60">
            {podcast.episodes} episodes
          </p>

          {/* Description */}
          <div className="mt-10 max-w-xl">
            <p className="leading-relaxed opacity-75">
              {podcast.description}
            </p>

            <p className="mt-4 leading-relaxed opacity-75">
              {podcast.community}
            </p>
          </div>

          {/* Links */}
          <div className="mt-10 flex flex-wrap gap-6 text-sm">
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
      </div>

      {/* Highlights */}
      <div className="mt-20 border-t border-black/10 pt-10">
        <p className="mb-8 text-sm uppercase tracking-[0.2em] opacity-50">
          Highlights
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {podcast.highlights.map((highlight) => (
            <p
              key={highlight}
              className="max-w-lg text-lg leading-relaxed"
            >
              {highlight}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}