import { Icon } from '@financeai/ui';

export function GoalsPage() {
  return (
    <main className="flex-1 px-md md:px-xl pb-xxl h-full overflow-y-auto">
      <div className="max-w-[1280px] mx-auto min-h-full flex flex-col gap-lg pt-16 md:pt-24">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-md">
          <div>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
              Goals & Savings Tracker
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
              AI-optimized trajectory for your financial milestones.
            </p>
          </div>
          <div className="flex gap-md">
            <button className="px-lg py-sm rounded-full bg-surface-container-high text-on-surface font-label-md text-label-md border border-outline-variant/20 hover:bg-surface-variant transition-colors flex items-center gap-xs">
              <Icon name="tune" size={18} /> Filter
            </button>
            <button className="px-lg py-sm rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-fixed transition-colors flex items-center gap-xs">
              <Icon name="add" size={18} /> Create Goal
            </button>
          </div>
        </header>

        {/* Goals Grid & Analysis Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg mt-md">
          
          {/* Goals Grid (Takes 8 columns on large screens) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-lg">
            
            {/* Goal Card 1: Emergency Fund */}
            <div className="glass-card rounded-xl p-lg flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <div className="flex justify-between items-start mb-lg">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Emergency Fund</h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Due: Dec 2026</p>
                </div>
                <div className="p-sm bg-surface-container rounded-lg">
                  <Icon name="health_and_safety" className="text-primary" />
                </div>
              </div>
              
              <div className="flex items-center justify-center py-md relative">
                <svg className="circular-chart w-32 h-32" viewBox="0 0 36 36">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle stroke-primary" strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-headline-md text-headline-md text-on-surface">60%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-md mb-md">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Current</p>
                  <p className="font-body-lg text-body-lg font-semibold text-primary">Rp 6m</p>
                </div>
                <div className="text-right">
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Target</p>
                  <p className="font-body-lg text-body-lg font-semibold text-on-surface">Rp 10m</p>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-sm">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Required Monthly</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Rp 667k/mo</span>
                </div>
                <div className="ai-gradient-bg border border-secondary/20 rounded-lg p-sm flex items-start gap-sm">
                  <Icon name="auto_awesome" className="text-secondary mt-0.5" size={16} />
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    <span className="text-on-surface font-medium">On track! </span>
                    You can reach this 2 months early by reducing entertainment by 20%.
                  </p>
                </div>
              </div>
            </div>

            {/* Goal Card 2: Japan Trip */}
            <div className="glass-card rounded-xl p-lg flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <div className="flex justify-between items-start mb-lg">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Japan Trip</h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Due: Oct 2024</p>
                </div>
                <div className="p-sm bg-surface-container rounded-lg">
                  <Icon name="flight_takeoff" className="text-secondary" />
                </div>
              </div>
              
              <div className="flex items-center justify-center py-md relative">
                <svg className="circular-chart w-32 h-32" viewBox="0 0 36 36">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle stroke-secondary" strokeDasharray="35, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-headline-md text-headline-md text-on-surface">35%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-md mb-md">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Current</p>
                  <p className="font-body-lg text-body-lg font-semibold text-secondary">Rp 14m</p>
                </div>
                <div className="text-right">
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Target</p>
                  <p className="font-body-lg text-body-lg font-semibold text-on-surface">Rp 40m</p>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-sm">
                  <span className="font-label-sm text-label-sm text-error">Lagging</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Need Rp 3.2m/mo</span>
                </div>
                <div className="ai-gradient-bg border border-secondary/20 rounded-lg p-sm flex items-start gap-sm">
                  <Icon name="auto_awesome" className="text-secondary mt-0.5" size={16} />
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    <span className="text-on-surface font-medium">Attention needed. </span>
                    AI suggests shifting Rp 500k from generic savings to meet deadline.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Featured Analysis Card (Takes 4 columns) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="glass-card rounded-xl p-lg flex-1 border-t-2 border-t-primary/50 relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-sm mb-lg">
                <Icon name="insights" className="text-primary text-xl" size={24} />
                <h3 className="font-headline-md text-headline-md text-on-surface">AI Goal Impact Analysis</h3>
              </div>
              
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg">
                Simulate how budget adjustments affect your overall trajectory.
              </p>
              
              <div className="space-y-lg">
                {/* Simulation Item 1 */}
                <div className="bg-surface-container-low rounded-lg p-md border border-outline-variant/10 hover:border-primary/30 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center mb-sm">
                    <span className="font-label-md text-label-md text-on-surface flex items-center gap-sm">
                      <Icon name="trending_down" className="text-error" size={16} />
                      -30% on Dining
                    </span>
                    <span className="font-label-sm text-label-sm text-primary">+Rp 1.2m/mo</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">
                    Accelerates 'Emergency Fund' by 3 months.
                  </p>
                  <button className="w-full py-sm rounded-full border border-primary/20 text-primary font-label-sm text-label-sm hover:bg-primary/10 transition-colors">
                    Apply Suggestion
                  </button>
                </div>

                {/* Simulation Item 2 */}
                <div className="bg-surface-container-low rounded-lg p-md border border-outline-variant/10 hover:border-secondary/30 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center mb-sm">
                    <span className="font-label-md text-label-md text-on-surface flex items-center gap-sm">
                      <Icon name="trending_down" className="text-error" size={16} />
                      Pause 'New Car' Goal
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary">+Rp 2.5m/mo</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">
                    Secures 'Japan Trip' deadline by Oct 2024.
                  </p>
                  <button className="w-full py-sm rounded-full border border-secondary/20 text-secondary font-label-sm text-label-sm hover:bg-secondary/10 transition-colors">
                    Apply Suggestion
                  </button>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
