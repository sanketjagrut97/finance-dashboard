// SummaryCard — the big number cards at the top of dashboard
// Shows: icon, title, amount, and % change vs last month

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'
import clsx from 'clsx'

export default function SummaryCard({
  title,
  amount,
  icon: Icon,
  iconBg,        // e.g. 'bg-blue-100 dark:bg-blue-900/30'
  iconColor,     // e.g. 'text-blue-600'
  change,        // number: % change vs last month (can be null)
  changeLabel,   // e.g. 'vs last month'
  prefix,        // optional prefix text
}) {
  // Determine trend direction
  const isPositive = change > 0
  const isNeutral  = change === 0 || change === null

  return (
    <div className="card p-5 hover:shadow-card-hover transition-shadow duration-200 animate-slide-up">
      
      {/* ── Top Row: Title + Icon ── */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {title}
          </p>
          {prefix && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{prefix}</p>
          )}
        </div>

        {/* Icon bubble */}
        <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', iconBg)}>
          <Icon size={18} className={iconColor} />
        </div>
      </div>

      {/* ── Amount ── */}
      <p className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
        {formatCurrency(Math.abs(amount))}
      </p>

      {/* ── Change Indicator ── */}
      {change !== null && (
        <div className="flex items-center gap-1.5 mt-2">
          {isNeutral ? (
            <Minus size={13} className="text-gray-400" />
          ) : isPositive ? (
            <TrendingUp size={13} className="text-green-500" />
          ) : (
            <TrendingDown size={13} className="text-red-500" />
          )}

          <span className={clsx(
            'text-xs font-medium',
            isNeutral  ? 'text-gray-400' :
            isPositive ? 'text-green-600 dark:text-green-400' :
                         'text-red-600 dark:text-red-400'
          )}>
            {isNeutral ? 'No change' : `${isPositive ? '+' : ''}${change?.toFixed(1)}%`}
          </span>

          {changeLabel && (
            <span className="text-xs text-gray-400 dark:text-gray-500">{changeLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}