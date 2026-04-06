// EmptyState — shown when a list/table has no data
// Usage: <EmptyState title="No transactions" message="Add one to get started" />

import { FileX } from 'lucide-react'

export default function EmptyState({
  title = 'Nothing here yet',
  message = 'No data to display.',
  icon: Icon = FileX,
  action,           // optional: { label: 'Add', onClick: fn }
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
        <Icon size={28} className="text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-1">{title}</h3>
      <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 btn-primary text-sm"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}