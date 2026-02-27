import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 16}px, ${ringPos.current.y - 16}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "40px";
        ringRef.current.style.height = "40px";
        ringRef.current.style.borderColor = "oklch(0.65 0.25 300 / 0.8)";
        ringRef.current.style.boxShadow = "0 0 20px oklch(0.65 0.25 300 / 0.6)";
      }
    };

    const handleMouseLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "32px";
        ringRef.current.style.height = "32px";
        ringRef.current.style.borderColor = "oklch(0.82 0.18 195 / 0.6)";
        ringRef.current.style.boxShadow = "0 0 10px oklch(0.82 0.18 195 / 0.4)";
      }
    };

    const setupLinkListeners = () => {
      const links = document.querySelectorAll("a, button, [role='button']");
      links.forEach((link) => {
        link.addEventListener("mouseenter", handleMouseEnterLink);
        link.addEventListener("mouseleave", handleMouseLeaveLink);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    animFrameRef.current = requestAnimationFrame(animate);
    setupLinkListeners();

    const observer = new MutationObserver(setupLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full z-[9999] pointer-events-none"
        style={{
          background: "oklch(0.82 0.18 195)",
          boxShadow: "0 0 8px oklch(0.82 0.18 195)",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full z-[9998] pointer-events-none"
        style={{
          border: "1px solid oklch(0.82 0.18 195 / 0.6)",
          boxShadow: "0 0 10px oklch(0.82 0.18 195 / 0.4)",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
