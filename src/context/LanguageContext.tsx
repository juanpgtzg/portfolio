"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  getLanguageFromPathname,
  htmlLanguage,
  localizePath,
} from "@/lib/i18n";

import type { Language } from "@/lib/i18n";

export type { Language } from "@/lib/i18n";

interface LanguageContextValue {
  language: Language;

  setLanguage: (
    language: Language
  ) => void;

  localizedPath: (
    path: string,
    languageOverride?: Language
  ) => string;
}

const LanguageContext =
  createContext<LanguageContextValue | null>(
    null
  );

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname =
    usePathname() || "/";

  const router = useRouter();

  const language =
    getLanguageFromPathname(pathname);

  useEffect(() => {
    document.documentElement.lang =
      htmlLanguage(language);

    document.documentElement.dataset.language =
      language;
  }, [language]);

  const getLocalizedPath = (
    path: string,
    languageOverride = language
  ) => {
    return localizePath(
      path,
      languageOverride
    );
  };

  const setLanguage = (
    newLanguage: Language
  ) => {
    if (newLanguage === language) {
      return;
    }

    const destination =
      localizePath(
        pathname,
        newLanguage
      );

    router.push(destination);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        localizedPath:
          getLocalizedPath,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}