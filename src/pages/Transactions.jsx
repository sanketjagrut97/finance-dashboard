import { useState } from 'react'
import { Plus, Download } from 'lucide-react'
import useFinanceStore from '../store/useFinanceStore'
import FiltersBar        from '../components/transactions/FiltersBar'
import TransactionTable  from '../components/transactions/TransactionTable'
import TransactionModal  from '../components/transactions/TransactionModal'
import DeleteModal       from '../components/transactions/DeleteModal'
import Button            from '../components/ui/Button'

export default function Transactions() {
  const role = useFinanceStore((s) => s.role)
  const getFilteredTransactions = useFinanceStore((s) => s.getFilteredTransactions)

  // Modal state
  const [showAddModal,    setShowAddModal]    = useState(false)
  const [editTransaction, setEditTransaction] = useState(null)   // null = closed
  const [deleteTarget,    setDeleteTarget]    = useState(null)   // null = closed

  const isAdmin = role === 'admin'

  // Open edit modal with the selected transaction
  const handleEdit = (txn) => setEditTransaction(txn)

  // Open delete modal with the selected transaction
  const handleDelete = (txn) => setDeleteTarget(txn)

  // Export filtered transactions as CSV
  const handleExport = () => {
    const data = getFilteredTransactions()
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']
    const rows = data.map((t) =>
      [t.date, `"${t.description}"`, t.category, t.type, t.amount].join(',')
    )
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = 'transactions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            All Transactions
          </h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {isAdmin ? 'Admin mode — you can add, edit and delete' : 'Viewer mode — read only'}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Export CSV — always visible */}
          <Button variant="secondary" icon={Download} onClick={handleExport} size="sm">
            Export CSV
          </Button>

          {/* Add button — admin only */}
          {isAdmin && (
            <Button
              variant="primary"
              icon={Plus}
              onClick={() => setShowAddModal(true)}
              size="sm"
            >
              Add Transaction
            </Button>
          )}
        </div>
      </div>

      {/* ── Filters ── */}
      <FiltersBar />

      {/* ── Table ── */}
      <TransactionTable
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* ── Modals ── */}

      {/* Add modal */}
      <TransactionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        editTransaction={null}
      />

      {/* Edit modal */}
      <TransactionModal
        isOpen={!!editTransaction}
        onClose={() => setEditTransaction(null)}
        editTransaction={editTransaction}
      />

      {/* Delete confirm modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        transaction={deleteTarget}
      />
    </div>
  )
}