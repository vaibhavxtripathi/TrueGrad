import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  TrendingUp,
  Building2,
  Shield,
  Activity
} from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import StatsCard from '../components/StatsCard'
import AlertsTable from '../components/AlertsTable'
import BlacklistTable from '../components/BlacklistTable'

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d')

  // Mock data for charts
  const pieData = [
    { name: 'Valid', value: 1247, color: '#22c55e' },
    { name: 'Fake', value: 153, color: '#ef4444' }
  ]

  const barData = [
    { institution: 'University of Tech', verifications: 234, valid: 198, fake: 36 },
    { institution: 'State College', verifications: 189, valid: 167, fake: 22 },
    { institution: 'Metro University', verifications: 156, valid: 145, fake: 11 },
    { institution: 'City Institute', verifications: 134, valid: 98, fake: 36 },
    { institution: 'Regional College', verifications: 98, valid: 89, fake: 9 },
    { institution: 'Community College', verifications: 76, valid: 72, fake: 4 }
  ]

  const stats = [
    {
      title: 'Total Verifications',
      value: '1,400',
      icon: Activity,
      color: 'primary',
      trend: 12.5
    },
    {
      title: 'Valid Certificates',
      value: '1,247',
      icon: CheckCircle,
      color: 'success',
      trend: 8.2
    },
    {
      title: 'Fake Certificates',
      value: '153',
      icon: XCircle,
      color: 'error',
      trend: -15.3
    },
    {
      title: 'Active Alerts',
      value: '24',
      icon: AlertTriangle,
      color: 'gray',
      trend: -5.1
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'verification',
      message: 'New certificate verified for University of Technology',
      time: '2 minutes ago',
      status: 'valid'
    },
    {
      id: 2,
      type: 'alert',
      message: 'Suspicious certificate flagged from Fake University',
      time: '15 minutes ago',
      status: 'flagged'
    },
    {
      id: 3,
      type: 'blacklist',
      message: 'Doubtful College added to blacklist',
      time: '1 hour ago',
      status: 'blacklisted'
    },
    {
      id: 4,
      type: 'verification',
      message: 'Certificate verification completed for State College',
      time: '2 hours ago',
      status: 'valid'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Monitor certificate verifications and security alerts
          </p>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex space-x-2">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={stat.title}
              {...stat}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Shield className="h-5 w-5 text-primary-600 mr-2" />
              Verification Status
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Building2 className="h-5 w-5 text-primary-600 mr-2" />
              Verifications by Institution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="institution" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="valid" fill="#22c55e" name="Valid" />
                  <Bar dataKey="fake" fill="#ef4444" name="Fake" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 text-primary-600 mr-2" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    activity.status === 'valid' ? 'bg-success-500' :
                    activity.status === 'flagged' ? 'bg-yellow-500' :
                    'bg-error-500'
                  }`} />
                  <span className="text-gray-900">{activity.message}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <AlertsTable />
          <BlacklistTable />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
