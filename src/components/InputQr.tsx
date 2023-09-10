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
    subpart: string;
  } | null>(null);

  return (
    <>
      <form
        className="gap-2 flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();

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
                setIdentity(null);
                setErr(true);
                setLoading(false);
              });
          }
        }}
      >
        <input
          value={qrId}
          onChange={(e) => setQrId(e.target.value.trim())}
          disabled={isLoading}
          placeholder="Masukan QR ID"
          className="w-full border p-2 h-12 rounded-md focus-visible:border-neutral-900 focus-visible:border-[0.2px]"
        />

        <button
          className={`w-full ${
            isLoading ? "bg-neutral-600" : "bg-neutral-900"
          } text-white rounded-lg p-1 hover:bg-neutral-600 hover:border-neutral-400 h-12 flex justify-center items-center`}
          disabled={isLoading || qrId === ""}
        >
          {isLoading ? (
            <AiOutlineLoading className="animate-spin" />
          ) : (
            <>Cek QR</>
          )}
        </button>
      </form>

      <div className="mt-3 text-xl">
        {isError ? (
          <div className="text-red-600 font-poppins">
            Peserta pemilihan tidak ditemukan!
          </div>
        ) : null}

        {!isError && !isLoading && identity ? (
          <div className="flex flex-col gap-3">
            <p>Peserta ditemukan:</p>
            <div>
              <table>
                <tbody>
                  <tr>
                    <td className="font-bold font-poppins">Nama</td>
                    <td className="font-bold sm:indent-1 md:indent-2 lg:indent-3">
                      :
                    </td>
                    <td className="indent-2 text-center sm:indent-1  md:indent-2 sm:text-left">
                      {identity.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold font-poppins">Bagian dari</td>
                    <td className="font-bold sm:indent-1 md:indent-2 lg:indent-3">
                      :
                    </td>
                    <td className="indent-2 text-center sm:indent-1  md:indent-2 sm:text-left">
                      {identity.subpart}
                    </td>
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
