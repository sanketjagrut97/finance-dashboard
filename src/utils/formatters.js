// ============================================================
// FORMATTERS — Helper functions used everywhere in the app
// ============================================================

// Format a number as Indian Rupees
// e.g. 85000 → '₹85,000'
export const formatCurrency = (amount, compact = false) => {
    if (compact && amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`   // e.g. ₹1.2L
    }
    if (compact && amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`      // e.g. ₹85K
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }
  
  // Format a date string
  // e.g. '2025-01-15' → '15 Jan 2025'
  export const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day:   '2-digit',
      month: 'short',
      year:  'numeric',
    })
  }
  
  // Format a date string to short form
  // e.g. '2025-01-15' → 'Jan 15'
  export const formatDateShort = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day:   '2-digit',
      month: 'short',
    })
  }
  
  // Get month label from YYYY-MM key
  // e.g. '2025-01' → 'January 2025'
  export const formatMonthKey = (key) => {
    return new Date(key + '-01').toLocaleDateString('en-IN', {
      month: 'long',
      year:  'numeric',
    })
  }
  
  // Calculate percentage change between two numbers
  // e.g. (100, 80) → '+25.0%'
  export const formatPercentChange = (current, previous) => {
    if (!previous || previous === 0) return null
    const change = ((current - previous) / previous) * 100
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}%`
  }
  
  // Clamp a number between min and max
  export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)