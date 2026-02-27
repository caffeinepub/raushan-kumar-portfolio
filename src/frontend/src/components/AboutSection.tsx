import { useEffect, useRef, useState } from "react";
import { User, Shield, Code2, TrendingUp } from "lucide-react";

const skills = [
  { label: "Penetration Testing", value: 85, color: "oklch(0.82 0.18 195)" },
  { label: "SQL Injection / XSS", value: 80, color: "oklch(0.65 0.25 300)" },
  { label: "SEO & Digital Marketing", value: 88, color: "oklch(0.82 0.18 195)" },
  { label: "Python", value: 75, color: "oklch(0.65 0.25 300)" },
  { label: "Linux", value: 82, color: "oklch(0.82 0.18 195)" },
  { label: "Network Security", value: 78, color: "oklch(0.65 0.25 300)" },
];

const highlights = [
  { icon: Shield, label: "Cybersecurity", desc: "Penetration testing & vuln detection" },
  { icon: Code2, label: "Development", desc: "Python, Bash, Web technologies" },
  { icon: TrendingUp, label: "SEO Strategy", desc: "Technical SEO & analytics" },
  { icon: User, label: "Researcher", desc: "Bug bounty & CTF competitions" },
];

function SkillBar({ label, value, color, animate }: { label: string; value: number; color: string; animate: boolean }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(value), 200);
      return () => clearTimeout(t);
    }
  }, [animate, value]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-mono" style={{ color: "oklch(0.78 0.04 240)" }}>
          {label}
        </span>
        <span className="text-sm font-mono font-bold" style={{ color }}>
          {animate ? `${value}%` : "0%"}
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: "oklch(0.14 0.02 260)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${color}, ${color.replace("0.82", "0.65").replace("0.65", "0.82")})`,
            boxShadow: `0 0 10px ${color.replace(")", " / 0.6)")}`,
            transitionDuration: "1.2s",
          }}
        />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: "oklch(0.07 0.01 250)" }}
    >
      {/* Background accents */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.82 0.18 195 / 0.3), transparent)" }}
      />
      <div
        className="absolute -left-32 top-1/2 w-64 h-64 rounded-full pointer-events-none opacity-10"
        style={{ background: "oklch(0.65 0.25 300)", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="inline-block text-xs font-mono tracking-[0.4em] mb-3 px-4 py-1 rounded"
            style={{
              color: "oklch(0.82 0.18 195)",
              border: "1px solid oklch(0.82 0.18 195 / 0.2)",
              background: "oklch(0.82 0.18 195 / 0.05)",
            }}
          >
            ABOUT_ME.exe
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold section-heading"
            style={{
              color: "oklch(0.92 0.02 200)",
              textShadow: "0 0 30px oklch(0.82 0.18 195 / 0.2)",
            }}
          >
            Who Am I?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Summary + highlights */}
          <div
            className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <p
              className="text-base lg:text-lg leading-relaxed mb-8"
              style={{ color: "oklch(0.65 0.04 240)" }}
            >
              Passionate cybersecurity enthusiast and ethical hacker with expertise in{" "}
              <span className="font-semibold" style={{ color: "oklch(0.82 0.18 195)" }}>
                penetration testing
              </span>
              , vulnerability detection, and SEO strategy. I specialize in identifying
              critical security flaws like{" "}
              <span className="font-semibold" style={{ color: "oklch(0.65 0.25 300)" }}>
                SQL Injection
              </span>{" "}
              and{" "}
              <span className="font-semibold" style={{ color: "oklch(0.65 0.25 300)" }}>
                XSS vulnerabilities
              </span>
              , helping organizations strengthen their digital defenses. With experience as
              an SEO Executive, I blend technical security knowledge with digital marketing
              expertise to deliver comprehensive solutions.
            </p>

            {/* Highlight cards */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="p-4 rounded-lg glass-card group transition-all duration-300"
                  style={{
                    border: "1px solid oklch(0.82 0.18 195 / 0.15)",
                  }}

                >
                  <h.icon
                    className="w-5 h-5 mb-2"
                    style={{ color: "oklch(0.82 0.18 195)" }}
                  />
                  <div className="text-sm font-bold font-mono" style={{ color: "oklch(0.88 0.02 200)" }}>
                    {h.label}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "oklch(0.55 0.04 240)" }}>
                    {h.desc}
                  </div>
                </div>
              ))}
            </div>

            {/* Location / status */}
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-mono" style={{ color: "oklch(0.65 0.04 240)" }}>
                  Available for work
                </span>
              </div>
              <div className="text-sm font-mono" style={{ color: "oklch(0.55 0.04 240)" }}>
                📍 India
              </div>
            </div>
          </div>

          {/* Right: Skill bars */}
          <div
            className={`transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div
              className="p-6 rounded-xl glass-card"
              style={{
                border: "1px solid oklch(0.65 0.25 300 / 0.2)",
                boxShadow: "0 0 30px oklch(0.65 0.25 300 / 0.05)",
              }}
            >
              <div
                className="text-xs font-mono tracking-widest mb-6"
                style={{ color: "oklch(0.65 0.25 300)" }}
              >
                {"// SKILL_LEVELS.json"}
              </div>
              {skills.map((skill) => (
                <SkillBar
                  key={skill.label}
                  label={skill.label}
                  value={skill.value}
                  color={skill.color}
                  animate={visible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
