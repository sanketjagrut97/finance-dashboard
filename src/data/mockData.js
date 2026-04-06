// ============================================================
// MOCK DATA — This simulates what a real API would return
// ============================================================

// Categories with their display color and icon name (lucide-react)
export const CATEGORIES = {
    salary:       { label: 'Salary',       color: '#22c55e', bg: 'bg-green-100',  text: 'text-green-700',  icon: 'Briefcase'   },
    freelance:    { label: 'Freelance',    color: '#3b82f6', bg: 'bg-blue-100',   text: 'text-blue-700',   icon: 'Laptop'      },
    food:         { label: 'Food',         color: '#f97316', bg: 'bg-orange-100', text: 'text-orange-700', icon: 'UtensilsCrossed' },
    transport:    { label: 'Transport',    color: '#8b5cf6', bg: 'bg-purple-100', text: 'text-purple-700', icon: 'Car'         },
    shopping:     { label: 'Shopping',     color: '#ec4899', bg: 'bg-pink-100',   text: 'text-pink-700',   icon: 'ShoppingBag' },
    utilities:    { label: 'Utilities',    color: '#14b8a6', bg: 'bg-teal-100',   text: 'text-teal-700',   icon: 'Zap'         },
    health:       { label: 'Health',       color: '#ef4444', bg: 'bg-red-100',    text: 'text-red-700',    icon: 'Heart'       },
    investment:   { label: 'Investment',   color: '#f59e0b', bg: 'bg-amber-100',  text: 'text-amber-700',  icon: 'TrendingUp'  },
    rent:         { label: 'Rent',         color: '#6366f1', bg: 'bg-indigo-100', text: 'text-indigo-700', icon: 'Home'        },
    entertainment:{ label: 'Entertainment',color: '#06b6d4', bg: 'bg-cyan-100',   text: 'text-cyan-700',   icon: 'Tv'          },
  }
  
  // ---- Transactions (6 months of data) ----
  // Each transaction has: id, date, description, amount, category, type
  // type: 'income' | 'expense'
  export const INITIAL_TRANSACTIONS = [
  
    // ── JANUARY ──────────────────────────────────────────────
    { id: '1',  date: '2025-01-01', description: 'Monthly Salary',        amount: 85000, category: 'salary',        type: 'income'  },
    { id: '2',  date: '2025-01-03', description: 'Grocery Shopping',      amount: 4200,  category: 'food',           type: 'expense' },
    { id: '3',  date: '2025-01-05', description: 'Uber Rides',            amount: 1500,  category: 'transport',      type: 'expense' },
    { id: '4',  date: '2025-01-08', description: 'Netflix + Hotstar',     amount: 999,   category: 'entertainment',  type: 'expense' },
    { id: '5',  date: '2025-01-10', description: 'Freelance Project A',   amount: 25000, category: 'freelance',      type: 'income'  },
    { id: '6',  date: '2025-01-12', description: 'Electricity Bill',      amount: 2100,  category: 'utilities',      type: 'expense' },
    { id: '7',  date: '2025-01-15', description: 'House Rent',            amount: 18000, category: 'rent',           type: 'expense' },
    { id: '8',  date: '2025-01-18', description: 'Pharmacy',              amount: 850,   category: 'health',         type: 'expense' },
    { id: '9',  date: '2025-01-20', description: 'Mutual Fund SIP',       amount: 10000, category: 'investment',     type: 'expense' },
    { id: '10', date: '2025-01-25', description: 'Amazon Shopping',       amount: 3500,  category: 'shopping',       type: 'expense' },
  
    // ── FEBRUARY ─────────────────────────────────────────────
    { id: '11', date: '2025-02-01', description: 'Monthly Salary',        amount: 85000, category: 'salary',         type: 'income'  },
    { id: '12', date: '2025-02-04', description: 'Restaurant Dinner',     amount: 2800,  category: 'food',            type: 'expense' },
    { id: '13', date: '2025-02-06', description: 'Metro Card Recharge',   amount: 500,   category: 'transport',       type: 'expense' },
    { id: '14', date: '2025-02-10', description: 'Freelance Project B',   amount: 32000, category: 'freelance',       type: 'income'  },
    { id: '15', date: '2025-02-12', description: 'Water + Gas Bill',      amount: 1200,  category: 'utilities',       type: 'expense' },
    { id: '16', date: '2025-02-14', description: 'Valentine Gift',        amount: 4500,  category: 'shopping',        type: 'expense' },
    { id: '17', date: '2025-02-15', description: 'House Rent',            amount: 18000, category: 'rent',            type: 'expense' },
    { id: '18', date: '2025-02-18', description: 'Doctor Visit',          amount: 1500,  category: 'health',          type: 'expense' },
    { id: '19', date: '2025-02-20', description: 'Mutual Fund SIP',       amount: 10000, category: 'investment',      type: 'expense' },
    { id: '20', date: '2025-02-22', description: 'Movie Tickets',         amount: 800,   category: 'entertainment',   type: 'expense' },
    { id: '21', date: '2025-02-26', description: 'Zomato Orders',         amount: 1900,  category: 'food',            type: 'expense' },
  
    // ── MARCH ────────────────────────────────────────────────
    { id: '22', date: '2025-03-01', description: 'Monthly Salary',        amount: 85000, category: 'salary',          type: 'income'  },
    { id: '23', date: '2025-03-03', description: 'Grocery Shopping',      amount: 5100,  category: 'food',             type: 'expense' },
    { id: '24', date: '2025-03-07', description: 'Ola Cabs',              amount: 2200,  category: 'transport',        type: 'expense' },
    { id: '25', date: '2025-03-10', description: 'Freelance Project C',   amount: 18000, category: 'freelance',        type: 'income'  },
    { id: '26', date: '2025-03-12', description: 'Electricity Bill',      amount: 2500,  category: 'utilities',        type: 'expense' },
    { id: '27', date: '2025-03-14', description: 'Myntra Shopping',       amount: 6200,  category: 'shopping',         type: 'expense' },
    { id: '28', date: '2025-03-15', description: 'House Rent',            amount: 18000, category: 'rent',             type: 'expense' },
    { id: '29', date: '2025-03-19', description: 'Gym Membership',        amount: 2000,  category: 'health',           type: 'expense' },
    { id: '30', date: '2025-03-20', description: 'Mutual Fund SIP',       amount: 10000, category: 'investment',       type: 'expense' },
    { id: '31', date: '2025-03-24', description: 'Concert Tickets',       amount: 3500,  category: 'entertainment',    type: 'expense' },
    { id: '32', date: '2025-03-28', description: 'Bonus',                 amount: 20000, category: 'salary',           type: 'income'  },
  
    // ── APRIL ────────────────────────────────────────────────
    { id: '33', date: '2025-04-01', description: 'Monthly Salary',        amount: 85000, category: 'salary',           type: 'income'  },
    { id: '34', date: '2025-04-02', description: 'Swiggy Orders',         amount: 3100,  category: 'food',              type: 'expense' },
    { id: '35', date: '2025-04-05', description: 'Petrol',                amount: 3000,  category: 'transport',         type: 'expense' },
    { id: '36', date: '2025-04-08', description: 'Freelance Project D',   amount: 40000, category: 'freelance',         type: 'income'  },
    { id: '37', date: '2025-04-11', description: 'Internet Bill',         amount: 999,   category: 'utilities',         type: 'expense' },
    { id: '38', date: '2025-04-13', description: 'Flipkart Sale',         amount: 8500,  category: 'shopping',          type: 'expense' },
    { id: '39', date: '2025-04-15', description: 'House Rent',            amount: 18000, category: 'rent',              type: 'expense' },
    { id: '40', date: '2025-04-17', description: 'Health Insurance',      amount: 5000,  category: 'health',            type: 'expense' },
    { id: '41', date: '2025-04-20', description: 'Mutual Fund SIP',       amount: 10000, category: 'investment',        type: 'expense' },
    { id: '42', date: '2025-04-25', description: 'IPL Match Tickets',     amount: 4200,  category: 'entertainment',     type: 'expense' },
  
    // ── MAY ──────────────────────────────────────────────────
    { id: '43', date: '2025-05-01', description: 'Monthly Salary',        amount: 85000, category: 'salary',            type: 'income'  },
    { id: '44', date: '2025-05-03', description: 'Grocery Shopping',      amount: 4700,  category: 'food',               type: 'expense' },
    { id: '45', date: '2025-05-06', description: 'Auto Rickshaw',         amount: 800,   category: 'transport',          type: 'expense' },
    { id: '46', date: '2025-05-09', description: 'Freelance Project E',   amount: 28000, category: 'freelance',          type: 'income'  },
    { id: '47', date: '2025-05-11', description: 'Electricity Bill',      amount: 3200,  category: 'utilities',          type: 'expense' },
    { id: '48', date: '2025-05-13', description: 'Meesho Shopping',       amount: 2100,  category: 'shopping',           type: 'expense' },
    { id: '49', date: '2025-05-15', description: 'House Rent',            amount: 18000, category: 'rent',               type: 'expense' },
    { id: '50', date: '2025-05-18', description: 'Dentist',               amount: 3500,  category: 'health',             type: 'expense' },
    { id: '51', date: '2025-05-20', description: 'Mutual Fund SIP',       amount: 10000, category: 'investment',         type: 'expense' },
    { id: '52', date: '2025-05-23', description: 'Spotify + YouTube',     amount: 399,   category: 'entertainment',      type: 'expense' },
    { id: '53', date: '2025-05-27', description: 'Side Project Income',   amount: 15000, category: 'freelance',          type: 'income'  },
  
    // ── JUNE ─────────────────────────────────────────────────
    { id: '54', date: '2025-06-01', description: 'Monthly Salary',        amount: 85000, category: 'salary',             type: 'income'  },
    { id: '55', date: '2025-06-03', description: 'Zomato + Swiggy',       amount: 5500,  category: 'food',                type: 'expense' },
    { id: '56', date: '2025-06-05', description: 'Rapido Rides',          amount: 1100,  category: 'transport',           type: 'expense' },
    { id: '57', date: '2025-06-08', description: 'Freelance Project F',   amount: 35000, category: 'freelance',           type: 'income'  },
    { id: '58', date: '2025-06-10', description: 'Water + Electricity',   amount: 2800,  category: 'utilities',           type: 'expense' },
    { id: '59', date: '2025-06-12', description: 'New Clothes',           amount: 7200,  category: 'shopping',            type: 'expense' },
    { id: '60', date: '2025-06-15', description: 'House Rent',            amount: 18000, category: 'rent',                type: 'expense' },
    { id: '61', date: '2025-06-17', description: 'Pharmacy',              amount: 650,   category: 'health',              type: 'expense' },
    { id: '62', date: '2025-06-20', description: 'Mutual Fund SIP',       amount: 10000, category: 'investment',          type: 'expense' },
    { id: '63', date: '2025-06-24', description: 'Gaming Subscription',   amount: 999,   category: 'entertainment',       type: 'expense' },
    { id: '64', date: '2025-06-28', description: 'Referral Bonus',        amount: 5000,  category: 'salary',              type: 'income'  },
  ]