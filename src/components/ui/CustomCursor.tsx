import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CURSOR_LABELS: Record<string, string> = {
  A: "View",
  BUTTON: "Click",
  INPUT: "Type",
  TEXTAREA: "Type",
  a: "View",
  button: "Click",
};

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

export default function CustomCursor() {
  const [visible, setVisible] = useState(() => !isTouchDevice());
  const [label, setLabel] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, {
    stiffness: 500,
    damping: 28,
    mass: 0.5,
  });
  const springY = useSpring(cursorY, {
    stiffness: 500,
    damping: 28,
    mass: 0.5,
  });
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 0.8 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, input, textarea, [data-cursor]",
      );

      if (interactive) {
        setIsHovering(true);
        const customLabel = interactive.getAttribute("data-cursor");
        const tagLabel = CURSOR_LABELS[interactive.tagName] || "";
        setLabel(customLabel || tagLabel);
      } else {
        setIsHovering(false);
        setLabel("");
      }
    },
    [cursorX, cursorY],
  );

  useEffect(() => {
    // Only show on non-touch devices
    if (isTouchDevice()) return;

    document.documentElement.style.cursor = "none";
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mouseenter", () => setVisible(true));

    // Hide cursor on all interactive elements
    const style = document.createElement("style");
    style.textContent =
      "a,button,input,textarea,[data-cursor]{cursor:none!important}";
    document.head.appendChild(style);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", handleMouseMove);
      style.remove();
    };
  }, [handleMouseMove]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Dot */}
      <motion.div
        className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-primary"
        style={{ left: springX, top: springY }}
      />

      {/* Ring */}
      <motion.div
        className="absolute -ml-5 -mt-5 rounded-full border border-primary/50 flex items-center justify-center"
        style={{ left: ringX, top: ringY }}
        animate={{
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
          marginLeft: isHovering ? -32 : -20,
          marginTop: isHovering ? -32 : -20,
          borderColor: isHovering
            ? "hsl(var(--primary) / 0.8)"
            : "hsl(var(--primary) / 0.3)",
          backgroundColor: isHovering
            ? "hsl(var(--primary) / 0.08)"
            : "transparent",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Label text */}
        <motion.span
          className="font-mono text-[9px] text-primary tracking-wider uppercase"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: label ? 1 : 0,
            scale: label ? 1 : 0.5,
          }}
          transition={{ duration: 0.15 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </div>
  );
}
