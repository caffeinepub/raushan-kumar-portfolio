import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import CertificationsSection from "./components/CertificationsSection";
import TerminalSection from "./components/TerminalSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "oklch(0.1 0.015 250)",
            border: "1px solid oklch(0.82 0.18 195 / 0.4)",
            color: "oklch(0.92 0.02 200)",
          },
        }}
      />
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div
        className={`transition-opacity duration-700 ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <CertificationsSection />
          <TerminalSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
