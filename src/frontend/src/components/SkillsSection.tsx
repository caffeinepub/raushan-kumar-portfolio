import { useEffect, useRef, useState } from "react";
import { Shield, TrendingUp, Code2, Wrench } from "lucide-react";

const skillCategories = [
  {
    id: "cyber",
    icon: Shield,
    title: "Cybersecurity",
    color: "oklch(0.82 0.18 195)",
    glow: "oklch(0.82 0.18 195 / 0.3)",
    border: "oklch(0.82 0.18 195 / 0.3)",
    skills: [
      "Penetration Testing",
      "SQL Injection",
      "XSS Attacks",
      "OWASP Top 10",
      "CTF Challenges",
      "Vulnerability Assessment",
    ],
  },
  {
    id: "seo",
    icon: TrendingUp,
    title: "SEO & Digital Marketing",
    color: "oklch(0.65 0.25 300)",
    glow: "oklch(0.65 0.25 300 / 0.3)",
    border: "oklch(0.65 0.25 300 / 0.3)",
    skills: [
      "On-Page SEO",
      "Technical SEO",
      "Google Analytics",
      "Keyword Research",
      "Backlink Analysis",
      "Competitor Analysis",
    ],
  },
  {
    id: "tech",
    icon: Code2,
    title: "Technical Skills",
    color: "oklch(0.75 0.22 145)",
    glow: "oklch(0.75 0.22 145 / 0.3)",
    border: "oklch(0.75 0.22 145 / 0.3)",
    skills: [
      "Python",
      "Linux",
      "Networking",
      "Web Technologies",
      "Bash Scripting",
      "REST APIs",
    ],
  },
  {
    id: "tools",
    icon: Wrench,
    title: "Tools & Platforms",
    color: "oklch(0.78 0.22 55)",
    glow: "oklch(0.78 0.22 55 / 0.3)",
    border: "oklch(0.78 0.22 55 / 0.3)",
    skills: [
      "Burp Suite",
      "Nmap",
      "Wireshark",
      "Metasploit",
      "Kali Linux",
      "Google Search Console",
    ],
  },
];

export default function SkillsSection() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: "oklch(0.065 0.012 250)" }}
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.65 0.25 300 / 0.3), transparent)" }}
      />
      {/* Background glow blobs */}
      <div
        className="absolute right-0 top-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "oklch(0.82 0.18 195 / 0.04)", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="inline-block text-xs font-mono tracking-[0.4em] mb-3 px-4 py-1 rounded"
            style={{
              color: "oklch(0.65 0.25 300)",
              border: "1px solid oklch(0.65 0.25 300 / 0.2)",
              background: "oklch(0.65 0.25 300 / 0.05)",
            }}
          >
            SKILLS_MATRIX.sh
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold section-heading"
            style={{
              color: "oklch(0.92 0.02 200)",
              textShadow: "0 0 30px oklch(0.65 0.25 300 / 0.2)",
            }}
          >
            Technical Arsenal
          </h2>
          <p className="mt-4 text-sm font-mono" style={{ color: "oklch(0.55 0.04 240)" }}>
            {"// Tools and skills in my cybersecurity toolkit"}
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.id}
              className={`glass-card rounded-xl p-6 transition-all duration-700 group`}
              style={{
                border: `1px solid ${cat.border}`,
                transitionDelay: `${i * 100}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
              }}

            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: `${cat.color.replace(")", " / 0.1)")}`,
                    border: `1px solid ${cat.color.replace(")", " / 0.3)")}`,
                  }}
                >
                  <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                </div>
                <h3
                  className="font-bold text-sm font-mono tracking-wide"
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>
              </div>

              {/* Skills list */}
              <div className="flex flex-col gap-2">
                {cat.skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: "oklch(0.7 0.03 240)" }}
                  >
                    <span
                      className="text-xs font-mono"
                      style={{ color: cat.color, opacity: 0.7 }}
                    >
                      &gt;
                    </span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
