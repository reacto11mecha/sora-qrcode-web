import puppeteer from "puppeteer";
import QRCode from "qrcode";
import fs from "fs/promises";

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

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cutive+Mono&family=Rubik:wght@500&display=swap" rel="stylesheet" />

    <title>QR hak pilih ${nama} | ${qrId}</title>
</head>
<body>
    <main>
        <img src="${qrString}" />

        <h1>${nama}</h1>

        <pre>${qrId}</pre>
    </main>

    <style>
        main {
            display: flex;
            flex-direction: column;
            width: 100vw;
            height: 100vh;
        }

        h1 {
            text-align: center;
            font-size: 6em;
            width: 90%;
            align-self: center;
            font-family: 'Rubik', sans-serif;
        }
    
        pre {
            text-align: center;
            font-size: 4.5em;
            font-family: 'VT323', monospace;
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
    await page.setViewport({ width: 950, height: 1585 });

    await page.setContent(genHtml({ qrId, qrString, nama }));

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
