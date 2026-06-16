import { Icon } from '@financeai/ui';
import { useTransactions } from '../../hooks/useTransactions';
import type { GetTransactionsParams, Transaction } from '../../types/transaction.types';

interface TransactionListProps {
  filters: GetTransactionsParams;
}

export function TransactionList({ filters }: TransactionListProps) {
  const { data, isLoading, error } = useTransactions(filters);

  // Helper to format currency
  const formatAmount = (amount: number, currency: string = 'IDR') => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Helper for UI styling based on transaction type
  const getTypeStyling = (tx: Transaction) => {
    switch (tx.type) {
      case 'income':
        return {
          icon: 'payments',
          iconBg: 'bg-tertiary-container/20',
          iconColor: 'text-tertiary',
          tagClass: 'bg-tertiary/10 text-tertiary border-tertiary/20',
          amountClass: 'text-tertiary',
          sign: '+',
        };
      case 'expense':
        return {
          icon: 'shopping_bag',
          iconBg: 'bg-surface-container-high',
          iconColor: 'text-on-surface-variant',
          tagClass: 'bg-surface-container-high text-on-surface-variant border-white/10',
          amountClass: 'text-on-surface',
          sign: '-',
        };
      case 'transfer':
        return {
          icon: 'sync_alt',
          iconBg: 'bg-secondary-container/20',
          iconColor: 'text-secondary',
          tagClass: 'bg-secondary/10 text-secondary border-secondary/20',
          amountClass: 'text-on-surface',
          sign: '',
        };
      default:
        return {
          icon: 'receipt',
          iconBg: 'bg-surface-container-high',
          iconColor: 'text-on-surface-variant',
          tagClass: 'bg-surface-container-high text-on-surface-variant border-white/10',
          amountClass: 'text-on-surface',
          sign: '',
        };
    }
  };

  return (
    <div className="lg:col-span-3 glass-card rounded-xl flex flex-col overflow-hidden relative min-h-[400px]">
      {/* Table Header */}
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-md p-md border-b border-white/10 text-label-sm text-on-surface-variant font-label-sm bg-surface-container/50 sticky top-0 z-10">
        <div className="w-10"></div> {/* Icon Space */}
        <div>Merchant</div>
        <div className="w-32 hidden sm:block">Category</div>
        <div className="w-24 text-right hidden md:block">Date</div>
        <div className="w-28 text-right">Amount</div>
        <div className="w-16"></div> {/* Actions Space */}
      </div>

      {/* States: Loading, Error, Empty */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center p-xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="flex-1 flex items-center justify-center p-xl text-error text-center">
          <p>Failed to load transactions. Please try again.</p>
        </div>
      )}

      {data?.data?.length === 0 && !isLoading && (
        <div className="flex-1 flex flex-col items-center justify-center p-xl text-on-surface-variant text-center opacity-70">
          <Icon name="receipt_long" size={48} className="mb-md opacity-50" />
          <p>No transactions found for the selected filters.</p>
        </div>
      )}

      {/* Table Body (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-xs">
        {data?.data?.map((tx) => {
          const style = getTypeStyling(tx);
          const formattedDate = formatDate(tx.transactionDate);
          const _categoryName = tx.categoryId ? "Category" : "Uncategorized"; // TODO: populate from categories
          
          return (
            <div
              key={tx.id}
              className="group grid grid-cols-[auto_1fr_auto_auto_auto_auto] gap-md p-sm items-center rounded-lg hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-full ${style.iconBg} flex items-center justify-center ${style.iconColor} relative`}>
                <Icon name={style.icon} />
                {tx.isRecurring && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary border border-background">
                    <Icon name="autorenew" size={10} />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface">{tx.merchant}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant sm:hidden">{tx.type} • {formattedDate}</span>
              </div>

              <div className="w-32 hidden sm:block">
                <span className={`px-xs py-[2px] rounded font-label-sm text-[11px] border ${style.tagClass} capitalize`}>
                  {tx.type}
                </span>
              </div>

              <div className="w-24 text-right hidden md:block font-body-sm text-body-sm text-on-surface-variant">{formattedDate}</div>

              <div className={`w-28 text-right font-label-md text-label-md ${style.amountClass}`}>
                {style.sign}{formatAmount(tx.amount, tx.currency)}
              </div>

              <div className="w-16 flex justify-end gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-on-surface-variant hover:text-primary"><Icon name="edit" size={18} /></button>
                <button className="text-on-surface-variant hover:text-error"><Icon name="delete" size={18} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
