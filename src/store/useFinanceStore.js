// ============================================================
// ZUSTAND STORE — Single source of truth for entire app
// ============================================================
// Think of this like a smart box that:
//   1. Holds all your data (transactions, role, filters)
//   2. Lets any component READ the data
//   3. Lets any component UPDATE the data
//   4. Automatically saves to localStorage
// ============================================================

import { create } from 'zustand'
import { persist } from 'zustand/middleware'   // ← auto saves to localStorage!
import { INITIAL_TRANSACTIONS } from '../data/mockData'

// Helper: generate a unique ID for new transactions
const generateId = () => `txn_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

const useFinanceStore = create(
  // 'persist' wraps our store so it auto-saves to localStorage
  persist(
    (set, get) => ({

      // ── 1. ROLE ─────────────────────────────────────────
      // 'admin' can add/edit/delete | 'viewer' is read-only
      role: 'admin',
      setRole: (role) => set({ role }),

      // ── 2. DARK MODE ────────────────────────────────────
      isDarkMode: false,
      toggleDarkMode: () => {
        const next = !get().isDarkMode
        // Add/remove 'dark' class on <html> element
        document.documentElement.classList.toggle('dark', next)
        set({ isDarkMode: next })
      },

      // ── 3. TRANSACTIONS ─────────────────────────────────
      transactions: INITIAL_TRANSACTIONS,

      // ADD a new transaction (admin only, enforced in UI)
      addTransaction: (txn) =>
        set((state) => ({
          transactions: [
            { ...txn, id: generateId() },  // attach new ID
            ...state.transactions,          // keep existing ones
          ],
        })),

      // EDIT an existing transaction by ID
      updateTransaction: (id, updatedData) =>
        set((state) => ({
          transactions: state.transactions.map((txn) =>
            txn.id === id ? { ...txn, ...updatedData } : txn
          ),
        })),

      // DELETE a transaction by ID
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((txn) => txn.id !== id),
        })),

      // RESET back to initial mock data
      resetTransactions: () => set({ transactions: INITIAL_TRANSACTIONS }),

      // ── 4. FILTERS ──────────────────────────────────────
      // These control what's shown in the Transactions table
      filters: {
        search:    '',          // text search
        type:      'all',       // 'all' | 'income' | 'expense'
        category:  'all',       // any category key or 'all'
        sortBy:    'date',      // 'date' | 'amount' | 'description'
        sortOrder: 'desc',      // 'asc' | 'desc'
        dateFrom:  '',          // YYYY-MM-DD
        dateTo:    '',          // YYYY-MM-DD
      },

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),

      resetFilters: () =>
        set({
          filters: {
            search: '', type: 'all', category: 'all',
            sortBy: 'date', sortOrder: 'desc', dateFrom: '', dateTo: '',
          },
        }),

      // ── 5. COMPUTED: FILTERED TRANSACTIONS ──────────────
      // This is a "derived" value — it reads transactions + filters
      // and returns only what should be shown in the table
      getFilteredTransactions: () => {
        const { transactions, filters } = get()
        let result = [...transactions]

        // Text search (description)
        if (filters.search) {
          const q = filters.search.toLowerCase()
          result = result.filter((t) =>
            t.description.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q)
          )
        }

        // Filter by type
        if (filters.type !== 'all') {
          result = result.filter((t) => t.type === filters.type)
        }

        // Filter by category
        if (filters.category !== 'all') {
          result = result.filter((t) => t.category === filters.category)
        }

        // Date range filter
        if (filters.dateFrom) {
          result = result.filter((t) => t.date >= filters.dateFrom)
        }
        if (filters.dateTo) {
          result = result.filter((t) => t.date <= filters.dateTo)
        }

        // Sorting
        result.sort((a, b) => {
          let valA = a[filters.sortBy]
          let valB = b[filters.sortBy]

          // For amounts, compare numbers. For others, compare strings.
          if (filters.sortBy === 'amount') {
            valA = Number(valA)
            valB = Number(valB)
          } else {
            valA = valA?.toString().toLowerCase() ?? ''
            valB = valB?.toString().toLowerCase() ?? ''
          }

          if (valA < valB) return filters.sortOrder === 'asc' ? -1 : 1
          if (valA > valB) return filters.sortOrder === 'asc' ? 1 : -1
          return 0
        })

        return result
      },

      // ── 6. COMPUTED: SUMMARY STATS ──────────────────────
      // Returns totals: balance, income, expenses
      getSummary: () => {
        const { transactions } = get()
        const income   = transactions.filter(t => t.type === 'income') .reduce((s, t) => s + t.amount, 0)
        const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
        return {
          income,
          expenses,
          balance: income - expenses,
        }
      },

      // ── 7. COMPUTED: MONTHLY DATA (for Balance Trend chart) ─
      getMonthlyData: () => {
        const { transactions } = get()
        const monthly = {}

        transactions.forEach((t) => {
          // e.g. '2025-01-15' → 'Jan 2025'
          const [year, month] = t.date.split('-')
          const key = `${year}-${month}`
          if (!monthly[key]) {
            monthly[key] = { month: key, income: 0, expenses: 0, balance: 0 }
          }
          if (t.type === 'income')  monthly[key].income   += t.amount
          if (t.type === 'expense') monthly[key].expenses += t.amount
        })

        // Sort by date and calculate running balance
        return Object.values(monthly)
          .sort((a, b) => a.month.localeCompare(b.month))
          .map((m) => ({
            ...m,
            balance: m.income - m.expenses,
            // Format: '2025-01' → 'Jan'
            label: new Date(m.month + '-01').toLocaleString('default', { month: 'short' }),
          }))
      },

      // ── 8. COMPUTED: CATEGORY BREAKDOWN (for Pie chart) ──
      getCategoryBreakdown: () => {
        const { transactions } = get()
        const breakdown = {}

        transactions
          .filter((t) => t.type === 'expense')
          .forEach((t) => {
            if (!breakdown[t.category]) {
              breakdown[t.category] = { category: t.category, total: 0, count: 0 }
            }
            breakdown[t.category].total += t.amount
            breakdown[t.category].count += 1
          })

        return Object.values(breakdown).sort((a, b) => b.total - a.total)
      },

    }),

    // persist config: save under this localStorage key
    {
      name: 'finance-dashboard-store',
      // Only persist these fields (not computed functions)
      partialize: (state) => ({
        transactions: state.transactions,
        role:         state.role,
        isDarkMode:   state.isDarkMode,
      }),
      // After loading from localStorage, re-apply dark mode class
      onRehydrateStorage: () => (state) => {
        if (state?.isDarkMode) {
          document.documentElement.classList.add('dark')
        }
      },
    }
  )
)

export default useFinanceStore