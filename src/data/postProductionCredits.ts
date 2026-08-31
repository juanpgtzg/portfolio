import { title } from "process";

export interface PostProductionCredit {
  title: string;
  role: string;
  link?: string;
  note?: string;
}

export const postProductionCredits: PostProductionCredit[] = [
  // Add your real credits here:
  {
    title: "Strava Vancouver",
    role: "Sound Designer & Sound Mixer"
  },

  {
    title: "FIFA World Cup 2026 Vancouver",
    role: "Sound Designer & Sound Mixer"
  },

  {
    title: "West Point Grey Academy",
    role: "Sound Designer & Sound Mixer"
  },

  {
    title: "Plan Jinn",
    role: "Sound Designer & Sound Mixer"
  },

  {
    title: "Shade Avoidance Response",
    role: "Sound Designer & Sound Mixer"
  },

  {
    title: "The Edge",
    role: "Dialogue Editor & Sound Mixer",
    link: "https://www.imdb.com/es-es/title/tt38913287/?ref_=ext_shr_lnk"
  },

  {
    title: "Stand In",
    role: "Sound Designer",
    link: "https://www.imdb.com/es-es/title/tt34076541/?ref_=ext_shr_lnk"
  },

  {
    title: "Bloody Slushie",
    role: "Sound Mixer"
  },

  {
    title: "No Lullaby",
    role: "Sound Designer",
    note: "Sound redesign — VFS final project"
  },

  {
    title: "Paper Samurai",
    role: "Game Audio Designer",
    note: "Game audio — VFS final project"
  },

  {
    title: "The Summit of the Gods",
    role: "Sound Designer",
    note: "Sound redesign — VFS project"
  },
];