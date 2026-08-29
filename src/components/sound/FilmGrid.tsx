import FilmCard from "@/components/sound/FilmCard";
import { films } from "@/data/films";
import AdditionalCredits from "@/components/sound/AdditionalCredits";

export default function FilmGrid() {
  return (
    <section>
      <div className="mb-6">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] opacity-50">
          Production Sound
        </p>

        <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
          Selected Film Work
        </h2>
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