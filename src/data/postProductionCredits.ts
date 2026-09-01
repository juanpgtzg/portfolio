import type { SoundRoleKey } from "@/types/soundRoles";
import type { PostProductionNoteKey } from "@/types/postProductionNotes";

export interface PostProductionCredit {
  title: string;
  role: SoundRoleKey;
  link?: string;
  note?: PostProductionNoteKey;
}

export const postProductionCredits: PostProductionCredit[] = [
  {
    title: "Strava Vancouver",
    role: "soundDesignerSoundMixer",
  },

  {
    title: "FIFA World Cup 2026 Vancouver",
    role: "soundDesignerSoundMixer",
  },

  {
    title: "West Point Grey Academy",
    role: "soundDesignerSoundMixer",
  },

  {
    title: "Plan Jinn",
    role: "soundDesignerSoundMixer",
  },

  {
    title: "Shade Avoidance Response",
    role: "soundDesignerSoundMixer",
  },

  {
    title: "The Edge",
    role: "dialogueEditorSoundMixer",
    link: "https://www.imdb.com/es-es/title/tt38913287/?ref_=ext_shr_lnk",
  },

  {
    title: "Stand In",
    role: "soundDesigner",
    link: "https://www.imdb.com/es-es/title/tt34076541/?ref_=ext_shr_lnk",
  },

  {
    title: "Bloody Slushie",
    role: "postSoundMixer",
  },

  {
    title: "No Lullaby",
    role: "soundDesigner",
    note: "soundRedesignFinalProject",
  },

  {
    title: "Paper Samurai",
    role: "gameAudioDesigner",
    note: "gameAudioFinalProject",
  },

  {
    title: "The Summit of the Gods",
    role: "soundDesigner",
    note: "soundRedesignProject",
  },
];