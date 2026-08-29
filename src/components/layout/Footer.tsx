import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-[var(--line)]">
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">

          {/* Contact */}
          <div>
            <span className="retro-label opacity-45">
              Get in touch
            </span>

            <a
              href="mailto:juanpgtzg@outlook.com"
              className="font-retro mt-2 block text-base font-bold underline underline-offset-4 transition-opacity hover:opacity-50"
            >
              juanpgtzg@outlook.com ↗
            </a>

            <p className="mt-2 text-xs leading-relaxed opacity-50">
              Gear list, full film credits, and resume available upon request.
            </p>
          </div>

          {/* Identity */}
          <div className="flex items-end gap-4 md:text-right">
            <Image
              src="/images/brand/juan-logo.png"
              alt="Juan Gutierrez logo"
              width={100}
              height={100}
              className="h-auto w-12"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(48%) sepia(23%) saturate(1450%) hue-rotate(316deg) brightness(95%) contrast(80%)",
              }}
            />

            <div>
              <p className="retro-label opacity-45">
                Vancouver, BC
              </p>

              <p className="font-retro mt-1 text-[9px] uppercase leading-relaxed tracking-[0.06em] opacity-35">
                Designed &amp; coded from scratch
                <br />
                by Juan Gutierrez
              </p>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-5 flex items-center justify-between border-t border-[var(--line-light)] pt-3">
          <span className="font-retro text-[8px] uppercase tracking-[0.1em] opacity-30">
            JG / Audio Portfolio / 2026
          </span>

          <span className="font-retro text-[8px] uppercase tracking-[0.1em] opacity-30">
            Made in Mexico
          </span>
        </div>
      </div>
    </footer>
  );
}