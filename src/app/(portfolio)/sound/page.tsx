import DemoReel from "@/components/sound/DemoReel";
import FilmGrid from "@/components/sound/FilmGrid";
import GrainVisualizer from "@/components/audio/GrainVisualizer";
import ProjectCTA from "@/components/shared/ProjectCTA";
import OnSetGallery from "@/components/sound/OnSetGallery";
import PostProductionCredits from "@/components/sound/PostProductionCredits";

export default function SoundPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-6 md:px-10 md:py-10">

      {/* =====================================================
          PAGE INTRO
          ===================================================== */}

      <section className="grid items-end gap-8 md:grid-cols-2">
        <div>
          <span className="retro-tag retro-tag-pink">
            Portfolio / 01
          </span>

          <h1 className="mt-3 text-4xl font-bold tracking-tight md:mt-4 md:text-7xl">
            Sound
          </h1>
        </div>

        {/* Audio-reactive grains */}
        <div className="hidden md:block">
          <GrainVisualizer />
        </div>
      </section>

      <hr className="retro-divider-strong my-5 md:my-7" />

      {/* =====================================================
          SOUND DESIGN
          ===================================================== */}

      <section className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 md:grid-cols-[0.9fr_1.25fr] md:items-stretch md:gap-10">

        {/* Information */}
        <div className="contents md:flex md:min-h-0 md:flex-col md:overflow-hidden md:[contain:size]">

          <div className="order-1 md:order-none">
            <span className="retro-tag retro-tag-lilac">
              Sound Design
            </span>

            <h2 className="mt-4 text-3xl font-bold">
              Demo Reel
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-relaxed opacity-70">
              A selection of sound design work across dialogue,
              sound effects, Foley, ambience and mixing.
            </p>
          </div>

          <div className="order-3 min-h-0 md:order-none md:flex md:flex-1 md:flex-col md:overflow-hidden">
            <PostProductionCredits />
          </div>

          <div className="order-4 mt-6 border-t border-[var(--line-light)] pt-4 md:order-none md:mt-auto">
            <p className="font-retro max-w-none whitespace-nowrap text-[8px] uppercase tracking-[0.02em] opacity-55 sm:text-[9px] md:text-[10px] md:tracking-[0.04em]">
              Sound Design / Dialogue / SFX / Foley / Ambiences / Mixing
            </p>
          </div>

        </div>

        {/* Reel */}
        <div className="order-2 min-w-0 w-full md:order-none">
          <DemoReel />
        </div>

      </section>

      <hr className="retro-divider-strong my-8" />

      {/* =====================================================
          PRODUCTION SOUND
          ===================================================== */}

      <FilmGrid />

      <OnSetGallery />

      <ProjectCTA
        label="Work With Me"
        title="Need a sound guy for your production?"
        description="I’ve worked across more than 40 film productions in location sound and post-production. If you’re putting together a project and need someone for sound, send me the details and I can help you figure out what you need and provide an estimate."
        buttonLabel="Get in Touch"
        note="Gear list, full film credits, resume, and project estimates available upon request."
      />
    </main>
  );
}