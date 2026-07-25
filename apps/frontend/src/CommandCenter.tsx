import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from '@synora/ui';
import { Search, Command, Monitor, RefreshCw, X } from 'lucide-react';

interface CommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  themeConfig: any;
  setTheme: (theme: 'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber') => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({ isOpen, onClose, themeConfig, setTheme }) => {
  const [query, setQuery] = useState('');

  const items = [
    { name: 'Switch to Liquid Glass Theme', type: 'command', action: () => setTheme('liquid-glass') },
    { name: 'Switch to Cotton Candy Theme', type: 'command', action: () => setTheme('cotton-candy') },
    { name: 'Switch to Clay Theme', type: 'command', action: () => setTheme('clay') },
    { name: 'Switch to Midnight Theme', type: 'command', action: () => setTheme('midnight') },
    { name: 'Switch to Neon Cyber Theme', type: 'command', action: () => setTheme('neon-cyber') },
    { name: 'Launch Diagnostics', type: 'command', action: () => { window.dispatchEvent(new CustomEvent('toggle-diagnostics')); } },
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
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* Dialog */}
          <motion.div
            initial={{ scale: 0.95, y: -20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            className="w-full max-w-lg pointer-events-auto z-10"
          >
            <GlassPanel className="p-4 flex flex-col gap-3 shadow-2xl" blur={themeConfig.defaults.blur} transparency={themeConfig.defaults.transparency} radius={themeConfig.defaults.radius}>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
                <Search size={18} className="text-white/50" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search settings, commands, themes..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent flex-1 outline-none text-white text-sm placeholder-white/30"
                />
                <kbd className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/50">ESC</kbd>
              </div>

              <div className="flex flex-col gap-1 max-h-60 overflow-y-auto mt-2">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 flex items-center justify-between text-xs text-white/80 hover:text-white transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Command size={14} className="text-teal-400" />
                        <span>{item.name}</span>
                      </div>
                      <span className="text-[10px] uppercase text-white/40 tracking-wider font-semibold">{item.type}</span>
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-white/40 text-center py-4">No results found</p>
                )}
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
