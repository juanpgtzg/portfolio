import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 py-5 md:grid-cols-[1fr_auto_1fr] md:items-end md:px-10">

        {/* Left */}
        <div>
          <p className="retro-label opacity-35">
            JG / Audio Portfolio / 2026
          </p>

          <p className="font-retro mt-1 text-[9px] uppercase tracking-[0.07em] opacity-30">
            Vancouver, BC
          </p>
        </div>

        {/* Center */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.imdb.com/es-es/name/nm10061732/?ref_=ext_shr_lnk"
            target="_blank"
            rel="noopener noreferrer"
            className="font-retro text-[9px] font-bold uppercase tracking-[0.08em] opacity-45 transition-opacity hover:opacity-100"
          >
            IMDb ↗
          </a>

          <a
            href="https://www.linkedin.com/in/juanpgtzg/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-retro text-[9px] font-bold uppercase tracking-[0.08em] opacity-45 transition-opacity hover:opacity-100"
          >
            LinkedIn ↗
          </a>

          <a
            href="https://www.instagram.com/juanpgtzg/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-retro text-[9px] font-bold uppercase tracking-[0.08em] opacity-45 transition-opacity hover:opacity-100"
          >
            Instagram ↗
          </a>
        </div>

        {/* Right */}
        <div className="flex items-end gap-3 md:justify-self-end md:text-right">
          <div>
            <p className="font-retro text-[9px] uppercase leading-relaxed tracking-[0.06em] opacity-30">
              Designed &amp; coded from scratch
              <br />
              by Juan Gutierrez
            </p>
          </div>

          <Image
            src="/images/brand/juan-logo.png"
            alt="Juan Gutierrez logo"
            width={80}
            height={80}
            className="h-auto w-10"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(48%) sepia(23%) saturate(1450%) hue-rotate(316deg) brightness(95%) contrast(80%)",
            }}
          />
        </div>

      </div>
    </footer>
  );
}