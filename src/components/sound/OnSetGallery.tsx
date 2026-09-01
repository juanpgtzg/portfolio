import fs from "fs";
import path from "path";

import OnSetGalleryClient from "@/components/sound/OnSetGalleryClient";

export default function OnSetGallery() {
  const directory = path.join(
    process.cwd(),
    "public",
    "images",
    "on-set"
  );

  const files = fs
    .readdirSync(directory)
    .filter((file) =>
      /^set-\d+\.(jpg|jpeg|png|webp)$/i.test(file)
    )
    .sort((a, b) => {
      const numberA = Number(
        a.match(/\d+/)?.[0] ?? 0
      );

      const numberB = Number(
        b.match(/\d+/)?.[0] ?? 0
      );

      return numberA - numberB;
    });

  const photos = files.map((file, index) => {
    const filePath = path.join(
      directory,
      file
    );

    const stats = fs.statSync(filePath);

    return {
      src: `/images/on-set/${file}?v=${stats.mtimeMs}`,
      alt: `Juan Gutierrez working on a film set — photo ${
        index + 1
      }`,
    };
  });

  return (
    <OnSetGalleryClient photos={photos} />
  );
}