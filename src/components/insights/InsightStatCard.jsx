// A clean stat card used at the top of Insights page
import clsx from 'clsx'

export default function InsightStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  accent,       // bottom border color e.g. 'border-blue-500'
}) {
  return (
    <div className={clsx(
      'card p-5 border-b-4 hover:shadow-card-hover transition-shadow duration-200 animate-slide-up',
      accent ?? 'border-b-primary-500'
    )}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center', iconBg)}>
          <Icon size={16} className={iconColor} />
        </div>
      </div>

      <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
        {value}
      </p>

      {subtitle && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}