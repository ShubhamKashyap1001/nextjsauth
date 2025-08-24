"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 30).fill(true); // default 30 meteors

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 pointer-events-none overflow-hidden" // 👈 full screen container
    >
      {meteors.map((_, idx) => {
        const meteorCount = number || 30;

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-full bg-slate-400 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[80px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-slate-400 before:to-transparent before:content-['']",
              className,
            )}
            style={{
              top: Math.random() * window.innerHeight + "px", // random vertical start
              left: Math.random() * window.innerWidth + "px", // random horizontal start
              animationDelay: Math.random() * 5 + "s",
              animationDuration: Math.floor(Math.random() * 10 + 5) + "s",
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};
