import FilmCard from "@/components/sound/FilmCard";
import { films } from "@/data/films";
import AdditionalCredits from "@/components/sound/AdditionalCredits";

export default function FilmGrid() {
  return (
    <section className="min-w-0">
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
          {films.length} Featured Credits
        </span>
      </div>

      <div className="retro-scroll-hidden flex w-full max-w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [contain:inline-size] md:grid md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] md:gap-x-6 md:gap-y-10 md:overflow-visible md:pb-0 md:snap-none md:[contain:none]">
        {films.map((film) => (
          <div
            key={film.id}
            className="w-[64vw] max-w-[240px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink"
          >
            <FilmCard film={film} />
          </div>
        ))}
      </div>

      <AdditionalCredits />
      
    </section>
  );
}