import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink, Terminal } from "lucide-react";

const projects = [
  {
    id: "sqli",
    title: "SQLi Vulnerability Scanner",
    description:
      "Automated tool to detect SQL injection vulnerabilities in web applications. Scans forms, URL parameters, and HTTP headers with customizable payloads.",
    tech: ["Python", "Requests", "BeautifulSoup"],
    color: "oklch(0.82 0.18 195)",
    github: "https://github.com/raushankumarhacker",
    demo: null,
    icon: "🔍",
  },
  {
    id: "xss",
    title: "XSS Detection Framework",
    description:
      "Browser-based XSS payload injector for ethical testing. Identifies reflected, stored, and DOM-based Cross-Site Scripting vulnerabilities.",
    tech: ["Python", "JavaScript"],
    color: "oklch(0.65 0.25 300)",
    github: "https://github.com/raushankumarhacker",
    demo: null,
    icon: "⚡",
  },
  {
    id: "ctf",
    title: "CTF Writeups & Solutions",
    description:
      "Collection of Capture The Flag challenge writeups covering web exploitation, cryptography, reverse engineering, and network forensics.",
    tech: ["Python", "Linux", "GDB"],
    color: "oklch(0.75 0.22 145)",
    github: "https://github.com/raushankumarhacker",
    demo: null,
    icon: "🏴",
  },
  {
    id: "seo",
    title: "SEO Audit Dashboard",
    description:
      "Automated SEO analysis tool that checks meta tags, page speed, broken links, keyword density, and generates detailed audit reports.",
    tech: ["Python", "Flask", "BeautifulSoup"],
    color: "oklch(0.78 0.22 55)",
    github: "https://github.com/raushankumarhacker",
    demo: null,
    icon: "📊",
  },
  {
    id: "nmap",
    title: "Network Port Scanner",
    description:
      "Custom port scanner with banner grabbing and service detection. Built as a learning-focused Nmap alternative with a clean Python interface.",
    tech: ["Python", "Socket", "Threading"],
    color: "oklch(0.82 0.18 195)",
    github: "https://github.com/raushankumarhacker",
    demo: null,
    icon: "🛰️",
  },
];

export default function ProjectsSection() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: "oklch(0.065 0.012 250)" }}
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.65 0.25 300 / 0.3), transparent)" }}
      />
      <div
        className="absolute right-0 bottom-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "oklch(0.82 0.18 195 / 0.04)", filter: "blur(60px)" }}
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
            PROJECTS.json
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold section-heading"
            style={{
              color: "oklch(0.92 0.02 200)",
              textShadow: "0 0 30px oklch(0.65 0.25 300 / 0.2)",
            }}
          >
            Featured Projects
          </h2>
          <p className="mt-4 text-sm font-mono" style={{ color: "oklch(0.55 0.04 240)" }}>
            {"// Real tools built for real security challenges"}
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="glass-card rounded-xl p-6 flex flex-col transition-all duration-700"
              style={{
                border: `1px solid ${project.color.replace(")", " / 0.2)")}`,
                transitionDelay: `${i * 80}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{project.icon}</span>
                  <Terminal className="w-4 h-4" style={{ color: project.color, opacity: 0.6 }} />
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all duration-200"
                    style={{
                      background: "oklch(0.14 0.02 260 / 0.8)",
                      border: "1px solid oklch(0.82 0.18 195 / 0.2)",
                      color: "oklch(0.82 0.18 195)",
                    }}
                    aria-label={`${project.title} GitHub`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg transition-all duration-200"
                      style={{
                        background: "oklch(0.14 0.02 260 / 0.8)",
                        border: "1px solid oklch(0.65 0.25 300 / 0.2)",
                        color: "oklch(0.65 0.25 300)",
                      }}
                      aria-label={`${project.title} live demo`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-base font-bold font-mono mb-2"
                style={{ color: project.color }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-4 flex-1"
                style={{ color: "oklch(0.62 0.04 240)" }}
              >
                {project.description}
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded text-xs font-mono"
                    style={{
                      background: `${project.color.replace(")", " / 0.08)")}`,
                      border: `1px solid ${project.color.replace(")", " / 0.25)")}`,
                      color: project.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View more CTA */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <a
            href="https://github.com/raushankumarhacker"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded font-mono text-sm tracking-wider transition-all duration-300"
            style={{
              border: "1px solid oklch(0.82 0.18 195 / 0.3)",
              color: "oklch(0.82 0.18 195)",
            }}
          >
            <Github className="w-4 h-4" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
