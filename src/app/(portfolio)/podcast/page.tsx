import GrainVisualizer from "@/components/audio/GrainVisualizer";
import PodcastFeature from "@/components/podcast/PodcastFeature";

export default function PodcastPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">

      {/* Page intro */}
      <section className="grid items-end gap-8 md:grid-cols-2">
        <div>
          <span className="retro-tag retro-tag-pink">
            Portfolio / 02
          </span>

          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
            Podcast
          </h1>
        </div>

        <div className="hidden md:block">
          <GrainVisualizer />
        </div>
      </section>

      <hr className="retro-divider-strong my-7" />

      {/* Listening comes first */}

      <PodcastFeature />
    </main>
  );
}