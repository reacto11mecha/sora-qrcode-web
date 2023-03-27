import Handlebars from "handlebars";
import puppeteer from "puppeteer";
import fs from "fs/promises";
import QRCode from "qrcode";
import normalFs from "fs";
import path from "path";

interface IParams {
  nama: string;
  qrId: string;
}

const templateString = normalFs.readFileSync(
  path.join(path.resolve(), "src/layouts/Gambar.handlebars"),
  "utf8"
);
const template = Handlebars.compile<IParams & { qrString: string }>(
  templateString
);

export const createImage = async ({
  fileName,
  filePath,
  nama,
  qrId,
}: IParams & { filePath: string; fileName: string }) => {
  try {
    const browser = await puppeteer.launch({});

    const qrString = await QRCode.toDataURL(qrId, { width: 950 });

    const page = await browser.newPage();
    await page.setViewport({ width: 950, height: 1655 });

    await page.setContent(template({ qrId, qrString, nama }), {
      waitUntil: "networkidle0",
    });

    const ss = await page.screenshot();

    await fs.writeFile(filePath, ss);

    await page.close();
    await browser.close();

    console.log(`DONE CREATING IMAGE ${fileName}`);
  } catch (error) {
    console.error(error);

    process.exit();
  }
};
