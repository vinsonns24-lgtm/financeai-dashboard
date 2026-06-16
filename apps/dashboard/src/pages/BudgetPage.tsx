import { Icon } from '@financeai/ui';

export function BudgetPage() {
  return (
    <main className="flex-1 px-md md:px-xl pb-xxl h-full overflow-y-auto">
      <div className="max-w-[1280px] mx-auto min-h-full flex flex-col gap-lg pt-16 md:pt-24">
        
        {/* Header & Month Selector */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
          <div>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">
              Budget Management
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
              Track and optimize your monthly spending.
            </p>
          </div>
          <div className="flex items-center bg-surface-container-high rounded-full px-sm py-xs border border-white/10 glass-panel">
            <button className="p-xs text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-white/5 flex items-center justify-center">
              <Icon name="chevron_left" />
            </button>
            <span className="font-label-md text-label-md px-md min-w-[120px] text-center text-on-surface">
              June 2026
            </span>
            <button className="p-xs text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-white/5 flex items-center justify-center">
              <Icon name="chevron_right" />
            </button>
          </div>
        </div>

        {/* Over Budget Alert */}
        <div className="bg-error-container/20 border border-error/30 rounded-xl p-md flex items-start gap-md">
          <Icon name="warning" filled className="text-error mt-1" />
          <div>
            <h4 className="font-label-md text-label-md text-error">Budget Alert</h4>
            <p className="font-body-sm text-body-sm text-error/80 mt-1">
              You have exceeded your Entertainment budget by Rp 450.000 this month.
            </p>
          </div>
        </div>

        {/* Budget Summary Card */}
        <section className="glass-panel rounded-xl p-lg md:p-xl flex flex-col md:flex-row gap-lg md:gap-xxl items-center relative overflow-hidden">
          {/* Decorative blur blob */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-fixed/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex-1 w-full space-y-md">
            <h3 className="font-headline-md text-headline-md text-on-background">Overall Budget</h3>
            <div className="flex justify-between items-end">
              <div>
                <p className="font-display text-display text-primary">Rp 6.000.000</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Total Monthly Allocation</p>
              </div>
            </div>
            
            {/* Main Progress Bar */}
            <div className="w-full bg-surface-container-highest rounded-full h-4 mt-sm overflow-hidden border border-white/5 relative">
              <div className="h-full rounded-full progress-gradient-warning" style={{ width: '72.5%' }} />
            </div>
            <div className="flex justify-between font-label-sm text-label-sm">
              <span className="text-on-surface-variant">0</span>
              <span className="text-on-surface">72.5% Used</span>
              <span className="text-on-surface-variant">6M</span>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-32 bg-white/10" />
          
          <div className="flex md:flex-col gap-lg w-full md:w-auto justify-between md:justify-center">
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Spent</p>
              <p className="font-headline-md text-headline-md text-on-surface mt-xs">Rp 4.350.000</p>
            </div>
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Remaining</p>
              <p className="font-headline-md text-headline-md text-tertiary mt-xs">Rp 1.650.000</p>
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section>
          <div className="flex justify-between items-end mb-md">
            <h3 className="font-headline-md text-headline-md text-on-background">Category Breakdown</h3>
            <button className="font-label-md text-label-md text-primary hover:text-primary-fixed transition-colors flex items-center gap-xs">
              <Icon name="add" size={18} />
              New Category
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {/* Category Card 1 */}
            <div className="glass-panel rounded-lg p-md flex flex-col gap-md hover:bg-surface-variant/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-sm">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
                    <Icon name="restaurant" size={18} />
                  </div>
                  <span className="font-label-md text-label-md text-on-surface">Makanan</span>
                </div>
                <span className="px-xs py-1 bg-surface-container-highest text-on-surface-variant rounded-full font-label-sm text-label-sm border border-white/5">
                  75%
                </span>
              </div>
              <div>
                <div className="flex justify-between items-end mb-xs">
                  <span className="font-body-md text-body-md text-on-surface">Rp 1.500.000</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">of Rp 2.000.000</span>
                </div>
                <div className="w-full bg-surface-container-lowest rounded-full h-2 overflow-hidden border border-white/5">
                  <div className="h-full rounded-full progress-gradient-warning" style={{ width: '75%' }} />
                </div>
              </div>
            </div>

            {/* Category Card 2 */}
            <div className="glass-panel rounded-lg p-md flex flex-col gap-md hover:bg-surface-variant/50 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-sm">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-tertiary">
                    <Icon name="directions_car" size={18} />
                  </div>
                  <span className="font-label-md text-label-md text-on-surface">Transport</span>
                </div>
                <span className="px-xs py-1 bg-surface-container-highest text-on-surface-variant rounded-full font-label-sm text-label-sm border border-white/5">
                  45%
                </span>
              </div>
              <div>
                <div className="flex justify-between items-end mb-xs">
                  <span className="font-body-md text-body-md text-on-surface">Rp 450.000</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">of Rp 1.000.000</span>
                </div>
                <div className="w-full bg-surface-container-lowest rounded-full h-2 overflow-hidden border border-white/5">
                  <div className="h-full rounded-full progress-gradient-safe" style={{ width: '45%' }} />
                </div>
              </div>
            </div>

            {/* Category Card 3 */}
            <div className="glass-panel rounded-lg p-md flex flex-col gap-md border-error/30 bg-error-container/5 hover:bg-error-container/10 transition-colors cursor-pointer">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-sm">
                  <div className="w-8 h-8 rounded-full bg-error-container/30 flex items-center justify-center text-error">
                    <Icon name="movie" size={18} />
                  </div>
                  <span className="font-label-md text-label-md text-error">Entertainment</span>
                </div>
                <span className="px-xs py-1 bg-error-container/30 text-error rounded-full font-label-sm text-label-sm border border-error/20">
                  145%
                </span>
              </div>
              <div>
                <div className="flex justify-between items-end mb-xs">
                  <span className="font-body-md text-body-md text-error">Rp 1.450.000</span>
                  <span className="font-body-sm text-body-sm text-error/70">of Rp 1.000.000</span>
                </div>
                <div className="w-full bg-surface-container-lowest rounded-full h-2 overflow-hidden border border-white/5">
                  <div className="h-full rounded-full progress-gradient-danger" style={{ width: '100%' }} />
                </div>
                <p className="font-label-sm text-label-sm text-error mt-sm text-right">Over limit</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
