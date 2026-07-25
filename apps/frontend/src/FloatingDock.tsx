import React from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from '@synora/ui';
import {
  Compass,
  Terminal,
  Settings,
  HelpCircle,
  Sparkles,
  Monitor,
  Flame,
  Activity
} from 'lucide-react';

interface FloatingDockProps {
  themeConfig: any;
  currentTheme: 'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber';
  setTheme: (theme: 'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber') => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ themeConfig, currentTheme, setTheme }) => {
  const dockIcons = [
    { icon: Compass, label: 'Discover', onClick: () => {} },
    { icon: Terminal, label: 'Diagnostics', onClick: () => {} },
    { icon: Settings, label: 'Settings', onClick: () => {} },
    { icon: HelpCircle, label: 'Help', onClick: () => {} },
  ];

  const themes: Array<'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber'> = [
    'liquid-glass',
    'cotton-candy',
    'clay',
    'midnight',
    'neon-cyber'
  ];

  return (
    <div className="flex justify-center w-full z-10 select-none pb-2">
      <GlassPanel className="px-6 py-3 flex items-center gap-6 shadow-2xl" blur={themeConfig.defaults.blur} transparency={themeConfig.defaults.transparency} radius={themeConfig.defaults.radius}>
        {/* Navigation Section */}
        <div className="flex items-center gap-4 border-r border-white/10 pr-6">
          {dockIcons.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={item.onClick}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer text-white/85 hover:text-white transition-all flex items-center justify-center"
              title={item.label}
            >
              <item.icon size={20} />
            </motion.div>
          ))}
        </div>

        {/* Theme Picker Section */}
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-white/50 pr-1">Themes:</span>
          {themes.map((t, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                currentTheme === t
                  ? 'bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {t.replace('-', ' ')}
            </motion.button>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
};
