import { GlassCard } from '@financeai/ui';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { getSpendingByCategory, formatIDR } from '../lib/mockData';
import { motion } from 'framer-motion';

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;

  return (
    <div className="glass-card rounded-lg p-sm border border-white/10 shadow-xl">
      <p className="font-label-md text-label-md text-on-surface">{d.name}</p>
      <p className="font-label-sm text-label-sm text-on-surface-variant">
        {formatIDR(d.value)} ({d.percent}%)
      </p>
    </div>
  );
}

export function SpendingBreakdown() {
  const data = getSpendingByCategory();
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <GlassCard className="p-lg flex flex-col h-96">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-lg">Spending Breakdown</h3>

        <div className="flex-1 flex flex-col justify-center items-center">
          {/* Donut Chart */}
          <div className="relative w-48 h-48 mb-lg">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                  animationBegin={200}
                  animationDuration={1000}
                  animationEasing="ease-out"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="font-headline-lg text-headline-lg text-on-surface">
                {(total / 1000000).toFixed(1)}m
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Total</span>
            </div>
          </div>

          {/* Legend */}
          <div className="w-full grid grid-cols-2 gap-y-xs gap-x-sm">
            {data.slice(0, 6).map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-xs font-label-sm text-label-sm text-on-surface"
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate">{item.name} ({item.percent}%)</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
