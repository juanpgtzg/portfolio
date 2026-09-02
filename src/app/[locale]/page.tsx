import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import HomePage from "@/app/page";

import {
  getLanguageAlternates,
  isLocalizedLanguage,
} from "@/lib/i18n";

const metadataByLanguage = {
  es: {
    title:
      "Sound by Juan | Juan Gutierrez — Ingeniero de Audio en Vancouver",

    description:
      "Sonido directo, postproducción de audio, diseño sonoro, mezcla y producción de podcast por Juan Gutierrez en Vancouver.",

    openGraphLocale:
      "es_MX",

    image:
      "/images/seo/og-es.png",

    imageAlt:
      "Sound by Juan — Portafolio de Audio de Juan Gutierrez",
  },

  fr: {
    title:
      "Sound by Juan | Juan Gutierrez — Ingénieur du Son à Vancouver",

    description:
      "Son direct, postproduction audio, conception sonore, mixage et production de podcast par Juan Gutierrez à Vancouver.",

    openGraphLocale:
      "fr_CA",

    image:
      "/images/seo/og-fr.png",

    imageAlt:
      "Sound by Juan — Portfolio Audio de Juan Gutierrez",
  },

  zh: {
    title:
      "Sound by Juan | Juan Gutierrez — 溫哥華音訊工程師",

    description:
      "Juan Gutierrez 提供現場收音、聲音後期、聲音設計、混音與播客製作服務，現居加拿大溫哥華。",

    openGraphLocale:
      "zh_TW",

    image:
      "/images/seo/og-zh.png",

    imageAlt:
      "Sound by Juan — Juan Gutierrez 聲音作品集",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}): Promise<Metadata> {
  const { locale } =
    await params;

  if (
    !isLocalizedLanguage(locale)
  ) {
    notFound();
  }

  const content =
    metadataByLanguage[locale];

  return {
    title: {
      absolute:
        content.title,
    },

    description:
      content.description,

    alternates: {
      canonical:
        `/${locale}`,

      languages:
        getLanguageAlternates(
          "/"
        ),
    },

    openGraph: {
      type: "website",

      siteName:
        "Sound by Juan",

      title:
        content.title,

      description:
        content.description,

      url:
        `/${locale}`,

      locale:
        content.openGraphLocale,

      images: [
        {
          url: content.image,
          width: 1200,
          height: 630,
          alt: content.imageAlt,
        },
      ],
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        content.title,

      description:
        content.description,

      images: [
        content.image,
      ],
    },
  };
}

export default HomePage;