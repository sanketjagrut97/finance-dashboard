import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import useFinanceStore from '../store/useFinanceStore'
import SummaryCard        from '../components/dashboard/SummaryCard'
import BalanceChart       from '../components/dashboard/BalanceChart'
import ExpenseBreakdown   from '../components/dashboard/ExpenseBreakdown'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import StatsRow           from '../components/dashboard/StatsRow'       // ← ADD

export default function Dashboard() {
  const getSummary     = useFinanceStore((s) => s.getSummary)
  const getMonthlyData = useFinanceStore((s) => s.getMonthlyData)

  const { income, expenses, balance } = getSummary()
  const monthlyData = getMonthlyData()

  const currentMonth  = monthlyData.at(-1)
  const previousMonth = monthlyData.at(-2)

  const getPctChange = (curr, prev) => {
    if (!prev || prev === 0) return null
    return ((curr - prev) / prev) * 100
  }

  const incomeChange  = getPctChange(currentMonth?.income,   previousMonth?.income)
  const expenseChange = getPctChange(currentMonth?.expenses, previousMonth?.expenses)
  const balanceChange = getPctChange(currentMonth?.balance,  previousMonth?.balance)

  return (
    <div className="space-y-6">

      {/* ── Row 1: Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Balance"
          amount={balance}
          icon={Wallet}
          iconBg="bg-blue-100 dark:bg-blue-900/30"
          iconColor="text-blue-600 dark:text-blue-400"
          change={balanceChange}
          changeLabel="vs last month"
        />
        <SummaryCard
          title="Total Income"
          amount={income}
          icon={TrendingUp}
          iconBg="bg-green-100 dark:bg-green-900/30"
          iconColor="text-green-600 dark:text-green-400"
          change={incomeChange}
          changeLabel="vs last month"
        />
        <SummaryCard
          title="Total Expenses"
          amount={expenses}
          icon={TrendingDown}
          iconBg="bg-rose-100 dark:bg-rose-900/30"
          iconColor="text-rose-600 dark:text-rose-400"
          change={expenseChange}
          changeLabel="vs last month"
        />
      </div>

      {/* ── Row 2: Quick Stats ── */}
      <StatsRow />                                                    {/* ← ADD */}

      {/* ── Row 3: Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BalanceChart />
        </div>
        <div className="lg:col-span-1">
          <ExpenseBreakdown />
        </div>
      </div>

      {/* ── Row 4: Recent Transactions ── */}
      <RecentTransactions />

    </div>
  )
}