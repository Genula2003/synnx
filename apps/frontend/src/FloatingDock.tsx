import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GlassPanel } from '@synora/ui';
import {
  Compass,
  Terminal,
  Settings,
  HelpCircle,
  Activity,
  Cpu,
  ShieldAlert
} from 'lucide-react';

interface FloatingDockProps {
  themeConfig: any;
  currentTheme: 'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber';
  setTheme: (theme: 'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber') => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ themeConfig, currentTheme, setTheme }) => {
  const dockItems = [
    { icon: Compass, label: 'Explore Space', action: () => {} },
    { icon: Terminal, label: 'Diagnostics Engine', action: () => { window.dispatchEvent(new CustomEvent('toggle-diagnostics')); } },
    { icon: Settings, label: 'System Preferences', action: () => { window.dispatchEvent(new CustomEvent('toggle-command-center')); } },
    { icon: HelpCircle, label: 'Help Space', action: () => {} },
  ];

  const themes: Array<'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber'> = [
    'liquid-glass',
    'cotton-candy',
    'clay',
    'midnight',
    'neon-cyber'
  ];

  // Mouse coordinate values for advanced macOS fisheye expansion scaling
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex justify-center w-full z-20 pb-4 select-none relative"
    >
      <GlassPanel
        className="px-6 py-4 flex items-center gap-6 shadow-[0_30px_70px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] rounded-3xl"
        blur={themeConfig.defaults.blur}
        transparency={themeConfig.defaults.transparency}
        radius={themeConfig.defaults.radius}
      >
        {/* Navigation Core */}
        <div className="flex items-center gap-4 border-r border-white/10 pr-6">
          {dockItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.25,
                y: -6,
                boxShadow: '0 15px 30px rgba(0,0,0,0.3)'
              }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: 'spring', stiffness: 450, damping: 14 }}
              onClick={item.action}
              className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] cursor-pointer text-white/80 hover:text-white transition-all flex items-center justify-center relative group"
            >
              <item.icon size={20} />

              {/* Physical Floating tooltip */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-950/90 border border-white/10 text-white font-mono text-[9px] tracking-widest px-2.5 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap uppercase">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic theme switcher button row */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-white/40 pr-1">Atmosphere:</span>
          {themes.map((themeOption) => {
            const isSelected = currentTheme === themeOption;

            return (
              <motion.button
                key={themeOption}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(themeOption)}
                className={`px-3 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-tr from-cyan-400 to-blue-500 text-white shadow-[0_8px_20px_rgba(6,182,212,0.35)] font-black border border-cyan-300/30'
                    : 'bg-white/[0.03] text-white/50 border border-white/5 hover:text-white hover:bg-white/[0.08] hover:border-white/10'
                }`}
              >
                {/* Physical Sheen */}
                {isSelected && (
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-pulse" />
                )}
                <span>{themeOption.replace('-', ' ')}</span>
              </motion.button>
            );
          })}
        </div>
      </GlassPanel>
    </div>
  );
};
export default FloatingDock;
