import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-28 border-t border-black/10">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.16em] opacity-50">
              Get in touch
            </p>

            <a
              href="mailto:juanpgtzg@outlook.com"
              className="text-xl transition-opacity hover:opacity-50 md:text-2xl"
            >
              juanpgtzg@outlook.com
            </a>

            <p className="mt-5 max-w-lg text-sm leading-relaxed opacity-60">
              Gear list, full film credits, and resume are available upon
              request.
            </p>
          </div>

          <div className="text-sm md:text-right">
            <Image
              src="/images/brand/juan-logo.png"
              alt="Juan Gutierrez logo"
              width={120}
              height={120}
              className="mb-4 ml-auto h-auto w-16"
            />

            <div className="opacity-50">
              <p>Vancouver, BC</p>

              <p className="mt-1">
                Designed & coded from scratch by Juan Gutierrez.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}