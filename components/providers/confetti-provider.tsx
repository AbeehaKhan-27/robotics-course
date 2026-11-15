"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

import { useConfettiStore } from "@/hooks/use-confetti-store";

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!confetti.isOpen || size.width === 0) return null;

  return (
    <ReactConfetti
      width={size.width}
      height={size.height}
      style={{ position: "fixed", top: 0, left: 0 }}
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => confetti.onClose()}
    />
  );
};