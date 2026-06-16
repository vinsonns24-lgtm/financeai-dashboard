import { Icon } from '@financeai/ui';
import { useState } from 'react';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <main className="flex-1 px-md md:px-lg pb-xl h-full overflow-y-auto relative">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-container-max mx-auto relative z-10 pt-16 md:pt-24 flex flex-col gap-lg">
        <div className="mb-lg">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Settings</h2>
          <p className="font-body-md text-on-surface-variant">Configure your FinanceAI environment and data preferences.</p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          
          {/* Navigation Tabs (Mobile-ready but Desktop focused here) */}
          <div className="lg:col-span-3">
            <div className="glass-panel rounded-xl p-md sticky top-24 space-y-xs border-none shadow-xl bg-surface-container/60">
              <button 
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center gap-md px-md py-sm rounded-lg font-label-md transition-all text-left ${activeTab === 'general' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-white/5'}`}
              >
                <Icon name="public" /> General
              </button>
              <button 
                onClick={() => setActiveTab('preferences')}
                className={`w-full flex items-center gap-md px-md py-sm rounded-lg font-label-md transition-all text-left ${activeTab === 'preferences' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-white/5'}`}
              >
                <Icon name="tune" /> Preferences
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-md px-md py-sm rounded-lg font-label-md transition-all text-left ${activeTab === 'notifications' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-white/5'}`}
              >
                <Icon name="notifications_active" /> Notifications
              </button>
              <button 
                onClick={() => setActiveTab('danger')}
                className={`w-full flex items-center gap-md px-md py-sm rounded-lg font-label-md transition-all text-left ${activeTab === 'danger' ? 'bg-error/10 text-error' : 'text-error hover:bg-error/5'}`}
              >
                <Icon name="report" /> Danger Zone
              </button>
            </div>
          </div>

          {/* Content Panels */}
          <div className="lg:col-span-9 space-y-lg pb-xl">
            
            {/* General Section */}
            <section id="general" className={`glass-panel rounded-xl p-lg md:p-xl border-none shadow-2xl bg-surface-container/60 ${activeTab !== 'general' && 'hidden lg:block lg:opacity-50'}`}>
              <div className="flex items-center gap-md mb-lg">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Icon name="public" />
                </div>
                <h3 className="font-headline-md text-headline-md">General</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
                <div className="space-y-xs">
                  <label className="font-label-md text-on-surface-variant block">Primary Currency</label>
                  <select className="w-full bg-surface-container border border-white/10 rounded-lg py-sm px-md text-body-md text-on-surface focus:outline-none focus:border-primary">
                    <option>USD - US Dollar ($)</option>
                    <option>IDR - Indonesian Rupiah (Rp)</option>
                    <option>EUR - Euro (€)</option>
                    <option>GBP - British Pound (£)</option>
                  </select>
                  <p className="text-[11px] text-on-surface-variant/60">This currency will be used for all dashboard totals.</p>
                </div>
                <div className="space-y-xs">
                  <label className="font-label-md text-on-surface-variant block">Language</label>
                  <select className="w-full bg-surface-container border border-white/10 rounded-lg py-sm px-md text-body-md text-on-surface focus:outline-none focus:border-primary">
                    <option>English (US)</option>
                    <option>Bahasa Indonesia</option>
                    <option>French</option>
                    <option>Spanish</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-xs">
                  <label className="font-label-md text-on-surface-variant block">Timezone</label>
                  <select className="w-full bg-surface-container border border-white/10 rounded-lg py-sm px-md text-body-md text-on-surface focus:outline-none focus:border-primary">
                    <option>(GMT+07:00) Jakarta, Indonesia</option>
                    <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                    <option>(GMT+00:00) London, United Kingdom</option>
                    <option>(GMT+09:00) Tokyo, Japan</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Preferences Section */}
            <section id="preferences" className={`glass-panel rounded-xl p-lg md:p-xl border-none shadow-2xl bg-surface-container/60 ${activeTab !== 'preferences' && 'hidden lg:block lg:opacity-50'}`}>
              <div className="flex items-center gap-md mb-lg">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <Icon name="tune" />
                </div>
                <h3 className="font-headline-md text-headline-md">Preferences</h3>
              </div>
              <div className="space-y-lg">
                <div className="flex items-center justify-between py-md border-b border-white/5">
                  <div>
                    <p className="font-label-md text-on-surface">Dark Mode</p>
                    <p className="text-body-sm text-on-surface-variant">Switch between light and dark interface.</p>
                  </div>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input defaultChecked type="checkbox" name="toggle" id="dark-mode" className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none" />
                    <label htmlFor="dark-mode" className="switch-label block overflow-hidden h-6 rounded-full bg-surface-container-highest cursor-pointer">
                      <span className="switch-dot block h-6 w-6 rounded-full bg-white transition-transform duration-200" />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-md gap-md">
                  <div className="w-full max-w-xs">
                    <p className="font-label-md text-on-surface mb-xs">Default View</p>
                    <p className="text-body-sm text-on-surface-variant mb-md">Select your landing dashboard screen.</p>
                    <div className="grid grid-cols-2 gap-sm">
                      <button className="flex flex-col items-center gap-xs p-md rounded-xl border-2 border-primary bg-primary/5">
                        <Icon name="grid_view" className="text-primary" />
                        <span className="text-[12px] font-label-md">Overview</span>
                      </button>
                      <button className="flex flex-col items-center gap-xs p-md rounded-xl border-2 border-white/10 hover:border-white/20 transition-all">
                        <Icon name="analytics" className="text-on-surface-variant" />
                        <span className="text-[12px] font-label-md">Detailed Reports</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Notifications Section */}
            <section id="notifications" className={`glass-panel rounded-xl p-lg md:p-xl border-none shadow-2xl bg-surface-container/60 ${activeTab !== 'notifications' && 'hidden lg:block lg:opacity-50'}`}>
              <div className="flex items-center gap-md mb-lg">
                <div className="w-10 h-10 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary">
                  <Icon name="notifications_active" />
                </div>
                <h3 className="font-headline-md text-headline-md">Notifications</h3>
              </div>
              <div className="space-y-sm">
                <div className="p-md rounded-lg bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    <Icon name="account_balance_wallet" className="text-tertiary" />
                    <div>
                      <p className="font-label-md text-on-surface">Budget Alerts</p>
                      <p className="text-body-sm text-on-surface-variant">Notify when I reach 80% of my budget.</p>
                    </div>
                  </div>
                  <input defaultChecked type="checkbox" className="w-5 h-5 rounded border-white/20 bg-surface text-primary focus:ring-primary focus:ring-offset-surface cursor-pointer" />
                </div>
                <div className="p-md rounded-lg bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    <Icon name="summarize" className="text-primary" />
                    <div>
                      <p className="font-label-md text-on-surface">Weekly AI Reports</p>
                      <p className="text-body-sm text-on-surface-variant">Receive a summary of your financial health.</p>
                    </div>
                  </div>
                  <input defaultChecked type="checkbox" className="w-5 h-5 rounded border-white/20 bg-surface text-primary focus:ring-primary focus:ring-offset-surface cursor-pointer" />
                </div>
                <div className="p-md rounded-lg bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    <Icon name="mail" className="text-on-surface-variant" />
                    <div>
                      <p className="font-label-md text-on-surface">Email Updates</p>
                      <p className="text-body-sm text-on-surface-variant">Stay updated via your registered email.</p>
                    </div>
                  </div>
                  <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-surface text-primary focus:ring-primary focus:ring-offset-surface cursor-pointer" />
                </div>
              </div>
            </section>

            {/* Danger Zone Section */}
            <section id="danger" className={`glass-panel rounded-xl p-lg md:p-xl shadow-2xl bg-surface-container/60 border-t-4 border-l-0 border-r-0 border-b-0 border-error/50 ${activeTab !== 'danger' && 'hidden lg:block lg:opacity-50'}`}>
              <div className="flex items-center gap-md mb-lg">
                <div className="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center text-error">
                  <Icon name="report" />
                </div>
                <h3 className="font-headline-md text-headline-md text-error">Danger Zone</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                <button className="group p-lg rounded-xl border border-white/10 hover:border-error/50 hover:bg-error/5 transition-all text-center">
                  <Icon name="refresh" className="text-on-surface-variant group-hover:text-error mb-sm block mx-auto" />
                  <p className="font-label-md mb-base">Reset Demo Data</p>
                  <p className="text-[11px] text-on-surface-variant">Clear all simulated entries.</p>
                </button>
                <button className="group p-lg rounded-xl border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-center">
                  <Icon name="download" className="text-on-surface-variant group-hover:text-primary mb-sm block mx-auto" />
                  <p className="font-label-md mb-base">Export All Data</p>
                  <p className="text-[11px] text-on-surface-variant">Download your data as CSV/JSON.</p>
                </button>
                <button className="group p-lg rounded-xl border border-error/20 bg-error/10 hover:bg-error/20 transition-all text-center">
                  <Icon name="delete_forever" className="text-error mb-sm block mx-auto" />
                  <p className="font-label-md text-error mb-base">Delete Account</p>
                  <p className="text-[11px] text-on-surface-variant">Permanent action, cannot undo.</p>
                </button>
              </div>
            </section>

            {/* Save Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-md py-lg mt-lg">
              <button className="w-full sm:w-auto px-xl py-sm rounded-full font-label-md text-on-surface-variant hover:text-on-surface transition-colors">
                Discard changes
              </button>
              <button className="w-full sm:w-auto px-xl py-sm rounded-full font-label-md bg-primary text-on-primary shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                Save Changes
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
