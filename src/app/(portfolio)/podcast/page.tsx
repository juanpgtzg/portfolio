import PodcastFeature from "@/components/podcast/PodcastFeature";
import PodcastTrailer from "@/components/podcast/PodcastTrailer";
import GrainVisualizer from "@/components/audio/GrainVisualizer";

export default function PodcastPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-12">
      <section className="grid items-end gap-8 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] opacity-50">
            Portfolio
          </p>

          <h1 className="text-5xl font-medium tracking-tight md:text-7xl">
            Podcast
          </h1>
        </div>

        <div className="hidden md:block">
          <GrainVisualizer />
        </div>
      </section>

      <div className="my-8 border-t border-black/10" />

      <PodcastTrailer />

      <PodcastFeature />
    </main>
  );
}