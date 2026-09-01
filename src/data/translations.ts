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

    sound: {
      sideLabel: string;

      demoReel: {
        tag: string;
        title: string;
        description: string;
        disciplines: string;

        play: string;
        pause: string;
        mute: string;
        unmute: string;
        fullscreen: string;
        exitFullscreen: string;
      };

      productionSound: {
        tag: string;
        title: string;
        featuredCredits: string;
      };

      additionalCredits: {
        title: string;
        hoverToExplore: string;
      };

      postProduction: {
        tag: string;
        title: string;
        creditsTitle: string;
        projects: string;
        viewMore: string;
        viewLess: string;
        openProject: string;
      };

      onSet: {
        tag: string;
        title: string;
        fieldNotes: string;
        viewFullscreen: string;
        productionBehindScenes: string;
        close: string;
        previousPhoto: string;
        nextPhoto: string;
        viewPhoto: string;
        openFullscreen: string;
        photoAlt: string;
      };

      cta: {
        label: string;
        title: string;
        description: string;
        button: string;
        note: string;
      };
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

    sound: {
      sideLabel: "Side A",

      demoReel: {
        tag: "Sound Design / 01",
        title: "Demo Reel",
        description:
          "A selection of sound design work across dialogue, sound effects, Foley, ambience and mixing.",
        disciplines:
          "Sound Design / Dialogue / SFX / Foley / Ambiences / Mixing",

        play: "Play",
        pause: "Pause",
        mute: "Mute",
        unmute: "Unmute",
        fullscreen: "Fullscreen",
        exitFullscreen: "Exit Fullscreen",
      },

      productionSound: {
        tag: "Production Sound / 02",
        title: "Selected Film Work",
        featuredCredits: "Featured Credits",
      },

      additionalCredits: {
        title: "More Credits",
        hoverToExplore: "Hover to explore",
      },

      postProduction: {
        tag: "Post-Production / 03",
        title: "Post-Production Work",
        creditsTitle: "Post-Production Credits",
        projects: "Projects",
        viewMore: "View More",
        viewLess: "View Less",
        openProject: "Open project in a new tab",
      },

      onSet: {
        tag: "Behind the Sound",
        title: "On Set",
        fieldNotes: "Field Notes",
        viewFullscreen: "View Fullscreen",
        productionBehindScenes: "Production Sound / Behind the Scenes",
        close: "Close",
        previousPhoto: "Previous photo",
        nextPhoto: "Next photo",
        viewPhoto: "View photo",
        openFullscreen: "Open fullscreen",
        photoAlt: "Juan Gutierrez working on set — photo",
      },

      cta: {
        label: "Work With Me",
        title: "Need sound for your production?",
        description:
          "I’ve worked on more than 40 film productions across location sound and post-production. If you’re putting a project together, send me the details and I can help determine the sound setup you need and provide an estimate.",
        button: "Get in Touch",
        note:
          "Gear list, full film credits, resume and project estimates available upon request.",
      },
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

      enter: "Enter",
      chooseSide: "Elige un lado",

      menu: "Menú",
      selectAndEnter: "Selecciona y presiona Enter",
      stereo: "Estéreo",

      madeInMexico: "Hecho en México",
    },

    sound: {
      sideLabel: "Lado A",

      demoReel: {
        tag: "Diseño Sonoro / 01",
        title: "Demo Reel",
        description:
          "Una selección de trabajos de diseño sonoro, edición de diálogos, efectos, Foley, ambientes y mezcla.",
        disciplines:
          "Diseño Sonoro / Diálogos / SFX / Foley / Ambientes / Mezcla",

        play: "Reproducir",
        pause: "Pausar",
        mute: "Silenciar",
        unmute: "Activar sonido",
        fullscreen: "Pantalla completa",
        exitFullscreen: "Salir de pantalla completa",
      },

      productionSound: {
        tag: "Sonido Directo / 02",
        title: "Proyectos Destacados",
        featuredCredits: "Créditos Seleccionados",
      },

      additionalCredits: {
        title: "Más Créditos",
        hoverToExplore: "Pasa el cursor para explorar",
      },

      postProduction: {
        tag: "Postproducción / 03",
        title: "Trabajo de Postproducción",
        creditsTitle: "Créditos de Postproducción",
        projects: "Proyectos",
        viewMore: "Ver Más",
        viewLess: "Ver Menos",
        openProject: "Abrir proyecto en una pestaña nueva",
      },

      onSet: {
        tag: "Detrás del Sonido",
        title: "En Rodaje",
        fieldNotes: "Notas de Rodaje",
        viewFullscreen: "Ver en Pantalla Completa",
        productionBehindScenes: "Sonido Directo / Detrás de Cámaras",
        close: "Cerrar",
        previousPhoto: "Foto anterior",
        nextPhoto: "Foto siguiente",
        viewPhoto: "Ver foto",
        openFullscreen: "Abrir en pantalla completa",
        photoAlt: "Juan Gutierrez trabajando en rodaje — foto",
      },

      cta: {
        label: "Trabajemos Juntos",
        title: "¿Necesitas sonido para tu producción?",
        description:
          "He trabajado en más de 40 producciones audiovisuales, tanto en sonido directo como en postproducción. Si estás preparando un proyecto, cuéntame los detalles y puedo ayudarte a definir qué necesitas en sonido y preparar una cotización.",
        button: "Hablemos",
        note:
          "Lista de equipo, filmografía completa, CV y cotizaciones disponibles a solicitud.",
      },
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

      enter: "Enter",
      chooseSide: "Choisissez une face",

      menu: "Menu",
      selectAndEnter: "Sélectionnez puis appuyez sur Enter",
      stereo: "Stéréo",

      madeInMexico: "Fabriqué au Mexique",
    },

    sound: {
      sideLabel: "Face A",

      demoReel: {
        tag: "Conception Sonore / 01",
        title: "Demo Reel",
        description:
          "Une sélection de travaux en conception sonore, montage dialogue, effets sonores, Foley, ambiances et mixage.",
        disciplines:
          "Conception Sonore / Dialogue / SFX / Foley / Ambiances / Mixage",

        play: "Lecture",
        pause: "Pause",
        mute: "Couper le son",
        unmute: "Activer le son",
        fullscreen: "Plein écran",
        exitFullscreen: "Quitter le plein écran",
      },

      productionSound: {
        tag: "Son Direct / 02",
        title: "Projets Sélectionnés",
        featuredCredits: "Crédits Sélectionnés",
      },

      additionalCredits: {
        title: "Autres Crédits",
        hoverToExplore: "Survolez pour explorer",
      },
      postProduction: {
        tag: "Postproduction / 03",
        title: "Travail de Postproduction",
        creditsTitle: "Crédits de Postproduction",
        projects: "Projets",
        viewMore: "Voir Plus",
        viewLess: "Voir Moins",
        openProject: "Ouvrir le projet dans un nouvel onglet",
      },

      onSet: {
        tag: "Dans les Coulisses du Son",
        title: "En Tournage",
        fieldNotes: "Carnet de Tournage",
        viewFullscreen: "Voir en Plein Écran",
        productionBehindScenes: "Son Direct / Coulisses",
        close: "Fermer",
        previousPhoto: "Photo précédente",
        nextPhoto: "Photo suivante",
        viewPhoto: "Voir la photo",
        openFullscreen: "Ouvrir en plein écran",
        photoAlt: "Juan Gutierrez en tournage — photo",
      },

      cta: {
        label: "Travaillons Ensemble",
        title: "Besoin de son pour votre production ?",
        description:
          "J’ai travaillé sur plus de 40 productions audiovisuelles, en son direct comme en postproduction. Si vous préparez un projet, envoyez-moi les détails : je peux vous aider à définir vos besoins en son et vous proposer une estimation.",
        button: "Me Contacter",
        note:
          "Liste de matériel, filmographie complète, CV et estimations de projet disponibles sur demande.",
      },
    },
  },

  zh: {
    nav: {
      sound: "聲音",
      podcast: "播客",
    },

    hero: {
      portfolioLabel: "聲音作品集 / 2026",
      subtitle: "聲音 & 播客 / 加拿大溫哥華",
      selectSide: "選擇一面",

      sideA: "A 面",
      sideB: "B 面",

      sound: "聲音",
      podcast: "Podcast",

      sideASound: "A 面 / 聲音",
      sideBPodcast: "B 面 / 播客",

      intro:
        "音訊工程師，專注於現場收音、聲音後期與 Podcast 製作，以聲音為故事服務。",

      enter: "Enter",
      chooseSide: "選擇一面",

      menu: "選單",
      selectAndEnter: "選擇後按下 Enter",
      stereo: "立體聲",

      madeInMexico: "墨西哥製",
    },

    sound: {
      sideLabel: "A 面",

      demoReel: {
        tag: "聲音設計 / 01",
        title: "Demo Reel",
        description:
          "精選聲音設計作品，涵蓋對白剪輯、音效、Foley、環境聲與混音。",
        disciplines:
          "聲音設計 / 對白 / SFX / Foley / 環境聲 / 混音",

        play: "播放",
        pause: "暫停",
        mute: "靜音",
        unmute: "開啟聲音",
        fullscreen: "全螢幕",
        exitFullscreen: "退出全螢幕",
      },

      productionSound: {
        tag: "現場收音 / 02",
        title: "精選影視作品",
        featuredCredits: "精選作品",
      },

      additionalCredits: {
        title: "更多作品",
        hoverToExplore: "移動游標以瀏覽",
      },

      postProduction: {
        tag: "聲音後期 / 03",
        title: "聲音後期製作",
        creditsTitle: "聲音後期作品",
        projects: "項作品",
        viewMore: "展開更多",
        viewLess: "收起",
        openProject: "在新分頁開啟作品",
      },

      onSet: {
        tag: "收音幕後",
        title: "拍攝現場",
        fieldNotes: "現場紀錄",
        viewFullscreen: "全螢幕查看",
        productionBehindScenes: "現場收音 / 幕後花絮",
        close: "關閉",
        previousPhoto: "上一張照片",
        nextPhoto: "下一張照片",
        viewPhoto: "查看照片",
        openFullscreen: "以全螢幕開啟",
        photoAlt: "Juan Gutierrez 拍攝現場工作照",
      },

      cta: {
        label: "合作邀約",
        title: "正在為你的製作尋找聲音團隊嗎？",
        description:
          "我參與過 40 多部影視製作，工作涵蓋現場收音與聲音後期。如果你正在籌備新作品，歡迎告訴我製作需求，我可以協助規劃合適的收音配置並提供報價。",
        button: "聯絡我",
        note:
          "可依需求提供器材清單、完整影視經歷、履歷與專案報價。",
      },
    },
  },
};