import { ArrowUpRight, ArrowDownRight, MoveRight } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { CATEGORIES } from '../../data/mockData'
import { useNavigate } from 'react-router-dom'
import useFinanceStore from '../../store/useFinanceStore'
import EmptyState from '../ui/EmptyState'
import clsx from 'clsx'

export default function RecentTransactions() {
  const transactions = useFinanceStore((s) => s.transactions)
  const navigate = useNavigate()

  // Show only the 5 most recent
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  return (
    <div className="card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Recent Transactions
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Latest 5 transactions
          </p>
        </div>

        {/* View all link */}
        <button
          onClick={() => navigate('/transactions')}
          className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400
                     hover:text-primary-700 font-medium transition-colors"
        >
          View all <MoveRight size={12} />
        </button>
      </div>

      {/* List */}
      {recent.length === 0 ? (
        <EmptyState title="No transactions yet" message="Add your first transaction" />
      ) : (
        <div className="space-y-1">
          {recent.map((txn) => {
            const cat = CATEGORIES[txn.category]
            const isIncome = txn.type === 'income'

            return (
              <div
                key={txn.id}
                className="flex items-center gap-3 p-2.5 rounded-xl
                           hover:bg-gray-50 dark:hover:bg-gray-700/50
                           transition-colors duration-150 group"
              >
                {/* Category icon bubble */}
                <div className={clsx(
                  'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base',
                  cat?.bg ?? 'bg-gray-100',
                  'dark:bg-opacity-20'
                )}>
                  {getCategoryEmoji(txn.category)}
                </div>

                {/* Description + date */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 dark:text-gray-100 truncate">
                    {txn.description}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                    {formatDate(txn.date)}
                  </p>
                </div>

                {/* Amount + type icon */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className={clsx(
                    'text-sm font-semibold',
                    isIncome
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-800 dark:text-gray-100'
                  )}>
                    {isIncome ? '+' : '-'}{formatCurrency(txn.amount, true)}
                  </span>
                  {isIncome
                    ? <ArrowUpRight size={14} className="text-green-500" />
                    : <ArrowDownRight size={14} className="text-gray-400" />
                  }
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Simple emoji map instead of importing lucide icons per row
function getCategoryEmoji(category) {
  const map = {
    salary: '💼', freelance: '💻', food: '🍔', transport: '🚗',
    shopping: '🛍️', utilities: '⚡', health: '❤️',
    investment: '📈', rent: '🏠', entertainment: '🎬',
  }
  return map[category] ?? '💰'
}