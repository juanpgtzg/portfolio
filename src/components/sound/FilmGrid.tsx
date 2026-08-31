import FilmCard from "@/components/sound/FilmCard";
import { films } from "@/data/films";
import AdditionalCredits from "@/components/sound/AdditionalCredits";

export default function FilmGrid() {
  return (
    <section className="w-full max-w-full min-w-0 overflow-hidden">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <span className="retro-tag retro-tag-sage">
            Production Sound / 02
          </span>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Selected Film Work
          </h2>
        </div>

        <span className="retro-label opacity-35">
          {films.length} Featured Credits
        </span>
      </div>

      <div className="retro-scroll-hidden flex w-full max-w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [contain:inline-size] md:gap-6">
        {films.map((film) => (
          <div
            key={film.id}
            className="w-[64vw] max-w-[240px] shrink-0 snap-start md:w-[210px] md:max-w-none lg:w-[220px]"
          >
            <FilmCard film={film} />
          </div>
        ))}
      </div>

      <AdditionalCredits />
    </section>
  );
}