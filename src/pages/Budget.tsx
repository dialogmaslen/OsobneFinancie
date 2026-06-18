import { categories, type Transaction } from '../data/mockData'

interface Props {
  transactions: Transaction[]
}

export default function Budget({ transactions }: Props) {
  const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €'

  const totalBudget = categories.reduce((s, c) => s + c.budget, 0)
  const totalSpent = categories.reduce((s, cat) => {
    return s + transactions.filter(t => t.category === cat.id).reduce((a, t) => a + Math.abs(t.amount), 0)
  }, 0)
  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1a1a2e' }}>Rozpočet</h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: '#64748b' }}>Mesačný prehľad — Jún 2026</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { label: 'Celkový príjem', value: fmt(income), color: '#059669' },
          { label: 'Plánované výdavky', value: fmt(totalBudget), color: '#7C3AED' },
          { label: 'Skutočné výdavky', value: fmt(totalSpent), color: totalSpent > totalBudget ? '#DC2626' : '#334155' },
        ].map(item => (
          <div key={item.label} className="glass-card" style={{ padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>{item.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: item.color }}>{item.value}</div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: 24 }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600, color: '#1a1a2e' }}>Porovnanie plán vs. skutočnosť</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {categories.map(cat => {
            const spent = transactions.filter(t => t.category === cat.id).reduce((s, t) => s + Math.abs(t.amount), 0)
            const over = spent > cat.budget
            return (
              <div key={cat.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>{cat.emoji} {cat.name}</span>
                  <span style={{ fontSize: 13, color: '#64748b' }}>
                    <strong style={{ color: over ? '#DC2626' : '#334155' }}>{fmt(spent)}</strong> / {fmt(cat.budget)}
                  </span>
                </div>
                <div style={{ position: 'relative', height: 10, background: '#f1f5f9', borderRadius: 999 }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    height: '100%',
                    width: `${Math.min(100, (spent / cat.budget) * 100)}%`,
                    background: over ? '#DC2626' : cat.color,
                    borderRadius: 999,
                  }} />
                  <div style={{
                    position: 'absolute', top: -2, left: '100%',
                    width: 2, height: 14, background: '#cbd5e1',
                    transform: 'translateX(-2px)'
                  }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
