import React from 'react';

interface IconProps {
  name: string;
  filled?: boolean;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, filled = false, className = '', size }) => {
  const style: React.CSSProperties = {
    fontVariationSettings: filled ? "'FILL' 1" : undefined,
    fontSize: size ? `${size}px` : undefined,
  };

  return (
    <span className={`material-symbols-outlined ${className}`} style={style}>
      {name}
    </span>
  );
};
