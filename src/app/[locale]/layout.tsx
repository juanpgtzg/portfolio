import type {
  Metadata,
  ResolvingMetadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import {
  isLocalizedLanguage,
  localizedLanguages,
} from "@/lib/i18n";

const localeMetadata = {
  es: {
    openGraphLocale: "es_MX",
    image:
      "/images/seo/og-es.png",
    imageAlt:
      "Sound by Juan — Portafolio de Audio de Juan Gutierrez",
  },

  fr: {
    openGraphLocale: "fr_CA",
    image:
      "/images/seo/og-fr.png",
    imageAlt:
      "Sound by Juan — Portfolio Audio de Juan Gutierrez",
  },

  zh: {
    openGraphLocale: "zh_TW",
    image:
      "/images/seo/og-zh.png",
    imageAlt:
      "Sound by Juan — Juan Gutierrez 聲音作品集",
  },
} as const;

export function generateStaticParams() {
  return localizedLanguages.map(
    (locale) => ({
      locale,
    })
  );
}

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{
      locale: string;
    }>;
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale } =
    await params;

  if (
    !isLocalizedLanguage(locale)
  ) {
    return {};
  }

  const previous =
    await parent;

  const current =
    localeMetadata[locale];

  return {
    /*
     * Keep the existing SEO metadata
     * inherited from the root and
     * individual pages.
     *
     * Only replace the locale-specific
     * social preview information here.
     */
    openGraph: {
      ...previous.openGraph,

      locale:
        current.openGraphLocale,

      images: [
        {
          url: current.image,
          width: 1200,
          height: 630,
          alt: current.imageAlt,
        },
      ],
    },

    twitter: {
      ...previous.twitter,

      images: [
        current.image,
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}) {
  const { locale } =
    await params;

  if (
    !isLocalizedLanguage(locale)
  ) {
    notFound();
  }

  return (
    <div
      data-language={locale}
      className="contents"
    >
      {children}
    </div>
  );
}