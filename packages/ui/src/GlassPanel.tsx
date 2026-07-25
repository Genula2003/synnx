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
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      className={`relative overflow-hidden border border-white/20 transition-all duration-500 ${
        depth ? 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.25)]' : ''
      } ${className}`}
      style={glassStyle}
      {...motionProps}
    >
      {/* Dynamic 3D lighting reflection overlays */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] opacity-80" />
      <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-inherit mask-image-[linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
};
