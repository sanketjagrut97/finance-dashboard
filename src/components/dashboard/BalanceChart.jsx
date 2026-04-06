// BalanceChart — Line/Area chart showing income vs expenses over months
// Uses Recharts library

import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
  } from 'recharts'
  import { formatCurrency } from '../../utils/formatters'
  import useFinanceStore from '../../store/useFinanceStore'
  
  // Custom tooltip that appears when you hover over the chart
  function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null
  
    return (
      <div className="card p-3 shadow-lg border border-gray-100 dark:border-gray-700 min-w-[160px]">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
              <span className="text-gray-500 dark:text-gray-400 capitalize">{entry.name}</span>
            </div>
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    )
  }
  
  export default function BalanceChart() {
    const getMonthlyData = useFinanceStore((s) => s.getMonthlyData)
    const data = getMonthlyData()
  
    return (
      <div className="card p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Balance Trend
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              Income vs Expenses over time
            </p>
          </div>
  
          {/* Legend dots */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Expenses
            </span>
          </div>
        </div>
  
        {/* Chart */}
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            {/* Gradient fills */}
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}    />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#fb7185" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#fb7185" stopOpacity={0}    />
              </linearGradient>
            </defs>
  
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" className="dark:stroke-gray-700" />
  
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
  
            <Tooltip content={<CustomTooltip />} />
  
            {/* Income area */}
            <Area
              type="monotone"
              dataKey="income"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#incomeGrad)"
              dot={{ fill: '#3b82f6', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
  
            {/* Expenses area */}
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#fb7185"
              strokeWidth={2.5}
              fill="url(#expenseGrad)"
              dot={{ fill: '#fb7185', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }