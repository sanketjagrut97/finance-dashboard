{/*devloped by Sanket*/}
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard    from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights     from './pages/Insights'

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Each Route maps a URL path to a Page component */}
        <Route path="/"             element={<Dashboard />}    />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/insights"     element={<Insights />}     />

        {/* Any unknown URL → redirect home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}