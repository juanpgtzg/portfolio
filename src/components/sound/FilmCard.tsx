"use client";

import { useState } from "react";
import Image from "next/image";
import type { Film } from "@/types/film";

interface FilmCardProps {
  film: Film;
}

export default function FilmCard({ film }: FilmCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const showDetails = isHovered || isOpen;

  return (
    <article>
      <button
        type="button"
        className="w-full text-left"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        <div className="relative aspect-[2/3] overflow-hidden bg-black/5">
          <Image
            src={film.poster}
            alt={`${film.title} poster`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        </div>

        <div className="pt-4">
          <h3 className="text-base font-medium leading-tight tracking-tight">
            {film.title}
          </h3>

          <p className="mt-1 text-sm leading-snug opacity-60">
            {film.role}
          </p>

          <div className="relative mt-3 h-10">
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                showDetails ? "opacity-60" : "opacity-0"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.08em]">
                {film.format} · {film.year}
              </p>

              <p className="mt-1 text-xs">
                {film.productionCompany}
              </p>
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}