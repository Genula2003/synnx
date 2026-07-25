import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ClayButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  active?: boolean;
  loading?: boolean;
  theme?: 'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber';
}

export const ClayButton: React.FC<ClayButtonProps> = ({
  active = false,
  loading = false,
  theme = 'liquid-glass',
  children,
  className = '',
  disabled,
  ...props
}) => {
  let themeClass = '';
  if (theme === 'clay') {
    themeClass = `bg-[#e0e5ec] text-gray-700 shadow-[6px_6px_12px_rgba(163,177,198,0.4),-6px_-6px_12px_rgba(255,255,255,0.8)] border border-transparent hover:scale-[1.02] active:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.4),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]`;
  } else if (theme === 'neon-cyber') {
    themeClass = `border-2 border-[#ff0055] text-[#ff0055] bg-transparent hover:bg-[#ff0055]/10 shadow-[0_0_15px_rgba(255,0,85,0.25)] hover:shadow-[0_0_25px_rgba(255,0,85,0.5)] active:scale-[0.95]`;
  } else if (theme === 'cotton-candy') {
    themeClass = `border-b-4 border-pink-600/80 bg-pink-400 text-white shadow-[0_4px_10px_rgba(244,114,182,0.25)] hover:bg-pink-500 hover:scale-[1.03] active:border-b-0 active:translate-y-[4px]`;
  } else if (theme === 'midnight') {
    themeClass = `border-b-4 border-zinc-800 bg-zinc-700 text-white hover:bg-zinc-600 active:border-b-0 active:translate-y-[4px]`;
  } else {
    // Liquid Glass
    themeClass = `border-b-4 border-blue-700/80 bg-blue-500/80 text-white shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:bg-blue-600/90 hover:scale-[1.03] active:border-b-0 active:translate-y-[4px]`;
  }

  const disabledClass = disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  const motionProps = props as HTMLMotionProps<'button'>;

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.05, y: -2, z: 10 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95, y: 1 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`px-5 py-2.5 font-bold tracking-wide rounded-xl select-none outline-none focus:outline-none flex items-center justify-center gap-2 ${themeClass} ${disabledClass} ${className}`}
      disabled={disabled || loading}
      {...motionProps}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </motion.button>
  );
};
