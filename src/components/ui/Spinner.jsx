// Reusable loading spinner
import clsx from 'clsx'

export default function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-3',
  }

  return (
    <div className={clsx(
      'rounded-full border-gray-200 dark:border-gray-700 border-t-primary-500 animate-spin',
      sizes[size],
      className
    )} />
  )
}