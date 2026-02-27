import { useEffect, useRef, useState } from "react";
import { Briefcase, Bug, Calendar } from "lucide-react";

const experiences = [
  {
    id: "ivf",
    company: "India IVF",
    role: "SEO Executive",
    period: "July 2025 – Oct 2025",
    icon: Briefcase,
    color: "oklch(0.82 0.18 195)",
    type: "Professional",
    points: [
      "Optimized website performance and page load speed for better user experience",
      "Conducted comprehensive SEO audits identifying technical issues and opportunities",
      "Improved search engine ranking strategy and organic traffic by 35%",
      "Performed keyword research and competitor analysis to drive content strategy",
    ],
  },
  {
    id: "researcher",
    company: "Independent",
    role: "Security Researcher",
    period: "2024 – Present",
    icon: Bug,
    color: "oklch(0.65 0.25 300)",
    type: "Research",
    points: [
      "Discovered and reported SQL Injection vulnerabilities in production websites",
      "Identified Cross-Site Scripting (XSS) vulnerabilities for responsible disclosure",
      "Participated in bug bounty programs on HackerOne and Bugcrowd",
      "CTF (Capture The Flag) competitions – web exploitation & cryptography tracks",
    ],
  },
];

export default function ExperienceSection() {
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
      id="experience"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: "oklch(0.07 0.01 250)" }}
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.82 0.18 195 / 0.3), transparent)" }}
      />
      <div
        className="absolute left-1/4 top-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "oklch(0.65 0.25 300 / 0.04)", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
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
            WORK_HISTORY.log
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold section-heading"
            style={{
              color: "oklch(0.92 0.02 200)",
              textShadow: "0 0 30px oklch(0.82 0.18 195 / 0.2)",
            }}
          >
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, oklch(0.82 0.18 195 / 0.5), oklch(0.65 0.25 300 / 0.5), transparent)",
              transform: "translateX(-50%)",
            }}
          />

          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className={`relative flex gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} transition-all duration-700`}
              style={{
                transitionDelay: `${i * 200}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
              }}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 flex items-center justify-center"
                style={{
                  background: exp.color,
                  boxShadow: `0 0 12px ${exp.color.replace(")", " / 0.6)")}`,
                  top: "24px",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-white opacity-50" />
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />

              {/* Card */}
              <div className="ml-16 md:ml-0 md:w-[calc(50%-2rem)] glass-card rounded-xl p-6 group"
                style={{
                  border: `1px solid ${exp.color.replace(")", " / 0.2)")}`,
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <exp.icon className="w-4 h-4" style={{ color: exp.color }} />
                      <span
                        className="text-xs font-mono tracking-wider px-2 py-0.5 rounded"
                        style={{
                          color: exp.color,
                          background: `${exp.color.replace(")", " / 0.1)")}`,
                          border: `1px solid ${exp.color.replace(")", " / 0.2)")}`,
                        }}
                      >
                        {exp.type}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold font-mono"
                      style={{ color: "oklch(0.92 0.02 200)" }}
                    >
                      {exp.role}
                    </h3>
                    <div
                      className="text-sm font-bold"
                      style={{ color: exp.color }}
                    >
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono"
                    style={{ color: "oklch(0.55 0.04 240)" }}>
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </div>
                </div>

                {/* Points */}
                <ul className="space-y-2">
                  {exp.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "oklch(0.65 0.04 240)" }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: exp.color }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
