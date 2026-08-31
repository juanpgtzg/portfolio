"use client";

import Link from "next/link";
import { ReactNode, MouseEvent } from "react";
import { useDirectionalTransition } from "./DirectionalPageTransition";

type Side = "sound" | "podcast";

interface DirectionalLinkProps {
  target: Side;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function DirectionalLink({
  target,
  children,
  className,
  ariaLabel,
}: DirectionalLinkProps) {
  const { navigateTo } =
    useDirectionalTransition();

  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    // Preserve Cmd/Ctrl click, Shift click, etc.
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigateTo(target);
  };

  return (
    <Link
      href={`/${target}`}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}