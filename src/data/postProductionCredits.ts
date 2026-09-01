import type { SoundRoleKey } from "@/types/soundRoles";
import type { PostProductionNoteKey } from "@/types/postProductionNotes";

export interface PostProductionCredit {
  id: string;
  title: string;
  role: SoundRoleKey;
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
    role: "soundDesignerSoundMixer",
  },

  {
    id: "fifa-world-cup-2026-vancouver",
    title: "FIFA World Cup 2026 Vancouver",
    role: "soundDesignerSoundMixer",
  },

  {
    id: "west-point-grey-academy",
    title: "West Point Grey Academy",
    role: "soundDesignerSoundMixer",
  },

  {
    id: "plan-jinn",
    title: "Plan Jinn",
    role: "soundDesignerSoundMixer",
  },

  {
    id: "shade-avoidance-response",
    title: "Shade Avoidance Response",
    role: "soundDesignerSoundMixer",
  },

  {
    id: "the-edge",
    title: "The Edge",
    role: "dialogueEditorSoundMixer",
    link: "https://www.imdb.com/es-es/title/tt38913287/?ref_=ext_shr_lnk",
  },

  {
    id: "stand-in",
    title: "Stand In",
    role: "soundDesigner",
    link: "https://www.imdb.com/es-es/title/tt34076541/?ref_=ext_shr_lnk",
  },

  {
    id: "bloody-slushie",
    title: "Bloody Slushie",
    role: "postSoundMixer",
  },

  {
    id: "no-lullaby",
    title: "No Lullaby",
    role: "soundDesigner",
    note: "soundRedesignFinalProject",
  },

  {
    id: "paper-samurai",
    title: "Paper Samurai",
    role: "gameAudioDesigner",
    note: "gameAudioFinalProject",
  },

  {
    id: "summit-of-the-gods",
    title: "The Summit of the Gods",
    role: "soundDesigner",
    note: "soundRedesignProject",
  },
];