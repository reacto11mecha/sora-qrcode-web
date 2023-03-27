import puppeteer from "puppeteer";
import QRCode from "qrcode";
import fs from "fs/promises";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 100 * 60_000));

interface IParams {
  nama: string;
  qrId: string;
}

const genHtml = ({
  nama,
  qrId,
  qrString,
}: IParams & { qrString: string }) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>QR hak pilih ${nama} | ${qrId}</title>
</head>
<body>
    <main>
        <img src="${qrString}" />

        <h1>${nama}</h1>
    </main>

    <style>
        main {
            display: flex;
            flex-direction: column;
            width: 100vw;
            height: 100vh;
        }
    </style>
</body>
</html>`;

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
    await page.setViewport({ width: 950, height: 1450 });

    await page.setContent(genHtml({ qrId, qrString, nama }));

    // await sleep();

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
