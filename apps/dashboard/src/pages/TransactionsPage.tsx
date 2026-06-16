import { useState } from 'react';
import { TransactionToolbar } from '../components/transactions/TransactionToolbar';
import { TransactionList } from '../components/transactions/TransactionList';
import { TransactionSidePanel } from '../components/transactions/TransactionSidePanel';
import type { GetTransactionsParams } from '../types/transaction.types';

export function TransactionsPage() {
  const [filters, setFilters] = useState<GetTransactionsParams>({
    page: 1,
    limit: 20,
    sort: 'latest',
  });

  return (
    <main className="flex-1 px-md md:px-xl pb-xl h-full overflow-y-auto">
      <div className="max-w-[1280px] mx-auto w-full flex flex-col gap-lg h-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
          <div>
            <h2 className="font-display text-display text-on-surface mb-base">Transactions</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Review and manage your financial activity.</p>
          </div>
        </div>

        {/* Toolbar */}
        <TransactionToolbar filters={filters} onFilterChange={setFilters} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-lg flex-1 min-h-0">
          <TransactionList filters={filters} />
          <TransactionSidePanel />
        </div>
      </div>
    </main>
  );
}
