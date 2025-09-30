import { Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import VerifierUpload from './pages/VerifierUpload'
import VerifierResult from './pages/VerifierResult'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import BulkUploader from './pages/BulkUploader'
import Employer from './pages/Employer'
import Admissions from './pages/Admissions'
import Scholarships from './pages/Scholarships'
import Government from './pages/Government'
import BulkVerifier from './pages/BulkVerifier'
import OCRPage from './pages/OCRPage'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Footer from './components/Footer';
import BlockchainHashGenerator from './pages/BlockchainHashGenerator';


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
       <main className="pt-16 min-h-screen">
      <AnimatePresence mode="wait">
        <Routes>
          {/* Home Page */}
          <Route 
            path="/" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Home />
              </motion.div>
            } 
          />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
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
          {/* OCR Route */}
          <Route path="/ocr" element={<OCRPage />} />

          {/* blockchain */}
          <Route path="/blockchain-hash" element={<BlockchainHashGenerator />} />

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
          

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      </main>
       <Footer /> 
    </div>
  )
}

export default App
