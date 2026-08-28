import Link from "next/link";

export default function Hero() {
  return (
     <section>
      <h1>Juan Gutierrez</h1>

      <p>
        Sound Designer · Production Sound · Podcast Production
      </p>

      <div>
        <Link href="/sound">
          Sound
        </Link>

        <Link href="/podcast">
          Podcast
        </Link>
      </div>
    </section>
  );
}