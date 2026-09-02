"use client";

import {
  Language,
  useLanguage,
} from "@/context/LanguageContext";

const languages: {
  code: Language;
  label: string;
}[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
  { code: "zh", label: "中文" },
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="flex items-center gap-1"
      aria-label="Language selector"
    >
      {languages.map((item, index) => (
        <div
          key={item.code}
          className="flex items-center gap-1"
        >
          {index > 0 && (
            <span
              aria-hidden="true"
              className="font-retro text-[7px] opacity-20"
            >
              /
            </span>
          )}

          <button
            type="button"
            onClick={() => setLanguage(item.code)}
            aria-pressed={language === item.code}
            className={`font-retro cursor-pointer text-[8px] font-bold tracking-[0.08em] transition-opacity ${
              item.code !== "zh"
                ? "uppercase"
                : ""
            } ${
              language === item.code
                ? "opacity-100"
                : "opacity-25 hover:opacity-60"
            }`}
          >
            {item.label}
          </button>
        </div>
      ))}
    </div>
  );
}