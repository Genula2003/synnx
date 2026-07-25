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
  Power
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
      <div className="flex-1 flex overflow-hidden p-6 gap-6 relative z-10">
        {/* Left Column: Volumetric 3D Floating Server Navigation Globe Controls */}
        <ServerNavigation currentTheme={currentTheme} />

        {/* Middle Column: Channels navigation */}
        <GlassPanel className="w-64 flex flex-col p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]" blur={themeConfig.defaults.blur} transparency={themeConfig.defaults.transparency} radius={themeConfig.defaults.radius}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xs font-black tracking-widest uppercase ${themeConfig.styles.textPrimary}`}>Channels Lobby</h2>
          </div>
          <div className="flex-1 flex flex-col gap-2.5">
            <div className={`px-4 py-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3 cursor-pointer ${themeConfig.styles.textPrimary}`}>
              # welcome-lobby
            </div>
            <div className="px-4 py-3 rounded-xl flex items-center gap-3 cursor-pointer text-white/40 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
              # announcement
            </div>
            <div className="px-4 py-3 rounded-xl flex items-center gap-3 cursor-pointer text-white/40 hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
              # general-chat
            </div>
          </div>
        </GlassPanel>

        {/* Right Column: Dynamic Workspace Showcase / widgets */}
        <div className="flex-1 flex gap-6">
          {/* Main Space */}
          <GlassPanel className="flex-1 p-6 flex flex-col justify-between shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]" blur={themeConfig.defaults.blur} transparency={themeConfig.defaults.transparency} radius={themeConfig.defaults.radius}>
            <div className="flex justify-between items-start">
              <div>
                <h1 className={`text-4xl font-black tracking-widest uppercase ${themeConfig.styles.textPrimary}`}>SYNORA</h1>
                <p className={`text-xs mt-1 font-bold ${themeConfig.styles.textSecondary}`}>NEXT-GENERATION COMMUNICATION OPERATING SYSTEM</p>
              </div>

              {/* Status Info indicator */}
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/70">Engine Connected</span>
              </div>
            </div>

            {/* Workspace visual showcase container */}
            <div className="my-8 flex-1 flex flex-col justify-center items-center text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500 flex items-center justify-center shadow-lg animate-bounce">
                <Sparkles className="text-white" size={32} />
              </div>
              <h2 className={`text-2xl font-black uppercase tracking-wider ${themeConfig.styles.textPrimary}`}>Operating System Interface ready</h2>
              <p className={`text-sm max-w-md ${themeConfig.styles.textSecondary}`}>
                A gorgeous communication workspace environment emphasizing performance, visual aesthetics, and fluid animations. Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono font-bold">CTRL + SPACE</kbd> to access the Command Center.
              </p>
            </div>

            <div className="flex justify-between items-center text-xs font-mono text-white/40 border-t border-white/10 pt-4">
              <span>ACTIVE USER: SYNORA RESIDENT</span>
              <span>VERSION 1.0.0 (PHASE 1 FOUNDATION)</span>
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
