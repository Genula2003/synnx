import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundEngineProps {
  theme: 'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber';
}

export const BackgroundEngine: React.FC<BackgroundEngineProps> = ({ theme }) => {
  if (theme === 'liquid-glass') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-radial-gradient from-[#140e28] via-[#090614] to-black">
        {/* Soft floating fluid organic lights with VisionOS-inspired refraction waves */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -100, 60, 0],
            scale: [1, 1.4, 0.8, 1],
            rotate: [0, 90, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-500/20 to-cyan-500/25 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 80, -100, 0],
            scale: [1, 0.7, 1.3, 1],
            rotate: [180, 270, 0, 180],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-fuchsia-500/15 to-blue-500/20 blur-[150px]"
        />
        {/* Floating atmospheric micro particles */}
        <div className="absolute inset-0 opacity-30 mix-blend-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  if (theme === 'cotton-candy') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#fff5f9]">
        {/* Playful pastel clouds with subtle lighting and soft bubbles */}
        <motion.div
          animate={{
            x: [-30, 40, -30],
            y: [-20, 30, -20],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-[10%] left-[15%] w-[450px] h-[250px] bg-pink-300/30 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{
            x: [40, -50, 40],
            y: [30, -30, 30],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-[20%] right-[15%] w-[550px] h-[300px] bg-sky-200/35 rounded-full blur-[90px]"
        />
        {/* Soft bubbles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '110%', x: `${15 * i + 10}%`, scale: Math.random() * 0.5 + 0.5 }}
            animate={{ y: '-10%' }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-8 h-8 rounded-full border border-pink-400/20 bg-white/20 blur-[1px]"
          />
        ))}
      </div>
    );
  }

  if (theme === 'clay') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#e0e5ec]">
        {/* Soft sculpted material lighting environment */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-400/20 via-transparent to-white/60" />
        <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] bg-white/40 rounded-full blur-[70px] shadow-[inset_-30px_-30px_60px_rgba(0,0,0,0.02)]" />
      </div>
    );
  }

  if (theme === 'midnight') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#020204]">
        {/* Ultra-dark workspace atmosphere with deep dust particles */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-zinc-800/10 rounded-full blur-[140px]"
        />
        {/* Cyber starry light particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.1, 0.7, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-1.5 h-1.5 bg-zinc-300 rounded-full blur-[0.5px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme === 'neon-cyber') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#03010a]">
        {/* Sci-fi wireframe style grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#19082d_1px,transparent_1px),linear-gradient(to_bottom,#19082d_1px,transparent_1px)] bg-[size:40px_45px] opacity-60" />

        {/* Futuristic lighting scans */}
        <motion.div
          animate={{
            y: ['-100%', '200%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-[#ff0055]/5 via-[#00ffcc]/5 to-transparent pointer-events-none blur-[40px]"
        />

        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-[#d946ef]/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] bg-[#00ffcc]/10 rounded-full blur-[120px]"
        />
      </div>
    );
  }

  return null;
};
export default BackgroundEngine;
