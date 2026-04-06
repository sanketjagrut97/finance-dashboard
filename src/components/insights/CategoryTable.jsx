// Detailed breakdown table — all categories with stats
import { formatCurrency } from '../../utils/formatters'
import { CATEGORIES } from '../../data/mockData'
import useFinanceStore from '../../store/useFinanceStore'
import EmptyState from '../ui/EmptyState'
import { BarChart2 } from 'lucide-react'

export default function CategoryTable() {
  const getCategoryBreakdown = useFinanceStore((s) => s.getCategoryBreakdown)
  const getSummary           = useFinanceStore((s) => s.getSummary)

  const breakdown = getCategoryBreakdown()
  const { expenses: totalExpenses } = getSummary()

  if (!breakdown.length) {
    return (
      <div className="card p-5">
        <EmptyState icon={BarChart2} title="No category data" message="Add expense transactions to see breakdown" />
      </div>
    )
  }

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          Category Deep Dive
        </h2>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          All expense categories ranked by total spend
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <th className="px-5 py-3 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-5 py-3 text-right font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Transactions
              </th>
              <th className="px-5 py-3 text-right font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="px-5 py-3 text-right font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Avg / Txn
              </th>
              <th className="px-5 py-3 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-40">
                Share
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
            {breakdown.map((entry, index) => {
              const cat  = CATEGORIES[entry.category]
              const pct  = totalExpenses > 0 ? (entry.total / totalExpenses) * 100 : 0
              const avg  = entry.total / entry.count

              return (
                <tr
                  key={entry.category}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  {/* Rank + Category */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      {/* Rank number */}
                      <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600 w-4">
                        #{index + 1}
                      </span>
                      {/* Color dot */}
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: cat?.color ?? '#94a3b8' }}
                      />
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        {cat?.label ?? entry.category}
                      </span>
                    </div>
                  </td>

                  {/* Transaction count */}
                  <td className="px-5 py-3.5 text-right text-gray-500 dark:text-gray-400">
                    {entry.count}
                  </td>

                  {/* Total */}
                  <td className="px-5 py-3.5 text-right font-semibold text-gray-800 dark:text-gray-100">
                    {formatCurrency(entry.total)}
                  </td>

                  {/* Average */}
                  <td className="px-5 py-3.5 text-right text-gray-500 dark:text-gray-400">
                    {formatCurrency(avg)}
                  </td>

                  {/* Share bar */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      {/* Progress bar */}
                      <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${pct}%`,
                            background: cat?.color ?? '#94a3b8',
                          }}
                        />
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 w-10 text-right">
                        {pct.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>

          {/* Footer total row */}
          <tfoot>
            <tr className="border-t-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
              <td className="px-5 py-3 font-semibold text-gray-700 dark:text-gray-300">
                Total
              </td>
              <td className="px-5 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">
                {breakdown.reduce((s, e) => s + e.count, 0)}
              </td>
              <td className="px-5 py-3 text-right font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalExpenses)}
              </td>
              <td className="px-5 py-3 text-right text-gray-400">—</td>
              <td className="px-5 py-3 text-gray-400 text-xs">100%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}