import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const roles = [
  { id: 'admin', label: 'Admin' },
  { id: 'employer', label: 'Employer' },
  { id: 'admissions', label: 'Admissions' },
  { id: 'scholarships', label: 'Scholarships' },
  { id: 'government', label: 'Government' },
]

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('employer')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock auth: accept any username/password
    login(selectedRole, { name: username || 'Demo User' })
    switch (selectedRole) {
      case 'admin':
        navigate('/admin');
        break
      case 'employer':
        navigate('/employer');
        break
      case 'admissions':
        navigate('/admissions');
        break
      case 'scholarships':
        navigate('/scholarships');
        break
      case 'government':
        navigate('/government');
        break
      default:
        navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
          <p className="text-gray-600 mt-1">Choose a role and use any credentials (mock).</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
              >
                {roles.map(r => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                placeholder="Enter username"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500"
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="btn-primary w-full">Continue</button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Login


