import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface FloatingCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  elevation?: number;
  hoverScale?: number;
  glowColor?: string;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  elevation = 15,
  hoverScale = 1.05,
  glowColor = 'rgba(255,255,255,0.05)',
  children,
  className = '',
  ...props
}) => {
  const motionProps = props as HTMLMotionProps<'div'>;

  return (
    <motion.div
      whileHover={{
        y: -elevation,
        scale: hoverScale,
        boxShadow: `0 30px 45px -10px rgba(0, 0, 0, 0.4), 0 0 25px ${glowColor}`,
        rotateX: 2,
        rotateY: -2,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className={`bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-2xl p-5 shadow-2xl cursor-pointer transition-shadow ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      {...motionProps}
    >
      <div style={{ transform: 'translateZ(15px)' }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};
