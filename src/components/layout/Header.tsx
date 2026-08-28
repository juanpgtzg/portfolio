import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">
          Juan Gutierrez
        </Link>

        <div>
          <Link href="/sound">
            Sound
          </Link>

          <Link href="/podcast">
            Podcast
          </Link>
        </div>
      </nav>
    </header>
  );
}