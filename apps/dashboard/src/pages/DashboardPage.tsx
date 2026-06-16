import { useState, useEffect } from 'react';
import { SummaryCards } from '../components/SummaryCards';
import { CashFlowChart } from '../components/CashFlowChart';
import { SpendingBreakdown } from '../components/SpendingBreakdown';
import { AiInsights } from '../components/AiInsights';
import { RecentTransactions } from '../components/RecentTransactions';
import { BudgetOverview } from '../components/BudgetOverview';
import { Skeleton } from '../components/Skeleton';
import { GlassCard } from '@financeai/ui';

export function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="flex-1 overflow-y-auto p-md md:p-lg pb-32 md:pb-lg">
      <div className="max-w-container-max mx-auto space-y-lg">
        {/* Mobile Page Header */}
        <div className="sm:hidden mb-sm">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
            Dashboard
          </h2>
        </div>

        {isLoading ? (
          // Skeleton Layout
          <div className="space-y-lg animate-pulse">
            {/* Summary Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
              {[1, 2, 3, 4].map((i) => (
                <GlassCard key={i} className="p-lg h-[140px]">
                  <Skeleton className="w-10 h-10 mb-lg" />
                  <Skeleton className="w-24 h-4 mb-xs" />
                  <Skeleton className="w-32 h-8" />
                </GlassCard>
              ))}
            </div>

            {/* Charts Row Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
              <GlassCard className="lg:col-span-8 p-lg h-96">
                <Skeleton className="w-48 h-8 mb-md" />
                <Skeleton className="w-full h-full" />
              </GlassCard>
              <GlassCard className="lg:col-span-4 p-lg h-96">
                <Skeleton className="w-48 h-8 mb-lg" />
                <div className="flex justify-center mb-lg">
                  <Skeleton className="w-48 h-48 rounded-full" />
                </div>
                <Skeleton className="w-full h-16" />
              </GlassCard>
            </div>

            {/* AI Insights Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {[1, 2].map((i) => (
                <GlassCard key={i} className="p-md h-[120px] flex gap-md">
                  <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="w-32 h-5 mb-xs" />
                    <Skeleton className="w-full h-10" />
                  </div>
                </GlassCard>
              ))}
            </div>
            
            {/* Transactions & Budget Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
              <GlassCard className="lg:col-span-8 p-lg min-h-[400px]">
                 <Skeleton className="w-48 h-8 mb-md" />
                 <div className="space-y-sm">
                   {[1, 2, 3, 4, 5].map((i) => (
                     <div key={i} className="flex gap-md p-sm">
                        <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                        <div className="flex-1">
                          <Skeleton className="w-32 h-5 mb-1" />
                          <Skeleton className="w-24 h-4" />
                        </div>
                     </div>
                   ))}
                 </div>
              </GlassCard>
              <GlassCard className="lg:col-span-4 p-lg min-h-[400px]">
                 <Skeleton className="w-32 h-8 mb-md" />
                 <div className="space-y-md">
                   {[1, 2, 3].map((i) => (
                     <div key={i}>
                        <Skeleton className="w-24 h-5 mb-xs" />
                        <Skeleton className="w-full h-2 rounded-full mb-1" />
                        <Skeleton className="w-16 h-4 ml-auto" />
                     </div>
                   ))}
                 </div>
              </GlassCard>
            </div>

          </div>
        ) : (
          // Real Content
          <>
            {/* 1. Summary Cards */}
            <SummaryCards />

            {/* 2. Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
              <div className="lg:col-span-8">
                <CashFlowChart />
              </div>
              <div className="lg:col-span-4">
                <SpendingBreakdown />
              </div>
            </div>

            {/* 3. AI Insights */}
            <AiInsights />

            {/* 4. Transactions & Budget */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-md">
              <div className="lg:col-span-8">
                <RecentTransactions />
              </div>
              <div className="lg:col-span-4">
                <BudgetOverview />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
