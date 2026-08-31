import GrainVisualizer from "@/components/audio/GrainVisualizer";
import PodcastFeature from "@/components/podcast/PodcastFeature";
import ProjectCTA from "@/components/shared/ProjectCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast Producer & Audio Editor",

  description:
    "Podcast production, editing, content development, original music, recording, and audio post-production by Juan Gutierrez in Vancouver.",

  alternates: {
    canonical: "/podcast",
  },

  openGraph: {
    title: "Podcast Producer & Audio Editor | Sound by Juan",
    description:
      "Podcast production, editing, content strategy, recording, and audio post-production by Juan Gutierrez.",
    url: "/podcast",
  },
};

export default function PodcastPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">
      {/* Page intro */}
      <section className="grid items-end gap-4 md:grid-cols-2 md:gap-8">
        <div className="relative">
          <span className="retro-tag retro-tag-pink">
            SIDE B
          </span>

          <h1 className="relative z-10 mt-3 text-4xl font-bold tracking-tight md:mt-4 md:text-7xl">
            Podcast
          </h1>

          {/* Mobile grains overlapping title */}
          <div className="md:hidden">
            <GrainVisualizer mobileOverlay />
          </div>
        </div>

        {/* Desktop grain visualizer */}
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