// TransactionTable — sortable table with edit/delete per row

import { ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2 } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/formatters'
import { CATEGORIES } from '../../data/mockData'
import useFinanceStore from '../../store/useFinanceStore'
import Badge from '../ui/Badge'
import Tooltip from '../ui/Tooltip'
import EmptyState from '../ui/EmptyState'
import clsx from 'clsx'

// Column config — makes it easy to add/remove columns later
const COLUMNS = [
  { key: 'date',        label: 'Date',        sortable: true  },
  { key: 'description', label: 'Description', sortable: true  },
  { key: 'category',    label: 'Category',    sortable: false },
  { key: 'type',        label: 'Type',        sortable: false },
  { key: 'amount',      label: 'Amount',      sortable: true  },
  { key: 'actions',     label: '',            sortable: false },
]

export default function TransactionTable({ onEdit, onDelete }) {
  const filters                  = useFinanceStore((s) => s.filters)
  const setFilter                = useFinanceStore((s) => s.setFilter)
  const getFilteredTransactions  = useFinanceStore((s) => s.getFilteredTransactions)
  const role                     = useFinanceStore((s) => s.role)

  const transactions = getFilteredTransactions()
  const isAdmin = role === 'admin'

  // Handle column header click for sorting
  const handleSort = (key) => {
    if (filters.sortBy === key) {
      // Toggle direction if same column
      setFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setFilter('sortBy', key)
      setFilter('sortOrder', 'desc')
    }
  }

  // Sort icon for column headers
  const SortIcon = ({ col }) => {
    if (!col.sortable) return null
    if (filters.sortBy !== col.key) return <ArrowUpDown size={13} className="text-gray-300 dark:text-gray-600" />
    return filters.sortOrder === 'asc'
      ? <ArrowUp size={13} className="text-primary-500" />
      : <ArrowDown size={13} className="text-primary-500" />
  }

  return (
    <div className="card overflow-hidden">
      {/* Scrollable table wrapper */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">

          {/* ── Table Head ── */}
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={clsx(
                    'px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap',
                    col.sortable && 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 select-none',
                    col.key === 'actions' && 'w-20 text-right'
                  )}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <SortIcon col={col} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* ── Table Body ── */}
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} className="py-2">
                  <EmptyState
                    title="No transactions found"
                    message="Try adjusting your filters or search query"
                  />
                </td>
              </tr>
            ) : (
              transactions.map((txn) => {
                const cat = CATEGORIES[txn.category]
                const isIncome = txn.type === 'income'

                return (
                  <tr
                    key={txn.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-100 group"
                  >
                    {/* Date */}
                    <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {formatDate(txn.date)}
                    </td>

                    {/* Description */}
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-100">
                        {txn.description}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      <span className={clsx(
                        'badge text-xs',
                        cat?.bg ?? 'bg-gray-100',
                        cat?.text ?? 'text-gray-600',
                      )}>
                        {cat?.label ?? txn.category}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-3">
                      <Badge variant={txn.type} className="capitalize">
                        {txn.type}
                      </Badge>
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={clsx(
                        'text-xs font-semibold',
                        isIncome
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-800 dark:text-gray-100'
                      )}>
                        {isIncome ? '+' : '-'}{formatCurrency(txn.amount)}
                      </span>
                    </td>

                    {/* Actions — admin only */}
                    <td className="px-4 py-3 text-right">
                      {isAdmin ? (
                        <div className="flex items-center justify-end gap-1
                                        opacity-0 group-hover:opacity-100 transition-opacity">
                          <Tooltip text="Edit">
                            <button
                              onClick={() => onEdit(txn)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center
                                         hover:bg-blue-50 dark:hover:bg-blue-900/30
                                         text-gray-400 hover:text-blue-500 transition-colors"
                            >
                              <Pencil size={13} />
                            </button>
                          </Tooltip>
                          <Tooltip text="Delete">
                            <button
                              onClick={() => onDelete(txn)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center
                                         hover:bg-red-50 dark:hover:bg-red-900/30
                                         text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={13} />
                            </button>
                          </Tooltip>
                        </div>
                      ) : (
                        // Viewer sees a read-only badge
                        <span className="text-[10px] text-gray-300 dark:text-gray-600 italic">
                          read-only
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer: count ── */}
      {transactions.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700
                        bg-gray-50 dark:bg-gray-800/50
                        flex items-center justify-between">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Showing <span className="font-semibold text-gray-600 dark:text-gray-300">
              {transactions.length}
            </span> transactions
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Income
            <span className="w-2 h-2 rounded-full bg-gray-300 ml-2" />
            Expense
          </div>
        </div>
      )}
    </div>
  )
}