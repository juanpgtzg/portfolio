import {
  notFound,
} from "next/navigation";

import {
  isLocalizedLanguage,
  localizedLanguages,
} from "@/lib/i18n";

export function generateStaticParams() {
  return localizedLanguages.map(
    (locale) => ({
      locale,
    })
  );
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
  const { locale } = await params;

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