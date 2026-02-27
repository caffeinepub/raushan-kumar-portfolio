import { useEffect, useState } from "react";

const bootLines = [
  { id: "init", text: "> Initializing RK::OS v2.4.1...", delay: 0 },
  { id: "sec", text: "> Loading security modules...", delay: 300 },
  { id: "net", text: "> Scanning network interfaces...", delay: 600 },
  { id: "enc", text: "> Mounting encrypted drives...", delay: 900 },
  { id: "vpn", text: "> Starting VPN tunnel...", delay: 1100 },
  { id: "fw", text: "> Bypassing firewall...", delay: 1300 },
  { id: "auth", text: "> Authenticating credentials...", delay: 1600 },
  { id: "ok", text: "> [OK] All systems nominal", delay: 1900 },
  { id: "access", text: "> ACCESS GRANTED", delay: 2200, highlight: true },
];

const matrixCols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const matrixChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete: _onComplete }: LoadingScreenProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((line) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line.id]);
      }, line.delay);
      timers.push(t);
    });

    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2400);
    timers.push(exitTimer);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center scanline transition-opacity duration-500 ${exiting ? "opacity-0" : "opacity-100"}`}
      style={{ background: "oklch(0.05 0.008 250)" }}
    >
      {/* Matrix background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {matrixCols.map((col) => (
          <div
            key={`col-${col}`}
            className="absolute top-0 text-xs font-mono opacity-20"
            style={{
              left: `${col * 5 + 1}%`,
              color: "oklch(0.75 0.22 145)",
              animation: `matrix-fall ${1.5 + (col % 3) * 0.5}s linear ${(col * 0.15) % 1}s infinite`,
              fontSize: "10px",
            }}
          >
            {matrixChars.map((row) => (
              <div key={`char-${col}-${row}`}>
                {String.fromCharCode(0x30a0 + ((col * 3 + row * 7) % 96))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Terminal box */}
      <div className="relative z-10 w-full max-w-2xl px-6">
        <div
          className="rounded-t-lg p-3 flex items-center gap-2"
          style={{
            background: "oklch(0.12 0.02 250)",
            border: "1px solid oklch(0.82 0.18 195 / 0.3)",
            borderBottom: "none",
          }}
        >
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
          <span className="ml-3 text-xs font-mono" style={{ color: "oklch(0.55 0.04 240)" }}>
            rk@cybermatrix:~$ boot_sequence
          </span>
        </div>

        <div
          className="p-6 rounded-b-lg min-h-[280px] font-mono text-sm"
          style={{
            background: "oklch(0.07 0.01 250 / 0.95)",
            border: "1px solid oklch(0.82 0.18 195 / 0.3)",
            boxShadow: "0 0 40px oklch(0.82 0.18 195 / 0.15)",
          }}
        >
          {bootLines.map((line) => (
            <div
              key={line.id}
              className={`mb-1 transition-all duration-300 ${
                visibleLines.includes(line.id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {line.highlight ? (
                <span
                  className="font-bold text-base"
                  style={{
                    color: "oklch(0.82 0.18 195)",
                    textShadow:
                      "0 0 10px oklch(0.82 0.18 195 / 0.8), 0 0 20px oklch(0.82 0.18 195 / 0.5)",
                  }}
                >
                  {line.text}
                </span>
              ) : (
                <span style={{ color: "oklch(0.75 0.22 145)" }}>{line.text}</span>
              )}
            </div>
          ))}

          {visibleLines.length > 0 && visibleLines.length < bootLines.length && (
            <div
              className="inline-block w-2 h-4 ml-1"
              style={{
                background: "oklch(0.75 0.22 145)",
                animation: "blink 1s infinite",
              }}
            />
          )}
        </div>

        <div className="text-center mt-8">
          <div
            className="text-4xl font-bold tracking-widest inline-block"
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              color: "oklch(0.82 0.18 195)",
              textShadow:
                "0 0 20px oklch(0.82 0.18 195 / 0.8), 0 0 40px oklch(0.82 0.18 195 / 0.5)",
            }}
          >
            RK
          </div>
          <div className="text-xs font-mono mt-1 tracking-[0.4em]" style={{ color: "oklch(0.55 0.04 240)" }}>
            RAUSHAN KUMAR
          </div>
        </div>
      </div>
    </div>
  );
}
