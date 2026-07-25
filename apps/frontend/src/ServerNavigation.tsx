import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ServerItem {
  id: string;
  name: string;
  letter: string;
  gradient: string;
}

interface ServerNavigationProps {
  currentTheme: string;
}

export const ServerNavigation: React.FC<ServerNavigationProps> = ({ currentTheme }) => {
  const [selectedServer, setSelectedServer] = useState('synora');

  const servers: ServerItem[] = [
    { id: 'synora', name: 'Synora Prime', letter: 'S', gradient: 'from-[#00f2fe] to-[#4facfe]' },
    { id: 'creative', name: 'Aria Creative', letter: 'A', gradient: 'from-[#f093fb] to-[#f5576c]' },
    { id: 'dev', name: 'Dev Kernel', letter: 'D', gradient: 'from-[#43e97b] to-[#38f9d7]' },
  ];

  return (
    <div className="flex flex-col gap-6 items-center w-24 py-4 z-10 select-none">
      {servers.map((server) => {
        const isSelected = selectedServer === server.id;

        // Interactive 3D tilt variables using mouse coordinate offsets
        const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
        const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });

        const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const width = rect.width;
          const height = rect.height;
          const mouseX = e.clientX - rect.left - width / 2;
          const mouseY = e.clientY - rect.top - height / 2;

          // Compute tilting angles
          rotateX.set(-mouseY / 2);
          rotateY.set(mouseX / 2);
        };

        const handleMouseLeave = () => {
          rotateX.set(0);
          rotateY.set(0);
        };

        return (
          <div
            key={server.id}
            className="relative cursor-pointer flex flex-col items-center group"
            onClick={() => setSelectedServer(server.id)}
            style={{ perspective: '800px' }}
          >
            {/* Selection indicator line (futuristic cyber ring/dot) */}
            <motion.div
              animate={{
                scale: isSelected ? 1 : 0,
                opacity: isSelected ? 1 : 0,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]"
            />

            {/* Volumetric Spherical Server Globe */}
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              whileHover={{
                scale: 1.15,
                z: 20,
                boxShadow: isSelected
                  ? '0 20px 40px rgba(6, 182, 212, 0.45)'
                  : '0 15px 30px rgba(0,0,0,0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              className={`w-16 h-16 rounded-full bg-gradient-to-tr ${server.gradient} p-[1px] relative flex items-center justify-center transition-shadow duration-300 ${
                isSelected
                  ? 'shadow-[0_12px_30px_rgba(6,182,212,0.4),inset_0_2px_4px_rgba(255,255,255,0.4)] border-2 border-cyan-300'
                  : 'shadow-[0_8px_20px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10'
              }`}
            >
              {/* Glossy lighting response sheen */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent pointer-events-none" />
              <div className="absolute inset-[2px] rounded-full bg-black/10 mix-blend-overlay pointer-events-none" />

              {/* Core Letter */}
              <span className="text-white font-extrabold text-2xl tracking-wider select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                {server.letter}
              </span>

              {/* Spatial Halo Hover Effect */}
              <div className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110 pointer-events-none" />
            </motion.div>

            {/* Volumetric shadow layer below */}
            <div className={`absolute bottom-[-6px] w-10 h-1 bg-black/35 blur-[2px] rounded-full transition-transform duration-300 ${
              isSelected ? 'scale-125 translate-y-[2px]' : 'scale-100 group-hover:scale-75'
            }`} />

            {/* Floating name tooltip */}
            <div className="absolute left-20 top-1/2 -translate-y-1/2 bg-slate-950/85 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] tracking-widest px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap uppercase">
              {server.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ServerNavigation;
