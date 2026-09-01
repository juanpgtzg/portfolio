import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AudioProvider } from "@/components/audio/AudioProvider";
import { LanguageProvider } from "@/context/LanguageContext";

import {
  getLanguageAlternates,
} from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soundbyjuan.com"),

  title: {
    default:
      "Sound by Juan | Juan Gutierrez — Audio Engineer in Vancouver",
    template: "%s | Sound by Juan",
  },

  description:
    "Juan Gutierrez is a Vancouver-based audio engineer working in production sound, post-production audio, sound design, mixing, and podcast production.",

  applicationName: "Sound by Juan",

  authors: [
    {
      name: "Juan Gutierrez",
      url: "https://soundbyjuan.com",
    },
  ],

  creator: "Juan Gutierrez",
  publisher: "Juan Gutierrez",

  alternates: {
    canonical: "/",
    languages:
      getLanguageAlternates("/"),
  },

  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://soundbyjuan.com",
    siteName: "Sound by Juan",
    title:
      "Sound by Juan | Juan Gutierrez — Audio Engineer in Vancouver",
    description:
      "Production sound, post-production audio, sound design, mixing, and podcast production by Vancouver audio engineer Juan Gutierrez.",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Sound by Juan | Juan Gutierrez — Audio Engineer in Vancouver",
    description:
      "Production sound, post-production audio, sound design, mixing, and podcast production.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <LanguageProvider>
          <AudioProvider>
            {children}
          </AudioProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}