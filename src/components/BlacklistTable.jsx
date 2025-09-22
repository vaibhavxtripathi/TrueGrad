import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Plus, Trash2, AlertCircle } from 'lucide-react'
import { useState } from 'react'

const BlacklistTable = () => {
  const [blacklistedInstitutions, setBlacklistedInstitutions] = useState([
    {
      id: 1,
      name: 'Fake University',
      location: 'Unknown', 
      addedDate: '2024-01-10',
      reason: 'Multiple fake certificates detected',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Doubtful College',
      location: 'Suspicious City',
      addedDate: '2024-01-08',
      reason: 'Invalid accreditation',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Questionable Institute',
      location: 'Fake State',
      addedDate: '2024-01-05',
      reason: 'Database verification failed',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Suspicious Academy',
      location: 'Unknown',
      addedDate: '2024-01-03',
      reason: 'Suspicious QR patterns',
      status: 'Active'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newInstitution, setNewInstitution] = useState({
    name: '',
    location: '',
    reason: ''
  })

  const handleAddInstitution = (e) => {
    e.preventDefault()
    if (newInstitution.name && newInstitution.reason) {
      const institution = {
        id: Date.now(),
        name: newInstitution.name,
        location: newInstitution.location || 'Unknown',
        addedDate: new Date().toISOString().split('T')[0],
        reason: newInstitution.reason,
        status: 'Active'
      }
      setBlacklistedInstitutions([...blacklistedInstitutions, institution])
      setNewInstitution({ name: '', location: '', reason: '' })
      setShowAddForm(false)
    }
  }

  const handleRemoveInstitution = (id) => {
    setBlacklistedInstitutions(blacklistedInstitutions.filter(inst => inst.id !== id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Building2 className="h-5 w-5 text-error-600 mr-2" />
          Blacklisted Institutions
        </h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Institution</span>
        </button>
      </div>
      <AnimatePresence>
      {showAddForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleAddInstitution}
          className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution Name
              </label>
              <input
                type="text"
                value={newInstitution.name}
                onChange={(e) => setNewInstitution({...newInstitution, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter institution name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={newInstitution.location}
                onChange={(e) => setNewInstitution({...newInstitution, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason
              </label>
              <input
                type="text"
                value={newInstitution.reason}
                onChange={(e) => setNewInstitution({...newInstitution, reason: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter reason for blacklisting"
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Institution
            </button>
          </div>
        </motion.form>
      )}
      </AnimatePresence>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Institution</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Added Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Reason</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blacklistedInstitutions.map((institution, index) => (
              <motion.tr
                key={institution.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-error-600 mr-2" />
                    <span className="font-medium text-gray-900">{institution.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{institution.location}</td>
                <td className="py-3 px-4 text-gray-600">{institution.addedDate}</td>
                <td className="py-3 px-4 text-gray-600">{institution.reason}</td>
                <td className="py-3 px-4">
                  <span className="bg-error-100 text-error-800 px-2 py-1 rounded-full text-xs font-medium">
                    {institution.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleRemoveInstitution(institution.id)}
                    className="p-1 text-gray-400 hover:text-error-600 transition-colors"
                    title="Remove from blacklist"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {blacklistedInstitutions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No blacklisted institutions</p>
        </div>
      )}
    </motion.div>
  )
}

export default BlacklistTable
