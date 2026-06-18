import { useState } from 'react'
import './index.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Categories from './pages/Categories'
import Budget from './pages/Budget'
import { transactions as initialTransactions, type Transaction } from './data/mockData'

export type Page = 'dashboard' | 'transactions' | 'categories' | 'budget'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard')
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)

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
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
        {renderPage()}
      </main>
    </div>
  )
}

export default App
