import { GlassCard } from '@financeai/ui';
import { Icon } from '@financeai/ui';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getMonthlyCashflow, formatIDR } from '../lib/mockData';
import { motion } from 'framer-motion';

// Custom tooltip to match the glassmorphism theme
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="glass-card rounded-lg p-sm border border-white/10 shadow-xl">
      <p className="font-label-sm text-label-sm text-on-surface-variant mb-xs">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="font-label-md text-label-md" style={{ color: entry.color }}>
          {entry.name}: {formatIDR(entry.value)}
        </p>
      ))}
    </div>
  );
}

export function CashFlowChart() {
  const data = getMonthlyCashflow();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="p-lg flex flex-col h-96">
        <div className="flex justify-between items-center mb-md">
          <h3 className="font-headline-md text-headline-md text-on-surface">Cash Flow Trend</h3>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <Icon name="more_horiz" />
          </button>
        </div>

        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4fdbc8" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#4fdbc8" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffb4ab" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ffb4ab" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#bbcac6', fontSize: 12, fontFamily: 'Inter' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#bbcac6', fontSize: 11, fontFamily: 'Inter' }}
                tickFormatter={(v: number) => `${(v / 1000000).toFixed(0)}m`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, fontFamily: 'Inter', color: '#bbcac6', paddingTop: 8 }}
              />
              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#4fdbc8"
                strokeWidth={2.5}
                fill="url(#incomeGrad)"
                dot={false}
                activeDot={{ r: 5, fill: '#4fdbc8', stroke: '#0b1326', strokeWidth: 2 }}
                animationDuration={1200}
                animationEasing="ease-out"
              />
              <Area
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#ffb4ab"
                strokeWidth={2}
                strokeDasharray="6 3"
                fill="url(#expenseGrad)"
                dot={false}
                activeDot={{ r: 5, fill: '#ffb4ab', stroke: '#0b1326', strokeWidth: 2 }}
                animationDuration={1400}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </motion.div>
  );
}
