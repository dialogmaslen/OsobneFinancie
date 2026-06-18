export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  category: string
  type: 'income' | 'expense'
}

export interface Category {
  id: string
  name: string
  emoji: string
  budget: number
  color: string
}

export const categories: Category[] = [
  { id: 'byvanie', name: 'Bývanie', emoji: '🏠', budget: 600, color: '#7C3AED' },
  { id: 'doprava', name: 'Doprava', emoji: '🚗', budget: 150, color: '#2563EB' },
  { id: 'potraviny', name: 'Potraviny a domácnosť', emoji: '🛒', budget: 300, color: '#059669' },
  { id: 'volny-cas', name: 'Voľný čas a zábava', emoji: '🎮', budget: 100, color: '#D97706' },
  { id: 'oblecenie', name: 'Oblečenie a móda', emoji: '👕', budget: 80, color: '#DC2626' },
  { id: 'predplatne', name: 'Predplatné a softvér', emoji: '📱', budget: 50, color: '#7C3AED' },
]

export const transactions: Transaction[] = [
  { id: '1', date: '2026-06-18', description: 'Nájom jún', amount: -550, category: 'byvanie', type: 'expense' },
  { id: '2', date: '2026-06-17', description: 'Plat jún', amount: 1800, category: 'prijem', type: 'income' },
  { id: '3', date: '2026-06-16', description: 'Lidl', amount: -45.20, category: 'potraviny', type: 'expense' },
  { id: '4', date: '2026-06-15', description: 'Benzín Shell', amount: -62, category: 'doprava', type: 'expense' },
  { id: '5', date: '2026-06-14', description: 'Netflix', amount: -6.99, category: 'predplatne', type: 'expense' },
  { id: '6', date: '2026-06-13', description: 'Billa', amount: -38.50, category: 'potraviny', type: 'expense' },
  { id: '7', date: '2026-06-12', description: 'Spotify', amount: -5.99, category: 'predplatne', type: 'expense' },
  { id: '8', date: '2026-06-11', description: 'Zara', amount: -49.90, category: 'oblecenie', type: 'expense' },
  { id: '9', date: '2026-06-10', description: 'Kino', amount: -12, category: 'volny-cas', type: 'expense' },
  { id: '10', date: '2026-06-09', description: 'MHD mesačný', amount: -32, category: 'doprava', type: 'expense' },
  { id: '11', date: '2026-06-08', description: 'Orange internet', amount: -25, category: 'byvanie', type: 'expense' },
  { id: '12', date: '2026-06-07', description: 'Tesco', amount: -67.30, category: 'potraviny', type: 'expense' },
]
