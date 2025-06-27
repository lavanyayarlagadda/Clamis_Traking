import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
import chatBot from "../assets/chatbot.png";

const FloatingChatIcon = ({ onClick }: { onClick: () => void }) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const pointerDownPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    const dx = Math.abs(e.clientX - pointerDownPos.current.x);
    const dy = Math.abs(e.clientY - pointerDownPos.current.y);
    const moved = dx > 5 || dy > 5;

    if (!moved) {
      onClick();
    }
  };
    useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      ref={constraintsRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          pointerEvents: "auto",
        }}
      >
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          dragMomentum={false}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          style={{
            width: 64,
            height: 64,
            cursor: "grab",
            touchAction: "none",
          }}
        >
          <IconButton
            sx={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7C3AED, #9333EA)",
              color: "white",
              boxShadow: 6,
              "&:hover": {
                background: "linear-gradient(135deg, #6D28D9, #7C3AED)",
              },
            }}
          >
            <img
              src={chatBot}
              alt="chatBot"
              style={{ width: 35, height: 35, pointerEvents: "none" }}
            />
          </IconButton>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FloatingChatIcon;
