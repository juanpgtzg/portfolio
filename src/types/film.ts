export interface Film {
  id: number;
  title: string;
  role: string;
  format: "Feature Film" | "Short Film" | "Web Miniseries";
  year: number;
  productionCompany: string;
  poster: string;
  link?: string;
}