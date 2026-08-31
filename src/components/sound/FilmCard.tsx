"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Film } from "@/types/film";

interface FilmCardProps {
  film: Film;
}

export default function FilmCard({ film }: FilmCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const titleViewportRef = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null);

  const [titleScroll, setTitleScroll] = useState(0);

  const imdbTooltipRef = useRef<HTMLSpanElement>(null);
  const [showImdbTooltip, setShowImdbTooltip] = useState(false);

  useEffect(() => {
    const viewport = titleViewportRef.current;
    const text = titleTextRef.current;

    if (!viewport || !text) return;

    const measureTitle = () => {
      const overflow =
        text.scrollWidth - viewport.clientWidth;

      setTitleScroll(Math.max(0, overflow));
    };

    measureTitle();

    const observer = new ResizeObserver(measureTitle);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [film.title]);

  const showDetails = isHovered || isOpen;

  return (
    <article className="group">
      <button
        type="button"
        className="w-full text-left"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        {/* Poster frame */}
        {film.link ? (
          <a
            href={film.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer"
            aria-label={`View ${film.title} on IMDb`}
            onMouseEnter={() => setShowImdbTooltip(true)}
            onMouseLeave={() => setShowImdbTooltip(false)}
            onClick={(event) => {
              event.stopPropagation();
              setShowImdbTooltip(false);
              setIsOpen(false);
            }}
            onMouseMove={(event) => {
              if (!imdbTooltipRef.current) return;

              imdbTooltipRef.current.style.left = `${event.clientX + 14}px`;
              imdbTooltipRef.current.style.top = `${event.clientY + 14}px`;
            }}
          >
            <div className="relative overflow-hidden border border-[var(--line)] bg-[var(--paper-light)] p-1.5">
              <div className="relative aspect-[2/3] overflow-hidden bg-black/5">
                <Image
                  src={film.poster}
                  alt={`${film.title} poster`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Tiny index */}
                <div className="absolute left-2 top-2 border border-[var(--line)] bg-[var(--paper-light)] px-1.5 py-1">
                  <span className="font-retro text-[8px] font-bold tracking-[0.08em]">
                    {String(film.id).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ) : (
          <div className="relative overflow-hidden border border-[var(--line)] bg-[var(--paper-light)] p-1.5">
            <div className="relative aspect-[2/3] overflow-hidden bg-black/5">
              <Image
                src={film.poster}
                alt={`${film.title} poster`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />

              {/* Tiny index */}
              <div className="absolute left-2 top-2 border border-[var(--line)] bg-[var(--paper-light)] px-1.5 py-1">
                <span className="font-retro text-[8px] font-bold tracking-[0.08em]">
                  {String(film.id).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Information */}
        <div className="pt-3">
          <div className="flex h-6 items-center gap-3">
            {/* Fixed-width title viewport */}
            <div
              ref={titleViewportRef}
              className="relative min-w-0 flex-1 overflow-hidden"
            >
              <h3
                ref={titleTextRef}
                className="whitespace-nowrap text-sm font-bold leading-6 md:text-base"
                style={{
                  transform:
                    isHovered && titleScroll > 0
                      ? `translateX(-${titleScroll}px)`
                      : "translateX(0)",
                  transition:
                    titleScroll > 0
                      ? "transform 1.8s ease-in-out"
                      : "none",
                }}
              >
                {film.title}
              </h3>

              {/* Fade indicating more text */}
              {titleScroll > 0 && !isHovered && (
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 w-12"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, var(--paper))",
                  }}
                />
              )}
            </div>

            <span
              className={`font-retro hidden shrink-0 text-[10px] transition-transform duration-200 md:block ${
                showDetails ? "rotate-45" : ""
              }`}
              aria-hidden="true"
            >
              +
            </span>
          </div>

          <p className="mt-1.5 text-xs leading-snug opacity-60">
            {film.role}
          </p>

          {/* Fixed metadata space so cards don't jump */}
          <div className="relative mt-3 h-10 border-t border-[var(--line-light)] pt-2">
            <div
              className={`absolute inset-x-0 top-2 opacity-60 transition-opacity duration-200 ${
                showDetails ? "md:opacity-60" : "md:opacity-0"
              }`}
            >
              <p className="font-retro text-[9px] uppercase tracking-[0.06em]">
                {film.format} / {film.year}
              </p>

              <p className="mt-1 text-[10px]">
                {film.productionCompany}
              </p>
            </div>

            {!showDetails && (
              <p className="font-retro hidden text-[9px] uppercase tracking-[0.08em] opacity-30 md:block">
                View details
              </p>
            )}
          </div>
        </div>
      </button>

      {/* IMDb cursor tooltip */}
      {film.link && (
        <span
          ref={imdbTooltipRef}
          className={`pointer-events-none fixed z-50 border border-[var(--line)] bg-[var(--paper-light)] px-3 py-2 font-retro text-[9px] font-bold uppercase tracking-[0.08em] transition-opacity duration-150 ${
            showImdbTooltip ? "opacity-100" : "opacity-0"
          }`}
        >
          Click to view on IMDb ↗
        </span>
      )}
    </article>
  );
}