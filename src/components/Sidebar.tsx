import { LayoutDashboard, ArrowLeftRight, Tag, PiggyBank, Wallet, LogOut } from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import type { Page } from '../App'
import { supabase } from '../lib/supabase'

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  user: User
}

const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Prehľad', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transakcie', icon: ArrowLeftRight },
  { id: 'categories', label: 'Kategórie', icon: Tag },
  { id: 'budget', label: 'Rozpočet', icon: PiggyBank },
]

export default function Sidebar({ currentPage, onNavigate, user }: SidebarProps) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const name = user.user_metadata?.full_name || user.email || 'Používateľ'
  const avatar = user.user_metadata?.avatar_url

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

      <div style={{ marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', marginBottom: 8 }}>
          {avatar
            ? <img src={avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%' }} />
            : <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7C3AED22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#7C3AED', fontWeight: 600 }}>
                {name[0].toUpperCase()}
              </div>
          }
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>ČSOB</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
            background: 'transparent', color: '#94a3b8', fontSize: 13,
            transition: 'all 0.15s ease',
          }}
        >
          <LogOut size={15} />
          Odhlásiť sa
        </button>
      </div>
    </aside>
  )
}
