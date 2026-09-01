"use client";

import GrainVisualizer from "@/components/audio/GrainVisualizer";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function PodcastIntro() {
  const { language } = useLanguage();
  const t = translations[language].podcast;

  return (
    <>
      <section className="grid items-end gap-4 md:grid-cols-2 md:gap-8">
        <div className="relative">
          <span className="retro-tag retro-tag-pink">
            {t.sideLabel}
          </span>

          <h1 className="relative z-10 mt-3 text-4xl font-bold tracking-tight md:mt-4 md:text-7xl">
            {t.title}
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
    </>
  );
}