import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { GraduationCap, Shield, Settings } from 'lucide-react'

const Navbar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/verifier', label: 'Verifier', icon: Shield },
    { path: '/admin', label: 'Admin', icon: Settings }
  ]

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GraduationCap className="h-8 w-8 text-primary-600" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900">
              TrueGrad
            </span>
            <span className="text-sm text-gray-500 font-medium">
              Authenticity Validator
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname.startsWith(item.path)
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
