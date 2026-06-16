import { Icon, GlassCard, Badge } from '@financeai/ui';
import { getFinancialSummary, formatIDR } from '../lib/mockData';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export function SummaryCards() {
  const summary = getFinancialSummary();

  const cards = [
    {
      icon: 'account_balance_wallet',
      iconColor: 'text-primary',
      iconBorder: 'border-primary/20',
      glowColor: 'bg-primary/10',
      label: 'Total Balance',
      value: formatIDR(summary.totalBalance),
      badge: { value: `+${summary.balanceChange}%`, variant: 'success' as const },
    },
    {
      icon: 'arrow_downward',
      iconColor: 'text-tertiary',
      iconBorder: 'border-tertiary/20',
      glowColor: 'bg-tertiary/10',
      label: 'Income',
      value: formatIDR(summary.totalIncome),
      badge: { value: `+${summary.incomeChange}%`, variant: 'success' as const },
    },
    {
      icon: 'arrow_upward',
      iconColor: 'text-error',
      iconBorder: 'border-error/20',
      glowColor: 'bg-error/10',
      label: 'Expenses',
      value: formatIDR(summary.totalExpenses),
      badge: { value: `+${summary.expenseChange}%`, variant: 'error' as const },
    },
    {
      icon: 'savings',
      iconColor: 'text-secondary',
      iconBorder: 'border-secondary/20',
      glowColor: 'bg-secondary/10',
      label: 'Remaining',
      value: formatIDR(summary.remaining),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <GlassCard className="p-lg relative overflow-hidden group h-full">
            {/* Corner glow */}
            <div
              className={`absolute top-0 right-0 w-24 h-24 ${card.glowColor} rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}
            />

            <div className="flex justify-between items-start mb-lg">
              <div
                className={`w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center border ${card.iconBorder} ${card.iconColor}`}
              >
                <Icon name={card.icon} />
              </div>
              {card.badge && <Badge value={card.badge.value} variant={card.badge.variant} />}
            </div>

            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-xs">{card.label}</p>
              <h3 className="font-headline-lg text-headline-lg text-on-surface">{card.value}</h3>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
