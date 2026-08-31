"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Language = "en" | "es" | "fr" | "zh";

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext =
  createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>("en");

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem(
        "portfolio-language"
      ) as Language | null;

    if (
      savedLanguage === "en" ||
      savedLanguage === "es" ||
      savedLanguage === "fr" ||
      savedLanguage === "zh"
    ) {
      setLanguageState(savedLanguage);

      document.documentElement.lang =
        savedLanguage === "zh"
          ? "zh-Hant"
          : savedLanguage;

      document.documentElement.dataset.language =
        savedLanguage;
    }
  }, []);

  const setLanguage = (
    newLanguage: Language
  ) => {
    setLanguageState(newLanguage);

    localStorage.setItem(
      "portfolio-language",
      newLanguage
    );

    document.documentElement.lang =
      newLanguage === "zh"
        ? "zh-Hant"
        : newLanguage;

    document.documentElement.dataset.language =
      newLanguage;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
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