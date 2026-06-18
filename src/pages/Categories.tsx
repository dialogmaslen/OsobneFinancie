import { categories, type Transaction } from '../data/mockData'

interface Props {
  transactions: Transaction[]
}

export default function Categories({ transactions }: Props) {
  const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €'

  const data = categories.map(cat => {
    const spent = transactions
      .filter(t => t.category === cat.id)
      .reduce((s, t) => s + Math.abs(t.amount), 0)
    const pct = Math.min(100, (spent / cat.budget) * 100)
    const over = spent > cat.budget
    return { ...cat, spent, pct, over }
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#1a1a2e' }}>Kategórie</h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: '#64748b' }}>Mesačné limity a čerpanie</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {data.map(cat => (
          <div key={cat.id} className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: cat.color + '18',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22
              }}>
                {cat.emoji}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a2e' }}>{cat.name}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>Limit: {fmt(cat.budget)}</div>
              </div>
            </div>

            <div style={{ height: 8, background: '#f1f5f9', borderRadius: 999, marginBottom: 8 }}>
              <div style={{
                height: '100%',
                width: `${cat.pct}%`,
                background: cat.over ? '#DC2626' : cat.color,
                borderRadius: 999,
              }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: cat.over ? '#DC2626' : '#334155' }}>
                {fmt(cat.spent)}
              </span>
              <span style={{ fontSize: 12, color: cat.over ? '#DC2626' : '#94a3b8' }}>
                {cat.over ? `Prekročené o ${fmt(cat.spent - cat.budget)}` : `Zostatok: ${fmt(cat.budget - cat.spent)}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
