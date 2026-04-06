// Simple CSS tooltip wrapper
// Usage: <Tooltip text="Delete transaction"><button>🗑</button></Tooltip>

export default function Tooltip({ children, text }) {
    return (
      <div className="relative group inline-flex">
        {children}
        <div className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2
          px-2 py-1 text-xs rounded bg-gray-800 text-white
          whitespace-nowrap opacity-0 group-hover:opacity-100
          pointer-events-none transition-opacity duration-200 z-50
        ">
          {text}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      </div>
    )
  }