import Handlebars from "handlebars";
import puppeteer from "puppeteer";
import fs from "fs/promises";
import QRCode from "qrcode";
import normalFs from "fs";
import path from "path";

interface IParams {
  name: string;
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
  name,
  qrId,
}: IParams & { filePath: string; fileName: string }) => {
  try {
    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });

    const qrString = await QRCode.toDataURL(qrId, { width: 950 });

    const page = await browser.newPage();

    await page.setContent(template({ qrId, qrString, name }), {
      waitUntil: "networkidle0",
    });

    const card = await page.waitForSelector("div");
    const ss = await card!.screenshot();

    await fs.writeFile(filePath, ss);

    await page.close();
    await browser.close();

    console.log(`DONE CREATING IMAGE ${fileName}`);
  } catch (error) {
    console.error(error);

    process.exit();
  }
};
