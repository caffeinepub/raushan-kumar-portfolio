import { Linkedin, Github, Shield } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="relative py-12"
      style={{
        background: "oklch(0.06 0.01 250)",
        borderTop: "1px solid oklch(0.82 0.18 195 / 0.1)",
      }}
    >
      {/* Gradient top border */}
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.82 0.18 195 / 0.5), oklch(0.65 0.25 300 / 0.5), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + copyright */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 flex items-center justify-center rounded font-bold text-sm relative"
                style={{
                  background: "oklch(0.82 0.18 195 / 0.1)",
                  border: "1px solid oklch(0.82 0.18 195 / 0.4)",
                  color: "oklch(0.82 0.18 195)",
                  fontFamily: "'Outfit', system-ui, sans-serif",
                  boxShadow: "0 0 10px oklch(0.82 0.18 195 / 0.2)",
                }}
              >
                <Shield className="w-3 h-3 absolute opacity-20" />
                RK
              </div>
              <span className="font-mono text-sm" style={{ color: "oklch(0.65 0.04 240)" }}>
                Raushan Kumar
              </span>
            </div>
            <p className="text-xs font-mono" style={{ color: "oklch(0.45 0.04 240)" }}>
              © {year} Raushan Kumar. Securing the digital world.
            </p>
          </div>

          {/* Center: Built with */}
          <div className="text-center">
            <p className="text-xs font-mono" style={{ color: "oklch(0.45 0.04 240)" }}>
              Built with ❤️ using{" "}
              <a
                href={caffeineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: "oklch(0.65 0.25 300)" }}
              >
                caffeine.ai
              </a>
            </p>
            <p className="text-xs font-mono mt-1" style={{ color: "oklch(0.35 0.04 240)" }}>
              Powered by the Internet Computer Protocol
            </p>
          </div>

          {/* Social links */}
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/raushakumarhacker"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300"
              style={{
                background: "oklch(0.12 0.02 250)",
                border: "1px solid oklch(0.82 0.18 195 / 0.2)",
                color: "oklch(0.65 0.04 240)",
              }}
              aria-label="LinkedIn profile"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.82 0.18 195 / 0.6)";
                e.currentTarget.style.color = "oklch(0.82 0.18 195)";
                e.currentTarget.style.boxShadow = "0 0 12px oklch(0.82 0.18 195 / 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.82 0.18 195 / 0.2)";
                e.currentTarget.style.color = "oklch(0.65 0.04 240)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/raushankumarhacker"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300"
              style={{
                background: "oklch(0.12 0.02 250)",
                border: "1px solid oklch(0.65 0.25 300 / 0.2)",
                color: "oklch(0.65 0.04 240)",
              }}
              aria-label="GitHub profile"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.65 0.25 300 / 0.6)";
                e.currentTarget.style.color = "oklch(0.65 0.25 300)";
                e.currentTarget.style.boxShadow = "0 0 12px oklch(0.65 0.25 300 / 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.65 0.25 300 / 0.2)";
                e.currentTarget.style.color = "oklch(0.65 0.04 240)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
