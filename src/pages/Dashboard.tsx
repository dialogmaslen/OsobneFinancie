import { useState } from 'react'
import { TrendingUp, TrendingDown, Wallet, PiggyBank, X } from 'lucide-react'
import { categories, type Transaction } from '../data/mockData'

function StatCard({ label, value, sub, icon: Icon, color }: {
  label: string
  value: string
  sub?: string
  icon: React.ElementType
  color: string
}) {
  return (
    <div className="glass-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#1a1a2e', marginTop: 4 }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{sub}</div>}
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: color + '18',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon size={20} color={color} />
        </div>
      </div>
    </div>
  )
}

interface Props {
  transactions: Transaction[]
}

export default function Dashboard({ transactions }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0)
  const balance = income - expenses

  const spendingByCategory = categories.map(cat => {
    const spent = transactions
      .filter(t => t.category === cat.id)
      .reduce((s, t) => s + Math.abs(t.amount), 0)
    return { ...cat, spent }
  })

  const recentTransactions = transactions.slice(0, 5)
  const fmt = (n: number) => Math.abs(n).toFixed(2).replace('.', ',') + ' €'

  const selectedCategory = categories.find(c => c.id === selectedCategoryId)
  const categoryTransactions = selectedCategoryId
    ? transactions.filter(t => t.category === selectedCategoryId)
    : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1a1a2e' }}>Prehľad</h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: '#64748b' }}>Jún 2026</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <StatCard label="Zostatok" value={fmt(balance)} sub="tento mesiac" icon={Wallet} color="#7C3AED" />
        <StatCard label="Príjmy" value={fmt(income)} sub="tento mesiac" icon={TrendingUp} color="#059669" />
        <StatCard label="Výdavky" value={fmt(expenses)} sub="tento mesiac" icon={TrendingDown} color="#DC2626" />
        <StatCard label="Ušetrené" value={fmt(Math.max(0, income - expenses))} sub="zostatok" icon={PiggyBank} color="#2563EB" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="glass-card" style={{ padding: 24 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#1a1a2e' }}>Výdavky podľa kategórií</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {spendingByCategory.filter(c => c.spent > 0).map(cat => {
              const isSelected = selectedCategoryId === cat.id
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(isSelected ? null : cat.id)}
                  style={{
                    cursor: 'pointer',
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: isSelected ? cat.color + '12' : 'transparent',
                    border: isSelected ? `1.5px solid ${cat.color}40` : '1.5px solid transparent',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: '#334155', fontWeight: isSelected ? 600 : 400 }}>
                      {cat.emoji} {cat.name}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{fmt(cat.spent)}</span>
                  </div>
                  <div style={{ height: 6, background: '#f1f5f9', borderRadius: 999 }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min(100, (cat.spent / cat.budget) * 100)}%`,
                      background: cat.spent > cat.budget ? '#DC2626' : cat.color,
                      borderRadius: 999,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
                    {fmt(cat.spent)} / {fmt(cat.budget)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {selectedCategory ? (
          <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: '#1a1a2e' }}>
                {selectedCategory.emoji} {selectedCategory.name}
              </h2>
              <button
                onClick={() => setSelectedCategoryId(null)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#94a3b8', padding: 4, borderRadius: 6, display: 'flex'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {categoryTransactions.length === 0 ? (
              <div style={{ color: '#94a3b8', fontSize: 14, textAlign: 'center', paddingTop: 24 }}>
                Žiadne transakcie v tejto kategórii
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {categoryTransactions.map(t => (
                  <div key={t.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 8px',
                    borderBottom: '1px solid #f1f5f9'
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a2e' }}>{t.description}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{t.date}</div>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#DC2626' }}>
                      -{fmt(t.amount)}
                    </span>
                  </div>
                ))}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '12px 8px 0',
                  borderTop: `2px solid ${selectedCategory.color}30`,
                  marginTop: 4
                }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Spolu</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: selectedCategory.color }}>
                    {fmt(categoryTransactions.reduce((s, t) => s + Math.abs(t.amount), 0))}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card" style={{ padding: 24 }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: '#1a1a2e' }}>Posledné transakcie</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentTransactions.map(t => {
                const cat = categories.find(c => c.id === t.category)
                return (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: (cat?.color || '#7C3AED') + '18',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 16
                      }}>
                        {cat?.emoji || '💰'}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a2e' }}>{t.description}</div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>{t.date}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: t.type === 'income' ? '#059669' : '#DC2626' }}>
                      {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
