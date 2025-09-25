import { motion } from 'framer-motion'

const HistoryTable = ({ records = [] }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Verification History</h3>
      </div>
      <div className="overflow-x-auto" aria-live="polite">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">Applicant</th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">Institution</th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">Program</th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">Result</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <motion.tr key={r.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.03 }} className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">{r.date}</td>
                <td className="py-3 px-4 text-gray-900 font-medium">{r.applicant_name}</td>
                <td className="py-3 px-4 text-gray-700">{r.institution}</td>
                <td className="py-3 px-4 text-gray-700">{r.program}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status === 'valid' ? 'bg-success-100 text-success-700' : r.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-error-100 text-error-700'}`}>
                    {r.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default HistoryTable


