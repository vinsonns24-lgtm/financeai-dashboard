import type { Transaction } from '../types/transaction.types';

// ── Category metadata ──────────────────────────────────────────────
export interface Category {
  id: string;
  label: string;
  icon: string;
  color: string;      // Tailwind text-* class
  iconBg: string;     // Tailwind bg-* class
  chartColor: string; // Hex for Recharts
}

export const categories: Category[] = [
  { id: 'food',      label: 'Food & Dining', icon: 'restaurant',     color: 'text-error',     iconBg: 'bg-error/10',     chartColor: '#ffb4ab' },
  { id: 'transport', label: 'Transport',     icon: 'directions_car', color: 'text-primary',   iconBg: 'bg-primary/10',   chartColor: '#4fdbc8' },
  { id: 'bills',     label: 'Bills & Utils', icon: 'receipt',        color: 'text-secondary', iconBg: 'bg-secondary/10', chartColor: '#d0bcff' },
  { id: 'shopping',  label: 'Shopping',      icon: 'shopping_bag',   color: 'text-tertiary',  iconBg: 'bg-tertiary/10',  chartColor: '#4edea3' },
  { id: 'salary',    label: 'Salary',        icon: 'work',           color: 'text-tertiary',  iconBg: 'bg-tertiary/10',  chartColor: '#4edea3' },
  { id: 'transfer',  label: 'Transfer',      icon: 'sync_alt',       color: 'text-secondary', iconBg: 'bg-secondary/10', chartColor: '#d0bcff' },
  { id: 'entertainment', label: 'Entertainment', icon: 'movie',      color: 'text-error',     iconBg: 'bg-error/10',     chartColor: '#ff8a80' },
  { id: 'health',    label: 'Health',        icon: 'favorite',       color: 'text-primary',   iconBg: 'bg-primary/10',   chartColor: '#80deea' },
];

// ── Helper to create a date N days ago ────────────────────────────
const daysAgo = (n: number) => new Date(Date.now() - 86400000 * n).toISOString();

// ── Seed transactions (realistic Indonesian data) ─────────────────
let mockTransactions: Transaction[] = [
  // This month
  { id: '1',  type: 'expense',  amount: 350000,   currency: 'IDR', merchant: 'Sushi Tei',       categoryId: 'food',      isRecurring: false, transactionDate: daysAgo(0),  createdAt: daysAgo(0),  updatedAt: daysAgo(0) },
  { id: '2',  type: 'income',   amount: 8500000,  currency: 'IDR', merchant: 'Salary – June',   categoryId: 'salary',    isRecurring: true,  transactionDate: daysAgo(1),  createdAt: daysAgo(1),  updatedAt: daysAgo(1) },
  { id: '3',  type: 'expense',  amount: 45000,    currency: 'IDR', merchant: 'Gojek',           categoryId: 'transport', isRecurring: false, transactionDate: daysAgo(2),  createdAt: daysAgo(2),  updatedAt: daysAgo(2) },
  { id: '4',  type: 'expense',  amount: 500000,   currency: 'IDR', merchant: 'PLN Token',       categoryId: 'bills',     isRecurring: false, transactionDate: daysAgo(3),  createdAt: daysAgo(3),  updatedAt: daysAgo(3) },
  { id: '5',  type: 'expense',  amount: 1200000,  currency: 'IDR', merchant: 'Tokopedia',       categoryId: 'shopping',  isRecurring: false, transactionDate: daysAgo(4),  createdAt: daysAgo(4),  updatedAt: daysAgo(4) },
  { id: '6',  type: 'transfer', amount: 1000000,  currency: 'IDR', merchant: 'BCA → Mandiri',   categoryId: 'transfer',  isRecurring: false, transactionDate: daysAgo(5),  createdAt: daysAgo(5),  updatedAt: daysAgo(5) },
  { id: '7',  type: 'expense',  amount: 180000,   currency: 'IDR', merchant: 'Netflix + Spotify',categoryId: 'entertainment', isRecurring: true, transactionDate: daysAgo(6), createdAt: daysAgo(6), updatedAt: daysAgo(6) },
  { id: '8',  type: 'expense',  amount: 275000,   currency: 'IDR', merchant: 'Apotek K-24',     categoryId: 'health',    isRecurring: false, transactionDate: daysAgo(7),  createdAt: daysAgo(7),  updatedAt: daysAgo(7) },
  { id: '9',  type: 'expense',  amount: 85000,    currency: 'IDR', merchant: 'Grab Food',       categoryId: 'food',      isRecurring: false, transactionDate: daysAgo(8),  createdAt: daysAgo(8),  updatedAt: daysAgo(8) },
  { id: '10', type: 'expense',  amount: 150000,   currency: 'IDR', merchant: 'Indomaret',       categoryId: 'food',      isRecurring: false, transactionDate: daysAgo(10), createdAt: daysAgo(10), updatedAt: daysAgo(10) },
  { id: '11', type: 'expense',  amount: 62000,    currency: 'IDR', merchant: 'Grab',            categoryId: 'transport', isRecurring: false, transactionDate: daysAgo(12), createdAt: daysAgo(12), updatedAt: daysAgo(12) },
  { id: '12', type: 'expense',  amount: 750000,   currency: 'IDR', merchant: 'Telkomsel',       categoryId: 'bills',     isRecurring: true,  transactionDate: daysAgo(14), createdAt: daysAgo(14), updatedAt: daysAgo(14) },
  { id: '13', type: 'income',   amount: 2000000,  currency: 'IDR', merchant: 'Freelance Project',categoryId: 'salary',   isRecurring: false, transactionDate: daysAgo(15), createdAt: daysAgo(15), updatedAt: daysAgo(15) },
  { id: '14', type: 'expense',  amount: 420000,   currency: 'IDR', merchant: 'Uniqlo',          categoryId: 'shopping',  isRecurring: false, transactionDate: daysAgo(18), createdAt: daysAgo(18), updatedAt: daysAgo(18) },
  { id: '15', type: 'expense',  amount: 95000,    currency: 'IDR', merchant: 'Cinema XXI',      categoryId: 'entertainment', isRecurring: false, transactionDate: daysAgo(20), createdAt: daysAgo(20), updatedAt: daysAgo(20) },
];

// ── Mock database with CRUD ───────────────────────────────────────
export const mockDb = {
  getTransactions: () => [...mockTransactions],

  addTransaction: (tx: Transaction) => {
    mockTransactions = [tx, ...mockTransactions];
    return tx;
  },

  updateTransaction: (id: string, updates: Partial<Transaction>) => {
    let updated: Transaction | undefined;
    mockTransactions = mockTransactions.map(tx => {
      if (tx.id === id) {
        updated = { ...tx, ...updates, updatedAt: new Date().toISOString() };
        return updated;
      }
      return tx;
    });
    return updated;
  },

  deleteTransaction: (id: string) => {
    mockTransactions = mockTransactions.filter(tx => tx.id !== id);
  },
};

// ── Aggregation helpers ───────────────────────────────────────────

/** Format IDR currency */
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Compute totals from current transactions */
export function getFinancialSummary() {
  const txs = mockDb.getTransactions();

  const totalIncome = txs
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = txs
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const remaining = totalIncome - totalExpenses;

  // Simulated previous month for % change
  const prevIncome = totalIncome * 0.92;
  const prevExpenses = totalExpenses * 0.88;

  const incomeChange = ((totalIncome - prevIncome) / prevIncome) * 100;
  const expenseChange = ((totalExpenses - prevExpenses) / prevExpenses) * 100;
  const balanceChange = 5.2; // simulated

  return {
    totalBalance: totalIncome - totalExpenses + 5000000, // opening balance
    totalIncome,
    totalExpenses,
    remaining,
    incomeChange: +incomeChange.toFixed(1),
    expenseChange: +expenseChange.toFixed(1),
    balanceChange,
  };
}

/** Get spending grouped by category for pie chart */
export function getSpendingByCategory() {
  const txs = mockDb.getTransactions().filter(t => t.type === 'expense');
  const map = new Map<string, number>();

  txs.forEach(t => {
    const cat = t.categoryId || 'other';
    map.set(cat, (map.get(cat) || 0) + t.amount);
  });

  const total = txs.reduce((s, t) => s + t.amount, 0);

  return Array.from(map.entries())
    .map(([categoryId, amount]) => {
      const cat = categories.find(c => c.id === categoryId);
      return {
        name: cat?.label || categoryId,
        value: amount,
        color: cat?.chartColor || '#888',
        percent: +((amount / total) * 100).toFixed(1),
      };
    })
    .sort((a, b) => b.value - a.value);
}

/** Generate monthly cashflow data for area chart (last 6 months) */
export function getMonthlyCashflow() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  const data = [];

  // Generate realistic data for last 6 months
  const incomeBase = [7200000, 8100000, 7800000, 8500000, 9200000, 10500000];
  const expenseBase = [5100000, 6300000, 5800000, 5200000, 6800000, 4100000];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);
    const monthLabel = months[d.getMonth()];

    data.push({
      month: monthLabel,
      income: incomeBase[5 - i],
      expense: expenseBase[5 - i],
    });
  }

  return data;
}

/** Get recent transactions with category metadata attached */
export function getRecentWithCategory(limit = 5) {
  const txs = mockDb.getTransactions()
    .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime())
    .slice(0, limit);

  return txs.map(tx => {
    const cat = categories.find(c => c.id === tx.categoryId);
    return {
      ...tx,
      categoryLabel: cat?.label || 'Other',
      categoryIcon: cat?.icon || 'receipt',
      categoryColor: cat?.color || 'text-outline',
      categoryIconBg: cat?.iconBg || 'bg-outline/10',
    };
  });
}

/** Get category by id */
export function getCategoryById(id: string) {
  return categories.find(c => c.id === id);
}
