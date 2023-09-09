import { useState } from "react";
import axios from "axios";

import { AiOutlineLoading } from "react-icons/ai/index";

export const InputQr = () => {
  const [qrId, setQrId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setErr] = useState(false);
  const [identity, setIdentity] = useState<{
    name: string;
    qrId: string;
  } | null>(null);

  return (
    <>
      <input
        value={qrId}
        onChange={(e) => setQrId(e.target.value)}
        disabled={isLoading}
        placeholder="Masukan QR ID"
        className="w-full border p-2 h-12 rounded-md focus-visible:border-neutral-900 focus-visible:border-[0.2px]"
      />

      <button
        className={`w-full ${
          isLoading ? "hover:bg-neutral-600" : "bg-neutral-900"
        } text-white rounded-lg p-1 hover:bg-neutral-600 hover:border-neutral-400 h-12 flex justify-center items-center`}
        disabled={isLoading || qrId === ""}
        onClick={() => {
          if (qrId !== "") {
            setLoading(true);

            axios
              .get(`/qr/${qrId}.json`)
              .then((res) => {
                setIdentity(res.data);
                setLoading(false);
                setErr(false);
              })
              .catch(() => {
                setLoading(false);
                setErr(true);
              });
          }
        }}
      >
        {isLoading ? (
          <AiOutlineLoading className="animate-spin" />
        ) : (
          <>Cek QR</>
        )}
      </button>

      <div className="mt-3 text-xl">
        {isError ? (
          <div className="text-red-600">Peserta pemilihan tidak ditemukan!</div>
        ) : null}

        {!isError && !isLoading && identity ? (
          <div className="flex flex-col gap-3">
            <p>Peserta ditemukan:</p>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <b>Nama</b>
                    </td>
                    <td>:</td>
                    <td>{identity.name}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>QR ID</b>
                    </td>
                    <td>:</td>
                    <td>{identity.qrId}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a className=" text-blue-700" href={`/qr/${identity.qrId}`}>
              Ke Halaman Download QR
            </a>
          </div>
        ) : null}
      </div>
    </>
  );
};
