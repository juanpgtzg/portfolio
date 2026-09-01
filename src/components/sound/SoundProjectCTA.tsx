"use client";

import ProjectCTA from "@/components/shared/ProjectCTA";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/data/translations";

export default function SoundProjectCTA() {
  const { language } = useLanguage();
  const t = translations[language].sound.cta;

  return (
    <ProjectCTA
      label={t.label}
      title={t.title}
      description={t.description}
      buttonLabel={t.button}
      note={t.note}
    />
  );
}