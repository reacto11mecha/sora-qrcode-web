import path from "path";
import fs from "fs";

import { ValidateData } from "../../utils/validator";

import type { APIRoute } from "astro";

const filePath = path.join(path.resolve(), "data/data-partisipan.json");

if (!fs.existsSync(filePath))
  throw new Error(
    "Tidak ada file data-partisipan.json di folder data! Silahkan cek kembali apabila file tersebut sudah ditambahkan!",
  );

const unvalidatedData = JSON.parse(fs.readFileSync(filePath, "utf8"));

const data = await ValidateData.parseAsync(unvalidatedData);

export const GET: APIRoute = ({ params }) => {
  const participant = data.find(
    (participant) => participant.qrId === params.id,
  );

  return new Response(JSON.stringify(participant));
};

export async function getStaticPaths() {
  return data.map((participant) => ({
    params: { id: participant.qrId },
  }));
}
