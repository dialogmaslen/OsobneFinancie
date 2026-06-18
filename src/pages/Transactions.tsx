import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { categories, type Transaction } from '../data/mockData'

interface Props {
  transactions: Transaction[]
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
}

export default function Transactions({ transactions, setTransactions }: Props) {
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ description: '', amount: '', category: 'potraviny', type: 'expense' as 'income' | 'expense', date: new Date().toISOString().split('T')[0] })

  const filtered = transactions.filter(t =>
    t.description.toLowerCase().includes(search.toLowerCase())
  )

  const fmt = (n: number) => Math.abs(n).toFixed(2).replace('.', ',') + ' €'

  const handleAdd = () => {
    if (!form.description || !form.amount) return
    const newT: Transaction = {
      id: Date.now().toString(),
      date: form.date,
      description: form.description,
      amount: form.type === 'expense' ? -Math.abs(Number(form.amount)) : Math.abs(Number(form.amount)),
      category: form.category,
      type: form.type,
    }
    setTransactions(prev => [newT, ...prev])
    setShowForm(false)
    setForm({ description: '', amount: '', category: 'potraviny', type: 'expense', date: new Date().toISOString().split('T')[0] })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1a1a2e' }}>Transakcie</h1>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: '#64748b' }}>{filtered.length} záznamov</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
            color: 'white', fontWeight: 600, fontSize: 14
          }}
        >
          <Plus size={16} /> Pridať transakciu
        </button>
      </div>

      {showForm && (
        <div className="glass-card" style={{ padding: 24 }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: '#1a1a2e' }}>Nová transakcia</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <input
              placeholder="Popis"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none' }}
            />
            <input
              placeholder="Suma (€)"
              type="number"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })}
              style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none' }}
            />
            <input
              type="date"
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
              style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none' }}
            />
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none' }}
            >
              {categories.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
            </select>
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value as 'income' | 'expense' })}
              style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none' }}
            >
              <option value="expense">Výdavok</option>
              <option value="income">Príjem</option>
            </select>
            <button
              onClick={handleAdd}
              style={{
                padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: '#7C3AED', color: 'white', fontWeight: 600, fontSize: 14
              }}
            >
              Uložiť
            </button>
          </div>
        </div>
      )}

      <div className="glass-card" style={{ padding: 24 }}>
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            placeholder="Hľadať transakcie..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 14px 10px 36px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filtered.map(t => {
            const cat = categories.find(c => c.id === t.category)
            return (
              <div key={t.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 8px', borderRadius: 8,
                borderBottom: '1px solid #f1f5f9'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: (cat?.color || '#7C3AED') + '18',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17
                  }}>
                    {cat?.emoji || '💰'}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a2e' }}>{t.description}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{t.date} · {cat?.name || 'Príjem'}</div>
                  </div>
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: t.type === 'income' ? '#059669' : '#DC2626' }}>
                  {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
