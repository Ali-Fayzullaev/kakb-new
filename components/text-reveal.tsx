"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
}

export default function TextReveal({ text, className = "" }: TextRevealProps) {
  // Split text into lines first
  const lines = text.split('\n');
  
  return (
    <div className={className}>
      {lines.map((line, lineIndex) => {
        const words = line.split(' ');
        // Apply larger text and different styling to the third line (index 2)
        const lineClass = lineIndex === 2 
          ? 'text-2xl font-bold tracking-tight -mt-1.5' 
          : lineIndex > 0 ? 'mt-0.5' : '';
          
        return (
          <div key={lineIndex} className={lineClass}>
            {words.map((word, wordIndex) => (
              <motion.span
                key={`${lineIndex}-${wordIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (lineIndex * 10 + wordIndex) * 0.05,
                }}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
          </div>
        );
      })}
    </div>
  );
}
