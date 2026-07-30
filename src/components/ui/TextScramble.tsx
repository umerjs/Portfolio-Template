import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: boolean;
  speed?: number;
}

export default function TextScramble({ text, className = '', trigger = true, speed = 30 }: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) => {
          if (i < iteration) return char;
          if (char === ' ') return ' ';
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      iteration += 1 / 2;
      if (iteration >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    if (trigger) {
      frameRef.current += 1;
      return scramble();
    }
  }, [trigger, scramble]);

  return <span className={className}>{display}</span>;
}

// Hook version for triggering on hover
export function useTextScramble(text: string, speed = 30) {
  const [display, setDisplay] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const triggerScramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) => {
          if (i < iteration) return char;
          if (char === ' ') return ' ';
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      iteration += 0.5;
      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
    }, speed);
  }, [text, speed, isScrambling]);

  return { display, triggerScramble };
}
