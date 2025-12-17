"use client";

import { motion } from "framer-motion";

export default function AnimatedGradient() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -top-1/2 left-0 h-full w-full"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(0, 91, 153, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(0, 174, 239, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, rgba(0, 91, 153, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(0, 91, 153, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ filter: "blur(40px)" }}
      />
      <motion.div
        className="absolute top-0 right-0 h-full w-full"
        animate={{
          background: [
            "radial-gradient(circle at 80% 20%, rgba(0, 174, 239, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, rgba(0, 91, 153, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(0, 174, 239, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(0, 174, 239, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ filter: "blur(60px)" }}
      />
    </div>
  );
}
