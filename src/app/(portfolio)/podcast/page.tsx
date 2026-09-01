import type { Metadata } from "next";

import PodcastIntro from "@/components/podcast/PodcastIntro";
import PodcastFeature from "@/components/podcast/PodcastFeature";
import PodcastProjectCTA from "@/components/podcast/PodcastProjectCTA";

export const metadata: Metadata = {
  title: "Podcast Producer & Audio Editor",

  description:
    "Podcast production, editing, content development, original music, recording, and audio post-production by Juan Gutierrez in Vancouver.",

  alternates: {
    canonical: "/podcast",
  },

  openGraph: {
    title:
      "Podcast Producer & Audio Editor | Sound by Juan",

    description:
      "Podcast production, editing, content strategy, recording, and audio post-production by Juan Gutierrez.",

    url: "/podcast",
  },
};

export default function PodcastPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-10">
      <PodcastIntro />

      <PodcastFeature />

      <PodcastProjectCTA />
    </main>
  );
}