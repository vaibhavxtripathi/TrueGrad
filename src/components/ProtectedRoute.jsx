import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ roles = [], children }) => {
  const { isAuthenticated, role } = useAuth()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (roles.length && !roles.includes(role)) return <Navigate to="/" replace />
  return children
}

export default ProtectedRoute


