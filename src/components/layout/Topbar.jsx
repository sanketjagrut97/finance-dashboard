import { Menu, Moon, Sun, Shield, Eye } from 'lucide-react'
import useFinanceStore from '../../store/useFinanceStore'
import Badge from '../ui/Badge.jsx'

export default function Topbar({ onMenuClick, pageTitle }) {
  // Read values from store
  const role         = useFinanceStore((s) => s.role)
  const setRole      = useFinanceStore((s) => s.setRole)
  const isDarkMode   = useFinanceStore((s) => s.isDarkMode)
  const toggleDark   = useFinanceStore((s) => s.toggleDarkMode)

  return (
    <header className="
      h-16 px-4 lg:px-6
      flex items-center justify-between
      bg-white dark:bg-gray-900
      border-b border-gray-100 dark:border-gray-800
      sticky top-0 z-10
    ">

      {/* ── Left: Hamburger + Page Title ── */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="font-semibold text-gray-900 dark:text-white text-base lg:text-lg">
            {pageTitle}
          </h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* ── Right: Controls ── */}
      <div className="flex items-center gap-2 lg:gap-3">

        {/* ── Role Switcher ── */}
        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          {/* Admin button */}
          <button
            onClick={() => setRole('admin')}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              transition-all duration-200
              ${role === 'admin'
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }
            `}
          >
            <Shield size={13} />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* Viewer button */}
          <button
            onClick={() => setRole('viewer')}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
              transition-all duration-200
              ${role === 'viewer'
                ? 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }
            `}
          >
            <Eye size={13} />
            <span className="hidden sm:inline">Viewer</span>
          </button>
        </div>

        {/* ── Role Badge (current role indicator) ── */}
        <Badge variant={role} className="hidden md:inline-flex">
          {role === 'admin' ? '● Admin' : '● Viewer'}
        </Badge>

        {/* ── Dark Mode Toggle ── */}
        <button
          onClick={toggleDark}
          className="
            w-9 h-9 rounded-xl flex items-center justify-center
            bg-gray-100 dark:bg-gray-800
            text-gray-500 dark:text-gray-400
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition-all duration-200
          "
          title="Toggle dark mode"
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  )
}