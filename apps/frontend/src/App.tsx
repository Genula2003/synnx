import React, { useState, useEffect } from 'react';
import { GlassPanel } from '@synora/ui';
import { getTheme } from '@synora/theme-engine';
import { BackgroundEngine } from './BackgroundEngine';
import { ServerNavigation } from './ServerNavigation';
import {
  ProfileWidget,
  FriendsWidget,
  AIWidget,
  SystemWidget
} from './Widgets';
import { FloatingDock } from './FloatingDock';
import { CommandCenter } from './CommandCenter';
import { DiagnosticMode } from './DiagnosticMode';
import {
  Compass,
  Terminal,
  Settings,
  HelpCircle,
  Search,
  User,
  UserPlus,
  Monitor,
  Sliders,
  Sparkles,
  Cpu,
  ChevronRight,
  Activity,
  Maximize2,
  Minimize2,
  Power,
  MessageSquare
} from 'lucide-react';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber'>('liquid-glass');
  const [commandCenterOpen, setCommandCenterOpen] = useState(false);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);

  const themeConfig = getTheme(currentTheme);

  // Keyboard shortcut listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/CTRL + SPACE: Command Center
      if (e.key === ' ' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setCommandCenterOpen(prev => !prev);
      }
      // CMD/CTRL + SHIFT + D: Diagnostics
      if (e.key === 'D' && (e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault();
        setDiagnosticsOpen(prev => !prev);
      }
    };

    const handleToggleDiagnostics = () => {
      setDiagnosticsOpen(prev => !prev);
    };

    const handleToggleCommandCenter = () => {
      setCommandCenterOpen(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-diagnostics', handleToggleDiagnostics);
    window.addEventListener('toggle-command-center', handleToggleCommandCenter);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-diagnostics', handleToggleDiagnostics);
      window.removeEventListener('toggle-command-center', handleToggleCommandCenter);
    };
  }, []);

  return (
    <div className={`h-screen w-screen relative overflow-hidden flex flex-col transition-colors duration-500`}>
      {/* Background Render Engine */}
      <BackgroundEngine theme={currentTheme} />

      {/* 3-Column main layout */}
      <div className="flex-1 flex overflow-hidden p-8 gap-8 relative z-10">
        {/* Left Column: Volumetric 3D Floating Server Navigation Globe Controls */}
        <ServerNavigation currentTheme={currentTheme} />

        {/* Middle Column: Channels navigation */}
        <GlassPanel className="w-64 flex flex-col p-6 shadow-[0_30px_70px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)] rounded-2xl" blur={themeConfig.defaults.blur} transparency={themeConfig.defaults.transparency} radius={themeConfig.defaults.radius}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xs font-black tracking-widest uppercase ${themeConfig.styles.textPrimary}`}>Channels Lobby</h2>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <div className={`px-4 py-3.5 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center gap-3 cursor-pointer shadow-inner ${themeConfig.styles.textPrimary}`}>
              # welcome-lobby
            </div>
            <div className="px-4 py-3.5 rounded-2xl flex items-center gap-3 cursor-pointer text-white/40 hover:bg-white/[0.04] hover:text-white transition-all text-sm font-semibold">
              # announcement
            </div>
            <div className="px-4 py-3.5 rounded-2xl flex items-center gap-3 cursor-pointer text-white/40 hover:bg-white/[0.04] hover:text-white transition-all text-sm font-semibold">
              # general-chat
            </div>
          </div>
        </GlassPanel>

        {/* Right Column: Dynamic Workspace Showcase / widgets */}
        <div className="flex-1 flex gap-8">
          {/* Main Space */}
          <GlassPanel className="flex-1 p-6 flex flex-col justify-between shadow-[0_30px_70px_rgba(0,0,0,0.6)]" blur={themeConfig.defaults.blur} transparency={themeConfig.defaults.transparency} radius={themeConfig.defaults.radius}>
            <div className="flex justify-between items-start">
              <div>
                <h1 className={`text-3xl font-black tracking-widest uppercase ${themeConfig.styles.textPrimary}`}>SYNORA</h1>
                <p className={`text-[10px] mt-1 font-bold ${themeConfig.styles.textSecondary}`}>3D SPATIAL COMMUNICATION ENGINE</p>
              </div>

              {/* Status Info indicator */}
              <div className="flex items-center gap-2.5 bg-white/[0.04] px-4 py-2 rounded-full border border-white/10 shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] uppercase font-black tracking-widest text-white/80">Diagnostics Stable</span>
              </div>
            </div>

            {/* Immersive messaging and feed cards with depth layers */}
            <div className="flex-1 overflow-y-auto my-6 flex flex-col gap-4 pr-1">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-start gap-4 transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_45px_rgba(0,0,0,0.4)]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-md">S</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">System Host</span>
                    <span className="text-[9px] bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Staff</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    "Welcome to Synora V2. The entire client has been rebuilt with custom Three.js particles and volumetric material elements."
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-start gap-4 transform transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_20px_45px_rgba(0,0,0,0.4)]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">A</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Aria Resident</span>
                  </div>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    "The spatial physics feel incredibly smooth. The 3D spheres on the left react to my cursor movement perfectly."
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-white/40 border-t border-white/10 pt-4">
              <span>ACTIVE USER: SYNORA ENGINE</span>
              <span>SYNORA v2.0 (TACTILE MATERIAL PLATFORM)</span>
            </div>
          </GlassPanel>

          {/* Widgets Grid */}
          <div className="w-80 flex flex-col gap-6 overflow-y-auto">
            <ProfileWidget theme={currentTheme} themeConfig={themeConfig} status="ONLINE" />
            <FriendsWidget theme={currentTheme} themeConfig={themeConfig} status="ONLINE" />
            <AIWidget theme={currentTheme} themeConfig={themeConfig} status="ONLINE" />
            <SystemWidget theme={currentTheme} themeConfig={themeConfig} status="ONLINE" />
          </div>
        </div>
      </div>

      {/* Floating Bottom Dock (Taskbar) */}
      <FloatingDock
        themeConfig={themeConfig}
        currentTheme={currentTheme}
        setTheme={(theme) => setCurrentTheme(theme)}
      />

      {/* Shortcuts Overlays */}
      <CommandCenter
        isOpen={commandCenterOpen}
        onClose={() => setCommandCenterOpen(false)}
        themeConfig={themeConfig}
        setTheme={(theme) => setCurrentTheme(theme)}
      />

      <DiagnosticMode
        isOpen={diagnosticsOpen}
        onClose={() => setDiagnosticsOpen(false)}
        themeConfig={themeConfig}
        currentTheme={currentTheme}
      />
    </div>
  );
}
