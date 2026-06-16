import { Icon, GlassCard } from '@financeai/ui';
import { motion } from 'framer-motion';

interface BudgetItem {
  icon: string;
  iconColor: string;
  label: string;
  percent: number;
  barColor: string;
  spent: string;
  total: string;
}

const budgets: BudgetItem[] = [
  {
    icon: 'restaurant',
    iconColor: 'text-error',
    label: 'Food',
    percent: 80,
    barColor: 'bg-error',
    spent: 'Rp 4.0m',
    total: '5.0m',
  },
  {
    icon: 'directions_car',
    iconColor: 'text-primary',
    label: 'Transport',
    percent: 45,
    barColor: 'bg-primary',
    spent: 'Rp 900k',
    total: '2.0m',
  },
  {
    icon: 'home',
    iconColor: 'text-secondary',
    label: 'Rent/Bills',
    percent: 95,
    barColor: 'bg-secondary',
    spent: 'Rp 4.7m',
    total: '5.0m',
  },
];

export function BudgetOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="p-lg flex flex-col">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Budgets</h3>

        <div className="space-y-md flex-1">
          {budgets.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex justify-between items-end mb-xs">
                <span className="font-label-md text-label-md text-on-surface flex items-center gap-xs">
                  <Icon name={b.icon} size={16} className={b.iconColor} /> {b.label}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{b.percent}%</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`${b.barColor} h-2 rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${b.percent}%` }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 text-right">
                {b.spent} / {b.total}
              </p>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
