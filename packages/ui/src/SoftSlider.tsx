import React from 'react';

export interface SoftSliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export const SoftSlider: React.FC<SoftSliderProps> = ({
  label,
  value,
  min = 0,
  max = 100,
  onChange,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${disabled ? 'opacity-50' : ''} ${className}`}>
      {label && (
        <div className="flex justify-between text-xs font-semibold opacity-80">
          <span>{label}</span>
          <span>{value}</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-white/20 accent-blue-500 hover:accent-blue-400 outline-none focus:outline-none"
        {...props}
      />
    </div>
  );
};
