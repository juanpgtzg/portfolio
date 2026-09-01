export const languages = [
  "en",
  "es",
  "fr",
  "zh",
] as const;

export type Language =
  (typeof languages)[number];

export const localizedLanguages = [
  "es",
  "fr",
  "zh",
] as const;

export type LocalizedLanguage =
  (typeof localizedLanguages)[number];

export function isLanguage(
  value: string
): value is Language {
  return languages.includes(
    value as Language
  );
}

export function isLocalizedLanguage(
  value: string
): value is LocalizedLanguage {
  return localizedLanguages.includes(
    value as LocalizedLanguage
  );
}

export function getLanguageFromPathname(
  pathname: string
): Language {
  const firstSegment =
    pathname.split("/").filter(Boolean)[0];

  if (
    firstSegment === "es" ||
    firstSegment === "fr" ||
    firstSegment === "zh"
  ) {
    return firstSegment;
  }

  return "en";
}

export function stripLanguageFromPathname(
  pathname: string
) {
  const segments =
    pathname.split("/").filter(Boolean);

  const firstSegment = segments[0];

  if (
    firstSegment === "es" ||
    firstSegment === "fr" ||
    firstSegment === "zh"
  ) {
    segments.shift();
  }

  if (segments.length === 0) {
    return "/";
  }

  return `/${segments.join("/")}`;
}

export function localizePath(
  pathname: string,
  language: Language
) {
  const basePath =
    stripLanguageFromPathname(pathname);

  if (language === "en") {
    return basePath;
  }

  if (basePath === "/") {
    return `/${language}`;
  }

  return `/${language}${basePath}`;
}

export function htmlLanguage(
  language: Language
) {
  return language === "zh"
    ? "zh-Hant"
    : language;
}

export function getLanguageAlternates(
  pathname: string
) {
  const basePath =
    stripLanguageFromPathname(pathname);

  return {
    "en-CA": localizePath(
      basePath,
      "en"
    ),

    "es-MX": localizePath(
      basePath,
      "es"
    ),

    "fr-CA": localizePath(
      basePath,
      "fr"
    ),

    "zh-TW": localizePath(
      basePath,
      "zh"
    ),

    "x-default": localizePath(
      basePath,
      "en"
    ),
  };
}