// Bar chart comparing income vs expenses month by month
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ReferenceLine, Cell
  } from 'recharts'
  import { formatCurrency } from '../../utils/formatters'
  import useFinanceStore from '../../store/useFinanceStore'
  
  function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null
    const income   = payload.find(p => p.dataKey === 'income')?.value  ?? 0
    const expenses = payload.find(p => p.dataKey === 'expenses')?.value ?? 0
    const savings  = income - expenses
  
    return (
      <div className="card p-3 shadow-lg text-xs min-w-[170px]">
        <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{label}</p>
  
        <div className="space-y-1.5">
          <div className="flex justify-between gap-6">
            <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Income
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {formatCurrency(income)}
            </span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <span className="w-2 h-2 rounded-full bg-rose-400" /> Expenses
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {formatCurrency(expenses)}
            </span>
          </div>
  
          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-1.5 mt-1.5">
            <div className="flex justify-between gap-6">
              <span className="text-gray-500 dark:text-gray-400">Savings</span>
              <span className={`font-semibold ${savings >= 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-500 dark:text-red-400'}`}>
                {savings >= 0 ? '+' : ''}{formatCurrency(savings)}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default function MonthlyComparisonChart() {
    const getMonthlyData = useFinanceStore((s) => s.getMonthlyData)
    const data = getMonthlyData()
  
    return (
      <div className="card p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Monthly Comparison
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              Income vs Expenses by month
            </p>
          </div>
  
          {/* Legend */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-blue-500" /> Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-rose-400" /> Expenses
            </span>
          </div>
        </div>
  
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-700" vertical={false} />
  
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
            />
  
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
  
            {/* Income bars */}
            <Bar dataKey="income" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={40} />
  
            {/* Expense bars — color shifts red if expenses > income */}
            <Bar dataKey="expenses" radius={[6, 6, 0, 0]} maxBarSize={40}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.expenses > entry.income ? '#f43f5e' : '#fb7185'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }