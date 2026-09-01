import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import HomePage from "@/app/page";

import {
  isLocalizedLanguage,
} from "@/lib/i18n";

import {
  getLanguageAlternates,
} from "@/lib/i18n";

const metadataByLanguage = {
  es: {
    title:
      "Sound by Juan | Juan Gutierrez — Ingeniero de Audio en Vancouver",

    description:
      "Sonido directo, postproducción de audio, diseño sonoro, mezcla y producción de podcast por Juan Gutierrez en Vancouver.",
  },

  fr: {
    title:
      "Sound by Juan | Juan Gutierrez — Ingénieur du Son à Vancouver",

    description:
      "Son direct, postproduction audio, conception sonore, mixage et production de podcast par Juan Gutierrez à Vancouver.",
  },

  zh: {
    title:
      "Sound by Juan | Juan Gutierrez — 溫哥華音訊工程師",

    description:
      "Juan Gutierrez 提供現場收音、聲音後期、聲音設計、混音與播客製作服務，現居加拿大溫哥華。",
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
    title: {
      absolute: content.title,
    },

    description:
      content.description,

    alternates: {
        canonical: `/${locale}`,
        languages:
            getLanguageAlternates("/"),
    },

    openGraph: {
      title: content.title,
      description:
        content.description,

      url: `/${locale}`,

      locale:
        locale === "es"
          ? "es_MX"
          : locale === "fr"
            ? "fr_CA"
            : "zh_TW",
    },

    twitter: {
      card: "summary_large_image",
      title: content.title,
      description:
        content.description,
    },
  };
}

export default HomePage;