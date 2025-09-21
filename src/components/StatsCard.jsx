import { motion } from 'framer-motion'

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'primary',
  trend = null,
  delay = 0 
}) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-100',
    success: 'text-success-600 bg-success-100',
    error: 'text-error-600 bg-error-100',
    gray: 'text-gray-600 bg-gray-100'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="card"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-1 ${
              trend > 0 ? 'text-success-600' : 'text-error-600'
            }`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard
