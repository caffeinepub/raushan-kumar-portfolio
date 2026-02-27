import { useEffect, useRef, useState } from "react";
import { Send, Linkedin, Github, MapPin, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const { actor } = useActor();

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      if (!actor) throw new Error("Not connected");
      await actor.submitContactForm(formData.name, formData.email, formData.message);
      toast.success("Message transmitted successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Transmission failed. Please try again or reach out on LinkedIn.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 relative"
      style={{ background: "oklch(0.07 0.01 250)" }}
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.82 0.18 195 / 0.3), transparent)" }}
      />
      <div
        className="absolute right-0 top-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "oklch(0.82 0.18 195 / 0.04)", filter: "blur(80px)" }}
      />
      <div
        className="absolute left-0 bottom-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "oklch(0.65 0.25 300 / 0.04)", filter: "blur(60px)" }}
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
            CONTACT.sh
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold section-heading mb-4"
            style={{
              color: "oklch(0.92 0.02 200)",
              textShadow: "0 0 30px oklch(0.82 0.18 195 / 0.2)",
            }}
          >
            Let's Secure the
            <br />
            <span
              style={{
                color: "oklch(0.82 0.18 195)",
                textShadow: "0 0 20px oklch(0.82 0.18 195 / 0.5)",
              }}
            >
              Digital World Together
            </span>
          </h2>
          <p className="text-sm font-mono" style={{ color: "oklch(0.55 0.04 240)" }}>
            {"// Open to cybersecurity roles, collaborations, and bug bounty partnerships"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: Info */}
          <div
            className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <div className="space-y-6">
              {/* Contact info items */}
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "raushankumarhacker@gmail.com",
                  href: "mailto:raushankumarhacker@gmail.com",
                  color: "oklch(0.82 0.18 195)",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "India",
                  href: null,
                  color: "oklch(0.65 0.25 300)",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${item.color.replace(")", " / 0.1)")}`,
                      border: `1px solid ${item.color.replace(")", " / 0.3)")}`,
                    }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-mono" style={{ color: "oklch(0.55 0.04 240)" }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-mono transition-colors duration-200"
                        style={{ color: "oklch(0.78 0.04 240)" }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-sm font-mono" style={{ color: "oklch(0.78 0.04 240)" }}>
                        {item.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div className="pt-4">
                <div
                  className="text-xs font-mono tracking-widest mb-4"
                  style={{ color: "oklch(0.55 0.04 240)" }}
                >
                  {"// CONNECT_WITH_ME"}
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/raushakumarhacker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-lg font-mono text-sm transition-all duration-300"
                    style={{
                      background: "oklch(0.14 0.02 260)",
                      border: "1px solid oklch(0.82 0.18 195 / 0.3)",
                      color: "oklch(0.82 0.18 195)",
                    }}
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/raushankumarhacker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-lg font-mono text-sm transition-all duration-300"
                    style={{
                      background: "oklch(0.14 0.02 260)",
                      border: "1px solid oklch(0.65 0.25 300 / 0.3)",
                      color: "oklch(0.65 0.25 300)",
                    }}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div
            className={`transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-xl p-6 space-y-4"
              style={{
                border: "1px solid oklch(0.82 0.18 195 / 0.2)",
                boxShadow: "0 0 30px oklch(0.82 0.18 195 / 0.05)",
              }}
            >
              <div
                className="text-xs font-mono tracking-widest mb-5"
                style={{ color: "oklch(0.82 0.18 195)" }}
              >
                {"// SEND_MESSAGE"}
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono mb-1.5"
                  style={{ color: "oklch(0.55 0.04 240)" }}
                >
                  NAME *
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-lg font-mono text-sm outline-none transition-all duration-200"
                  style={{
                    background: "oklch(0.12 0.02 250)",
                    border: "1px solid oklch(0.82 0.18 195 / 0.2)",
                    color: "oklch(0.88 0.02 200)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "oklch(0.82 0.18 195 / 0.6)";
                    e.target.style.boxShadow = "0 0 10px oklch(0.82 0.18 195 / 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "oklch(0.82 0.18 195 / 0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono mb-1.5"
                  style={{ color: "oklch(0.55 0.04 240)" }}
                >
                  EMAIL *
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg font-mono text-sm outline-none transition-all duration-200"
                  style={{
                    background: "oklch(0.12 0.02 250)",
                    border: "1px solid oklch(0.82 0.18 195 / 0.2)",
                    color: "oklch(0.88 0.02 200)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "oklch(0.82 0.18 195 / 0.6)";
                    e.target.style.boxShadow = "0 0 10px oklch(0.82 0.18 195 / 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "oklch(0.82 0.18 195 / 0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono mb-1.5"
                  style={{ color: "oklch(0.55 0.04 240)" }}
                >
                  MESSAGE *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Let's collaborate on cybersecurity..."
                  className="w-full px-4 py-2.5 rounded-lg font-mono text-sm outline-none transition-all duration-200 resize-none"
                  style={{
                    background: "oklch(0.12 0.02 250)",
                    border: "1px solid oklch(0.82 0.18 195 / 0.2)",
                    color: "oklch(0.88 0.02 200)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "oklch(0.82 0.18 195 / 0.6)";
                    e.target.style.boxShadow = "0 0 10px oklch(0.82 0.18 195 / 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "oklch(0.82 0.18 195 / 0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-mono text-sm font-bold tracking-wider transition-all duration-300 disabled:opacity-60"
                style={{
                  background: submitting
                    ? "oklch(0.65 0.25 300 / 0.5)"
                    : "oklch(0.82 0.18 195)",
                  color: "oklch(0.06 0.01 250)",
                  boxShadow: submitting ? "none" : "0 0 20px oklch(0.82 0.18 195 / 0.4)",
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
