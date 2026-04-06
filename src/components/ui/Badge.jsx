// Badge — the colored pill labels (e.g. "Income", "Food")
// Usage: <Badge variant="income">Income</Badge>

import clsx from 'clsx'

const badgeVariants = {
  income:  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  expense: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  admin:   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  viewer:  'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  default: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
}

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span className={clsx('badge', badgeVariants[variant] ?? badgeVariants.default, className)}>
      {children}
    </span>
  )
}