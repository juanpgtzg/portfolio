import Hero from "@/components/home/Hero";
import MobileHero from "@/components/home/MobileHero";

export default function Home() {
  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <MobileHero />
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <Hero />
      </div>
    </>
  );
}