import PodcastFeature from "@/components/podcast/PodcastFeature";

export default function PodcastPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
      <header className="mb-20">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] opacity-50">
          Portfolio
        </p>

        <h1 className="text-5xl font-medium tracking-tight md:text-7xl">
          Podcast
        </h1>
      </header>

      <PodcastFeature />
    </main>
  );
}