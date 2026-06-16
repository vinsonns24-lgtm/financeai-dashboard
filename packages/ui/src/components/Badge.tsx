import React from 'react';
import { Icon } from './Icon';

interface BadgeProps {
  value: string;
  variant: 'success' | 'error';
}

export const Badge: React.FC<BadgeProps> = ({ value, variant }) => {
  const colorMap = {
    success: 'text-tertiary bg-tertiary/10 border-tertiary/20',
    error: 'text-error bg-error/10 border-error/20',
  };

  return (
    <span
      className={`flex items-center gap-xs font-label-sm text-label-sm px-2 py-1 rounded-full border ${colorMap[variant]}`}
    >
      <Icon name="trending_up" size={14} /> {value}
    </span>
  );
};
