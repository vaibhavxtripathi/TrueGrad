import { Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import VerifierUpload from './pages/VerifierUpload'
import VerifierResult from './pages/VerifierResult'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import BulkUploader from './pages/BulkUploader'
import Employer from './pages/Employer'
import Admissions from './pages/Admissions'
import Scholarships from './pages/Scholarships'
import Government from './pages/Government'
import BulkVerifier from './pages/BulkVerifier'


function App() {
  return (

    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <Routes>
          {/* Landing */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
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
              <ProtectedRoute roles={["admin"]}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <AdminDashboard />
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route 
            path="/bulk-upload" 
            element={
              <ProtectedRoute roles={["employer","admissions","scholarships","government","admin"]}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <BulkUploader />
                </motion.div>
              </ProtectedRoute>
            }
          />
          <Route path="/employer" element={<ProtectedRoute roles={["employer","admin"]}><Employer /></ProtectedRoute>} />
          <Route path="/admissions" element={<ProtectedRoute roles={["admissions","admin"]}><Admissions /></ProtectedRoute>} />
          <Route path="/scholarships" element={<ProtectedRoute roles={["scholarships","admin"]}><Scholarships /></ProtectedRoute>} />
          <Route path="/government" element={<ProtectedRoute roles={["government","admin"]}><Government /></ProtectedRoute>} />
          
          {/* Catch all route - redirect to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
