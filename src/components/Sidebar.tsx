import { LayoutDashboard, ArrowLeftRight, Tag, PiggyBank, Wallet } from 'lucide-react'
import type { Page } from '../App'

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Prehľad', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transakcie', icon: ArrowLeftRight },
  { id: 'categories', label: 'Kategórie', icon: Tag },
  { id: 'budget', label: 'Rozpočet', icon: PiggyBank },
]

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside
      className="glass-sidebar"
      style={{ width: 240, display: 'flex', flexDirection: 'column', padding: '24px 16px', gap: 8, position: 'sticky', top: 0, height: '100vh' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', marginBottom: 24 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Wallet size={18} color="white" />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>Osobné</div>
          <div style={{ fontWeight: 400, fontSize: 13, color: '#7C3AED' }}>Financie</div>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = currentPage === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: active ? 'linear-gradient(135deg, #7C3AED15, #A78BFA20)' : 'transparent',
                color: active ? '#7C3AED' : '#64748b',
                fontWeight: active ? 600 : 400,
                fontSize: 14,
                transition: 'all 0.15s ease',
                borderLeft: active ? '3px solid #7C3AED' : '3px solid transparent',
              }}
            >
              <Icon size={18} />
              {label}
            </button>
          )
        })}
      </nav>

      <div style={{ marginTop: 'auto', padding: '12px 14px' }}>
        <div style={{ fontSize: 12, color: '#94a3b8' }}>Banka</div>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#334155' }}>ČSOB</div>
      </div>
    </aside>
  )
}
