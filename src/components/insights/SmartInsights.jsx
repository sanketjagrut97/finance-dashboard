// Auto-generated insight cards based on transaction data
// Each card is a derived observation — like a mini analyst report

import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Flame, PiggyBank } from 'lucide-react'
import { formatCurrency } from '../../utils/formatters'
import { CATEGORIES } from '../../data/mockData'
import useFinanceStore from '../../store/useFinanceStore'
import clsx from 'clsx'

// Generate insights array from raw data
function generateInsights(monthlyData, categoryBreakdown, summary) {
  const insights = []
  if (!monthlyData.length) return insights

  const latest   = monthlyData.at(-1)
  const previous = monthlyData.at(-2)

  // ── Insight 1: Savings rate this month ──
  if (latest) {
    const savingsRate = latest.income > 0
      ? ((latest.income - latest.expenses) / latest.income) * 100
      : 0

    insights.push({
      id: 'savings-rate',
      icon: PiggyBank,
      title: 'Savings Rate This Month',
      description: savingsRate >= 20
        ? `You saved ${savingsRate.toFixed(1)}% of your income — excellent! Financial advisors recommend 20%+.`
        : savingsRate >= 10
        ? `You saved ${savingsRate.toFixed(1)}% of your income. Try to reach 20% for stronger financial health.`
        : `Your savings rate is ${savingsRate.toFixed(1)}%. Consider reducing discretionary spending.`,
      type: savingsRate >= 20 ? 'success' : savingsRate >= 10 ? 'warning' : 'danger',
      metric: `${savingsRate.toFixed(1)}%`,
    })
  }

  // ── Insight 2: Month-over-month expense change ──
  if (latest && previous) {
    const expenseChange = previous.expenses > 0
      ? ((latest.expenses - previous.expenses) / previous.expenses) * 100
      : 0

    insights.push({
      id: 'expense-change',
      icon: expenseChange > 0 ? TrendingUp : TrendingDown,
      title: 'Expense Trend',
      description: expenseChange > 10
        ? `Expenses rose ${expenseChange.toFixed(1)}% vs last month (${formatCurrency(previous.expenses)} → ${formatCurrency(latest.expenses)}). Review your spending.`
        : expenseChange < -5
        ? `Great job! Expenses dropped ${Math.abs(expenseChange).toFixed(1)}% vs last month. Keep it up.`
        : `Expenses are stable — ${Math.abs(expenseChange).toFixed(1)}% change vs last month.`,
      type: expenseChange > 10 ? 'danger' : expenseChange < -5 ? 'success' : 'neutral',
      metric: `${expenseChange > 0 ? '+' : ''}${expenseChange.toFixed(1)}%`,
    })
  }

  // ── Insight 3: Top spending category ──
  if (categoryBreakdown.length > 0) {
    const top = categoryBreakdown[0]
    const cat = CATEGORIES[top.category]
    const pct = ((top.total / summary.expenses) * 100).toFixed(1)

    insights.push({
      id: 'top-category',
      icon: Flame,
      title: 'Highest Spending Category',
      description: `${cat?.label} accounts for ${pct}% of all expenses (${formatCurrency(top.total)} across ${top.count} transactions). ${
        pct > 30 ? 'Consider if this aligns with your priorities.' : 'This looks reasonable.'
      }`,
      type: pct > 30 ? 'warning' : 'neutral',
      metric: cat?.label,
    })
  }

  // ── Insight 4: Income consistency ──
  if (monthlyData.length >= 3) {
    const incomes = monthlyData.map(m => m.income)
    const avgIncome = incomes.reduce((s, v) => s + v, 0) / incomes.length
    const variance  = incomes.reduce((s, v) => s + Math.abs(v - avgIncome), 0) / incomes.length
    const cvPercent = (variance / avgIncome) * 100

    insights.push({
      id: 'income-consistency',
      icon: cvPercent < 15 ? CheckCircle : AlertTriangle,
      title: 'Income Consistency',
      description: cvPercent < 15
        ? `Your income is very consistent — avg ${formatCurrency(avgIncome)}/month with low variation. Great for financial planning.`
        : `Your income varies significantly month to month (avg ${formatCurrency(avgIncome)}). Build an emergency fund to buffer slow months.`,
      type: cvPercent < 15 ? 'success' : 'warning',
      metric: `±${cvPercent.toFixed(0)}%`,
    })
  }

  // ── Insight 5: Best month ──
  const bestMonth = [...monthlyData].sort((a, b) => b.balance - a.balance).at(0)
  if (bestMonth) {
    insights.push({
      id: 'best-month',
      icon: TrendingUp,
      title: 'Best Performing Month',
      description: `Your best month was ${bestMonth.label} with a net balance of ${formatCurrency(bestMonth.balance)}. That's your benchmark to beat!`,
      type: 'success',
      metric: formatCurrency(bestMonth.balance, true),
    })
  }

  return insights
}

// Color config per insight type
const TYPE_STYLES = {
  success: {
    border: 'border-l-green-500',
    icon:   'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    metric: 'text-green-600 dark:text-green-400',
  },
  warning: {
    border: 'border-l-amber-500',
    icon:   'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    metric: 'text-amber-600 dark:text-amber-400',
  },
  danger: {
    border: 'border-l-red-500',
    icon:   'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    metric: 'text-red-600 dark:text-red-400',
  },
  neutral: {
    border: 'border-l-blue-500',
    icon:   'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    metric: 'text-blue-600 dark:text-blue-400',
  },
}

export default function SmartInsights() {
  const getMonthlyData        = useFinanceStore((s) => s.getMonthlyData)
  const getCategoryBreakdown  = useFinanceStore((s) => s.getCategoryBreakdown)
  const getSummary            = useFinanceStore((s) => s.getSummary)

  const monthlyData        = getMonthlyData()
  const categoryBreakdown  = getCategoryBreakdown()
  const summary            = getSummary()
  const insights           = generateInsights(monthlyData, categoryBreakdown, summary)

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Smart Insights
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Auto-generated observations from your data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {insights.map((insight) => {
          const styles = TYPE_STYLES[insight.type]
          const Icon   = insight.icon

          return (
            <div
              key={insight.id}
              className={clsx(
                'card p-4 border-l-4 hover:shadow-card-hover transition-shadow duration-200 animate-slide-up',
                styles.border
              )}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={clsx(
                  'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
                  styles.icon
                )}>
                  <Icon size={16} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                      {insight.title}
                    </p>
                    {/* Metric badge */}
                    <span className={clsx('text-xs font-bold flex-shrink-0', styles.metric)}>
                      {insight.metric}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}