import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const typingTexts = [
  "Cybersecurity Specialist",
  "Ethical Hacker",
  "SEO Strategist",
  "Tech Researcher",
  "Penetration Tester",
];

function useTypingEffect(texts: string[]) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const speed = isDeleting ? 50 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (!isDeleting && charIndex === current.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((i) => (i + 1) % texts.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts]);

  return displayText;
}

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const fontSize = 14;
    let cols: number[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const numCols = Math.floor(canvas.width / fontSize);
      cols = Array.from({ length: numCols }, () => Math.random() * canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(7, 7, 20, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;

      cols.forEach((y, i) => {
        const char = String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96));
        const x = i * fontSize;

        // Most characters green, some cyan near the top
        if (y < 50) {
          ctx.fillStyle = `rgba(130, 220, 255, ${0.8 - y / 60})`;
        } else {
          ctx.fillStyle = `rgba(57, 255, 150, ${0.4 + Math.random() * 0.3})`;
        }

        ctx.fillText(char, x, y);
        cols[i] = y > canvas.height && Math.random() > 0.975 ? 0 : y + fontSize;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30"
      style={{ zIndex: 0 }}
    />
  );
}

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function HeroSection() {
  const typedText = useTypingEffect(typingTexts);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "oklch(0.06 0.01 250)" }}
    >
      <MatrixCanvas />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.82 0.18 195 / 0.04) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, oklch(0.07 0.01 250), transparent)",
          zIndex: 1,
        }}
      />

      {/* Cyber grid */}
      <div
        className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full font-mono text-xs tracking-widest"
              style={{
                background: "oklch(0.82 0.18 195 / 0.08)",
                border: "1px solid oklch(0.82 0.18 195 / 0.3)",
                color: "oklch(0.82 0.18 195)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AVAILABLE FOR HIRE
            </div>

            {/* Main heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
            >
              <span style={{ color: "oklch(0.88 0.02 200)" }}>Hi, I'm </span>
              <br />
              <span
                style={{
                  color: "oklch(0.82 0.18 195)",
                  textShadow:
                    "0 0 20px oklch(0.82 0.18 195 / 0.5), 0 0 40px oklch(0.82 0.18 195 / 0.3)",
                }}
              >
                Raushan Kumar
              </span>
            </h1>

            {/* Typing effect */}
            <div className="h-10 mb-6 flex items-center justify-center lg:justify-start">
              <span
                className="text-lg sm:text-xl lg:text-2xl font-mono"
                style={{ color: "oklch(0.65 0.25 300)" }}
              >
                &lt;
              </span>
              <span
                className="text-lg sm:text-xl lg:text-2xl font-mono mx-2"
                style={{
                  color: "oklch(0.92 0.02 200)",
                  textShadow: "0 0 10px oklch(0.65 0.25 300 / 0.4)",
                }}
              >
                {typedText}
              </span>
              <span
                className="text-lg sm:text-xl lg:text-2xl font-mono border-r-2 animate-pulse"
                style={{
                  borderColor: "oklch(0.82 0.18 195)",
                  color: "oklch(0.65 0.25 300)",
                }}
              >
                /&gt;
              </span>
            </div>

            {/* Description */}
            <p
              className="text-base lg:text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              style={{ color: "oklch(0.6 0.04 240)" }}
            >
              Passionate cybersecurity enthusiast & ethical hacker specializing in
              penetration testing, vulnerability detection, and SEO strategy. Securing
              the digital world, one system at a time.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="btn-cyber px-8 py-3 rounded font-mono text-sm tracking-wider font-bold transition-all duration-300"
                style={{
                  background: "oklch(0.82 0.18 195)",
                  color: "oklch(0.06 0.01 250)",
                  boxShadow: "0 0 20px oklch(0.82 0.18 195 / 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 30px oklch(0.82 0.18 195 / 0.7)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 20px oklch(0.82 0.18 195 / 0.4)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                View Projects
              </button>

              <button
                type="button"
                onClick={() => scrollTo("contact")}
                className="btn-cyber px-8 py-3 rounded font-mono text-sm tracking-wider font-bold transition-all duration-300"
                style={{
                  background: "transparent",
                  border: "1px solid oklch(0.65 0.25 300 / 0.7)",
                  color: "oklch(0.65 0.25 300)",
                  boxShadow: "0 0 15px oklch(0.65 0.25 300 / 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 25px oklch(0.65 0.25 300 / 0.5)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "oklch(0.65 0.25 300)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 15px oklch(0.65 0.25 300 / 0.2)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "oklch(0.65 0.25 300 / 0.7)";
                }}
              >
                Contact Me
              </button>

              <a
                href="/resume.pdf"
                download
                className="btn-cyber px-8 py-3 rounded font-mono text-sm tracking-wider font-bold transition-all duration-300 text-center"
                style={{
                  background: "transparent",
                  border: "1px solid oklch(0.82 0.18 195 / 0.3)",
                  color: "oklch(0.75 0.04 240)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "oklch(0.82 0.18 195 / 0.6)";
                  e.currentTarget.style.color = "oklch(0.82 0.18 195)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "oklch(0.82 0.18 195 / 0.3)";
                  e.currentTarget.style.color = "oklch(0.75 0.04 240)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Download Resume
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 justify-center lg:justify-start">
              {[
                { value: "2+", label: "Years Experience" },
                { value: "10+", label: "Projects Built" },
                { value: "5+", label: "Vulnerabilities Found" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div
                    className="text-2xl font-bold font-mono"
                    style={{
                      color: "oklch(0.82 0.18 195)",
                      textShadow: "0 0 10px oklch(0.82 0.18 195 / 0.5)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono" style={{ color: "oklch(0.55 0.04 240)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Avatar */}
          <div className="shrink-0 relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Rotating ring */}
              <div
                className="absolute inset-0 rounded-full animate-spin"
                style={{
                  background: "conic-gradient(from 0deg, oklch(0.82 0.18 195 / 0.8), oklch(0.65 0.25 300 / 0.8), transparent, oklch(0.82 0.18 195 / 0.8))",
                  animationDuration: "8s",
                  padding: "2px",
                  borderRadius: "50%",
                }}
              />
              {/* Glow circles */}
              <div
                className="absolute inset-4 rounded-full"
                style={{
                  boxShadow: "0 0 40px oklch(0.82 0.18 195 / 0.3), inset 0 0 40px oklch(0.82 0.18 195 / 0.05)",
                  background: "oklch(0.08 0.015 250 / 0.8)",
                  border: "1px solid oklch(0.82 0.18 195 / 0.2)",
                }}
              />
              {/* Avatar image */}
              <img
                src="/assets/generated/hero-avatar-transparent.dim_400x400.png"
                alt="Raushan Kumar"
                className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-cover rounded-full"
                style={{ filter: "drop-shadow(0 0 20px oklch(0.82 0.18 195 / 0.4))" }}
              />
              {/* Corner decorations */}
              <div
                className="absolute -top-2 -right-2 w-6 h-6"
                style={{
                  borderTop: "2px solid oklch(0.82 0.18 195)",
                  borderRight: "2px solid oklch(0.82 0.18 195)",
                }}
              />
              <div
                className="absolute -bottom-2 -left-2 w-6 h-6"
                style={{
                  borderBottom: "2px solid oklch(0.65 0.25 300)",
                  borderLeft: "2px solid oklch(0.65 0.25 300)",
                }}
              />
            </div>

            {/* Floating badges */}
            <div
              className="absolute -left-4 top-1/4 px-3 py-2 rounded font-mono text-xs"
              style={{
                background: "oklch(0.1 0.015 250 / 0.9)",
                border: "1px solid oklch(0.82 0.18 195 / 0.4)",
                color: "oklch(0.82 0.18 195)",
                backdropFilter: "blur(8px)",
              }}
            >
              &lt;ethical_hacker/&gt;
            </div>
            <div
              className="absolute -right-4 bottom-1/4 px-3 py-2 rounded font-mono text-xs"
              style={{
                background: "oklch(0.1 0.015 250 / 0.9)",
                border: "1px solid oklch(0.65 0.25 300 / 0.4)",
                color: "oklch(0.65 0.25 300)",
                backdropFilter: "blur(8px)",
              }}
            >
              root@cybermatrix
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs font-mono tracking-widest" style={{ color: "oklch(0.45 0.04 240)" }}>
            SCROLL
          </span>
          <ChevronDown className="w-4 h-4" style={{ color: "oklch(0.45 0.04 240)" }} />
        </div>
      </div>
    </section>
  );
}
