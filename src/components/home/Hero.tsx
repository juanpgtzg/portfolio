import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-12 md:px-10">
      <div className="w-full max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] opacity-50">
            Audio Portfolio
          </p>

          <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
            Juan Gutierrez
          </h1>
        </div>

        <div className="relative mx-auto aspect-[1.62/1] w-full max-w-4xl overflow-hidden rounded-[28px] border-2 border-black bg-[#d8d0bd] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

          {/* Cassette top label */}
          <div className="absolute left-[7%] right-[7%] top-[8%] h-[28%] rounded-md border border-black/30 bg-[#eee8d8]">
            <div className="absolute left-1/2 top-[15%] -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] opacity-50 md:text-xs">
              Stereo
            </div>
          </div>

          {/* Left reel */}
          <div className="absolute left-[19%] top-[34%] aspect-square w-[18%] rounded-full border-4 border-black/60 bg-[#f1ead8]">
            <div className="absolute inset-[22%] rounded-full border-2 border-black/50" />

            <div className="absolute inset-[39%] rounded-full bg-black/70" />
          </div>

          {/* Right reel */}
          <div className="absolute right-[19%] top-[34%] aspect-square w-[18%] rounded-full border-4 border-black/60 bg-[#f1ead8]">
            <div className="absolute inset-[22%] rounded-full border-2 border-black/50" />

            <div className="absolute inset-[39%] rounded-full bg-black/70" />
          </div>

          {/* Tape window */}
          <div className="absolute left-1/2 top-[42%] h-[12%] w-[28%] -translate-x-1/2 rounded-full border-2 border-black/50 bg-black/10" />

          {/* Bottom cassette opening */}
          <div
            className="absolute bottom-[8%] left-1/2 h-[20%] w-[58%] -translate-x-1/2 border-2 border-black/40 bg-[#c4baa4]"
            style={{
              clipPath:
                "polygon(8% 0, 92% 0, 100% 100%, 0 100%)",
            }}
          >
            <div className="absolute bottom-[24%] left-[25%] h-3 w-3 rounded-full bg-black/60" />
            <div className="absolute bottom-[24%] right-[25%] h-3 w-3 rounded-full bg-black/60" />
          </div>

          {/* Center divider */}
          <div className="absolute bottom-[26%] left-1/2 top-[20%] w-px -translate-x-1/2 bg-black/15" />

          {/* Personal logo */}

          {/* Origin marking */}
          <div className="pointer-events-none absolute bottom-[10.5%] left-1/2 -translate-x-1/2 text-[7px] uppercase tracking-[0.18em] opacity-45 md:text-[9px]">
            Made in Mexico
          </div>
          
          {/* SOUND */}
          <Link
            href="/sound"
            aria-label="View sound portfolio"
            className="group absolute inset-y-0 left-0 z-10 w-1/2"
          >
            <div className="absolute bottom-[24%] left-[13%]">
              <p className="text-xs uppercase tracking-[0.2em] opacity-40">
                Side A
              </p>

              <p className="mt-1 text-3xl font-medium tracking-tight transition-transform duration-300 group-hover:-translate-y-1 md:text-5xl">
                Sound
              </p>

              <span className="mt-2 block text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-60">
                Enter ↗
              </span>
            </div>
          </Link>

          {/* PODCAST */}
          <Link
            href="/podcast"
            aria-label="View podcast portfolio"
            className="group absolute inset-y-0 right-0 z-10 w-1/2"
          >
            <div className="absolute bottom-[24%] right-[13%] text-right">
              <p className="text-xs uppercase tracking-[0.2em] opacity-40">
                Side B
              </p>

              <p className="mt-1 text-3xl font-medium tracking-tight transition-transform duration-300 group-hover:-translate-y-1 md:text-5xl">
                Podcast
              </p>

              <span className="mt-2 block text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-60">
                Enter ↗
              </span>
            </div>
          </Link>

          {/* Small cassette markings */}
          <div className="absolute left-[8%] top-[12%] text-[9px] uppercase tracking-[0.15em] opacity-40 md:text-xs">
            JG-01
          </div>

          <div className="absolute right-[8%] top-[12%] text-[9px] uppercase tracking-[0.15em] opacity-40 md:text-xs">
            2026
          </div>
        </div>

        <p className="mt-7 text-center text-sm opacity-50">
          Select a side
        </p>
      </div>
    </section>
  );
}