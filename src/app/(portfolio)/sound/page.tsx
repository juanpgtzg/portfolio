import type { Metadata } from "next";

import SoundIntro from "@/components/sound/SoundIntro";
import FilmGrid from "@/components/sound/FilmGrid";
import OnSetGallery from "@/components/sound/OnSetGallery";
import SoundProjectCTA from "@/components/sound/SoundProjectCTA";

import {
  getLanguageAlternates,
} from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Production Sound Mixer & Sound Designer",

  description:
    "Production sound, location recording, post-production audio, dialogue editing, sound design, Foley, ambiences, and mixing by Vancouver audio engineer Juan Gutierrez.",

  alternates: {
    canonical: "/sound",
    languages:
      getLanguageAlternates(
        "/sound"
      ),
  },

  openGraph: {
    title:
      "Production Sound Mixer & Sound Designer | Sound by Juan",

    description:
      "Explore production sound and post-production audio work by Vancouver-based audio engineer Juan Gutierrez.",

    url: "/sound",
  },
};

export default function SoundPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-6 md:px-10 md:py-10">
      <SoundIntro />

      <FilmGrid />

      <OnSetGallery />

      <SoundProjectCTA />
    </main>
  );
}