"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import DirectionalPageTransition, {
  DirectionalPageMotion,
} from "@/components/transitions/DirectionalPageTransition";

interface PortfolioPageShellProps {
  children: ReactNode;
}

export default function PortfolioPageShell({
  children,
}: PortfolioPageShellProps) {
  const pathname = usePathname();

  const side =
    pathname === "/sound"
      ? "sound"
      : pathname === "/podcast"
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
    <DirectionalPageTransition side={side}>
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