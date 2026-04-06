# FinanceIQ — Personal Finance Dashboard

Live Demo: https://finance-dashboard-flame-mu.vercel.app/

A modern, production-quality Finance Dashboard built with React, featuring
role-based access control, interactive charts, smart insights, and full
CRUD transaction management.

![FinanceIQ Dashboard](https://finance-dashboard-flame-mu.vercel.app/)

---

## Features

**Dashboard Overview**
- Summary cards: Total Balance, Income, Expenses with month-over-month % change
- Quick stats row: this month's income/expenses, top category, avg transaction
- Balance Trend area chart (income vs expenses over 6 months)
- Expense Breakdown donut chart with category legend
- Recent Transactions list with one-click navigation

**Transactions**
- Full data table: Date, Description, Category, Type, Amount
- Live search across description and category
- Multi-filter: Type, Category, Date range
- Active filter chips with individual remove buttons
- Column sorting (Date, Description, Amount) with direction toggle
- Export filtered data as CSV

**Role-Based Access**
- Admin: full CRUD — add, edit, delete transactions via modal forms
- Viewer: read-only — all edit controls hidden automatically
- Role persists across page refresh via localStorage

**Insights**
- 4 stat cards: Top Category, Avg Monthly Savings, Savings Rate, Best Month
- Monthly comparison bar chart (income vs expenses)
- 5 auto-generated smart insight cards (savings rate, expense trend, top category, income consistency, best month)
- Category deep dive table with rank, transaction count, total, average, and share bar

**UX & Design**
- Dark mode with system preference detection and no flash on load
- Fully responsive (mobile sidebar, tablet, desktop layouts)
- Smooth animations (fade-in, slide-up)
- Empty states for all list/table views
- Keyboard accessible (Escape to close modals)
- LocalStorage persistence for transactions, role, and theme

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Vite) |
| Styling | Tailwind CSS v3 |
| Charts | Recharts |
| State | Zustand + persist middleware |
| Routing | React Router v6 |
| Icons | Lucide React |
| Utilities | clsx, date-fns |

---

## Project Structure
```
src/
├── components/
│   ├── dashboard/       # SummaryCard, BalanceChart, ExpenseBreakdown, RecentTransactions, StatsRow
│   ├── insights/        # InsightStatCard, MonthlyComparisonChart, SmartInsights, CategoryTable
│   ├── layout/          # Layout, Sidebar, Topbar
│   ├── transactions/    # TransactionTable, TransactionModal, DeleteModal, FiltersBar
│   └── ui/              # Button, Badge, EmptyState, Tooltip, Spinner
├── data/
│   └── mockData.js      # 64 transactions across 6 months, 10 categories
├── hooks/
│   └── useWindowSize.js
├── pages/
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   └── Insights.jsx
├── store/
│   └── useFinanceStore.js   # Zustand store — all state + computed selectors
└── utils/
    └── formatters.js        # Currency, date, percentage formatters
```

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm 9+ installed

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/finance-dashboard.git

# 2. Navigate into the project
cd finance-dashboard

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open in browser
# → http://localhost:5173
```

### Build for Production
```bash
npm run build      # builds to /dist
npm run preview    # preview the production build locally
```

---

## Usage Guide

| Action | How |
|---|---|
| Switch role | Topbar → Admin / Viewer toggle |
| Toggle dark mode | Topbar → moon/sun icon |
| Add transaction | Transactions page → Add Transaction (Admin only) |
| Edit transaction | Hover any row → pencil icon (Admin only) |
| Delete transaction | Hover any row → trash icon → confirm (Admin only) |
| Filter transactions | Transactions page → search box + dropdowns |
| Export data | Transactions page → Export CSV button |
| View insights | Insights page → auto-generated from your data |

---

## Design Decisions

- **Zustand over Redux** — simpler API for this scale, built-in persist middleware
- **Recharts over Chart.js** — React-native components, easier to customize tooltips
- **Tailwind utility classes** — no context switching between CSS files and JSX
- **`partialize` in persist** — only serializable state saved to localStorage, not functions
- **Role enforced in UI** — not in routes, to simulate a realistic frontend-only RBAC pattern
- **Indian locale formatting** — `en-IN` for currency and dates, showing localization awareness

---

## Author

**Sanket Jagrut**
- GitHub: [sanketjagrut97](https://github.com/sanketjagrut97)
- LinkedIn: [Sanket Jagrut](https://www.linkedin.com/in/sanket-jagrut-0853b0206/)

---

*Built as part of a frontend internship assignment *
