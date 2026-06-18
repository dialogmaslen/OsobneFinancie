import { useState, useEffect } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Categories from './pages/Categories'
import Budget from './pages/Budget'
import Login from './pages/Login'
import { transactions as initialTransactions, type Transaction } from './data/mockData'
import { supabase } from './lib/supabase'
import type { User } from '@supabase/supabase-js'

export type Page = 'dashboard' | 'transactions' | 'categories' | 'budget'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F5F3FF' }}>
        <div style={{ fontSize: 14, color: '#7C3AED' }}>Načítavam...</div>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard transactions={transactions} />
      case 'transactions': return <Transactions transactions={transactions} setTransactions={setTransactions} />
      case 'categories': return <Categories transactions={transactions} />
      case 'budget': return <Budget transactions={transactions} />
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} user={user} />
      <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        {renderPage()}
      </main>
    </div>
  )
}

export default App
