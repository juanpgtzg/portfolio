import FilmCard from "@/components/sound/FilmCard";
import { films } from "@/data/films";
import AdditionalCredits from "@/components/sound/AdditionalCredits";

export default function FilmGrid() {
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="retro-tag retro-tag-sage">
            Production Sound / 02
          </span>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Selected Film Work
          </h2>
        </div>

        <span className="retro-label opacity-35">
          5 Featured Credits
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-7 lg:grid-cols-5">
        {films.map((film) => (
          <FilmCard
            key={film.id}
            film={film}
          />
        ))}
      </div>

      <AdditionalCredits />
      
    </section>
  );
}