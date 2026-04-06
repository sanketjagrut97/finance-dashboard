import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import useWindowSize from '../../hooks/useWindowSize'

const PAGE_TITLES = {
  '/':             'Dashboard',
  '/transactions': 'Transactions',
  '/insights':     'Insights',
}

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location  = useLocation()
  const { isDesktop } = useWindowSize()

  // Auto-close mobile sidebar when screen becomes desktop
  useEffect(() => {
    if (isDesktop) setSidebarOpen(false)
  }, [isDesktop])

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const pageTitle = PAGE_TITLES[location.pathname] ?? 'FinanceIQ'

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          pageTitle={pageTitle}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-thin">
          <div className="animate-fade-in max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}