import { Icon } from '@financeai/ui';

export function ReportsPage() {
  return (
    <main className="flex-1 px-5 md:px-lg pb-xxl h-full overflow-y-auto">
      <div className="max-w-container-max mx-auto min-h-full flex flex-col pt-16 md:pt-24">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-xl gap-4">
          <div>
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg-mobile md:font-headline-lg text-on-surface">
              Reports & Export
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant mt-2">
              Generate comprehensive financial insights and export statements.
            </p>
          </div>

          {/* Report Type Selector (Tabs) */}
          <div className="flex bg-surface-container-low rounded-full p-1 border border-outline-variant/20 self-stretch md:self-auto">
            <button className="px-6 py-2 rounded-full bg-surface-container-highest text-primary font-label-md text-label-md shadow-sm transition-all">
              Monthly
            </button>
            <button className="px-6 py-2 rounded-full text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all">
              Quarterly
            </button>
            <button className="px-6 py-2 rounded-full text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all flex items-center gap-1">
              Custom <Icon name="date_range" size={14} />
            </button>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-xl">
          
          {/* Left Column: Primary Metrics & Visuals */}
          <div className="md:col-span-8 flex flex-col gap-6">
            
            {/* Summary Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Income Card */}
              <div className="glass-panel rounded-xl p-lg flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary/10 rounded-full blur-2xl" />
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-label-md font-label-md text-on-surface-variant">Total Income</h3>
                    <Icon name="arrow_upward" className="text-tertiary" />
                  </div>
                  <div className="text-headline-lg font-headline-lg text-on-surface">$12,450.00</div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm">+8.2%</span>
                  <span className="text-body-sm font-body-sm text-on-surface-variant">vs last month</span>
                </div>
              </div>

              {/* Expenses Card */}
              <div className="glass-panel rounded-xl p-lg flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-error/10 rounded-full blur-2xl" />
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-label-md font-label-md text-on-surface-variant">Total Expenses</h3>
                    <Icon name="arrow_downward" className="text-error" />
                  </div>
                  <div className="text-headline-lg font-headline-lg text-on-surface">$4,820.50</div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full bg-error/10 text-error font-label-sm text-label-sm">-2.4%</span>
                  <span className="text-body-sm font-body-sm text-on-surface-variant">vs last month</span>
                </div>
              </div>
            </div>

            {/* Visual Analysis: Bar Chart (Top Categories) */}
            <div className="glass-panel rounded-xl p-lg flex flex-col h-[300px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-label-md font-label-md text-on-surface-variant">Top Spending Categories</h3>
                <button className="text-primary hover:text-primary-fixed transition-colors">
                  <Icon name="more_horiz" />
                </button>
              </div>
              
              <div className="flex-grow flex items-end justify-around gap-4 px-4 pb-2 relative">
                {/* Simulated Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 opacity-20">
                  <div className="w-full border-b border-outline-variant border-dashed h-0" />
                  <div className="w-full border-b border-outline-variant border-dashed h-0" />
                  <div className="w-full border-b border-outline-variant border-dashed h-0" />
                  <div className="w-full border-b border-outline-variant border-dashed h-0" />
                </div>
                
                {/* Bars */}
                <div className="flex flex-col items-center gap-2 w-1/4 z-10 group">
                  <div className="text-label-sm font-label-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                    $1,200
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-t-lg h-full flex items-end relative overflow-hidden">
                    <div className="w-full bg-gradient-to-t from-primary-container/20 to-primary-container rounded-t-lg h-[80%] transition-all duration-500 hover:brightness-110" />
                  </div>
                  <div className="text-label-sm font-label-sm text-on-surface-variant truncate w-full text-center">Housing</div>
                </div>

                <div className="flex flex-col items-center gap-2 w-1/4 z-10 group">
                  <div className="text-label-sm font-label-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                    $850
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-t-lg h-full flex items-end relative overflow-hidden">
                    <div className="w-full bg-gradient-to-t from-secondary-container/20 to-secondary-container rounded-t-lg h-[55%] transition-all duration-500 hover:brightness-110" />
                  </div>
                  <div className="text-label-sm font-label-sm text-on-surface-variant truncate w-full text-center">Food</div>
                </div>

                <div className="flex flex-col items-center gap-2 w-1/4 z-10 group">
                  <div className="text-label-sm font-label-sm text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                    $420
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-t-lg h-full flex items-end relative overflow-hidden">
                    <div className="w-full bg-gradient-to-t from-tertiary-container/20 to-tertiary-container rounded-t-lg h-[30%] transition-all duration-500 hover:brightness-110" />
                  </div>
                  <div className="text-label-sm font-label-sm text-on-surface-variant truncate w-full text-center">Transport</div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Right Column: Budget Adherence, AI Insights, Export */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* Budget Adherence Gauge */}
            <div className="glass-panel rounded-xl p-lg flex flex-col items-center text-center">
              <h3 className="text-label-md font-label-md text-on-surface-variant mb-6 w-full text-left">Budget Adherence Score</h3>
              <div className="relative w-40 h-40">
                <svg className="circular-chart text-tertiary" viewBox="0 0 36 36">
                  <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="circle stroke-current" strokeDasharray="82, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-headline-lg font-headline-lg text-on-surface">82%</span>
                  <span className="text-label-sm font-label-sm text-tertiary">On Track</span>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="glass-panel rounded-xl p-lg flex flex-col bg-gradient-to-br from-surface-container-low to-secondary-container/10 border-l-2 border-l-secondary-container relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="auto_awesome" className="text-secondary-fixed-dim" />
                <h3 className="text-label-md font-label-md ai-gradient-text">AI Insights</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="warning" size={16} className="text-error mt-0.5" />
                  <p className="text-body-sm font-body-sm text-on-surface leading-relaxed">
                    Unusual spike detected in <span className="font-bold text-error">Entertainment</span> spending (+45% vs avg). Review subscription renewals.
                  </p>
                </div>
                <div className="w-full border-t border-outline-variant/20" />
                <div className="flex items-start gap-3">
                  <Icon name="lightbulb" size={16} className="text-tertiary mt-0.5" />
                  <p className="text-body-sm font-body-sm text-on-surface leading-relaxed">
                    Consider shifting $200 from Dining to Savings next month to hit your Q3 goal early.
                  </p>
                </div>
              </div>
            </div>

            {/* Export Actions */}
            <div className="glass-panel rounded-xl p-lg flex flex-col gap-4 mt-auto">
              <h3 className="text-label-md font-label-md text-on-surface-variant mb-2">Export Options</h3>
              <button className="w-full py-3 px-4 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md flex justify-between items-center hover:bg-primary transition-colors">
                <div className="flex items-center gap-2">
                  <Icon name="picture_as_pdf" />
                  <span>Export as PDF</span>
                </div>
                <Icon name="download" size={18} />
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-2 px-4 rounded-full border border-primary/20 text-primary font-label-sm text-label-sm flex justify-center items-center gap-2 hover:bg-primary/10 transition-colors">
                  <Icon name="table_chart" size={18} /> CSV Data
                </button>
                <button className="py-2 px-4 rounded-full border border-primary/20 text-primary font-label-sm text-label-sm flex justify-center items-center gap-2 hover:bg-primary/10 transition-colors">
                  <Icon name="imagesearch_roller" size={18} /> Charts Only
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
