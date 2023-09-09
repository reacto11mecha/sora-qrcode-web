import fs from "fs";
import path from "path";
import chalk from "chalk";
import satori from "satori";
import QRCode from "qrcode";
import fsp from "fs/promises";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";

import type { ReactNode } from "react";
import type { AstroIntegrationLogger } from "astro";

interface IParams {
  name: string;
  qrId: string;
}

const CutiveMonoPath = path.join(
  path.resolve(),
  "src/fonts/CutiveMono-Regular.ttf",
);
const RubikMediumPath = path.join(path.resolve(), "src/fonts/Rubik-Medium.ttf");

const CutiveMono = fs.readFileSync(CutiveMonoPath);
const RubikMedium = fs.readFileSync(RubikMediumPath);

const templateGenerator = (imgSrc: string, name: string, qrId: string) =>
  html(`
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; border: 0.8em solid #F78602; width: 100%; height: 100%;">
      <img src="${imgSrc}" style="width: 920px;" />

      <h1 style="text-align: center; font-size: 5.8em; width: 85%; align-self: center; font-family: 'Rubik', sans-serif; justify-content: center;">${name}</h1>

      <pre style="text-align: center; font-size: 4.5em; font-family: 'Cutive Mono', monospace;">${qrId}</pre>
    </div>
  `) as ReactNode;

export const createImage = async ({
  fileName,
  filePath,
  logger,
  name,
  qrId,
}: IParams & {
  filePath: string;
  fileName: string;
  logger: AstroIntegrationLogger;
}) => {
  try {
    const qrString = await QRCode.toDataURL(qrId, { width: 950 });
    const template = templateGenerator(qrString, name, qrId);

    const svg = await satori(template, {
      width: 950,
      height: 1450,
      fonts: [
        {
          name: "Cutive Mono",
          data: CutiveMono,
          weight: 400,
          style: "normal",
        },
        {
          name: "Rubik",
          data: RubikMedium,
          weight: 500,
          style: "normal",
        },
      ],
    });

    const resvg = new Resvg(svg, {
      background: "white",
      font: {
        fontFiles: [CutiveMonoPath, RubikMediumPath],
        loadSystemFonts: false,
      },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    await fsp.writeFile(filePath, pngBuffer);

    logger.info(`${chalk.green("done")} - ${fileName}\n`);
  } catch (error) {
    logger.error(error as string);

    process.exit();
  }
};
