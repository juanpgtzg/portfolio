"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import DirectionalPageTransition, {
  DirectionalPageMotion,
} from "@/components/transitions/DirectionalPageTransition";

import { stripLanguageFromPathname } from "@/lib/i18n";

interface PortfolioPageShellProps {
  children: ReactNode;
}

export default function PortfolioPageShell({
  children,
}: PortfolioPageShellProps) {
  const pathname = usePathname();

  const basePath =
    stripLanguageFromPathname(
      pathname || "/"
    );

  const side =
    basePath === "/sound"
      ? "sound"
      : basePath === "/podcast"
        ? "podcast"
        : null;

  if (!side) {
    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    );
  }

  return (
    <DirectionalPageTransition
      side={side}
    >
      {/* STAYS STILL */}
      <Header />

      {/* ONLY PAGE CONTENT MOVES */}
      <DirectionalPageMotion>
        {children}
      </DirectionalPageMotion>

      {/* STAYS STILL */}
      <Footer />
    </DirectionalPageTransition>
  );
}