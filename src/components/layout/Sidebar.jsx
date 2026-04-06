import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  TrendingUp,
  X,
} from 'lucide-react'
import clsx from 'clsx'

// Navigation links config — easy to extend later
const NAV_LINKS = [
  { to: '/',             label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight  },
  { to: '/insights',     label: 'Insights',     icon: Lightbulb       },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* ── Mobile Overlay (dark background behind sidebar) ── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}   // tap outside to close
        />
      )}

      {/* ── Sidebar Panel ── */}
      <aside className={clsx(
        // Base styles
        'fixed top-0 left-0 h-full w-64 z-30',
        'bg-white dark:bg-gray-900',
        'border-r border-gray-100 dark:border-gray-800',
        'flex flex-col',
        'transition-transform duration-300 ease-in-out',
        // Desktop: always visible | Mobile: slide in/out
        'lg:translate-x-0 lg:static lg:z-auto',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      )}>

        {/* ── Logo Area ── */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <TrendingUp size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">
              FinanceIQ
            </span>
          </div>

          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Navigation Links ── */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3 mb-3">
            Main Menu
          </p>

          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}    // 'end' means exact match for root '/'
              onClick={onClose}   // close sidebar on mobile after clicking
              className={({ isActive }) => clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
                'transition-all duration-200',
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              )}
            >
              {/* Icon with active indicator */}
              {({ isActive }) => (
                <>
                  <span className={clsx(
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900/40'
                      : 'bg-transparent group-hover:bg-gray-100'
                  )}>
                    <Icon size={16} />
                  </span>
                  {label}
                  {/* Active dot */}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ── Footer ── */}
<div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
  <p className="text-xs text-gray-400 dark:text-gray-500">
    FinanceIQ v1.0.0
  </p>

  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
    🛠 Built by{' '}
    <a
      href="https://www.linkedin.com/in/sanket-jagrut-0853b0206/"
      target="_blank"
      rel="noreferrer"
      className="text-primary-600 dark:text-primary-400 hover:underline font-semibold"
    >
      Sanket Jagrut
    </a>
  </p>
</div>
                    
      </aside>
    </>
  )
}