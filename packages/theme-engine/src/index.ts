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
    // New 3D Spatial tokens
    glowColor: string;
    extrusionDepth: string;
    surfaceReflection: string;
    cardShadow: string;
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
      background: 'bg-[#0b0813]',
      glassPanel: 'bg-white/[0.06] border border-white/20 backdrop-blur-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]',
      textPrimary: 'text-white font-semibold tracking-wide [text-shadow:0_2px_10px_rgba(255,255,255,0.15)]',
      textSecondary: 'text-white/60 font-medium',
      accent: 'bg-gradient-to-r from-cyan-400/80 to-blue-500/80 text-white shadow-[0_0_20px_rgba(34,211,238,0.25)]',
      accentHover: 'hover:from-cyan-300 hover:to-blue-400 hover:scale-[1.03] active:scale-[0.97]',
      button3d: 'border-b-4 border-blue-700/60 bg-blue-500/80 text-white shadow-[0_5px_15px_rgba(0,0,0,0.25)] active:border-b-0 active:translate-y-[4px]',
      button3dActive: 'border-b-0 translate-y-[4px]',
      sidebar: 'bg-white/[0.02] border-r border-white/10 backdrop-blur-3xl',
      inputBg: 'bg-white/[0.04] focus:bg-white/[0.08] focus:ring-2 focus:ring-cyan-500/50',
      inputBorder: 'border-white/10',
      sliderTrack: 'bg-white/10',
      sliderThumb: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]',
      glowColor: 'rgba(34, 211, 238, 0.4)',
      extrusionDepth: '6px',
      surfaceReflection: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
      cardShadow: '0_25px_60px_-15px_rgba(0,0,0,0.5)',
    },
    defaults: {
      blur: 30,
      transparency: 6,
      shadow: 50,
      radius: 20,
      animationSpeed: 5,
    },
  },
  'cotton-candy': {
    name: 'cotton-candy',
    displayName: 'Cotton Candy',
    styles: {
      background: 'bg-[#fff5f9]',
      glassPanel: 'bg-white/40 border border-pink-300/30 shadow-[0_20px_45px_rgba(244,114,182,0.15),inset_0_1px_2px_rgba(255,255,255,0.4)] backdrop-blur-xl',
      textPrimary: 'text-pink-900 font-extrabold tracking-wider [text-shadow:0_1px_4px_rgba(244,114,182,0.1)]',
      textSecondary: 'text-pink-700/70 font-semibold',
      accent: 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-[0_6px_15px_rgba(244,114,182,0.2)]',
      accentHover: 'hover:from-pink-500 hover:to-purple-500 hover:scale-[1.03] active:scale-[0.97]',
      button3d: 'border-b-4 border-pink-600/80 bg-pink-400 text-white active:border-b-0 active:translate-y-[4px]',
      button3dActive: 'border-b-0 translate-y-[4px]',
      sidebar: 'bg-pink-100/20 border-r border-pink-200/30 backdrop-blur-xl',
      inputBg: 'bg-white/30 focus:bg-white/60 focus:ring-2 focus:ring-pink-300/50',
      inputBorder: 'border-pink-200/40',
      sliderTrack: 'bg-pink-100',
      sliderThumb: 'bg-pink-400 shadow-[0_2px_6px_rgba(244,114,182,0.3)]',
      glowColor: 'rgba(244, 114, 182, 0.3)',
      extrusionDepth: '8px',
      surfaceReflection: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
      cardShadow: '0_20px_45px_rgba(244,114,182,0.15)',
    },
    defaults: {
      blur: 15,
      transparency: 40,
      shadow: 25,
      radius: 28,
      animationSpeed: 8,
    },
  },
  'clay': {
    name: 'clay',
    displayName: 'Clay',
    styles: {
      background: 'bg-[#e0e5ec]',
      glassPanel: 'bg-[#e0e5ec] shadow-[12px_12px_24px_rgba(163,177,198,0.5),-12px_-12px_24px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(255,255,255,0.6)] rounded-3xl border border-transparent',
      textPrimary: 'text-gray-700 font-extrabold tracking-wide',
      textSecondary: 'text-gray-500 font-semibold',
      accent: 'bg-[#e0e5ec] shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] text-blue-600',
      accentHover: 'hover:scale-[1.01] active:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.5),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]',
      button3d: 'bg-[#e0e5ec] shadow-[6px_6px_12px_rgba(163,177,198,0.3),-6px_-6px_12px_rgba(255,255,255,0.8)] border border-transparent active:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)] transition-all',
      button3dActive: 'shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]',
      sidebar: 'bg-[#e0e5ec] border-r border-gray-300/40 shadow-[4px_0_12px_rgba(163,177,198,0.15)]',
      inputBg: 'bg-[#e0e5ec] shadow-[inset_3px_3px_6px_rgba(163,177,198,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.8)] focus:ring-0',
      inputBorder: 'border-transparent',
      sliderTrack: 'bg-gray-300/80 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]',
      sliderThumb: 'bg-[#e0e5ec] shadow-[3px_3px_6px_rgba(163,177,198,0.5),-3px_-3px_6px_rgba(255,255,255,0.8)]',
      glowColor: 'rgba(163, 177, 198, 0.2)',
      extrusionDepth: '10px',
      surfaceReflection: 'none',
      cardShadow: '12px_12px_24px_rgba(163,177,198,0.5),-12px_-12px_24px_rgba(255,255,255,0.8)',
    },
    defaults: {
      blur: 0,
      transparency: 100,
      shadow: 35,
      radius: 32,
      animationSpeed: 4,
    },
  },
  'midnight': {
    name: 'midnight',
    displayName: 'Midnight OLED',
    styles: {
      background: 'bg-[#020203]',
      glassPanel: 'bg-zinc-950/80 border border-zinc-800 shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl',
      textPrimary: 'text-zinc-100 font-bold tracking-tight',
      textSecondary: 'text-zinc-500 font-medium',
      accent: 'bg-zinc-100 text-black font-semibold',
      accentHover: 'hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98]',
      button3d: 'border-b-4 border-zinc-800 bg-zinc-800/80 text-white active:border-b-0 active:translate-y-[4px]',
      button3dActive: 'border-b-0 translate-y-[4px]',
      sidebar: 'bg-zinc-950/40 border-r border-zinc-800 backdrop-blur-2xl',
      inputBg: 'bg-zinc-900 focus:bg-zinc-800 focus:ring-1 focus:ring-zinc-700',
      inputBorder: 'border-zinc-800',
      sliderTrack: 'bg-zinc-900',
      sliderThumb: 'bg-zinc-100 shadow-[0_0_10px_rgba(255,255,255,0.25)]',
      glowColor: 'rgba(255, 255, 255, 0.1)',
      extrusionDepth: '5px',
      surfaceReflection: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
      cardShadow: '0_30px_70px_rgba(0,0,0,0.8)',
    },
    defaults: {
      blur: 25,
      transparency: 4,
      shadow: 60,
      radius: 14,
      animationSpeed: 3,
    },
  },
  'neon-cyber': {
    name: 'neon-cyber',
    displayName: 'Neon Cyber',
    styles: {
      background: 'bg-[#03010a]',
      glassPanel: 'bg-[#090416]/90 border border-fuchsia-500/30 shadow-[0_0_30px_rgba(217,70,239,0.15)] backdrop-blur-xl',
      textPrimary: 'text-[#00ffcc] font-mono font-bold tracking-widest uppercase [text-shadow:0_0_8px_rgba(0,255,204,0.4)]',
      textSecondary: 'text-fuchsia-400 font-mono font-bold',
      accent: 'bg-transparent border border-[#00ffcc] text-[#00ffcc] shadow-[0_0_15px_rgba(0,255,204,0.25)]',
      accentHover: 'hover:bg-[#00ffcc]/10 hover:scale-[1.03] active:scale-[0.97]',
      button3d: 'border-2 border-fuchsia-500 text-fuchsia-500 bg-transparent hover:bg-fuchsia-500/10 shadow-[0_0_10px_rgba(217,70,239,0.2)] active:scale-[0.95]',
      button3dActive: 'bg-fuchsia-500/20',
      sidebar: 'bg-[#05020c] border-r border-fuchsia-500/20',
      inputBg: 'bg-[#05020c] focus:bg-[#090416] focus:ring-1 focus:ring-[#00ffcc] text-[#00ffcc]',
      inputBorder: 'border-fuchsia-500/20',
      sliderTrack: 'bg-[#120726]',
      sliderThumb: 'bg-[#00ffcc] shadow-[0_0_10px_#00ffcc]',
      glowColor: 'rgba(217, 70, 239, 0.4)',
      extrusionDepth: '4px',
      surfaceReflection: 'none',
      cardShadow: '0_0_30px_rgba(217,70,239,0.15)',
    },
    defaults: {
      blur: 16,
      transparency: 12,
      shadow: 45,
      radius: 10,
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
