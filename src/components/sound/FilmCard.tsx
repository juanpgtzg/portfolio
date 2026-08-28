"use client";

import { useState } from "react";
import Image from "next/image";
import type { Film } from "@/types/film";

interface FilmCardProps {
  film: Film;
}

export default function FilmCard({ film }: FilmCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      className="group cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={film.poster}
          alt={`${film.title} poster`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 50vw, 20vw"
        />
      </div>

      <div className="mt-3">
        <h3 className="text-lg font-medium">
          {film.title}
        </h3>

        <p className="text-sm">
          {film.role}
        </p>

        <div
          className={`
            overflow-hidden transition-all duration-300
            group-hover:max-h-20 group-hover:opacity-100
            ${isOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <p className="mt-2 text-sm">
            {film.format}, {film.year}
          </p>

          <p className="text-sm">
            {film.productionCompany}
          </p>
        </div>
      </div>
    </article>
  );
}