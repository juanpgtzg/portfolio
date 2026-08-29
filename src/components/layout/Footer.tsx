import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--line)]">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-6 py-5 md:px-10">
        <div>
          <p className="retro-label opacity-40">
            JG / Audio Portfolio / 2026
          </p>

          <p className="font-retro mt-1 text-[9px] uppercase tracking-[0.07em] opacity-30">
            Vancouver, BC
          </p>
        </div>

        <div className="flex items-end gap-3 text-right">
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