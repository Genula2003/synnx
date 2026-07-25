import { ThemeName } from '@synora/shared-types';

export interface ThemeConfig {
  name: ThemeName;
  displayName: string;
  styles: {
    background: string;
    glassPanel: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentHover: string;
    button3d: string;
    button3dActive: string;
    sidebar: string;
    inputBg: string;
    inputBorder: string;
    sliderTrack: string;
    sliderThumb: string;
  };
  defaults: {
    blur: number;
    transparency: number;
    shadow: number;
    radius: number;
    animationSpeed: number;
  };
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  'liquid-glass': {
    name: 'liquid-glass',
    displayName: 'Liquid Glass',
    styles: {
      background: 'bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-blue-900/40 backdrop-blur-xl',
      glassPanel: 'bg-white/10 border border-white/20 backdrop-blur-md shadow-2xl shadow-black/10',
      textPrimary: 'text-white font-medium tracking-wide',
      textSecondary: 'text-white/60 font-light',
      accent: 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white shadow-lg shadow-blue-500/20',
      accentHover: 'hover:from-blue-400/90 hover:to-purple-400/90 hover:scale-[1.02] active:scale-[0.98]',
      button3d: 'border-b-4 border-blue-700 bg-blue-500 text-white shadow-md active:border-b-0 active:translate-y-[4px]',
      button3dActive: 'border-b-0 translate-y-[4px]',
      sidebar: 'bg-black/20 border-r border-white/10 backdrop-blur-lg',
      inputBg: 'bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-blue-500/40',
      inputBorder: 'border-white/10',
      sliderTrack: 'bg-white/20',
      sliderThumb: 'bg-blue-400',
    },
    defaults: {
      blur: 20,
      transparency: 15,
      shadow: 30,
      radius: 16,
      animationSpeed: 5,
    },
  },
  'cotton-candy': {
    name: 'cotton-candy',
    displayName: 'Cotton Candy',
    styles: {
      background: 'bg-gradient-to-tr from-pink-200 via-purple-100 to-blue-200',
      glassPanel: 'bg-white/60 border border-pink-300/30 shadow-xl shadow-pink-200/40 backdrop-blur-sm',
      textPrimary: 'text-pink-900 font-semibold',
      textSecondary: 'text-pink-700/70 font-medium',
      accent: 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md shadow-pink-300/30',
      accentHover: 'hover:from-pink-500 hover:to-purple-500 hover:scale-[1.02] active:scale-[0.98]',
      button3d: 'border-b-4 border-pink-600 bg-pink-400 text-white shadow-sm active:border-b-0 active:translate-y-[4px]',
      button3dActive: 'border-b-0 translate-y-[4px]',
      sidebar: 'bg-pink-100/40 border-r border-pink-200/30 backdrop-blur-md',
      inputBg: 'bg-white/40 focus:bg-white/70 focus:ring-2 focus:ring-pink-300/50',
      inputBorder: 'border-pink-200/30',
      sliderTrack: 'bg-pink-200',
      sliderThumb: 'bg-pink-400',
    },
    defaults: {
      blur: 8,
      transparency: 60,
      shadow: 15,
      radius: 24,
      animationSpeed: 8,
    },
  },
  'clay': {
    name: 'clay',
    displayName: 'Clay',
    styles: {
      background: 'bg-[#e0e5ec]',
      glassPanel: 'bg-[#e0e5ec] shadow-[9px_9px_16px_rgba(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.8)] rounded-3xl border border-transparent',
      textPrimary: 'text-gray-700 font-bold',
      textSecondary: 'text-gray-500 font-medium',
      accent: 'bg-[#e0e5ec] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] text-blue-600',
      accentHover: 'hover:scale-[1.01] active:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.6),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]',
      button3d: 'bg-[#e0e5ec] shadow-[6px_6px_12px_rgba(163,177,198,0.4),-6px_-6px_12px_rgba(255,255,255,0.8)] border border-transparent active:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] transition-all',
      button3dActive: 'shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]',
      sidebar: 'bg-[#e0e5ec] border-r border-gray-300/40 shadow-[4px_0_10px_rgba(163,177,198,0.2)]',
      inputBg: 'bg-[#e0e5ec] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.4),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] focus:ring-0',
      inputBorder: 'border-transparent',
      sliderTrack: 'bg-gray-300 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)]',
      sliderThumb: 'bg-gray-400 shadow-[1px_1px_3px_rgba(0,0,0,0.2)]',
    },
    defaults: {
      blur: 0,
      transparency: 100,
      shadow: 20,
      radius: 28,
      animationSpeed: 4,
    },
  },
  'midnight': {
    name: 'midnight',
    displayName: 'Midnight OLED',
    styles: {
      background: 'bg-black',
      glassPanel: 'bg-zinc-900/90 border border-zinc-800 shadow-2xl shadow-black',
      textPrimary: 'text-zinc-100 font-semibold tracking-tight',
      textSecondary: 'text-zinc-500 font-normal',
      accent: 'bg-zinc-100 text-black hover:bg-zinc-200 transition-all font-medium',
      accentHover: 'hover:bg-zinc-200 hover:scale-[1.01]',
      button3d: 'border-b-4 border-zinc-800 bg-zinc-700 text-white active:border-b-0 active:translate-y-[4px]',
      button3dActive: 'border-b-0 translate-y-[4px]',
      sidebar: 'bg-black border-r border-zinc-800',
      inputBg: 'bg-zinc-950 focus:bg-zinc-900 focus:ring-1 focus:ring-zinc-600',
      inputBorder: 'border-zinc-800',
      sliderTrack: 'bg-zinc-800',
      sliderThumb: 'bg-zinc-100',
    },
    defaults: {
      blur: 12,
      transparency: 5,
      shadow: 50,
      radius: 12,
      animationSpeed: 3,
    },
  },
  'neon-cyber': {
    name: 'neon-cyber',
    displayName: 'Neon Cyber',
    styles: {
      background: 'bg-[#0a051b] bg-[linear-gradient(to_right,#1f133d_1px,transparent_1px),linear-gradient(to_bottom,#1f133d_1px,transparent_1px)] bg-[size:32px_32px]',
      glassPanel: 'bg-[#0f0826]/85 border border-[#ff0055]/30 shadow-[0_0_20px_rgba(255,0,85,0.15)] backdrop-blur-md',
      textPrimary: 'text-[#00ffcc] font-mono font-bold tracking-widest uppercase',
      textSecondary: 'text-[#ff0055] font-mono font-semibold',
      accent: 'bg-transparent border border-[#00ffcc] text-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.3)] hover:bg-[#00ffcc]/10',
      accentHover: 'hover:bg-[#00ffcc]/20 hover:scale-[1.02] active:scale-[0.98]',
      button3d: 'border-2 border-[#ff0055] text-[#ff0055] bg-transparent hover:bg-[#ff0055]/10 shadow-[0_0_10px_rgba(255,0,85,0.2)] active:scale-[0.95] transition-all',
      button3dActive: 'bg-[#ff0055]/20',
      sidebar: 'bg-[#070314] border-r border-[#ff0055]/20',
      inputBg: 'bg-[#0a051b] focus:bg-[#0f0826] focus:ring-1 focus:ring-[#00ffcc] text-[#00ffcc]',
      inputBorder: 'border-[#ff0055]/20',
      sliderTrack: 'bg-[#1f133d]',
      sliderThumb: 'bg-[#00ffcc] shadow-[0_0_10px_#00ffcc]',
    },
    defaults: {
      blur: 15,
      transparency: 10,
      shadow: 40,
      radius: 8,
      animationSpeed: 6,
    },
  },
};

export function getTheme(themeName: ThemeName): ThemeConfig {
  return THEMES[themeName] || THEMES['liquid-glass'];
}
export function listThemes(): ThemeConfig[] {
  return Object.values(THEMES);
}
