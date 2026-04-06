// FiltersBar — search box + dropdowns + reset button

import { Search, X, SlidersHorizontal } from 'lucide-react'
import { CATEGORIES } from '../../data/mockData'
import useFinanceStore from '../../store/useFinanceStore'

export default function FiltersBar() {
  const filters      = useFinanceStore((s) => s.filters)
  const setFilter    = useFinanceStore((s) => s.setFilter)
  const resetFilters = useFinanceStore((s) => s.resetFilters)

  // Check if any filter is active (to show reset button)
  const isFiltered = filters.search || filters.type !== 'all' ||
                     filters.category !== 'all' || filters.dateFrom || filters.dateTo

  return (
    <div className="card p-4">
      <div className="flex flex-col sm:flex-row gap-3">

        {/* ── Search Box ── */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
            placeholder="Search transactions..."
            className="input pl-9 pr-8"
          />
          {/* Clear search button */}
          {filters.search && (
            <button
              onClick={() => setFilter('search', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400
                         hover:text-gray-600 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* ── Filter Controls Row ── */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Type filter */}
          <select
            value={filters.type}
            onChange={(e) => setFilter('type', e.target.value)}
            className="input w-auto text-xs py-2 cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category filter */}
          <select
            value={filters.category}
            onChange={(e) => setFilter('category', e.target.value)}
            className="input w-auto text-xs py-2 cursor-pointer"
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <option key={key} value={key}>{cat.label}</option>
            ))}
          </select>

          {/* Date From */}
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilter('dateFrom', e.target.value)}
            className="input w-auto text-xs py-2 cursor-pointer"
            title="From date"
          />

          {/* Date To */}
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilter('dateTo', e.target.value)}
            className="input w-auto text-xs py-2 cursor-pointer"
            title="To date"
          />

          {/* Reset filters button — only shows when filters are active */}
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600
                         dark:text-red-400 font-medium px-2 py-2 rounded-lg
                         hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <X size={13} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* ── Active filter summary ── */}
      {isFiltered && (
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <SlidersHorizontal size={12} className="text-gray-400" />
          <span className="text-xs text-gray-400 dark:text-gray-500">Filters active:</span>
          {filters.search    && <Chip label={`"${filters.search}"`}    onRemove={() => setFilter('search', '')} />}
          {filters.type !== 'all'     && <Chip label={filters.type}     onRemove={() => setFilter('type', 'all')} />}
          {filters.category !== 'all' && <Chip label={CATEGORIES[filters.category]?.label} onRemove={() => setFilter('category', 'all')} />}
          {filters.dateFrom  && <Chip label={`From ${filters.dateFrom}`} onRemove={() => setFilter('dateFrom', '')} />}
          {filters.dateTo    && <Chip label={`To ${filters.dateTo}`}     onRemove={() => setFilter('dateTo', '')} />}
        </div>
      )}
    </div>
  )
}

// Small removable chip tag
function Chip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                     bg-primary-50 dark:bg-primary-900/20
                     text-primary-600 dark:text-primary-400 text-xs font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-primary-800 transition-colors">
        <X size={10} />
      </button>
    </span>
  )
}