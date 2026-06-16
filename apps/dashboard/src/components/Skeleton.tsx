import React from 'react';

export function Skeleton({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse bg-surface-container-high/50 rounded-md ${className}`}
      {...props}
    />
  );
}
