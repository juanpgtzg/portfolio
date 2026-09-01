import type { SoundRoleKey } from "@/types/soundRoles";
import type { FilmFormatKey } from "@/types/filmFormats";

export interface Film {
  id: number;
  title: string;
  role: SoundRoleKey;
  format: FilmFormatKey;
  year: number;
  productionCompany: string;
  poster: string;
  link?: string;
}