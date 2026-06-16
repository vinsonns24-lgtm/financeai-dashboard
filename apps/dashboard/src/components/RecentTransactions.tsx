import { Icon, GlassCard } from '@financeai/ui';
import { getRecentWithCategory, formatIDR } from '../lib/mockData';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function RecentTransactions() {
  const transactions = getRecentWithCategory(5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays === 0) return `Today, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    if (diffDays === 1) return `Yesterday, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="p-lg">
        <div className="flex justify-between items-center mb-md">
          <h3 className="font-headline-md text-headline-md text-on-surface">Recent Transactions</h3>
          <Link to="/transactions" className="font-label-sm text-label-sm text-primary hover:underline">
            View All
          </Link>
        </div>

        <div className="space-y-sm">
          {transactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between p-sm rounded-lg hover:bg-white/5 transition-colors group border border-transparent hover:border-white/5"
            >
              <div className="flex items-center gap-md">
                <div
                  className={`w-10 h-10 rounded-full ${tx.categoryIconBg} ${tx.categoryColor} flex items-center justify-center`}
                >
                  <Icon name={tx.categoryIcon} />
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface">{tx.merchant}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {tx.categoryLabel} • {formatDate(tx.transactionDate)}
                  </p>
                </div>
              </div>
              <span
                className={`font-label-md text-label-md ${
                  tx.type === 'income' ? 'text-tertiary' : 'text-on-surface'
                }`}
              >
                {tx.type === 'income' ? '+' : tx.type === 'expense' ? '-' : ''}
                {formatIDR(tx.amount)}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
