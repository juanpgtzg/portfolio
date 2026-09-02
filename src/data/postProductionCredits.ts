import type { SoundRoleKey } from "@/types/soundRoles";
import type { PostProductionNoteKey } from "@/types/postProductionNotes";

export interface PostProductionCredit {
  id: string;
  title: string;
  roles: SoundRoleKey[];
  link?: string;
  note?: PostProductionNoteKey;

  reel?: {
    src: string;
    order: number;
  };
}

export const postProductionCredits: PostProductionCredit[] = [
  {
    id: "strava-vancouver",
    title: "Strava Vancouver",
    roles: [
      "soundDesignerSoundMixer",
    ],
  },

  {
    id: "fifa-world-cup-2026-vancouver",
    title: "FIFA World Cup 2026 Vancouver",
    roles: [
      "soundDesignerSoundMixer",
      "musicEditor",
    ],

    reel: {
      src: "/video/sound/reel/fifa-spec.mp4",
      order: 5,
    },
  },

  {
    id: "west-point-grey-academy",
    title: "West Point Grey Academy",
    roles: [
      "soundDesignerSoundMixer",
    ],
  },

  {
    id: "plan-jinn",
    title: "Plan Jinn",
    roles: [
      "soundDesignerSoundMixer",
    ],
  },

  {
    id: "shade-avoidance-response",
    title: "Shade Avoidance Response",
    roles: [
      "soundDesignerSoundMixer",
    ],

    reel: {
      src: "/video/sound/reel/shade-avoidance-response.mp4",
      order: 3,
    },
  },

  {
    id: "the-edge",
    title: "The Edge",
    roles: [
      "dialogueEditorSoundMixer",
    ],
    link: "https://www.imdb.com/es-es/title/tt38913287/?ref_=ext_shr_lnk",
  },

  {
    id: "stand-in",
    title: "Stand In",
    roles: [
      "soundDesigner",
    ],
    link: "https://www.imdb.com/es-es/title/tt34076541/?ref_=ext_shr_lnk",
  },

  {
    id: "bloody-slushie",
    title: "Bloody Slushie",
    roles: [
      "postSoundMixer",
    ],
  },

  {
    id: "no-lullaby",
    title: "No Lullaby",

    roles: [
      "adrRecordist",
      "foleyArtist",
      "soundDesigner",
      "dialogueEditor",
      "musicEditor",
      "postSoundMixer",
    ],

    note: "soundRedesignFinalProject",

    reel: {
      src: "/video/sound/reel/no-lullaby.mp4",
      order: 1,
    },
  },

  {
    id: "paper-samurai",
    title: "Paper Samurai",
    roles: [
      "gameAudioDesigner",
    ],
    note: "gameAudioFinalProject",

    reel: {
      src: "/video/sound/reel/paper-samurai.mp4",
      order: 2,
    },
  },

  {
    id: "summit-of-the-gods",
    title: "The Summit of the Gods",
    roles: [
      "adrRecordist",
      "foleyArtist",
      "soundDesigner",
      "postSoundMixer",
    ],
    note: "soundRedesignProject",

    reel: {
      src: "/video/sound/reel/summit-of-the-gods.mp4",
      order: 4,
    },
  },
];