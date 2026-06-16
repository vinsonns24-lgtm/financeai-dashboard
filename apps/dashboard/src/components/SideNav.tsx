import { Icon } from '@financeai/ui';
import { NavLink, Link } from 'react-router-dom';

const PROFILE_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAS8zA2x8mGO1oXyfbF-J7X3eWznUMfSVvKZ_vJOQm-6no4n_7GFBc_3RiAYTQohGliFAhoKM9DjUR1bGw3Zp8ANEezFYln0kdoTsFrvtdzsRjjvjyrsSjmNmk8Uw18wMhsT9mJujGDPcALuOsWZvtTR1dkrvP_s39QodAyEGVQUK6P3diNlRfc6KUw5O1UqV4pXtE1mePdKv7LJyZfML4BJ6g5cDzSYsxwyrJt_7BIL2VV26elo0bLcIOlCPxrwfWgYTigaOsyizw';

function SideNavLink({ to, icon, label }: { to: string; icon: string; label: string }) {
  const baseClasses =
    'flex items-center gap-md px-md py-sm rounded-lg transition-colors duration-200 ease-in-out font-label-md text-label-md';
  const activeClasses = 'text-primary font-bold border-r-2 border-primary bg-primary/10';
  const inactiveClasses = 'text-on-surface-variant hover:bg-white/5 hover:text-primary';

  return (
    <NavLink to={to} className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {({ isActive }) => (
        <>
          <Icon name={icon} filled={isActive} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

export function SideNav() {
  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 border-r border-white/10 bg-surface/80 backdrop-blur-xl z-50">
      {/* Logo */}
      <div className="p-lg flex items-center gap-sm">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="diamond" className="text-surface font-bold" />
        </div>
        <div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">FinanceAI</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant">Premium Intelligence</p>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 px-md py-sm space-y-xs overflow-y-auto flex flex-col">
        <SideNavLink to="/" icon="dashboard" label="Dashboard" />
        <SideNavLink to="/transactions" icon="payments" label="Transactions" />
        <SideNavLink to="/budget" icon="account_balance_wallet" label="Budget" />
        <SideNavLink to="/goals" icon="target" label="Goals" />
        <SideNavLink to="/reports" icon="assessment" label="Reports" />

        <div className="h-px w-full bg-white/5 my-sm" />

        <SideNavLink to="/settings" icon="settings" label="Settings" />
        <SideNavLink to="/profile" icon="person" label="Profile" />
      </div>

      {/* Upgrade Button */}
        <div className="mt-auto px-4 w-full mb-lg">
          <Link to="/chat" className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#571bc1] to-[#5516be] text-white font-label-md text-label-md shadow-lg hover:opacity-90 transition-opacity">
            <Icon name="auto_awesome" size={16} /> AI Assistant
          </Link>
        </div>
    </nav>
  );
}

export function TopBar() {
  return (
    <header className="flex justify-between items-center px-lg sticky top-0 z-50 w-full h-16 bg-surface/60 backdrop-blur-xl border-b border-white/5">
      {/* Mobile Brand */}
      <div className="md:hidden flex items-center gap-sm">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="diamond" className="text-surface font-bold" size={18} />
        </div>
        <h1 className="font-headline-md text-headline-md font-bold text-primary">FinanceAI</h1>
      </div>

      {/* Date Filter */}
      <div className="hidden sm:flex items-center bg-surface-container-high rounded-full p-1 border border-white/5">
        <button className="px-md py-xs rounded-full bg-surface-variant text-on-surface font-label-sm text-label-sm shadow-sm transition-all">
          This Month
        </button>
        <button className="px-md py-xs rounded-full text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all">
          Last 3 Months
        </button>
        <button className="px-md py-xs rounded-full text-on-surface-variant hover:text-on-surface font-label-sm text-label-sm transition-all">
          YTD
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-sm">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-all scale-95 active:opacity-80">
          <Icon name="notifications" />
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-all scale-95 active:opacity-80">
          <Icon name="auto_awesome" />
        </button>
        <Link to="/login" className="w-8 h-8 rounded-full ml-sm bg-surface-variant border border-primary/30 overflow-hidden cursor-pointer block hover:opacity-80 transition-opacity">
          <img
            alt="User profile"
            className="w-full h-full object-cover"
            src={PROFILE_IMG}
          />
        </Link>
      </div>
    </header>
  );
}
