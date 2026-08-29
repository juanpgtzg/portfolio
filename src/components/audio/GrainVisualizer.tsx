"use client";

import { useEffect, useRef, useState } from "react";
import { useAudioEngine } from "@/components/audio/AudioProvider";

interface Grain {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  size: number;
  frequencyPosition: number;
  sensitivity: number;
  pileOffset: number;
  opacity: number;
}

export default function GrainVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { getAnalyser } = useAudioEngine();

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let grains: Grain[] = [];

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;

      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;

      context.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
      );

      const width = rect.width;
      const height = rect.height;

      /*
        Slightly fewer particles than before,
        but each grain is easier to see.
      */
      const grainCount = Math.min(
        450,
        Math.max(220, Math.floor(width * 0.65))
      );

      grains = Array.from(
        { length: grainCount },
        () => {
          const pileOffset = Math.random() * 7;

          return {
            x: Math.random() * width,

            y:
              height -
              2 -
              pileOffset,

            velocityX: 0,
            velocityY: 0,

            /*
              Visible sand-sized particles.
              Still small, but no longer microscopic.
            */
            size:
              0.9 +
              Math.random() * 1.15,

            frequencyPosition:
              Math.random(),

            sensitivity:
              0.75 +
              Math.random() * 0.5,

            pileOffset,

            opacity:
              0.65 +
              Math.random() * 0.3,
          };
        }
      );
    };

    const observer =
      new ResizeObserver(resizeCanvas);

    observer.observe(canvas);

    resizeCanvas();

    let activeUntil = 0;
    let lastActiveState = false;

    const updateActiveState = (active: boolean) => {
      if (active === lastActiveState) return;

      lastActiveState = active;
      setIsActive(active);
    };

    const draw = () => {
      const rect =
        canvas.getBoundingClientRect();

      const width = rect.width;
      const height = rect.height;

      context.clearRect(
        0,
        0,
        width,
        height
      );

      const analyser = getAnalyser();

      const frequencyData = analyser
        ? new Uint8Array(
            analyser.frequencyBinCount
          )
        : null;

      if (analyser && frequencyData) {
        analyser.getByteFrequencyData(
          frequencyData
        );
      }

      /*
        Detect whether meaningful audio is currently
        passing through the analyser.

        We hold the ON state briefly so the indicator
        doesn't flicker during tiny gaps in the audio.
      */
      if (frequencyData) {
        let peak = 0;
        let total = 0;

        for (let i = 0; i < frequencyData.length; i++) {
          const value = frequencyData[i];

          total += value;

          if (value > peak) {
            peak = value;
          }
        }

        const average =
          total / frequencyData.length;

        const hasSignal =
          peak > 18 || average > 4;

        if (hasSignal) {
          activeUntil = performance.now() + 220;
        }

        updateActiveState(
          performance.now() < activeUntil
        );
      } else {
        updateActiveState(false);
      }

      /*
        PHYSICS
      */

      const gravity = 0.11;

      /*
        Horizontal movement caused by the
        "vibrating surface" underneath.
      */
      const horizontalForce = 0.7;

      /*
        Prevents extremely violent launches,
        without using an artificial ceiling.
      */
      const maximumLaunchSpeed = 3.4;

      for (const grain of grains) {
        const floor =
          height -
          2 -
          grain.pileOffset;

        let energy = 0;

        if (
          frequencyData &&
          frequencyData.length > 0
        ) {
          /*
            Concentrate analysis on the useful
            lower/mid portion of the spectrum.
          */
          const usefulBins = Math.max(
            1,
            Math.floor(
              frequencyData.length * 0.42
            )
          );

          const bin = Math.min(
            usefulBins - 1,
            Math.floor(
              grain.frequencyPosition *
                usefulBins
            )
          );

          const start =
            Math.max(0, bin - 2);

          const end = Math.min(
            frequencyData.length - 1,
            bin + 2
          );

          let total = 0;

          for (
            let i = start;
            i <= end;
            i++
          ) {
            total += frequencyData[i];
          }

          energy =
            total /
            (end - start + 1) /
            255;
        }

        /*
          Ignore very quiet background energy.
        */
        const threshold = 0.1;

        const normalizedEnergy =
          Math.max(
            0,
            (energy - threshold) /
              (1 - threshold)
          );

        if (!reducedMotion) {
          /*
            IMPORTANT:
            Sound only launches particles that
            are near the floor.

            Once they're airborne, gravity takes over.

            This removes the artificial ceiling AND
            stops grains from continuously accelerating
            upward.
          */
          const closeToFloor =
            grain.y >
            floor - 10;

          if (
            closeToFloor &&
            normalizedEnergy > 0
          ) {
            /*
              Not every grain receives an impulse
              on every frame.

              This creates the random granular
              behavior we're after.
            */
            const launchChance =
              0.035 +
              normalizedEnergy * 0.12;

            if (
              Math.random() <
              launchChance
            ) {
              /*
                Strong sound = stronger launch,
                but each grain varies.
              */
              const launch =
                normalizedEnergy *
                (1.1 +
                  Math.random() * 2.2) *
                grain.sensitivity;

              grain.velocityY -=
                Math.min(
                  launch,
                  maximumLaunchSpeed
                );

              /*
                Random sideways kick.

                     ↖ ↑ ↗
                       ·
                ─────────────

                This makes it feel like the
                floor itself is vibrating.
              */
              grain.velocityX +=
                (Math.random() - 0.5) *
                horizontalForce *
                normalizedEnergy *
                2;
            }
          }

          /*
            Gravity always acts.
          */
          grain.velocityY += gravity;

          grain.x += grain.velocityX;
          grain.y += grain.velocityY;

          /*
            Air resistance.

            Horizontal movement survives longer
            than vertical movement.
          */
          grain.velocityX *= 0.985;
          grain.velocityY *= 0.998;

          /*
            Floor collision.

            Very little vertical bounce because
            these are grains, not rubber balls.
          */
          if (grain.y >= floor) {
            grain.y = floor;

            /*
              Occasionally a tiny bounce helps
              sell the vibration.
            */
            if (
              Math.abs(
                grain.velocityY
              ) > 0.7
            ) {
              grain.velocityY *= -0.08;
            } else {
              grain.velocityY = 0;
            }

            /*
              Friction against the floor.
            */
            grain.velocityX *= 0.72;
          }

          /*
            Horizontal edges.

            Rather than stopping, grains gently
            bounce back into the field.
          */
          if (grain.x < 0) {
            grain.x = 0;

            grain.velocityX =
              Math.abs(
                grain.velocityX
              ) * 0.35;
          }

          if (grain.x > width) {
            grain.x = width;

            grain.velocityX =
              -Math.abs(
                grain.velocityX
              ) * 0.35;
          }
        } else {
          grain.y = floor;
        }

        /*
          Render.

          Tiny irregular rectangles look more
          like solid particles than circles.
        */
        context.globalAlpha =
          grain.opacity;

        context.fillStyle = "#171717";

        context.fillRect(
          grain.x,
          grain.y,
          grain.size,
          grain.size *
            (0.65 +
              Math.random() * 0.25)
        );
      }

      context.globalAlpha = 1;

      if (!reducedMotion) {
        animationFrame =
          requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      observer.disconnect();

      cancelAnimationFrame(
        animationFrame
      );
    };
  }, [getAnalyser]);

  return (
    <div className="relative h-28 w-full md:h-32">

      {/* Status sitting down at grain level */}
      <div className="pointer-events-none absolute bottom-5 left-0 right-0 z-0 flex items-center justify-between">
        <span className="retro-label opacity-40">
          Audio Response
        </span>

        <span
          className="font-retro flex items-center gap-2 text-[9px] uppercase tracking-[0.1em]"
          aria-label={
            isActive
              ? "Audio response active"
              : "Audio response inactive"
          }
        >
          <span
            className={`h-2 w-2 rounded-full border border-[var(--line)] transition-colors duration-150 ${
              isActive
                ? "bg-red-600"
                : "bg-transparent"
            }`}
          />

          <span
            className={
              isActive
                ? "opacity-70"
                : "opacity-35"
            }
          >
            Live
          </span>
        </span>
      </div>

      {/* Canvas sits above the text so grains can overlap it */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-10 h-full w-full"
      />
    </div>
  );
}