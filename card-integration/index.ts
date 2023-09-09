import { fileURLToPath } from "url";
import chalk from "chalk";
import path from "path";
import fs from "fs";

import type { AstroIntegration } from "astro";

import { createImage } from "./createImage";
import { ValidateData } from "../src/utils/validator";

const filePath = path.join(path.resolve(), "data/data-partisipan.json");

export const cardIntegration = (): AstroIntegration => {
  return {
    name: "satori-sora-integration",

    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const publicQr = path.join(fileURLToPath(dir), "img");

        if (!fs.existsSync(publicQr)) fs.mkdirSync(publicQr);

        if (!fs.existsSync(filePath))
          throw new Error(
            "Tidak ada file data-partisipan.json di folder data! Silahkan cek kembali apabila file tersebut sudah ditambahkan!",
          );

        const unvalidatedData = JSON.parse(fs.readFileSync(filePath, "utf8"));

        const participants = await ValidateData.parseAsync(unvalidatedData);

        for (const participant of participants) {
          const fileName = `hakpilih-${participant.name}-${participant.qrId}.png`;
          const fullPathToFile = path.join(publicQr, fileName);

          if (fs.existsSync(fullPathToFile)) continue;

          logger.info(`${chalk.yellow("create")} - ${fileName}`);

          await createImage({
            fileName,
            filePath: fullPathToFile,
            logger,
            ...participant,
          });
        }
      },
    },
  };
};
