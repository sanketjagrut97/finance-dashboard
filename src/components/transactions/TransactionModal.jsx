// TransactionModal — popup form for adding or editing a transaction
// Only visible to Admin role

import { useState, useEffect } from 'react'
import { X, Save, Plus } from 'lucide-react'
import { CATEGORIES } from '../../data/mockData'
import useFinanceStore from '../../store/useFinanceStore'
import Button from '../ui/Button'
import clsx from 'clsx'

// Default empty form state
const EMPTY_FORM = {
  description: '',
  amount:      '',
  category:    'food',
  type:        'expense',
  date:        new Date().toISOString().split('T')[0],  // today's date
}

export default function TransactionModal({ isOpen, onClose, editTransaction }) {
  // editTransaction = null → Add mode | object → Edit mode
  const addTransaction    = useFinanceStore((s) => s.addTransaction)
  const updateTransaction = useFinanceStore((s) => s.updateTransaction)

  const [form, setForm]     = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  // When modal opens for editing, pre-fill the form
  useEffect(() => {
    if (editTransaction) {
      setForm({
        description: editTransaction.description,
        amount:      editTransaction.amount.toString(),
        category:    editTransaction.category,
        type:        editTransaction.type,
        date:        editTransaction.date,
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [editTransaction, isOpen])

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Update a single form field
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user types
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  // Validate before saving
  const validate = () => {
    const newErrors = {}
    if (!form.description.trim())      newErrors.description = 'Description is required'
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      newErrors.amount = 'Enter a valid positive amount'
    if (!form.date)                    newErrors.date = 'Date is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    const payload = {
      ...form,
      amount: Number(form.amount),
    }

    if (editTransaction) {
      updateTransaction(editTransaction.id, payload)
    } else {
      addTransaction(payload)
    }
    onClose()
  }

  if (!isOpen) return null

  const isEdit = !!editTransaction

  return (
    // ── Backdrop ──
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* ── Modal Box ── */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md animate-slide-up">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              {isEdit ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {isEdit ? 'Update the transaction details' : 'Fill in the details below'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center
                       hover:bg-gray-100 dark:hover:bg-gray-700
                       text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Type toggle — Income / Expense */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['income', 'expense'].map((t) => (
                <button
                  key={t}
                  onClick={() => handleChange('type', t)}
                  className={clsx(
                    'py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200',
                    form.type === t
                      ? t === 'income'
                        ? 'bg-green-500 text-white shadow-sm'
                        : 'bg-rose-500 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  )}
                >
                  {t === 'income' ? '↑ Income' : '↓ Expense'}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="e.g. Monthly Salary, Grocery Shopping..."
              className={clsx('input', errors.description && 'border-red-400 focus:ring-red-400')}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">
                ₹
              </span>
              <input
                type="number"
                value={form.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                placeholder="0"
                min="1"
                className={clsx('input pl-7', errors.amount && 'border-red-400 focus:ring-red-400')}
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="input"
            >
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <option key={key} value={key}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className={clsx('input', errors.date && 'border-red-400 focus:ring-red-400')}
            />
            {errors.date && (
              <p className="text-xs text-red-500 mt-1">{errors.date}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            icon={isEdit ? Save : Plus}
            onClick={handleSubmit}
          >
            {isEdit ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </div>
      </div>
    </div>
  )
}