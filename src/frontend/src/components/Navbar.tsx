import { useState, useEffect } from "react";
import { Menu, X, Shield } from "lucide-react";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => document.getElementById(l.id));
      const scrollPos = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
        style={{
          background: scrolled
            ? "oklch(0.07 0.01 250 / 0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid oklch(0.82 0.18 195 / 0.15)"
            : "none",
          boxShadow: scrolled ? "0 4px 30px oklch(0 0 0 / 0.4)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2 group"
          >
            <div
              className="relative w-10 h-10 flex items-center justify-center rounded font-bold text-lg tracking-wider"
              style={{
                background: "oklch(0.82 0.18 195 / 0.1)",
                border: "1px solid oklch(0.82 0.18 195 / 0.5)",
                color: "oklch(0.82 0.18 195)",
                fontFamily: "'Outfit', system-ui, sans-serif",
                boxShadow: "0 0 15px oklch(0.82 0.18 195 / 0.3)",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <Shield className="w-4 h-4 absolute opacity-20" />
              RK
            </div>
            <span
              className="hidden sm:block text-sm font-mono tracking-widest"
              style={{ color: "oklch(0.82 0.18 195)" }}
            >
              raushankumarhacker
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="relative px-3 py-2 text-sm font-mono tracking-wider transition-all duration-200"
                style={{
                  color:
                    activeSection === link.id
                      ? "oklch(0.82 0.18 195)"
                      : "oklch(0.65 0.04 240)",
                  textShadow:
                    activeSection === link.id
                      ? "0 0 10px oklch(0.82 0.18 195 / 0.6)"
                      : "none",
                }}
              >
                {activeSection === link.id && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{
                      background: "oklch(0.82 0.18 195)",
                      boxShadow: "0 0 8px oklch(0.82 0.18 195)",
                    }}
                  />
                )}
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded"
            style={{ color: "oklch(0.82 0.18 195)" }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "oklch(0.07 0.01 250 / 0.97)", backdropFilter: "blur(16px)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className={`text-2xl font-mono tracking-wider transition-all duration-300`}
              style={{
                color:
                  activeSection === link.id
                    ? "oklch(0.82 0.18 195)"
                    : "oklch(0.65 0.04 240)",
                textShadow:
                  activeSection === link.id
                    ? "0 0 15px oklch(0.82 0.18 195 / 0.8)"
                    : "none",
                transitionDelay: `${i * 50}ms`,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              /{link.label.toLowerCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
