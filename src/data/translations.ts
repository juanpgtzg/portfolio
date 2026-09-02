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
        playbackPosition: string;
        technicalLabel: string;
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

      visualizer: {
        label: string;
        live: string;
        activeLabel: string;
        inactiveLabel: string;
      };

      roles: {
        locationSoundMixerBoomOperator: string;
        locationSoundMixer: string;
        boomOperator: string;
        soundAssistant: string;

        soundDesignerSoundMixer: string;
        dialogueEditorSoundMixer: string;
        soundDesigner: string;
        postSoundMixer: string;
        gameAudioDesigner: string;

        adrRecordist: string,
        foleyArtist: string,
        dialogueEditor: string,
        musicEditor: string,
        dialogueScriptEditor: string,
      };

      formats: {
        webMiniseries: string;
        featureFilm: string;
        shortFilm: string;
      };

      filmCard: {
        viewDetails: string;
        viewOnImdb: string;
        poster: string;
      };

      postProductionNotes: {
        soundRedesignFinalProject: string;
        gameAudioFinalProject: string;
        soundRedesignProject: string;
      };
    };

    podcast: {
      sideLabel: string;
      title: string;

      feature: {
        tag: string;
        subtitle: string;
        episodes: string;
        myRole: string;
        project: string;
        highlights: string;
        listenOn: string;
        artworkAlt: string;

        roles: string[];
        services: string[];

        description: string;
        community: string;

        highlightsList: string[];
      };

      trailer: {
        label: string;
        play: string;
        pause: string;
        playbackPosition: string;
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

        play: "Play demo reel",
        pause: "Pause demo reel",
        mute: "Mute demo reel",
        unmute: "Turn sound on",
        fullscreen: "View demo reel fullscreen",
        exitFullscreen: "Exit fullscreen",
        playbackPosition: "Demo reel playback position",
        technicalLabel: "Sound Design Reel",
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

      visualizer: {
        label: "Audio Response",
        live: "Live",
        activeLabel: "Audio response active",
        inactiveLabel: "Audio response inactive",
      },

      roles: {
        locationSoundMixerBoomOperator:
          "Location Sound Mixer & Boom Operator",

        locationSoundMixer:
          "Location Sound Mixer",

        boomOperator:
          "Boom Operator",

        soundAssistant:
          "Sound Assistant",

        soundDesignerSoundMixer:
          "Sound Designer & Sound Mixer",

        dialogueEditorSoundMixer:
          "Dialogue Editor & Sound Mixer",

        soundDesigner:
          "Sound Designer",

        postSoundMixer:
          "Sound Mixer",

        gameAudioDesigner:
          "Game Audio Designer",

        adrRecordist: "ADR Recordist",
        foleyArtist: "Foley Artist",
        dialogueEditor: "Dialogue Editor",
        musicEditor: "Music Editor",
        dialogueScriptEditor: "Dialogue Script Editor",
      },

      formats: {
        webMiniseries: "Web Miniseries",
        featureFilm: "Feature Film",
        shortFilm: "Short Film",
      },

      filmCard: {
        viewDetails: "View Details",
        viewOnImdb: "View on IMDb",
        poster: "Poster",
      },

      postProductionNotes: {
        soundRedesignFinalProject:
          "Sound redesign — VFS final project",

        gameAudioFinalProject:
          "Game audio — VFS final project",

        soundRedesignProject:
          "Sound redesign — VFS project",
      },
    },

    podcast: {
      sideLabel: "Side B",
      title: "Podcast",

      feature: {
        tag: "Production Notes / 01",

        subtitle:
          "Environment · Climate Change · Sustainability",

        episodes: "Episodes",

        myRole: "My Role",

        project: "Project",

        highlights: "Highlights",

        listenOn: "Listen on",

        artworkAlt: "Podcast cover artwork",

        roles: [
          "Co-Founder",
          "Podcast Co-Producer & Editor",
          "Content Creator",
        ],

        services: [
          "Production",
          "Recording",
          "Editing",
          "Original Music",
          "Content Strategy",
        ],

        description:
          "Villam is an environmental communication and consulting organization that I co-founded. My work spanned content strategy, community management and podcast production, including co-producing and editing the Villam Podcast and creating original music for the show.",

        community:
          "In less than two years, Villam grew a community of more than 10,000 followers on Instagram and 7,000 on Facebook.",

        highlightsList: [
          "#1 on Apple Podcasts in the Nature category in Mexico, Argentina and Peru",
          "Top 10 on Spotify Mexico in the Science category",
          "An environmental infographic reached more than 4.5 million people",
          "Delivered talks, interviews and workshops on climate change for companies and institutions, including Tecnológico de Monterrey",
        ],
      },

      trailer: {
        label: "Audio / Trailer",
        play: "Play Villam trailer",
        pause: "Pause Villam trailer",
        playbackPosition: "Trailer playback position",
      },

      cta: {
        label: "Work With Me",
        title: "Ready to build your podcast?",
        description:
          "From shaping the concept and developing the content to recording, editing, original music, and final delivery, I can help launch a podcast from the ground up or take an existing show further.",
        button: "Get in Touch",
        note:
          "Podcast production, editing, content development, and project estimates available upon request.",
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

        play: "Reproducir demo reel",
        pause: "Pausar demo reel",
        mute: "Silenciar demo reel",
        unmute: "Activar sonido",
        fullscreen: "Ver demo reel en pantalla completa",
        exitFullscreen: "Salir de pantalla completa",
        playbackPosition: "Posición de reproducción del demo reel",
        technicalLabel: "Reel de Diseño Sonoro",
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

      visualizer: {
        label: "Reacción al Audio",
        live: "En Vivo",
        activeLabel: "Visualizador de audio activo",
        inactiveLabel: "Visualizador de audio inactivo",
      },

      roles: {
        locationSoundMixerBoomOperator:
          "Sonidista y Microfonista",

        locationSoundMixer:
          "Sonidista",

        boomOperator:
          "Microfonista",

        soundAssistant:
          "Asistente de Sonido",

        soundDesignerSoundMixer:
          "Mezcla y Diseño de Sonido",

        dialogueEditorSoundMixer:
          "Edición de Diálogo y Mezcla",

        soundDesigner:
          "Diseño de Sonido",

        postSoundMixer:
          "Mezcla de Sonido",

        gameAudioDesigner:
          "Diseño de Audio para Videojuegos",

        adrRecordist: "Técnico de Grabación ADR",
        foleyArtist: "Artista Foley",
        dialogueEditor: "Editor de Diálogo",
        musicEditor: "Editor de Música",
        dialogueScriptEditor: "Editor de Guion",
      },

      formats: {
        webMiniseries: "Miniserie Web",
        featureFilm: "Largometraje",
        shortFilm: "Cortometraje",
      },

      filmCard: {
        viewDetails: "Ver Detalles",
        viewOnImdb: "Ver en IMDb",
        poster: "Póster",
      },

      postProductionNotes: {
        soundRedesignFinalProject:
          "Rediseño sonoro — Proyecto final de VFS",

        gameAudioFinalProject:
          "Audio para videojuegos — Proyecto final de VFS",

        soundRedesignProject:
          "Rediseño sonoro — Proyecto de VFS",
      },
    },

    podcast: {
      sideLabel: "Lado B",
      title: "Podcast",

      feature: {
        tag: "Notas de Producción / 01",

        subtitle:
          "Medioambiente · Cambio Climático · Sustentabilidad",

        episodes: "Episodios",

        myRole: "Mi Participación",

        project: "El Proyecto",

        highlights: "Logros Destacados",

        listenOn: "Escuchar en",

        artworkAlt: "Portada del podcast",

        roles: [
          "Cofundador",
          "Coproductor y Editor del Podcast",
          "Creador de Contenido",
        ],

        services: [
          "Producción",
          "Grabación",
          "Edición",
          "Música Original",
          "Estrategia de Contenidos",
        ],

        description:
          "Villam es una organización de comunicación y consultoría ambiental que cofundé. Mi trabajo abarcó estrategia de contenidos, gestión de comunidad y producción de podcast, incluyendo la coproducción y edición de Villam Podcast, además de la creación de música original para el programa.",

        community:
          "En menos de dos años, Villam construyó una comunidad de más de 10,000 seguidores en Instagram y 7,000 en Facebook.",

        highlightsList: [
          "#1 en Apple Podcasts, categoría Naturaleza, en México, Argentina y Perú",
          "Top 10 en Spotify México, categoría Ciencia",
          "Una infografía ambiental alcanzó a más de 4.5 millones de personas",
          "Charlas, entrevistas y talleres sobre cambio climático para empresas e instituciones, incluyendo el Tecnológico de Monterrey",
        ],
      },

      trailer: {
        label: "Audio / Tráiler",
        play: "Reproducir tráiler de Villam",
        pause: "Pausar tráiler de Villam",
        playbackPosition: "Posición de reproducción del tráiler",
      },

      cta: {
        label: "Trabajemos Juntos",
        title: "¿Quieres crear o llevar más lejos tu podcast?",
        description:
          "Puedo acompañar el proyecto desde la idea y el desarrollo de contenidos hasta la grabación, edición, música original y entrega final, ya sea para lanzar un podcast desde cero o fortalecer uno que ya existe.",
        button: "Hablemos",
        note:
          "Producción y edición de podcast, desarrollo de contenidos y cotizaciones disponibles a solicitud.",
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

        play: "Lire la bande démo",
        pause: "Mettre la bande démo en pause",
        mute: "Couper le son",
        unmute: "Rétablir le son",
        fullscreen: "Voir la bande démo en plein écran",
        exitFullscreen: "Quitter le plein écran",
        playbackPosition: "Position de lecture de la bande démo",
        technicalLabel: "Bande Démo / Conception Sonore",
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

      visualizer: {
        label: "Réaction au Son",
        live: "En Direct",
        activeLabel: "Visualisation audio active",
        inactiveLabel: "Visualisation audio inactive",
      },

      roles: {
        locationSoundMixerBoomOperator:
          "Chef Opérateur du Son & Perchman",

        locationSoundMixer:
          "Chef Opérateur du Son",

        boomOperator:
          "Perchman",

        soundAssistant:
          "Assistant Son",

        soundDesignerSoundMixer:
          "Conception Sonore & Mixage",

        dialogueEditorSoundMixer:
          "Montage Dialogue & Mixage",

        soundDesigner:
          "Conception Sonore",

        postSoundMixer:
          "Mixage",

        gameAudioDesigner:
          "Conception Audio pour Jeu Vidéo",

        adrRecordist: "Ingénieur d’Enregistrement ADR",
        foleyArtist: "Bruiteur",
        dialogueEditor: "Monteur Dialogue",
        musicEditor: "Monteur Musique",
        dialogueScriptEditor: "Monteur du Script Dialogue",
      },

      formats: {
        webMiniseries: "Mini-série Web",
        featureFilm: "Long Métrage",
        shortFilm: "Court Métrage",
      },

      filmCard: {
        viewDetails: "Voir les Détails",
        viewOnImdb: "Voir sur IMDb",
        poster: "Affiche",
      },

      postProductionNotes: {
        soundRedesignFinalProject:
          "Recréation sonore — Projet de fin d’études VFS",

        gameAudioFinalProject:
          "Audio pour jeu vidéo — Projet de fin d’études VFS",

        soundRedesignProject:
          "Recréation sonore — Projet VFS",
      },
    },

    podcast: {
      sideLabel: "Face B",
      title: "Podcast",

      feature: {
        tag: "Notes de Production / 01",

        subtitle:
          "Environnement · Changement Climatique · Développement Durable",

        episodes: "Épisodes",

        myRole: "Mon Rôle",

        project: "Le Projet",

        highlights: "Temps Forts",

        listenOn: "Écouter sur",

        artworkAlt: "Visuel du podcast",

        roles: [
          "Cofondateur",
          "Coproducteur & Monteur du Podcast",
          "Créateur de Contenu",
        ],

        services: [
          "Production",
          "Enregistrement",
          "Montage",
          "Musique Originale",
          "Stratégie Éditoriale",
        ],

        description:
          "Villam est une organisation de communication et de conseil spécialisée dans les enjeux environnementaux que j’ai cofondée. J’y ai travaillé sur la stratégie éditoriale, l’animation de communauté et la production du podcast, notamment en coproduisant et montant Villam Podcast et en composant sa musique originale.",

        community:
          "En moins de deux ans, Villam a développé une communauté de plus de 10 000 abonnés sur Instagram et 7 000 sur Facebook.",

        highlightsList: [
          "#1 sur Apple Podcasts dans la catégorie Nature au Mexique, en Argentine et au Pérou",
          "Top 10 sur Spotify Mexique dans la catégorie Science",
          "Une infographie environnementale a touché plus de 4,5 millions de personnes",
          "Conférences, entretiens et ateliers sur le changement climatique pour des entreprises et institutions, dont le Tecnológico de Monterrey",
        ],
      },

      trailer: {
        label: "Audio / Bande-annonce",
        play: "Lire la bande-annonce de Villam",
        pause: "Mettre la bande-annonce de Villam en pause",
        playbackPosition: "Position de lecture de la bande-annonce",
      },

      cta: {
        label: "Travaillons Ensemble",
        title: "Envie de créer ou de faire évoluer votre podcast ?",
        description:
          "Je peux accompagner le projet de la conception éditoriale à la livraison finale : développement du contenu, enregistrement, montage, musique originale et production audio, que ce soit pour lancer une nouvelle émission ou faire évoluer un podcast existant.",
        button: "Me Contacter",
        note:
          "Production et montage de podcast, développement éditorial et estimations de projet disponibles sur demande.",
      },
    },
  },

  zh: {
    nav: {
      sound: "影視聲音",
      podcast: "播客",
    },

    hero: {
      portfolioLabel: "聲音作品集 / 2026",
      subtitle: "影視聲音 & 播客 / 加拿大溫哥華",
      selectSide: "選擇一面",

      sideA: "A 面 / 影視聲音",
      sideB: "B 面 / 播客",

      sound: "影視聲音",
      podcast: "播客",

      sideASound: "A 面 / 聲音",
      sideBPodcast: "B 面 / 播客",

      intro:
        "音訊工程師，專注於現場收音、聲音後期與 播客 製作，以聲音為故事服務。",

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

        play: "播放 Demo Reel",
        pause: "暫停 Demo Reel",
        mute: "關閉聲音",
        unmute: "開啟聲音",
        fullscreen: "以全螢幕觀看 Demo Reel",
        exitFullscreen: "退出全螢幕",
        playbackPosition: "Demo Reel 播放進度",
        technicalLabel: "聲音設計作品",
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

      visualizer: {
        label: "音訊反應",
        live: "即時",
        activeLabel: "音訊視覺反應已啟用",
        inactiveLabel: "音訊視覺反應未啟用",
      },

      roles: {
        locationSoundMixerBoomOperator:
          "現場收音師與吊桿收音師",

        locationSoundMixer:
          "現場收音師",

        boomOperator:
          "吊桿收音師",

        soundAssistant:
          "收音助理",

        soundDesignerSoundMixer:
          "聲音設計與混音",

        dialogueEditorSoundMixer:
          "對白剪輯與混音",

        soundDesigner:
          "聲音設計",

        postSoundMixer:
          "混音",

        gameAudioDesigner:
          "遊戲音訊設計",

        adrRecordist: "ADR 錄音師",
        foleyArtist: "擬音師",
        dialogueEditor: "對白剪輯",
        musicEditor: "音樂剪輯",
        dialogueScriptEditor: "對白腳本編輯",
      },

      formats: {
        webMiniseries: "網路迷你影集",
        featureFilm: "劇情長片",
        shortFilm: "短片",
      },

      filmCard: {
        viewDetails: "查看詳情",
        viewOnImdb: "前往 IMDb 查看",
        poster: "海報",
      },

      postProductionNotes: {
        soundRedesignFinalProject:
          "聲音重新設計 — VFS 畢業專案",

        gameAudioFinalProject:
          "遊戲音訊 — VFS 畢業專案",

        soundRedesignProject:
          "聲音重新設計 — VFS 專案",
      },
    },

    podcast: {
      sideLabel: "B 面",
      title: "播客",

      feature: {
        tag: "製作筆記 / 01",

        subtitle:
          "環境 · 氣候變遷 · 永續發展",

        episodes: "集",

        myRole: "我的工作",

        project: "專案介紹",

        highlights: "重要成果",

        listenOn: "收聽平台",

        artworkAlt: "播客封面",

        roles: [
          "共同創辦人",
          "播客共同製作與剪輯",
          "內容創作者",
        ],

        services: [
          "製作",
          "錄音",
          "剪輯",
          "原創音樂",
          "內容企劃",
        ],

        description:
          "Villam 是由我共同創辦的環境傳播與顧問組織。我的工作涵蓋內容企劃、社群經營與播客製作，包括共同製作與剪輯 Villam Podcast，並為節目創作原創音樂。",

        community:
          "不到兩年內，Villam 在 Instagram 累積超過 10,000 名追蹤者，Facebook 也建立了超過 7,000 人的社群。",

        highlightsList: [
          "在墨西哥、阿根廷與秘魯的 Apple Podcasts「自然」類別排名第 1",
          "進入 Spotify 墨西哥「科學」類別前 10 名",
          "一則環境議題資訊圖觸及超過 450 萬人",
          "為企業與教育機構舉辦氣候變遷講座、訪談與工作坊，包括 Tecnológico de Monterrey",
        ],
      },

      trailer: {
        label: "音訊 / 預告",
        play: "播放 Villam 預告",
        pause: "暫停 Villam 預告",
        playbackPosition: "Villam 預告播放進度",
      },

      cta: {
        label: "合作邀約",
        title: "想打造一檔新的播客，或讓現有節目更完整嗎？",
        description:
          "從節目概念、內容企劃到錄音、剪輯、原創音樂與最終製作，我可以協助你從零打造一檔播客，也能為既有節目提升聲音與內容品質。",
        button: "聯絡我",
        note:
          "可依需求提供播客製作、剪輯、內容企劃與專案報價。",
      },
    },
  },
};