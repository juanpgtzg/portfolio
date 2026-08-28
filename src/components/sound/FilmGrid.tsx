import FilmCard from "@/components/sound/FilmCard";
import { films } from "@/data/films";

export default function FilmGrid() {
  return (
    <section>
      <h2>Selected Production Sound Work</h2>

      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
        {films.map((film) => (
          <FilmCard
            key={film.id}
            film={film}
          />
        ))}
      </div>
    </section>
  );
}