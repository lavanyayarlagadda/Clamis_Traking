import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
import chatBot from "../assets/chatbot.png"; // Your bot image path

const FloatingChatIcon = ({ onClick }: { onClick: () => void }) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

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
        pointerEvents: "none", // let children handle clicks
      }}
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        dragMomentum={false}
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          width: 64,
          height: 64,
          touchAction: "none",
          pointerEvents: "auto", // clickable
          zIndex: 1500,
          cursor: "grab",
        }}
      >
        <IconButton
          onClick={onClick}
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
          <img src={chatBot} alt="chatBot" style={{ width: 35, height: 35 }} />
        </IconButton>
      </motion.div>
    </div>
  );
};

export default FloatingChatIcon;
