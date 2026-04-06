// A secondary stats row showing quick metrics below summary cards
import { formatCurrency } from '../../utils/formatters'
import { CATEGORIES } from '../../data/mockData'
import useFinanceStore from '../../store/useFinanceStore'

export default function StatsRow() {
  const getMonthlyData       = useFinanceStore((s) => s.getMonthlyData)
  const getCategoryBreakdown = useFinanceStore((s) => s.getCategoryBreakdown)
  const transactions         = useFinanceStore((s) => s.transactions)

  const monthlyData      = getMonthlyData()
  const categoryBreakdown = getCategoryBreakdown()
  const latestMonth      = monthlyData.at(-1)
  const topCat           = categoryBreakdown.at(0)

  // Average transaction value
  const expenses    = transactions.filter(t => t.type === 'expense')
  const avgExpense  = expenses.length
    ? expenses.reduce((s, t) => s + t.amount, 0) / expenses.length
    : 0

  const stats = [
    {
      label: 'This Month Income',
      value: formatCurrency(latestMonth?.income ?? 0, true),
      sub:   latestMonth?.label ?? '—',
    },
    {
      label: 'This Month Expenses',
      value: formatCurrency(latestMonth?.expenses ?? 0, true),
      sub:   latestMonth?.label ?? '—',
    },
    {
      label: 'Top Category',
      value: CATEGORIES[topCat?.category]?.label ?? '—',
      sub:   topCat ? formatCurrency(topCat.total, true) + ' total' : 'No data',
    },
    {
      label: 'Avg Transaction',
      value: formatCurrency(avgExpense, true),
      sub:   `across ${expenses.length} expenses`,
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="card px-4 py-3 flex flex-col gap-1 hover:shadow-card-hover transition-shadow"
        >
          <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">
            {stat.label}
          </p>
          <p className="text-base font-bold text-gray-900 dark:text-white">
            {stat.value}
          </p>
          <p className="text-[11px] text-gray-400 dark:text-gray-500">
            {stat.sub}
          </p>
        </div>
      ))}
    </div>
  )
}