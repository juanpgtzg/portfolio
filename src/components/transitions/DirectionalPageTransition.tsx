"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type Side = "sound" | "podcast";

interface DirectionalPageTransitionProps {
  side: Side;
  children: ReactNode;
}

interface TransitionContextValue {
  navigateTo: (target: Side) => void;
  isTransitioning: boolean;

  offset: number;
  opacity: number;
  transitionEnabled: boolean;
}

const TransitionContext =
  createContext<TransitionContextValue | null>(null);

export function useDirectionalTransition() {
  const context = useContext(TransitionContext);

  if (!context) {
    throw new Error(
      "useDirectionalTransition must be used inside DirectionalPageTransition"
    );
  }

  return context;
}

export default function DirectionalPageTransition({
  side,
  children,
}: DirectionalPageTransitionProps) {
  const router = useRouter();
  const settleTimer = useRef<number | null>(null);

  const [offset, setOffset] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [transitionEnabled, setTransitionEnabled] =
    useState(false);

  const [isTransitioning, setIsTransitioning] =
    useState(false);

  const frameOne = useRef<number | null>(null);
  const frameTwo = useRef<number | null>(null);
  const navigationTimer = useRef<number | null>(null);

  /* ==========================================
     ENTERING PAGE
     ========================================== */

  useLayoutEffect(() => {
    setIsTransitioning(false);

    const destination =
      sessionStorage.getItem("portfolio-transition");

    // Direct visit / refresh:
    // no entrance animation.
    if (destination !== side) {
      setOffset(0);
      setOpacity(1);
      setTransitionEnabled(false);
      return;
    }

    // Sound enters from LEFT.
    // Podcast enters from RIGHT.
    const startingOffset =
      side === "sound" ? -100 : 100;

    setTransitionEnabled(false);
    setOffset(startingOffset);
    setOpacity(0);

    frameOne.current = requestAnimationFrame(() => {
      frameTwo.current = requestAnimationFrame(() => {
        setTransitionEnabled(true);
        setOffset(0);
        setOpacity(1);

        sessionStorage.removeItem(
          "portfolio-transition"
        );

        // Once the entrance animation is finished,
        // remove the transform completely.
        settleTimer.current = window.setTimeout(() => {
          setTransitionEnabled(false);
        }, 420);
      });
    });

    return () => {
      if (frameOne.current !== null) {
        cancelAnimationFrame(frameOne.current);
      }

      if (frameTwo.current !== null) {
        cancelAnimationFrame(frameTwo.current);
      }

      if (settleTimer.current !== null) {
        clearTimeout(settleTimer.current);
      }
    };
  }, [side]);

  /* ==========================================
     LEAVING PAGE
     ========================================== */

  const navigateTo = (target: Side) => {
    if (isTransitioning) return;
    if (target === side) return;

    setIsTransitioning(true);

    sessionStorage.setItem(
      "portfolio-transition",
      target
    );

    setTransitionEnabled(true);

    // Going to Sound → current content exits RIGHT.
    // Going to Podcast → current content exits LEFT.
    setOffset(target === "sound" ? 100 : -100);

    setOpacity(0);

    navigationTimer.current = window.setTimeout(() => {
      router.push(`/${target}`);
    }, 420);
  };

  return (
    <TransitionContext.Provider
      value={{
        navigateTo,
        isTransitioning,
        offset,
        opacity,
        transitionEnabled,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

/* ==========================================
   ONLY THIS ELEMENT ACTUALLY MOVES
   ========================================== */

export function DirectionalPageMotion({
  children,
}: {
  children: ReactNode;
}) {
  const {
    offset,
    opacity,
    transitionEnabled,
  } = useDirectionalTransition();

  return (
    <div className="w-full overflow-x-hidden">
      <div
        style={{
          transform:
            transitionEnabled || offset !== 0
              ? `translateX(${offset}%)`
              : "none",

          opacity,

          transition: transitionEnabled
            ? "transform 400ms cubic-bezier(0.76, 0, 0.24, 1), opacity 300ms ease"
            : "none",

          willChange: transitionEnabled
            ? "transform, opacity"
            : "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}