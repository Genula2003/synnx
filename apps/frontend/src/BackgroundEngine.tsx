import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundEngineProps {
  theme: 'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber';
}

export const BackgroundEngine: React.FC<BackgroundEngineProps> = ({ theme }) => {
  if (theme === 'liquid-glass') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-br from-[#0e0c20] via-[#1a0f3d] to-[#0a142c]">
        {/* Animated fluid blob reflections */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-500/10 blur-[80px]"
        />
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 40, -40, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[100px]"
        />
      </div>
    );
  }

  if (theme === 'cotton-candy') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-tr from-[#ffe6f2] via-[#f1f0ff] to-[#e6f2ff]">
        {/* Soft pastel clouds floating around */}
        <motion.div
          animate={{
            x: [-10, 30, -10],
            y: [-10, 20, -10],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-80 h-40 bg-pink-300/20 rounded-full blur-[60px]"
        />
        <motion.div
          animate={{
            x: [20, -40, 20],
            y: [10, -20, 10],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/3 right-1/4 w-[400px] h-48 bg-blue-300/20 rounded-full blur-[70px]"
        />
      </div>
    );
  }

  if (theme === 'clay') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#e0e5ec]">
        {/* Textured soft-lighting circles */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-300/20 via-[#e0e5ec] to-white/40" />
      </div>
    );
  }

  if (theme === 'midnight') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-black">
        {/* Subtle dark ambient shadows and glowing particle glow */}
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-zinc-800/10 blur-[120px]"
        />
      </div>
    );
  }

  if (theme === 'neon-cyber') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#060214]">
        {/* Cyber Grid background style */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b0d35_1px,transparent_1px),linear-gradient(to_bottom,#1b0d35_1px,transparent_1px)] bg-[size:35px_35px] opacity-40" />

        {/* Pulsing neon cyber lights */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-10 right-10 w-96 h-96 bg-[#ff0055]/5 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-[#00ffcc]/5 rounded-full blur-[100px]"
        />
      </div>
    );
  }

  return null;
};
