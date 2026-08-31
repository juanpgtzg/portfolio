import type { Language } from "@/context/LanguageContext";

export const translations: Record<
  Language,
  {
    nav: {
      sound: string;
      podcast: string;
    };

    hero: {
      portfolioLabel: string;
      subtitle: string;
      selectSide: string;

      sideA: string;
      sideB: string;

      sound: string;
      podcast: string;

      sideASound: string;
      sideBPodcast: string;

      intro: string;

      enter: string;
      chooseSide: string;

      menu: string;
      selectAndEnter: string;
      stereo: string;

      madeInMexico: string;
    };
  }
> = {
  en: {
    nav: {
      sound: "Sound",
      podcast: "Podcast",
    },

    hero: {
      portfolioLabel: "Audio Portfolio / 2026",
      subtitle: "Sound & Podcast / Vancouver BC",
      selectSide: "Select a side",

      sideA: "Side A",
      sideB: "Side B",

      sound: "Sound",
      podcast: "Podcast",

      sideASound: "Side A / Sound",
      sideBPodcast: "Side B / Podcast",

      intro:
        "Audio engineer working across production sound, post-production and podcasting. Focused on telling stories through sound.",

      enter: "Enter",
      chooseSide: "Choose a side",

      menu: "Menu",
      selectAndEnter: "Select and press Enter",
      stereo: "Stereo",

      madeInMexico: "Made in Mexico",
    },
  },

  es: {
    nav: {
      sound: "Sonido",
      podcast: "Podcast",
    },

    hero: {
      portfolioLabel: "Portafolio de Audio / 2026",
      subtitle: "Sonido & Podcast / Vancouver BC",
      selectSide: "Elige un lado",

      sideA: "Lado A",
      sideB: "Lado B",

      sound: "Sonido",
      podcast: "Podcast",

      sideASound: "Lado A / Sonido",
      sideBPodcast: "Lado B / Podcast",

      intro:
        "Ingeniero de audio trabajando en sonido de producción, postproducción y podcasting. Enfocado en contar historias a través del sonido.",

      enter: "Entrar",
      chooseSide: "Elige un lado",

      menu: "Menú",
      selectAndEnter: "Selecciona y presiona Enter",
      stereo: "Estéreo",

      madeInMexico: "Hecho en México",
    },
  },

  fr: {
    nav: {
      sound: "Son",
      podcast: "Podcast",
    },

    hero: {
      portfolioLabel: "Portfolio Audio / 2026",
      subtitle: "Son & Podcast / Vancouver C.-B.",
      selectSide: "Choisissez une face",

      sideA: "Face A",
      sideB: "Face B",

      sound: "Son",
      podcast: "Podcast",

      sideASound: "Face A / Son",
      sideBPodcast: "Face B / Podcast",

      intro:
        "Ingénieur du son travaillant en prise de son, postproduction et podcast. Centré sur la narration par le son.",

      enter: "Entrer",
      chooseSide: "Choisissez une face",

      menu: "Menu",
      selectAndEnter: "Sélectionnez puis appuyez sur Enter",
      stereo: "Stéréo",

      madeInMexico: "Fabriqué au Mexique",
    },
  },

  zh: {
    nav: {
      sound: "聲音",
      podcast: "Podcast",
    },

    hero: {
      portfolioLabel: "聲音作品集 / 2026",
      subtitle: "聲音 & Podcast / 加拿大溫哥華",
      selectSide: "選擇一面",

      sideA: "A 面",
      sideB: "B 面",

      sound: "聲音",
      podcast: "Podcast",

      sideASound: "A 面 / 聲音",
      sideBPodcast: "B 面 / Podcast",

      intro:
        "音訊工程師，專注於現場收音、聲音後期與 Podcast 製作，以聲音為故事服務。",

      enter: "進入",
      chooseSide: "選擇一面",

      menu: "選單",
      selectAndEnter: "選擇後按下 Enter",
      stereo: "立體聲",

      madeInMexico: "墨西哥製",
    },
  },
};