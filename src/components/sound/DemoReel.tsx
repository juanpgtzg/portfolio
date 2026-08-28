export default function DemoReel() {
  return (
    <section className="mb-28">
      <div className="mb-8">
        <p className="mb-2 text-sm uppercase tracking-[0.2em]">
          Sound Design
        </p>

        <h2 className="text-2xl font-medium md:text-3xl">
          Demo Reel
        </h2>
      </div>

      <div className="aspect-video w-full max-w-5xl overflow-hidden bg-black">
        <iframe
          className="h-full w-full"
          src="https://www.youtube-nocookie.com/embed/C1R_ItFcLZo?rel=0"
          title="Juan Gutierrez Sound Design Demo Reel"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <p className="mt-5 text-sm opacity-70">
        Sound Design · Dialogue · SFX · Foley · Ambiences · Mixing
      </p>
    </section>
  );
}