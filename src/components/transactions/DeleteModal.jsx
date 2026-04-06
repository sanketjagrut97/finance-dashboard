// DeleteModal — simple confirm dialog before deleting a transaction

import { Trash2, X } from 'lucide-react'
import useFinanceStore from '../../store/useFinanceStore'
import { formatCurrency } from '../../utils/formatters'
import Button from '../ui/Button'

export default function DeleteModal({ isOpen, onClose, transaction }) {
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction)

  if (!isOpen || !transaction) return null

  const handleDelete = () => {
    deleteTransaction(transaction.id)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm animate-slide-up">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            Delete Transaction
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center
                       hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {/* Warning icon */}
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
            <Trash2 size={20} className="text-red-500" />
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Are you sure you want to delete
          </p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white text-center mt-1">
            "{transaction.description}"
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-1">
            {formatCurrency(transaction.amount)} · {transaction.date}
          </p>
          <p className="text-xs text-red-400 text-center mt-3 bg-red-50 dark:bg-red-900/20 rounded-lg py-2">
            ⚠️ This action cannot be undone
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" icon={Trash2} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}