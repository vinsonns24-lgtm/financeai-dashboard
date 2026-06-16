import React from 'react';
import { Icon } from './Icon';

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  filled?: boolean;
  href?: string;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active = false,
  filled = false,
  href = '#',
  onClick,
}) => {
  const baseClasses =
    'flex items-center gap-md px-md py-sm rounded-lg transition-colors duration-200 ease-in-out';
  const activeClasses = 'text-primary font-bold border-r-2 border-primary bg-primary/5';
  const inactiveClasses = 'text-on-surface-variant hover:bg-white/5 hover:text-primary';

  return (
    <a
      href={href}
      onClick={onClick}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
    >
      <Icon name={icon} filled={active || filled} />
      <span className="font-label-md text-label-md">{label}</span>
    </a>
  );
};
