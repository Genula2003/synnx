import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from '@synora/ui';
import { Activity, Cpu, Monitor, Zap, Wifi } from 'lucide-react';

interface DiagnosticModeProps {
  isOpen: boolean;
  onClose: () => void;
  themeConfig: any;
  currentTheme: string;
}

export const DiagnosticMode: React.FC<DiagnosticModeProps> = ({ isOpen, onClose, themeConfig, currentTheme }) => {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    let animationId: number;

    const tick = () => {
      frameCount++;
      const time = performance.now();
      if (time >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastTime)));
        frameCount = 0;
        lastTime = time;
      }
      animationId = requestAnimationFrame(tick);
    };

    if (isOpen) {
      animationId = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(animationId);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md pointer-events-auto"
          />

          {/* Diagnostic Panel */}
          <motion.div
            initial={{ scale: 0.9, rotateX: 15, opacity: 0 }}
            animate={{ scale: 1, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.9, rotateX: -15, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="w-full max-w-lg pointer-events-auto z-10"
          >
            <GlassPanel className="p-6 flex flex-col gap-5 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)]" blur={themeConfig.defaults.blur} transparency={themeConfig.defaults.transparency} radius={themeConfig.defaults.radius}>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="text-cyan-400 animate-pulse" size={20} />
                  <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-cyan-400">Synora Diagnostics</h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/40 hover:text-white text-xs font-bold font-mono tracking-wider"
                >
                  CLOSE [ESC]
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-xs text-white/80">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="text-amber-400" size={16} />
                    <span>Performance (FPS):</span>
                  </div>
                  <span className="font-bold text-emerald-400">{fps} FPS</span>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="text-rose-400" size={16} />
                    <span>Memory Usage:</span>
                  </div>
                  <span className="font-bold text-rose-400">124 MB</span>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="text-indigo-400" size={16} />
                    <span>Active Theme:</span>
                  </div>
                  <span className="font-bold text-indigo-400 capitalize">{currentTheme.replace('-', ' ')}</span>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="text-purple-400" size={16} />
                    <span>GPU Acceleration:</span>
                  </div>
                  <span className="font-bold text-emerald-400">Enabled</span>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between col-span-2">
                  <div className="flex items-center gap-2">
                    <Wifi className="text-teal-400" size={16} />
                    <span>Engine Connection:</span>
                  </div>
                  <span className="font-bold text-teal-400">CONNECTED</span>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
