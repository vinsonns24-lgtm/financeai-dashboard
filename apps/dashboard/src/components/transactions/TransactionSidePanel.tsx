import { Icon } from '@financeai/ui';

export function TransactionSidePanel() {
  return (
    <div className="lg:col-span-1 flex flex-col gap-lg">
      {/* Bulk Upload Area */}
      <div className="glass-card rounded-xl p-lg text-center border-dashed border-2 border-outline-variant hover:border-primary/50 transition-colors cursor-pointer group flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-sm">
          <Icon name="upload_file" size={24} />
        </div>
        <h3 className="font-label-md text-label-md text-on-surface mb-xs">Bulk Upload</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">
          Drag & drop CSV or Excel files here, or click to browse.
        </p>
        <button className="px-md py-xs rounded-full border border-outline text-on-surface-variant font-label-sm text-label-sm hover:bg-white/5 transition-colors">
          Browse Files
        </button>
      </div>

      {/* AI Insights Snippet */}
      <div className="glass-card rounded-xl p-md relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
        <h3 className="font-label-md text-label-md text-primary flex items-center gap-xs mb-sm relative z-10">
          <Icon name="auto_awesome" size={16} /> AI Insight
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant relative z-10">
          Your software expenses are up 12% this month. Reviewing unused subscriptions could save you ~$45/mo.
        </p>
      </div>
    </div>
  );
}
