import { useState, useRef, useEffect } from "react";

export const Canvas = ({ qrId }: { qrId: string }) => {
  const [isLoading, setLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    import("qrcode").then((qr) => {
      qr.toCanvas(canvasRef.current, qrId, { width: 300 });

      setTimeout(() => setLoading(false), 650);
    });
  }, []);

  return (
    <div className="flex justify-center">
      <canvas
        className={`w-[300px] h-[300px] ${isLoading ? "animate-pulse" : ""}`}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};
