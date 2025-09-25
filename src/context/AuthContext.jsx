import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    try { return localStorage.getItem('tg_role') || null } catch { return null }
  })
  const [user, setUser] = useState(() => {
    try { const raw = localStorage.getItem('tg_user'); return raw ? JSON.parse(raw) : null } catch { return null }
  })

  const login = (selectedRole, profile = {}) => {
    setRole(selectedRole)
    const u = { id: 'demo-user', name: 'Demo User', role: selectedRole, ...profile }
    setUser(u)
    try {
      localStorage.setItem('tg_role', selectedRole)
      localStorage.setItem('tg_user', JSON.stringify(u))
    } catch {}
  }

  const logout = () => {
    setRole(null)
    setUser(null)
    try { localStorage.removeItem('tg_role'); localStorage.removeItem('tg_user') } catch {}
  }

  const value = useMemo(() => ({ role, user, login, logout, isAuthenticated: !!role }), [role, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)


