import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import PodcastPage from "@/app/(portfolio)/podcast/page";

import {
  isLocalizedLanguage,
} from "@/lib/i18n";

import {
  getLanguageAlternates,
} from "@/lib/i18n";

const metadataByLanguage = {
  es: {
    title:
      "Producción de Podcast y Edición de Audio",

    description:
      "Producción y edición de podcast, desarrollo de contenidos, grabación, música original y postproducción de audio por Juan Gutierrez.",
  },

  fr: {
    title:
      "Production de Podcast et Montage Audio",

    description:
      "Production et montage de podcast, développement éditorial, enregistrement, musique originale et postproduction audio par Juan Gutierrez.",
  },

  zh: {
    title:
      "播客製作與音訊剪輯",

    description:
      "Juan Gutierrez 提供播客製作、內容企劃、錄音、剪輯、原創音樂與聲音後期製作。",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (
    !isLocalizedLanguage(locale)
  ) {
    notFound();
  }

  const content =
    metadataByLanguage[locale];

  return {
    title: content.title,

    description:
      content.description,

    alternates: {
        canonical:
            `/${locale}/podcast`,

        languages:
            getLanguageAlternates(
            "/podcast"
            ),
    },

    openGraph: {
      title:
        `${content.title} | Sound by Juan`,

      description:
        content.description,

      url:
        `/${locale}/podcast`,

      locale:
        locale === "es"
          ? "es_MX"
          : locale === "fr"
            ? "fr_CA"
            : "zh_TW",
    },
  };
}

export default PodcastPage;