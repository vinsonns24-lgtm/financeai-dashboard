import { Icon } from '@financeai/ui';
import { NavLink } from 'react-router-dom';

export function FloatingFab() {
  return (
    <button className="fixed bottom-24 md:bottom-lg right-lg w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-surface shadow-[0_10px_30px_rgba(79,219,200,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 group">
      <Icon name="auto_awesome" className="font-bold group-hover:rotate-12 transition-transform" size={28} />
    </button>
  );
}

function BottomNavLink({ to, icon, label }: { to: string; icon: string; label: string }) {
  const baseClasses = 'flex flex-col items-center justify-center rounded-lg p-2 transition-transform duration-300';
  
  return (
    <NavLink to={to} className={({ isActive }) => `${baseClasses} ${isActive ? 'text-primary active:bg-primary/10' : 'text-on-surface-variant active:bg-primary/10'}`}>
      {({ isActive }) => (
        <>
          <Icon name={icon} filled={isActive} />
          <span className="font-label-sm text-label-sm mt-1">{label}</span>
        </>
      )}
    </NavLink>
  );
}

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center py-sm bg-surface-container/90 backdrop-blur-2xl rounded-t-xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]">
      <BottomNavLink to="/" icon="home" label="Home" />
      <BottomNavLink to="/transactions" icon="payments" label="Spend" />
      <BottomNavLink to="/plan" icon="event_note" label="Plan" />
      <BottomNavLink to="/ai" icon="smart_toy" label="AI" />
      <BottomNavLink to="/profile" icon="person" label="Account" />
    </nav>
  );
}
