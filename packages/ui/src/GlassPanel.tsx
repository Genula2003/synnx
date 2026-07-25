import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface GlassPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  blur?: number;
  transparency?: number;
  radius?: number;
  depth?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  blur = 20,
  transparency = 15,
  radius = 16,
  depth = true,
  children,
  className = '',
  style = {},
  ...props
}) => {
  const glassStyle: React.CSSProperties = {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: `rgba(255, 255, 255, ${transparency / 100})`,
    borderRadius: `${radius}px`,
    ...style,
  };

  const motionProps = props as HTMLMotionProps<'div'>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className={`relative overflow-hidden border border-white/20 transition-all duration-500 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.35),0_0_1px_rgba(255,255,255,0.1)] ${className}`}
      style={glassStyle}
      {...motionProps}
    >
      {/* Dynamic 3D lighting reflection overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.14] opacity-85" />
      <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-inherit" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
};
