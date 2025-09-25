import Hero from '../components/Hero'
import { motion } from 'framer-motion'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900">How it works</h3>
            <p className="text-gray-600 mt-2">Upload a certificate, our engine simulates checks for patterns, QR/hash, and anomalies, then returns a confidence score.</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900">Bulk verification</h3>
            <p className="text-gray-600 mt-2">Sign in to access role dashboards and the bulk uploader for CSV/ZIP/image batches.</p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900">Privacy</h3>
            <p className="text-gray-600 mt-2">This is a frontend-only demo. No data leaves your browser; all logic and data are mocked.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Landing


