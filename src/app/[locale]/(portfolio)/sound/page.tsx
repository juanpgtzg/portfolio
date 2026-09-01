import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import SoundPage from "@/app/(portfolio)/sound/page";

import {
  isLocalizedLanguage,
} from "@/lib/i18n";

import {
  getLanguageAlternates,
} from "@/lib/i18n";

const metadataByLanguage = {
  es: {
    title:
      "Sonido Directo y Diseño Sonoro",

    description:
      "Sonido directo, edición de diálogos, diseño sonoro, Foley, ambientes y mezcla por Juan Gutierrez en Vancouver.",
  },

  fr: {
    title:
      "Son Direct et Conception Sonore",

    description:
      "Son direct, montage dialogue, conception sonore, Foley, ambiances et mixage par Juan Gutierrez à Vancouver.",
  },

  zh: {
    title:
      "現場收音與聲音設計",

    description:
      "Juan Gutierrez 在溫哥華從事現場收音、對白剪輯、聲音設計、Foley、環境聲與混音。",
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
            `/${locale}/sound`,

        languages:
            getLanguageAlternates(
            "/sound"
            ),
    },

    openGraph: {
      title:
        `${content.title} | Sound by Juan`,

      description:
        content.description,

      url:
        `/${locale}/sound`,

      locale:
        locale === "es"
          ? "es_MX"
          : locale === "fr"
            ? "fr_CA"
            : "zh_TW",
    },
  };
}

export default SoundPage;