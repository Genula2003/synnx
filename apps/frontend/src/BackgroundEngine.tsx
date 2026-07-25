import React from 'react';
import { motion } from 'framer-motion';
import { ThreeCanvas } from './ThreeCanvas';

interface BackgroundEngineProps {
  theme: 'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber';
}

export const BackgroundEngine: React.FC<BackgroundEngineProps> = ({ theme }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Three.js Volumetric Particle, Lighting and Shadows engine */}
      <ThreeCanvas theme={theme} />

      {/* Theme specific 2D visual layout atmosphere filters */}
      {theme === 'liquid-glass' && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0a18] via-[#090614] to-[#040409]">
          <motion.div
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -80, 50, 0],
              scale: [1, 1.25, 0.9, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-cyan-500/15 blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -80, 60, 0],
              y: [0, 60, -80, 0],
              scale: [1, 0.8, 1.15, 1],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-fuchsia-500/10 to-blue-500/15 blur-[140px]"
          />
        </div>
      )}

      {theme === 'cotton-candy' && (
        <div className="absolute inset-0 bg-[#fff5f9]">
          <motion.div
            animate={{
              x: [-20, 30, -20],
              y: [-15, 25, -15],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[10%] left-[10%] w-[500px] h-[300px] bg-pink-300/25 rounded-full blur-[90px]"
          />
          <motion.div
            animate={{
              x: [30, -40, 30],
              y: [20, -20, 20],
            }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-[20%] right-[10%] w-[600px] h-[350px] bg-sky-200/30 rounded-full blur-[100px]"
          />
        </div>
      )}

      {theme === 'clay' && (
        <div className="absolute inset-0 bg-[#e0e5ec]">
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-400/15 via-transparent to-white/50" />
        </div>
      )}

      {theme === 'midnight' && (
        <div className="absolute inset-0 bg-[#020204]">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-800/10 rounded-full blur-[150px]"
          />
        </div>
      )}

      {theme === 'neon-cyber' && (
        <div className="absolute inset-0 bg-[#03010a]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#19082d_1px,transparent_1px),linear-gradient(to_bottom,#19082d_1px,transparent_1px)] bg-[size:45px_45px] opacity-40" />
          <motion.div
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-[10%] right-[10%] w-[600px] h-[600px] bg-[#d946ef]/10 rounded-full blur-[130px]"
          />
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-[10%] left-[10%] w-[600px] h-[600px] bg-[#00ffcc]/10 rounded-full blur-[130px]"
          />
        </div>
      )}
    </div>
  );
};
export default BackgroundEngine;
