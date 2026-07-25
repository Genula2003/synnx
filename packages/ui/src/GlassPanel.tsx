import React from 'react';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  blur?: number;
  transparency?: number;
  radius?: number;
  children?: React.ReactNode;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  blur = 20,
  transparency = 15,
  radius = 16,
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

  return (
    <div
      className={`relative overflow-hidden border border-white/20 transition-all duration-300 ${className}`}
      style={glassStyle}
      {...props}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-60" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};
