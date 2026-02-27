import { useEffect, useRef, useState } from "react";
import { Award, CheckCircle, Clock, Target } from "lucide-react";

const certifications = [
  {
    id: "ceh",
    title: "CEH",
    fullName: "Certified Ethical Hacker",
    status: "In Progress",
    statusColor: "oklch(0.78 0.22 55)",
    icon: Award,
    color: "oklch(0.82 0.18 195)",
    desc: "EC-Council's flagship ethical hacking certification",
  },
  {
    id: "owasp",
    title: "OWASP Top 10",
    fullName: "Web Security Fundamentals",
    status: "Completed",
    statusColor: "oklch(0.75 0.22 145)",
    icon: CheckCircle,
    color: "oklch(0.65 0.25 300)",
    desc: "Mastery of the OWASP Top 10 web application risks",
  },
  {
    id: "ga",
    title: "Google Analytics",
    fullName: "Analytics Certified",
    status: "Completed",
    statusColor: "oklch(0.75 0.22 145)",
    icon: CheckCircle,
    color: "oklch(0.78 0.22 55)",
    desc: "Google's official Analytics certification program",
  },
  {
    id: "thm",
    title: "TryHackMe",
    fullName: "Active Learner",
    status: "Active",
    statusColor: "oklch(0.75 0.22 145)",
    icon: Target,
    color: "oklch(0.82 0.18 195)",
    desc: "Hands-on cybersecurity learning platform",
  },
  {
    id: "htb",
    title: "HackTheBox",
    fullName: "Active Member",
    status: "Active",
    statusColor: "oklch(0.75 0.22 145)",
    icon: Target,
    color: "oklch(0.65 0.25 300)",
    desc: "Advanced penetration testing challenges",
  },
  {
    id: "bb",
    title: "Bug Bounty",
    fullName: "Active Participant",
    status: "Active",
    statusColor: "oklch(0.75 0.22 145)",
    icon: Clock,
    color: "oklch(0.75 0.22 145)",
    desc: "Responsible disclosure & bug bounty programs",
  },
];

export default function CertificationsSection() {
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
      id="certifications"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: "oklch(0.07 0.01 250)" }}
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.82 0.18 195 / 0.3), transparent)" }}
      />
      <div
        className="absolute left-1/2 top-1/2 w-96 h-96 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ background: "oklch(0.65 0.25 300 / 0.03)", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="inline-block text-xs font-mono tracking-[0.4em] mb-3 px-4 py-1 rounded"
            style={{
              color: "oklch(0.78 0.22 55)",
              border: "1px solid oklch(0.78 0.22 55 / 0.2)",
              background: "oklch(0.78 0.22 55 / 0.05)",
            }}
          >
            ACHIEVEMENTS.dat
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold section-heading"
            style={{
              color: "oklch(0.92 0.02 200)",
              textShadow: "0 0 30px oklch(0.78 0.22 55 / 0.2)",
            }}
          >
            Certifications & Badges
          </h2>
        </div>

        {/* Certifications grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <div
              key={cert.id}
              className="glass-card rounded-xl p-5 flex items-start gap-4 transition-all duration-700 group"
              style={{
                border: `1px solid ${cert.color.replace(")", " / 0.2)")}`,
                transitionDelay: `${i * 80}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(25px)",
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `${cert.color.replace(")", " / 0.1)")}`,
                  border: `1px solid ${cert.color.replace(")", " / 0.3)")}`,
                  boxShadow: `0 0 15px ${cert.color.replace(")", " / 0.2)")}`,
                }}
              >
                <cert.icon className="w-6 h-6" style={{ color: cert.color }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    className="font-bold font-mono text-sm"
                    style={{ color: cert.color }}
                  >
                    {cert.title}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-mono"
                    style={{
                      background: `${cert.statusColor.replace(")", " / 0.1)")}`,
                      border: `1px solid ${cert.statusColor.replace(")", " / 0.3)")}`,
                      color: cert.statusColor,
                    }}
                  >
                    {cert.status}
                  </span>
                </div>
                <div className="text-xs font-bold mb-1" style={{ color: "oklch(0.78 0.04 240)" }}>
                  {cert.fullName}
                </div>
                <p className="text-xs" style={{ color: "oklch(0.55 0.04 240)" }}>
                  {cert.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
