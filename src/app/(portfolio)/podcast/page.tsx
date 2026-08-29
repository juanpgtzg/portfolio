import GrainVisualizer from "@/components/audio/GrainVisualizer";
import PodcastFeature from "@/components/podcast/PodcastFeature";
import ProjectCTA from "@/components/shared/ProjectCTA";

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

      <ProjectCTA
        label="Work With Me"
        title="Need help bringing your podcast to life?"
        description="From developing the concept and shaping the content to recording, editing, original music, and final delivery, I can help build a podcast from the ground up or strengthen an existing one."
        buttonLabel="Get in Touch"
        note="Podcast production, editing, content strategy, and project estimates available upon request."
      />
    </main>
  );
}