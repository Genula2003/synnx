import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface FloatingCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  elevation?: number;
  hoverScale?: number;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
  elevation = 10,
  hoverScale = 1.03,
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
        boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.3)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-5 shadow-lg cursor-pointer transition-shadow ${className}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};
