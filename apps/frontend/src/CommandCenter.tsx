import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from '@synora/ui';
import { Search, Command, Monitor, RefreshCw, Sparkles, X } from 'lucide-react';

interface CommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  themeConfig: any;
  setTheme: (theme: 'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber') => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ isOpen, onClose, themeConfig, setTheme }) => {
  const [query, setQuery] = useState('');

  const items = [
    { name: 'Switch to Liquid Glass Theme', type: 'theme', action: () => setTheme('liquid-glass') },
    { name: 'Switch to Cotton Candy Theme', type: 'theme', action: () => setTheme('cotton-candy') },
    { name: 'Switch to Clay Theme', type: 'theme', action: () => setTheme('clay') },
    { name: 'Switch to Midnight Theme', type: 'theme', action: () => setTheme('midnight') },
    { name: 'Switch to Neon Cyber Theme', type: 'theme', action: () => setTheme('neon-cyber') },
    { name: 'Launch Diagnostics Overlay', type: 'system', action: () => { window.dispatchEvent(new CustomEvent('toggle-diagnostics')); } },
  ];

  const filteredItems = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4 pointer-events-none">
          {/* Blur backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md pointer-events-auto"
          />

          {/* Dialog Space window */}
          <motion.div
            initial={{ scale: 0.9, y: -40, opacity: 0, rotateX: 10 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.9, y: -40, opacity: 0, rotateX: -10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="w-full max-w-lg pointer-events-auto z-10"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            <GlassPanel className="p-5 flex flex-col gap-4 shadow-[0_40px_100px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] border-cyan-400/20" blur={themeConfig.defaults.blur} transparency={themeConfig.defaults.transparency} radius={themeConfig.defaults.radius}>
              {/* Core header bar */}
              <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 shadow-inner">
                <Search size={18} className="text-cyan-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Ask Synora to search servers, themes, or commands..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-white text-sm placeholder-white/30 font-medium"
                />
                <kbd className="text-[10px] font-mono bg-white/15 px-2 py-0.5 rounded text-white/50 font-bold">ESC</kbd>
              </div>

              {/* Items Panel */}
              <div className="flex flex-col gap-1.5 max-h-72 overflow-y-auto mt-2 pr-1">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02, x: 4, backgroundColor: 'rgba(255,255,255,0.06)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl flex items-center justify-between text-xs text-white/80 hover:text-white transition-all border border-transparent hover:border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                          <Command size={14} />
                        </div>
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <span className="text-[9px] uppercase tracking-widest font-black text-white/30 bg-white/5 px-2 py-0.5 rounded">{item.type}</span>
                    </motion.button>
                  ))
                ) : (
                  <p className="text-xs text-white/40 text-center py-6 font-medium">No system instructions or commands match your query</p>
                )}
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default CommandCenter;
