import React from 'react';
import { GlassPanel } from '@synora/ui';
import { Sparkles, Activity, ShieldCheck, Heart } from 'lucide-react';

interface WidgetProps {
  theme: 'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber';
  themeConfig: any;
  status: 'ONLINE' | 'IDLE' | 'DND' | 'OFFLINE';
}

export const ProfileWidget: React.FC<WidgetProps> = ({ theme, themeConfig, status }) => {
  return (
    <GlassPanel className="p-4" blur={themeConfig.defaults.blur} transparency={themeConfig.defaults.transparency} radius={themeConfig.defaults.radius}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 p-0.5 shadow-md">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-bold">
              SY
            </div>
          </div>
          <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-900 ${
            status === 'ONLINE' ? 'bg-emerald-500' :
            status === 'IDLE' ? 'bg-amber-500' :
            status === 'DND' ? 'bg-rose-500' : 'bg-gray-500'
          }`} />
        </div>
        <div>
          <h4 className={`font-semibold tracking-wide ${themeConfig.styles.textPrimary}`}>Synora User</h4>
          <p className={`text-xs ${themeConfig.styles.textSecondary}`}>Premium OS Resident</p>
        </div>
      </div>
    </GlassPanel>
  );
};

export const FriendsWidget: React.FC<WidgetProps> = ({ theme, themeConfig }) => {
  const friends = [
    { name: 'Aria', status: 'ONLINE', details: 'Exploring liquid-glass' },
    { name: 'PixelCloud', status: 'IDLE', details: 'Floating cotton-candy' },
  ];

  return (
    <GlassPanel className="p-4 flex flex-col gap-3" blur={themeConfig.defaults.blur} transparency={themeConfig.defaults.transparency} radius={themeConfig.defaults.radius}>
      <div className="flex items-center justify-between">
        <h4 className={`text-xs font-bold uppercase tracking-wider ${themeConfig.styles.textPrimary}`}>Online Friends</h4>
        <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-white/70">{friends.length}</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {friends.map((f, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
                {f.name[0]}
              </div>
              <div>
                <p className="text-xs font-semibold text-white">{f.name}</p>
                <p className="text-[10px] text-white/50">{f.details}</p>
              </div>
            </div>
            <span className={`w-2 h-2 rounded-full ${f.status === 'ONLINE' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};

export const AIWidget: React.FC<WidgetProps> = ({ theme, themeConfig }) => {
  return (
    <GlassPanel className="p-4 flex flex-col gap-2 relative overflow-hidden" blur={themeConfig.defaults.blur} transparency={themeConfig.defaults.transparency} radius={themeConfig.defaults.radius}>
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-teal-400 animate-pulse" />
        <h4 className={`text-xs font-bold uppercase tracking-wider ${themeConfig.styles.textPrimary}`}>Synora AI Companion</h4>
      </div>
      <p className="text-xs text-white/60 leading-relaxed">
        "Ask me anything. Cognitive AI models will arrive in Phase 2."
      </p>
      <div className="absolute right-2 bottom-2 opacity-5">
        <Sparkles size={64} />
      </div>
    </GlassPanel>
  );
};

export const SystemWidget: React.FC<WidgetProps> = ({ theme, themeConfig }) => {
  return (
    <GlassPanel className="p-4 flex flex-col gap-3" blur={themeConfig.defaults.blur} transparency={themeConfig.defaults.transparency} radius={themeConfig.defaults.radius}>
      <h4 className={`text-xs font-bold uppercase tracking-wider ${themeConfig.styles.textPrimary}`}>System Status</h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white/5 p-2 rounded-lg flex flex-col">
          <span className="text-[10px] text-white/40 uppercase">Theme</span>
          <span className="text-xs font-bold text-teal-300 capitalize">{theme.replace('-', ' ')}</span>
        </div>
        <div className="bg-white/5 p-2 rounded-lg flex flex-col">
          <span className="text-[10px] text-white/40 uppercase">FPS UI</span>
          <span className="text-xs font-bold text-emerald-400">60 FPS</span>
        </div>
        <div className="bg-white/5 p-2 rounded-lg flex flex-col col-span-2 flex-row justify-between items-center">
          <div className="flex items-center gap-1.5">
            <Activity size={12} className="text-blue-400" />
            <span className="text-xs font-medium text-white/90">Diagnostics Stable</span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};
