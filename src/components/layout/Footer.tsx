import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-5 md:grid-cols-[1fr_auto_1fr] md:items-end md:gap-4 md:px-10">

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
        <div className="flex items-center gap-5 md:justify-center md:gap-4">
          <a
            href="https://www.imdb.com/es-es/name/nm10061732/?ref_=ext_shr_lnk"
            target="_blank"
            rel="noopener noreferrer"
            className="font-retro text-[9px] font-bold uppercase tracking-[0.06em] opacity-45 transition-opacity hover:opacity-100"
          >
            IMDb ↗
          </a>

          <a
            href="https://www.linkedin.com/in/juanpgtzg/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-retro text-[9px] font-bold uppercase tracking-[0.06em] opacity-45 transition-opacity hover:opacity-100"
          >
            LinkedIn ↗
          </a>

          <a
            href="https://www.instagram.com/juanpgtzg/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-retro text-[9px] font-bold uppercase tracking-[0.06em] opacity-45 transition-opacity hover:opacity-100"
          >
            Instagram ↗
          </a>
        </div>

        {/* Right */}
        <div className="flex items-center justify-between border-t border-[var(--line-light)] pt-4 md:justify-self-end md:border-0 md:pt-0 md:text-right">
          <p className="font-retro text-[8px] uppercase leading-relaxed tracking-[0.05em] opacity-30 md:text-[9px] md:tracking-[0.06em]">
            Designed &amp; coded from scratch
            <br />
            by Juan Gutierrez
          </p>

          <Image
            src="/images/brand/juan-logo.png"
            alt="Juan Gutierrez logo"
            width={80}
            height={80}
            className="ml-4 h-auto w-9 md:w-10"
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