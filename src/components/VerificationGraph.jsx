import { motion } from 'framer-motion'
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts'

const VerificationGraph = ({ pie = [], line = [], bars = [] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Valid vs Fake</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pie} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={4}>
                {pie.map((p, i) => <Cell key={i} fill={p.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="card lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verifications Over Time</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={line}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="valid" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="fake" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {bars.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="card lg:col-span-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">By Institution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="institution" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="valid" fill="#22c55e" name="Valid" />
                <Bar dataKey="fake" fill="#ef4444" name="Fake" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default VerificationGraph


