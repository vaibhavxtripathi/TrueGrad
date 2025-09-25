import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Tesseract from 'tesseract.js' // Add Tesseract.js

const Badge = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}>{children}</span>
)

const Hero = () => {
//   const [ocrText, setOcrText] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     setLoading(true)
//     setOcrText('Processing image...')

//     try {
//       const { data: { text } } = await Tesseract.recognize(file, 'eng', {
//         logger: (m) => console.log(m)
//       })
//       setOcrText(text)
//     } catch (err) {
//       setOcrText('Error reading image: ' + err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Verify educational certificates with confidence
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Upload a certificate for instant checks or sign in to access bulk verification and role-based dashboards.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge className="bg-green-100 text-green-700">Secure</Badge>
              <Badge className="bg-blue-100 text-blue-700">Instant</Badge>
              <Badge className="bg-purple-100 text-purple-700">Global</Badge>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/verifier" className="btn-primary text-center">Verify a Certificate</Link>
              <Link to="/login" className="btn-secondary text-center">Sign in for bulk verification</Link>
            </div>

            {/* OCR Upload */}
            {/* <div className="mt-6">
              <label className="block text-gray-700 font-medium mb-2">Upload certificate image for OCR:</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
              <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg min-h-[80px]">
                {loading ? 'Processing...' : ocrText || 'OCR result will appear here.'}
              </div>
            </div> */}
          </motion.div>

          {/* Right mock certificate */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">University of Technology</h3>
                  <p className="text-gray-500">Official Academic Transcript</p>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-gray-500">Certificate ID</span>
                  <div className="font-mono text-primary-700">UT-2024-001234</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Student</p>
                  <p className="text-gray-900 font-medium">John Doe</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Program</p>
                  <p className="text-gray-900 font-medium">B.Tech Computer Science</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Graduation</p>
                  <p className="text-gray-900 font-medium">2024-05-15</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">GPA</p>
                  <p className="text-gray-900 font-medium">3.8</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  This is a mock preview. Run a verification to analyze QR, hash, and institutional patterns.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
