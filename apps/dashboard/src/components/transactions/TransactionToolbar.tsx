import { Icon } from '@financeai/ui';
import type { GetTransactionsParams } from '../../types/transaction.types';

interface ToolbarProps {
  filters: GetTransactionsParams;
  onFilterChange: (filters: GetTransactionsParams) => void;
}

export function TransactionToolbar({ filters, onFilterChange }: ToolbarProps) {
  const handleTypeChange = (type: GetTransactionsParams['type']) => {
    onFilterChange({ ...filters, type, page: 1 });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value, page: 1 });
  };

  return (
    <div className="glass-card rounded-xl p-md flex flex-col xl:flex-row gap-md items-start xl:items-center justify-between w-full z-10 relative">
      <div className="flex flex-wrap items-center gap-sm w-full xl:w-auto">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Icon name="search" size={20} className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={handleSearch}
            className="input-glass w-full rounded-full pl-xl pr-sm py-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:ring-0"
            placeholder="Search merchants..."
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-xs overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
          <button 
            onClick={() => handleTypeChange(undefined)}
            className={`px-md py-xs rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors border ${!filters.type ? 'bg-primary/20 text-primary border-primary/30' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border-white/5'}`}
          >
            All
          </button>
          <button 
            onClick={() => handleTypeChange('income')}
            className={`px-md py-xs rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors border ${filters.type === 'income' ? 'bg-primary/20 text-primary border-primary/30' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border-white/5'}`}
          >
            Income
          </button>
          <button 
            onClick={() => handleTypeChange('expense')}
            className={`px-md py-xs rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors border ${filters.type === 'expense' ? 'bg-primary/20 text-primary border-primary/30' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border-white/5'}`}
          >
            Expense
          </button>
          <button 
            onClick={() => handleTypeChange('transfer')}
            className={`px-md py-xs rounded-full font-label-sm text-label-sm whitespace-nowrap transition-colors border ${filters.type === 'transfer' ? 'bg-primary/20 text-primary border-primary/30' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border-white/5'}`}
          >
            Transfer
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-sm w-full xl:w-auto">
        {/* Category Dropdown */}
        <button className="input-glass px-sm py-sm rounded-lg flex items-center gap-xs text-body-sm text-on-surface-variant hover:text-on-surface">
          <Icon name="category" size={18} /> Category <Icon name="expand_more" size={18} />
        </button>

        {/* Date Range Dropdown */}
        <button className="input-glass px-sm py-sm rounded-lg flex items-center gap-xs text-body-sm text-on-surface-variant hover:text-on-surface">
          <Icon name="calendar_month" size={18} /> This Month <Icon name="expand_more" size={18} />
        </button>

        {/* Sort Dropdown */}
        <button 
          onClick={() => onFilterChange({ ...filters, sort: filters.sort === 'latest' ? 'oldest' : 'latest' })}
          className="input-glass px-sm py-sm rounded-lg flex items-center gap-xs text-body-sm text-on-surface-variant hover:text-on-surface"
        >
          <Icon name="sort" size={18} /> {filters.sort === 'latest' ? 'Latest' : 'Oldest'} <Icon name="expand_more" size={18} />
        </button>

        {/* Add Transaction Button */}
        <button className="ml-auto xl:ml-0 px-md py-sm rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center gap-xs hover:bg-primary-fixed transition-colors shadow-lg shadow-primary/20">
          <Icon name="add" size={18} /> Add Transaction
        </button>
      </div>
    </div>
  );
}
