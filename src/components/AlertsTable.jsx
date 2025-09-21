import { motion } from 'framer-motion'
import { AlertTriangle, Eye, Trash2 } from 'lucide-react'

const AlertsTable = () => {
  // Mock data for alerts
  const alerts = [
    {
      id: 1,
      certificateId: 'CERT-2024-001',
      institution: 'Fake University',
      studentName: 'John Doe',
      issueDate: '2024-01-15',
      status: 'Flagged',
      reason: 'Suspicious QR code pattern',
      severity: 'high'
    },
    {
      id: 2,
      certificateId: 'CERT-2024-002',
      institution: 'Doubtful College',
      studentName: 'Jane Smith',
      issueDate: '2024-01-14',
      status: 'Fake',
      reason: 'Invalid digital signature',
      severity: 'critical'
    },
    {
      id: 3,
      certificateId: 'CERT-2024-003',
      institution: 'Questionable Institute',
      studentName: 'Bob Johnson',
      issueDate: '2024-01-13',
      status: 'Flagged',
      reason: 'Unusual font patterns',
      severity: 'medium'
    },
    {
      id: 4,
      certificateId: 'CERT-2024-004',
      institution: 'Suspicious Academy',
      studentName: 'Alice Brown',
      issueDate: '2024-01-12',
      status: 'Fake',
      reason: 'Database verification failed',
      severity: 'critical'
    }
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error-100 text-error-800 border-error-200'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Fake':
        return 'bg-error-100 text-error-800'
      case 'Flagged':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <AlertTriangle className="h-5 w-5 text-error-600 mr-2" />
          Security Alerts
        </h3>
        <span className="bg-error-100 text-error-800 px-2 py-1 rounded-full text-sm font-medium">
          {alerts.length} Active
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Certificate ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Institution</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Student</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Severity</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, index) => (
              <motion.tr
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4 font-mono text-sm text-gray-900">
                  {alert.certificateId}
                </td>
                <td className="py-3 px-4 text-gray-900">{alert.institution}</td>
                <td className="py-3 px-4 text-gray-900">{alert.studentName}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-error-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default AlertsTable
