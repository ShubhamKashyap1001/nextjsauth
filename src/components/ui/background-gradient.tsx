"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  borderRadius = "1.5rem",
}: {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
}) => {
  return (
    <div
      className={cn(
        "relative p-[2px] overflow-hidden",
        className
      )}
      style={{ borderRadius }}
    >
      {/* 🔥 Moving gradient border */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-[linear-gradient(90deg,#06b6d4,#3b82f6,#8b5cf6)] bg-[length:200%_200%] opacity-80"
      />

      {/* 🔲 Transparent box inside (only border effect visible) */}
      <div
        className="relative bg-black/60 backdrop-blur-xl"
        style={{ borderRadius }}
      >
        {children}
      </div>
    </div>
  );
};
