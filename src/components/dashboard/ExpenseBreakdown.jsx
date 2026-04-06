import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/formatters'
import { CATEGORIES } from '../../data/mockData'
import useFinanceStore from '../../store/useFinanceStore'
import EmptyState from '../ui/EmptyState'
import { PieChart as PieIcon } from 'lucide-react'

// Custom tooltip
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const cat = CATEGORIES[d.category]

  return (
    <div className="card p-3 shadow-lg text-xs min-w-[140px]">
      <p className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{cat?.label}</p>
      <p className="text-gray-500 dark:text-gray-400">{formatCurrency(d.total)}</p>
      <p className="text-gray-400 dark:text-gray-500">{d.count} transactions</p>
    </div>
  )
}

// Custom label inside pie slices
function CustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  if (percent < 0.06) return null   // skip label if slice too small
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      fontSize={10} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function ExpenseBreakdown() {
  const getCategoryBreakdown = useFinanceStore((s) => s.getCategoryBreakdown)
  const data = getCategoryBreakdown()

  // Only show top 6 categories to keep chart clean
  const topData = data.slice(0, 6)

  if (!topData.length) {
    return (
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
          Expense Breakdown
        </h2>
        <EmptyState icon={PieIcon} title="No expense data" message="Add some transactions" />
      </div>
    )
  }

  return (
    <div className="card p-5">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Expense Breakdown
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          By category (all time)
        </p>
      </div>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={topData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            dataKey="total"
            labelLine={false}
            label={<CustomLabel />}
          >
            {topData.map((entry) => (
              <Cell
                key={entry.category}
                fill={CATEGORIES[entry.category]?.color ?? '#94a3b8'}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend list below the chart */}
      <div className="space-y-2 mt-2">
        {topData.map((entry) => {
          const cat = CATEGORIES[entry.category]
          const totalExpenses = data.reduce((s, d) => s + d.total, 0)
          const pct = ((entry.total / totalExpenses) * 100).toFixed(1)

          return (
            <div key={entry.category} className="flex items-center gap-2">
              {/* Color dot */}
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ background: cat?.color ?? '#94a3b8' }}
              />

              {/* Category name */}
              <span className="text-xs text-gray-600 dark:text-gray-400 flex-1 truncate">
                {cat?.label}
              </span>

              {/* Percentage bar */}
              <div className="w-16 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: cat?.color ?? '#94a3b8'
                  }}
                />
              </div>

              {/* Amount */}
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 w-16 text-right">
                {formatCurrency(entry.total, true)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}