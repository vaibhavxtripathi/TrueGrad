import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, CheckCircle, AlertCircle, Eye } from 'lucide-react'
import { runVerification } from '../services/VerificationEngine'
import LegacyEntry from './components/LegacyEntry'

const VerifierUpload = () => {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [showLegacy, setShowLegacy] = useState(false)
  const [ocrDetails, setOcrDetails] = useState(null)
  const navigate = useNavigate()

  // Default OCR details (used when no JSON provided)
  const mockOCRDetails = {
    studentName: 'John Doe',
    institution: 'University of Technology',
    degree: 'Bachelor of Computer Science',
    graduationDate: '2024-05-15',
    certificateId: 'CERT-2024-001',
    gpa: '3.8',
    honors: 'Magna Cum Laude'
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    // Accept images or JSON containing OCR fields
    if (file.type.startsWith('image/')) {
      setSelectedFile(file)
      setOcrDetails(null)
    } else if (file.type === 'application/json' || file.name.toLowerCase().endsWith('.json')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result)
          setOcrDetails(json)
          setSelectedFile(null)
        } catch (err) {
          alert('Invalid JSON file')
        }
      }
      reader.readAsText(file)
    } else {
      alert('Please select an image or OCR .json file')
    }
  }

  const handleVerify = async () => {
    if (!selectedFile) return


    setIsVerifying(true)

    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false)
      navigate('/verifier/result', {
        state: {
          file: selectedFile,
          ocrDetails: mockOCRDetails,
          isValid: Math.random() > 0.3 // 70% chance of being valid
        }
      })
    }, 2000)

  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mx-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Certificate Verification
          </h1>
          <p className="text-lg text-gray-600">
            Upload your academic certificate to verify its authenticity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Upload className="h-5 w-5 text-primary-600 mr-2" />
              Upload Certificate
            </h2>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Upload image or .json with OCR fields</span>
              <button onClick={() => setShowLegacy((v)=>!v)} className="btn-secondary">
                {showLegacy ? 'Close Manual Entry' : 'Manual Entry (Legacy)'}
              </button>
            </div>

            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-primary-500 bg-primary-50'
                  : (selectedFile || ocrDetails)
                  ? 'border-success-500 bg-success-50'
                  : 'border-gray-300 hover:border-primary-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*,.json,application/json"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {selectedFile ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-4"
                >
                  <CheckCircle className="h-12 w-12 text-success-600 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </motion.div>
              ) : ocrDetails ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="space-y-2"
                >
                  <CheckCircle className="h-12 w-12 text-success-600 mx-auto" />
                  <p className="text-lg font-medium text-gray-900">OCR JSON loaded</p>
                  <p className="text-sm text-gray-600">Using fields from uploaded JSON</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      Drop your certificate here
                    </p>
                    <p className="text-sm text-gray-600">
                      or click to browse files
                    </p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Supports: JPG, PNG (Max 10MB), or OCR JSON
                  </p>
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleVerify}
              disabled={!selectedFile || isVerifying}
              className={`w-full mt-6 p-2 rounded-md ${
                selectedFile && !isVerifying

                  ? 'btn-primary'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isVerifying ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Verify Certificate'
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default VerifierUpload
