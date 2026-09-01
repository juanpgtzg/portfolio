"use client";

import FilmCard from "@/components/sound/FilmCard";
import { films } from "@/data/films";
import AdditionalCredits from "@/components/sound/AdditionalCredits";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function FilmGrid() {
  const { language } = useLanguage();
  const t = translations[language].sound.productionSound;

  return (
    <section className="w-full max-w-full min-w-0 overflow-hidden">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <span className="retro-tag retro-tag-sage">
            {t.tag}
          </span>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            {t.title}
          </h2>
        </div>

        <span className="retro-label opacity-35">
          {films.length} {t.featuredCredits}
        </span>
      </div>

      <div className="retro-scroll-hidden flex w-full max-w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [contain:inline-size] md:gap-6">
        {films.map((film) => (
          <div
            key={film.id}
            className="
              w-[calc((100%_-_1rem)/1.5)]
              shrink-0
              snap-start
              md:w-[calc((100%_-_4.5rem)/3.5)]
              lg:w-[calc((100%_-_6rem)/4.5)]
            "
          >
            <FilmCard film={film} />
          </div>
        ))}
      </div>

      <AdditionalCredits />
    </section>
  );
}