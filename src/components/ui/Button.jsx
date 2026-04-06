// Button — reusable button with variants and loading state
// Usage: <Button variant="primary" icon={Plus} onClick={...}>Add</Button>

import clsx from 'clsx'

const variants = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  danger:    'bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 active:scale-95 flex items-center gap-2',
  ghost:     'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2',
}

export default function Button({
  children,
  variant = 'primary',
  icon: Icon,          // pass a lucide icon component
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  size = 'md',
}) {
  const sizeClass = size === 'sm' ? 'text-sm px-3 py-1.5' : 'text-sm'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        variants[variant],
        sizeClass,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {/* Render icon if passed */}
      {Icon && <Icon size={16} />}
      {children}
    </button>
  )
}