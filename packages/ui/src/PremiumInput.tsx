import React from 'react';

export interface PremiumInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PremiumInput: React.FC<PremiumInputProps> = ({
  label,
  error,
  className = '',
  id,
  type = 'text',
  disabled,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${disabled ? 'opacity-50' : ''}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-bold tracking-wider uppercase opacity-80">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        className={`w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 placeholder-white/30 transition-all ${
          error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10' : ''
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs font-semibold text-red-400">{error}</span>}
    </div>
  );
};
