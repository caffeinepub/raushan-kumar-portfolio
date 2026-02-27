import { useEffect, useRef, useState } from "react";

interface TerminalLine {
  type: "command" | "output" | "system";
  content: string;
  delay: number;
}

const terminalSequence: TerminalLine[] = [
  { type: "command", content: "whoami", delay: 500 },
  { type: "output", content: "raushankumarhacker", delay: 800 },
  { type: "command", content: "cat about.txt", delay: 1400 },
  { type: "output", content: "Cybersecurity Enthusiast | Ethical Hacker | SEO Strategist", delay: 1700 },
  { type: "command", content: "nmap -sV target.com", delay: 2500 },
  { type: "output", content: "Starting Nmap 7.94 ( https://nmap.org )", delay: 2800 },
  { type: "output", content: "PORT     STATE SERVICE  VERSION", delay: 3000 },
  { type: "output", content: "80/tcp   open  http     Apache 2.4.41", delay: 3200 },
  { type: "output", content: "443/tcp  open  ssl/http Apache 2.4.41", delay: 3400 },
  { type: "output", content: "22/tcp   open  ssh      OpenSSH 8.2", delay: 3600 },
  { type: "command", content: "python sqlscanner.py --target example.com", delay: 4400 },
  { type: "output", content: "[+] Testing SQL injection vectors...", delay: 4700 },
  { type: "output", content: "[+] Testing parameter: id", delay: 4900 },
  { type: "output", content: "[!] Vulnerability found in parameter: id", delay: 5200 },
  { type: "output", content: "[+] Payload: ' OR '1'='1", delay: 5500 },
  { type: "command", content: "cat flag.txt", delay: 6300 },
  { type: "output", content: "FLAG{ethical_hacker_in_the_matrix}", delay: 6600 },
  { type: "system", content: "[SUCCESS] Mission complete. Stay ethical.", delay: 7200 },
];

export default function TerminalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [userInput, setUserInput] = useState("");
  const [userLines, setUserLines] = useState<string[]>([]);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || hasStarted.current) return;
    hasStarted.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];

    terminalSequence.forEach((line, idx) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => Math.max(prev, idx + 1));
        if (terminalBodyRef.current) {
          terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
      }, line.delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userInput.trim()) {
      const cmd = userInput.trim();
      setUserLines((prev) => [
        ...prev,
        `> ${cmd}`,
        "Command logged. No shell access ;)",
      ]);
      setUserInput("");
    }
  };

  const getLineColor = (type: TerminalLine["type"]) => {
    if (type === "command") return "oklch(0.82 0.18 195)";
    if (type === "system") return "oklch(0.75 0.22 145)";
    return "oklch(0.7 0.04 240)";
  };

  const getPrefix = (type: TerminalLine["type"]) => {
    if (type === "command") return "$ ";
    if (type === "system") return "[*] ";
    return "    ";
  };

  return (
    <section
      id="terminal"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: "oklch(0.065 0.012 250)" }}
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.75 0.22 145 / 0.3), transparent)" }}
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Heading */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="inline-block text-xs font-mono tracking-[0.4em] mb-3 px-4 py-1 rounded"
            style={{
              color: "oklch(0.75 0.22 145)",
              border: "1px solid oklch(0.75 0.22 145 / 0.2)",
              background: "oklch(0.75 0.22 145 / 0.05)",
            }}
          >
            SYSTEM_TERMINAL
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold section-heading"
            style={{
              color: "oklch(0.92 0.02 200)",
              textShadow: "0 0 30px oklch(0.75 0.22 145 / 0.2)",
            }}
          >
            {"// SYSTEM TERMINAL"}
          </h2>
          <p className="mt-4 text-sm font-mono" style={{ color: "oklch(0.55 0.04 240)" }}>
            Interactive demo terminal — type a command below
          </p>
        </div>

        {/* Terminal window */}
        <div
          className={`rounded-xl overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{
            border: "1px solid oklch(0.75 0.22 145 / 0.3)",
            boxShadow: "0 0 40px oklch(0.75 0.22 145 / 0.1)",
          }}
        >
          {/* Terminal title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              background: "oklch(0.1 0.015 250)",
              borderBottom: "1px solid oklch(0.75 0.22 145 / 0.2)",
            }}
          >
            <div className="w-3 h-3 rounded-full" style={{ background: "oklch(0.65 0.22 25)" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "oklch(0.78 0.22 55)" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "oklch(0.75 0.22 145)" }} />
            <span className="ml-3 text-xs font-mono" style={{ color: "oklch(0.45 0.04 240)" }}>
              rk@cybermatrix:~ — bash
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalBodyRef}
            className="p-5 font-mono text-sm overflow-y-auto"
            style={{
              background: "oklch(0.07 0.01 250)",
              height: "360px",
              color: "oklch(0.7 0.04 240)",
            }}
          >
            {/* Intro line */}
            <div className="mb-3 text-xs" style={{ color: "oklch(0.45 0.04 240)" }}>
              Raushan Kumar CyberMatrix OS v2.4.1 — Type to interact. Press Enter to submit.
            </div>
            <div className="mb-3" style={{ color: "oklch(0.45 0.04 240)" }}>
              ──────────────────────────────────────
            </div>

            {/* Animated lines */}
            {terminalSequence.slice(0, visibleLines).map((line, lineIdx) => (
              <div key={`auto-line-${lineIdx}-${line.content.slice(0, 10)}`} className="mb-1 leading-relaxed">
                <span
                  className="text-xs"
                  style={{ color: "oklch(0.45 0.04 240)" }}
                >
                  {line.type === "command" ? "rk@cybermatrix:~" : ""}
                </span>
                <span style={{ color: getLineColor(line.type) }}>
                  {getPrefix(line.type)}{line.content}
                </span>
                {line.content === "FLAG{ethical_hacker_in_the_matrix}" && (
                  <span
                    className="ml-2 text-xs px-2 py-0.5 rounded"
                    style={{
                      background: "oklch(0.75 0.22 145 / 0.1)",
                      color: "oklch(0.75 0.22 145)",
                      border: "1px solid oklch(0.75 0.22 145 / 0.3)",
                    }}
                  >
                    🏴 CAPTURED
                  </span>
                )}
              </div>
            ))}

            {/* User-typed lines */}
            {userLines.map((line, lineIdx) => (
              <div
                key={`user-${lineIdx}-${line.slice(0, 8)}`}
                className="mb-1 leading-relaxed"
                style={{
                  color: line.startsWith(">")
                    ? "oklch(0.82 0.18 195)"
                    : "oklch(0.65 0.25 300)",
                }}
              >
                {line.startsWith(">") ? (
                  <>
                    <span style={{ color: "oklch(0.45 0.04 240)" }}>rk@cybermatrix:~</span>
                    <span style={{ color: "oklch(0.82 0.18 195)" }}> $ {line.slice(2)}</span>
                  </>
                ) : (
                  <span>{line}</span>
                )}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center mt-2">
              <span className="text-xs" style={{ color: "oklch(0.45 0.04 240)" }}>
                rk@cybermatrix:~
              </span>
              <span className="mx-1" style={{ color: "oklch(0.82 0.18 195)" }}>
                {" $"}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none font-mono text-sm border-none"
                style={{
                  color: "oklch(0.82 0.18 195)",
                  caretColor: "oklch(0.82 0.18 195)",
                }}
                placeholder="Type a command..."
                aria-label="Terminal input"
                autoComplete="off"
                spellCheck={false}
              />
              <span
                className="w-2 h-4 ml-0.5 animate-pulse"
                style={{ background: "oklch(0.82 0.18 195)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
