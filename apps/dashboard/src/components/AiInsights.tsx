import { Icon } from '@financeai/ui';
import { motion } from 'framer-motion';

interface InsightData {
  icon: string;
  title: string;
  titleIcon: string;
  description: string;
  variant: 'error' | 'secondary';
}

const insights: InsightData[] = [
  {
    icon: 'warning',
    title: 'Spending Alert',
    titleIcon: 'auto_awesome',
    description:
      'Pengeluaran kategori <strong>Makanan</strong> naik 40% dibandingkan bulan lalu. Pertimbangkan untuk memasak di rumah.',
    variant: 'error',
  },
  {
    icon: 'lightbulb',
    title: 'AI Tip',
    titleIcon: 'auto_awesome',
    description:
      'Kami mendeteksi 2 unused subscriptions (Netflix, Spotify). Kurangi untuk menghemat Rp 250.000/bulan.',
    variant: 'secondary',
  },
];

const variantStyles = {
  error: {
    container:
      'bg-gradient-to-r from-error-container/20 to-surface-container-low border border-error/20',
    gradientOverlay: 'from-error/5',
    iconBg: 'bg-error-container/50 border-error/30 text-error',
    sparkle: 'text-error',
  },
  secondary: {
    container:
      'bg-gradient-to-r from-secondary-container/20 to-surface-container-low border border-secondary/20',
    gradientOverlay: 'from-secondary/5',
    iconBg: 'bg-secondary-container/50 border-secondary/30 text-secondary',
    sparkle: 'text-secondary',
  },
};

export function AiInsights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
      {insights.map((insight, i) => {
        const styles = variantStyles[insight.variant];
        return (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`${styles.container} rounded-xl p-md flex items-start gap-md relative overflow-hidden group`}
          >
            {/* Background gradient overlay */}
            <div
              className={`absolute right-0 top-0 w-32 h-full bg-gradient-to-l ${styles.gradientOverlay} to-transparent pointer-events-none`}
            />

            {/* Icon */}
            <div
              className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center mt-1 ${styles.iconBg}`}
            >
              <Icon name={insight.icon} />
            </div>

            {/* Content */}
            <div>
              <h4 className="font-label-md text-label-md text-on-surface mb-xs flex items-center gap-xs">
                {insight.title}{' '}
                <Icon name={insight.titleIcon} size={14} className={styles.sparkle} />
              </h4>
              <p
                className="font-body-sm text-body-sm text-on-surface-variant"
                dangerouslySetInnerHTML={{ __html: insight.description }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
