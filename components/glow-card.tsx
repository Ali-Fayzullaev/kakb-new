"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlowCard({ children, className = "", onClick }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl bg-card p-6 transition-all duration-300 ${className}`}
      style={{
        boxShadow: "0 4px 20px rgba(0, 91, 153, 0.1)",
      }}
    >
      {/* Gradient border effect on hover */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: "linear-gradient(45deg, #005B99, #00AEEF, #005B99)",
            backgroundSize: "200% 200%",
            animation: "gradient 3s ease infinite",
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30" />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </motion.div>
  );
}
