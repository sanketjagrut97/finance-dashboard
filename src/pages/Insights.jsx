import {
    Flame, PiggyBank, TrendingUp, Calendar
  } from 'lucide-react'
  import useFinanceStore from '../store/useFinanceStore'
  import { formatCurrency }       from '../utils/formatters'
  import { CATEGORIES }           from '../data/mockData'
  import InsightStatCard          from '../components/insights/InsightStatCard'
  import MonthlyComparisonChart   from '../components/insights/MonthlyComparisonChart'
  import SmartInsights            from '../components/insights/SmartInsights'
  import CategoryTable            from '../components/insights/CategoryTable'
  
  export default function Insights() {
    const getMonthlyData       = useFinanceStore((s) => s.getMonthlyData)
    const getCategoryBreakdown = useFinanceStore((s) => s.getCategoryBreakdown)
    const getSummary           = useFinanceStore((s) => s.getSummary)
  
    const monthlyData      = getMonthlyData()
    const categoryBreakdown = getCategoryBreakdown()
    const summary          = getSummary()
  
    // ── Derived stats for top cards ──
    const latestMonth  = monthlyData.at(-1)
    const topCategory  = categoryBreakdown.at(0)
    const topCat       = CATEGORIES[topCategory?.category]
  
    // Avg monthly savings
    const avgSavings = monthlyData.length
      ? monthlyData.reduce((s, m) => s + (m.income - m.expenses), 0) / monthlyData.length
      : 0
  
    // Best month
    const bestMonth = [...monthlyData].sort((a, b) => b.balance - a.balance).at(0)
  
    // Savings rate this month
    const savingsRate = latestMonth?.income > 0
      ? ((latestMonth.income - latestMonth.expenses) / latestMonth.income * 100).toFixed(1)
      : '0.0'
  
    return (
      <div className="space-y-6">
  
        {/* ── Row 1: Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <InsightStatCard
            title="Top Spending Category"
            value={topCat?.label ?? '—'}
            subtitle={topCategory
              ? `${formatCurrency(topCategory.total)} across ${topCategory.count} transactions`
              : 'No expense data yet'}
            icon={Flame}
            iconBg="bg-orange-100 dark:bg-orange-900/30"
            iconColor="text-orange-600 dark:text-orange-400"
            accent="border-b-orange-500"
          />
  
          <InsightStatCard
            title="Avg Monthly Savings"
            value={formatCurrency(avgSavings, true)}
            subtitle={avgSavings >= 0
              ? 'You are consistently saving each month'
              : 'Spending exceeds income on average'}
            icon={PiggyBank}
            iconBg="bg-green-100 dark:bg-green-900/30"
            iconColor="text-green-600 dark:text-green-400"
            accent={avgSavings >= 0 ? 'border-b-green-500' : 'border-b-red-500'}
          />
  
          <InsightStatCard
            title="This Month Savings Rate"
            value={`${savingsRate}%`}
            subtitle={
              Number(savingsRate) >= 20 ? '🎯 Excellent — above 20% target' :
              Number(savingsRate) >= 10 ? '⚠️ Good — try to reach 20%' :
              '🔴 Low — review your expenses'
            }
            icon={TrendingUp}
            iconBg="bg-blue-100 dark:bg-blue-900/30"
            iconColor="text-blue-600 dark:text-blue-400"
            accent={
              Number(savingsRate) >= 20 ? 'border-b-green-500' :
              Number(savingsRate) >= 10 ? 'border-b-amber-500' :
              'border-b-red-500'
            }
          />
  
          <InsightStatCard
            title="Best Month"
            value={bestMonth?.label ?? '—'}
            subtitle={bestMonth
              ? `Net balance of ${formatCurrency(bestMonth.balance)}`
              : 'Not enough data yet'}
            icon={Calendar}
            iconBg="bg-purple-100 dark:bg-purple-900/30"
            iconColor="text-purple-600 dark:text-purple-400"
            accent="border-b-purple-500"
          />
        </div>
  
        {/* ── Row 2: Monthly Bar Chart ── */}
        <MonthlyComparisonChart />
  
        {/* ── Row 3: Smart Insights ── */}
        <SmartInsights />
  
        {/* ── Row 4: Category Table ── */}
        <CategoryTable />
  
      </div>
    )
  }