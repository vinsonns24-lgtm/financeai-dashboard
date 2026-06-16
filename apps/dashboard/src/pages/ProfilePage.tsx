import { Icon } from '@financeai/ui';

export function ProfilePage() {
  return (
    <main className="flex-1 px-md md:px-lg pb-xl h-full overflow-y-auto">
      <div className="max-w-[1400px] mx-auto min-h-full flex flex-col pt-16 md:pt-24 gap-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          
          {/* User Information Profile Card */}
          <section className="lg:col-span-5 xl:col-span-4">
            <div className="glass-panel glass-card-edge rounded-3xl p-xl shadow-2xl relative overflow-hidden h-full">
              {/* Background Atmospheric Blur */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-lg">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                    <img 
                      alt="Profile photo" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJL6MpNh0_10Bu2mQtI-6g7p8LW53UHw9aZv_4g54VLHD2PJCgSHNfgbgbSLj4F-UyBx-aSTmwY2rLFdOOJ8LAYrsldA20diD0VfXnv9slfDBy2FCmmo2aA2Tdc7U9yYMNx0ppJ2PvfH5EnGuPP4rA96W7JxuACNT_lOE_UQ1BUoDRhkqPHT5khFKV_LezEGn2B_hJfN4SmvWP8fIszKbWrBQnXnH8a_EBlpUCPkpf7LyycZ4VZBwXuowxgqYuccTOJg3QzdnnZ7c" 
                    />
                  </div>
                  <button className="absolute bottom-1 right-1 bg-primary text-on-primary w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                    <Icon name="edit" size={18} />
                  </button>
                </div>
                
                <h2 className="font-headline-lg text-headline-lg mb-xs">Julian Sterling</h2>
                <p className="font-body-md text-body-md text-primary font-semibold mb-lg flex items-center justify-center gap-base">
                  <Icon name="verified" filled size={18} /> Premium Member
                </p>
                
                <div className="w-full space-y-md text-left mb-xl">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-xl bg-surface-variant/30 flex items-center justify-center">
                      <Icon name="mail" className="text-primary" />
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Email Address</p>
                      <p className="font-body-sm text-body-sm">j.sterling@finance.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-xl bg-surface-variant/30 flex items-center justify-center">
                      <Icon name="phone_iphone" className="text-primary" />
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">Phone Number</p>
                      <p className="font-body-sm text-body-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
                
                <div className="w-full text-left bg-surface-variant/20 rounded-2xl p-md">
                  <p className="font-label-md text-label-md mb-xs">Bio</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Quantitative strategist focused on high-growth tech assets. Using FinanceAI to optimize diversified portfolios and automate expense tracking for global ventures.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: Stats, Linked Accounts, Security */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-lg">
            
            {/* Account Overview Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="glass-panel rounded-2xl p-lg flex items-center justify-between">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Member Since</p>
                  <h3 className="font-headline-md text-headline-md">Oct 2023</h3>
                </div>
                <div className="p-md bg-secondary-container/20 rounded-full">
                  <Icon name="calendar_today" className="text-secondary" />
                </div>
              </div>
              <div className="glass-panel rounded-2xl p-lg flex items-center justify-between">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Account Status</p>
                  <span className="inline-flex items-center px-md py-1 rounded-full bg-primary/10 text-primary font-label-md text-label-md border border-primary/20">
                    Premium
                  </span>
                </div>
                <div className="p-md bg-primary-container/20 rounded-full">
                  <Icon name="workspace_premium" className="text-primary" />
                </div>
              </div>
            </section>

            {/* Linked Accounts */}
            <section className="glass-panel rounded-3xl p-xl">
              <div className="flex justify-between items-center mb-xl">
                <h3 className="font-headline-md text-headline-md">Linked Accounts</h3>
                <button className="text-primary font-label-md text-label-md flex items-center gap-xs hover:underline">
                  <Icon name="add" size={18} /> Link New
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {/* Bank Card */}
                <div className="bg-surface-container rounded-2xl p-md border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-md mb-md">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Icon name="account_balance" className="text-on-surface" />
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md">Chase Sapphire Check</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">•••• 8829</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-body-md text-body-md text-primary font-bold">$12,450.00</span>
                    <span className="font-label-sm text-label-sm text-emerald-400 bg-emerald-400/10 px-md py-0.5 rounded-full">Active</span>
                  </div>
                </div>
                
                {/* Credit Card */}
                <div className="bg-surface-container rounded-2xl p-md border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-md mb-md">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Icon name="credit_card" className="text-on-surface" />
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md">Amex Platinum</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">•••• 0012</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-body-md text-body-md text-on-surface font-bold">$2,190.50</span>
                    <span className="font-label-sm text-label-sm text-emerald-400 bg-emerald-400/10 px-md py-0.5 rounded-full">Active</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Security Section */}
            <section className="glass-panel rounded-3xl p-xl">
              <h3 className="font-headline-md text-headline-md mb-xl">Security Overview</h3>
              <div className="space-y-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md p-md bg-surface-container/40 rounded-2xl">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary">
                      <Icon name="location_on" filled />
                    </div>
                    <div>
                      <p className="font-label-md text-label-md">Last Login Location</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">San Francisco, CA • 192.168.1.45</p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Time</p>
                    <p className="font-body-sm text-body-sm">Today, 10:42 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between gap-md p-md bg-surface-container/40 rounded-2xl">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                      <Icon name="security" filled />
                    </div>
                    <div>
                      <p className="font-label-md text-label-md">Two-Factor Authentication</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Enabled via FinanceAI Authenticator</p>
                    </div>
                  </div>
                  <button className="text-on-surface-variant hover:text-on-surface p-base transition-colors">
                    <Icon name="chevron_right" />
                  </button>
                </div>
              </div>
              
              <div className="mt-xl flex flex-wrap gap-md">
                <button className="bg-surface-variant/40 hover:bg-surface-variant/60 text-on-surface border border-white/5 font-label-md text-label-md px-lg py-md rounded-full transition-colors">
                  Change Password
                </button>
                <button className="bg-surface-variant/40 hover:bg-surface-variant/60 text-on-surface border border-white/5 font-label-md text-label-md px-lg py-md rounded-full transition-colors">
                  Manage Active Sessions
                </button>
              </div>
            </section>
            
          </div>
        </div>
      </div>
    </main>
  );
}
