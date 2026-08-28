import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-black/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.12em]"
        >
          Juan Gutierrez
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/sound"
            className="transition-opacity hover:opacity-50"
          >
            Sound
          </Link>

          <Link
            href="/podcast"
            className="transition-opacity hover:opacity-50"
          >
            Podcast
          </Link>
        </div>
      </nav>
    </header>
  );
}