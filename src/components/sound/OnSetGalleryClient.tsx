"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import ArrowIcon from "@/components/ui/ArrowIcon";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

interface Photo {
  src: string;
  alt: string;
}

interface OnSetGalleryClientProps {
  photos: Photo[];
}

export default function OnSetGalleryClient({
  photos,
}: OnSetGalleryClientProps) {
  const { language } = useLanguage();
  const t = translations[language].sound.onSet;

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  const [isLightboxOpen, setIsLightboxOpen] =
    useState(false);

  const previousPhoto = useCallback(() => {
    setSelectedIndex((current) =>
      current === 0
        ? photos.length - 1
        : current - 1
    );
  }, [photos.length]);

  const nextPhoto = useCallback(() => {
    setSelectedIndex((current) =>
      current === photos.length - 1
        ? 0
        : current + 1
    );
  }, [photos.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        previousPhoto();
      }

      if (event.key === "ArrowRight") {
        nextPhoto();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    isLightboxOpen,
    previousPhoto,
    nextPhoto,
  ]);

  if (photos.length === 0) return null;

  const currentNumber = String(
    selectedIndex + 1
  ).padStart(2, "0");

  const totalNumber = String(
    photos.length
  ).padStart(2, "0");

  return (
    <>
      <section className="mt-4 md:mt-12">
        {/* Heading */}
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <span className="retro-tag retro-tag-yellow">
              {t.tag}
            </span>

            <h2 className="mt-4 text-2xl font-bold md:text-3xl">
              {t.title}
            </h2>
          </div>

          <span className="retro-label hidden opacity-35 md:block">
            {t.fieldNotes} / {photos.length}
          </span>
        </div>

        {/* Photo viewer */}
        <div className="flex min-w-0 flex-col bg-[var(--ink)] p-2 md:grid md:h-[470px] md:grid-cols-[92px_1fr] md:gap-2 lg:h-[520px]">
          {/* Thumbnail rail */}
          <div className="retro-scroll-hidden order-2 mt-2 flex w-full max-w-full min-w-0 gap-2 overflow-x-auto pb-1 [contain:inline-size] md:order-none md:mt-0 md:min-h-0 md:flex-col md:overflow-x-hidden md:overflow-y-auto md:pb-0 md:pr-1 md:[contain:none]">
            {photos.map(
              (photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() =>
                    setSelectedIndex(index)
                  }
                  className={`group relative aspect-[4/3] w-[82px] shrink-0 overflow-hidden transition-opacity md:w-full ${
                    selectedIndex === index
                      ? "opacity-100"
                      : "opacity-55 hover:opacity-90"
                  }`}
                  aria-label={`${t.viewPhoto} ${
                    index + 1
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 82px, 92px"
                  />

                  {selectedIndex ===
                    index && (
                    <div className="pointer-events-none absolute inset-0 border-2 border-[var(--paper-light)]" />
                  )}

                  <span className="font-retro absolute bottom-1 right-1 bg-[var(--paper-light)] px-1 py-0.5 text-[7px] font-bold text-[var(--ink)]">
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </span>
                </button>
              )
            )}
          </div>

          {/* Main image */}
          <button
            type="button"
            onClick={() =>
              setIsLightboxOpen(true)
            }
            className="group relative order-1 aspect-[4/3] w-full min-w-0 overflow-hidden bg-black md:order-none md:aspect-auto"
            aria-label={`${t.openFullscreen}: ${t.photoAlt} ${
              selectedIndex + 1
            }`}
          >
            <Image
              src={photos[selectedIndex].src}
              alt={`${t.photoAlt} ${
                selectedIndex + 1
              }`}
              fill
              quality={75}
              loading="eager"
              className="object-contain transition-transform duration-500 group-hover:scale-[1.005]"
              sizes="(max-width: 768px) 100vw, 70vw"
            />

            {/* Hover hint — desktop only */}
            <div className="pointer-events-none absolute bottom-3 right-3 hidden border border-[var(--line)] bg-[var(--paper-light)] px-3 py-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block">
              <span className="font-retro flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[var(--ink)]">
                {t.viewFullscreen}

                <ArrowIcon
                  name="external"
                  className="h-2.5 w-2.5"
                />
              </span>
            </div>
          </button>
        </div>

        {/* Small metadata */}
        <div className="mt-2 flex items-center justify-between">
          <span className="retro-label opacity-30">
            {t.productionBehindScenes}
          </span>

          <span className="font-retro text-[8px] uppercase tracking-[0.1em] opacity-30">
            {currentNumber} / {totalNumber}
          </span>
        </div>
      </section>

      {/* Fullscreen lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(30,24,22,0.72)] p-6 backdrop-blur-md"
          onClick={() =>
            setIsLightboxOpen(false)
          }
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            type="button"
            onClick={() =>
              setIsLightboxOpen(false)
            }
            className="retro-button absolute right-5 top-5 z-20 flex items-center gap-2"
            aria-label={t.close}
          >
            {t.close}

            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-2.5 w-2.5 fill-none stroke-current"
              strokeWidth="2"
              strokeLinecap="square"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>

          {/* Previous */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              previousPhoto();
            }}
            className="retro-button absolute left-5 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center"
            aria-label={t.previousPhoto}
          >
            <ArrowIcon
              name="left"
              className="h-3 w-3"
            />
          </button>

          {/* Full image */}
          <div
            className="relative h-[80vh] w-full max-w-6xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <Image
              src={photos[selectedIndex].src}
              alt={`${t.photoAlt} ${
                selectedIndex + 1
              }`}
              fill
              quality={75}
              loading="eager"
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextPhoto();
            }}
            className="retro-button absolute right-5 top-1/2 z-20 flex -translate-y-1/2 items-center justify-center"
            aria-label={t.nextPhoto}
          >
            <ArrowIcon
              name="right"
              className="h-3 w-3"
            />
          </button>

          {/* Counter */}
          <span className="font-retro pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.1em] text-[var(--paper)] opacity-70">
            {currentNumber} / {totalNumber}
          </span>
        </div>
      )}
    </>
  );
}