import { Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import VerifierUpload from './pages/VerifierUpload'
import VerifierResult from './pages/VerifierResult'
import AdminDashboard from './pages/AdminDashboard'
import BulkVerifier from './pages/BulkVerifier'

function App() {
  return (

    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <Routes>
          {/* Redirect root to verifier */}
          <Route path="/" element={<Navigate to="/verifier" replace />} />
          
          {/* Verifier Routes */}
          <Route 
            path="/verifier" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <VerifierUpload />
              </motion.div>
            } 
          />
          
          <Route 
            path="/verifier/result" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <VerifierResult />
              </motion.div>
            } 
          />
          
             <Route 
            path="/bulk-verifier" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BulkVerifier />
              </motion.div>
            } 
          />


          {/* Admin Route */}
          <Route 
            path="/admin" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AdminDashboard />
              </motion.div>
            } 
          />
          
          {/* Catch all route - redirect to verifier */}
          <Route path="*" element={<Navigate to="/verifier" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
