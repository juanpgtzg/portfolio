import type { MetadataRoute } from "next";

import {
  getLanguageAlternates,
  localizePath,
  type Language,
} from "@/lib/i18n";

const baseUrl =
  "https://soundbyjuan.com";

const languages: Language[] = [
  "en",
  "es",
  "fr",
  "zh",
];

const pages = [
  {
    path: "/",
    priority: 1,
  },

  {
    path: "/sound",
    priority: 0.9,
  },

  {
    path: "/podcast",
    priority: 0.9,
  },
];

function absoluteUrl(path: string) {
  return `${baseUrl}${
    path === "/" ? "" : path
  }`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(
    ({ path, priority }) =>
      languages.map((language) => {
        const localizedPath =
          localizePath(
            path,
            language
          );

        const alternates =
          getLanguageAlternates(path);

        return {
          url: absoluteUrl(
            localizedPath
          ),

          lastModified:
            new Date(),

          changeFrequency:
            "monthly",

          priority,

          alternates: {
            languages:
              Object.fromEntries(
                Object.entries(
                  alternates
                ).map(
                  ([
                    locale,
                    alternatePath,
                  ]) => [
                    locale,
                    absoluteUrl(
                      alternatePath
                    ),
                  ]
                )
              ),
          },
        };
      })
  );
}