import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, Download, RotateCcw, FileText, Shield, AlertTriangle } from 'lucide-react'

const VerifierResult = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const { isValid, ocrDetails, file, score, flags } = location.state || {
    isValid: true,
    score: 95,
    flags: [],
    ocrDetails: {
      studentName: 'John Doe',
      institution: 'University of Technology',
      degree: 'Bachelor of Computer Science',
      graduationDate: '2024-05-15',
      certificateId: 'CERT-2024-001',
      gpa: '3.8',
      honors: 'Magna Cum Laude'
    },
    file: null
  }

  const verificationDetails = {
    digitalSignature: isValid ? 'Valid' : 'Invalid',
    qrCode: isValid ? 'Verified' : 'Failed',
    databaseCheck: isValid ? 'Confirmed' : 'Not Found',
    institutionVerification: isValid ? 'Authentic' : 'Suspicious',
    overallScore: typeof score === 'number' ? score : (isValid ? 95 : 23)
  }

  const reasons = isValid 
    ? [
        'Digital signature verified successfully',
        'QR code matches institutional database',
        'Certificate format matches official template',
        'Institution accreditation confirmed'
      ]
    : [
        'Digital signature verification failed',
        'QR code does not match any known pattern',
        'Certificate format appears to be modified',
        'Institution not found in accredited database'
      ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Verification Result
          </h1>
          <p className="text-lg text-gray-600">
            Certificate authenticity analysis complete
          </p>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`card mb-8 ${
            isValid 
              ? 'border-success-200 bg-gradient-to-r from-success-50 to-green-50' 
              : 'border-error-200 bg-gradient-to-r from-error-50 to-red-50'
          }`}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                isValid ? 'bg-success-100' : 'bg-error-100'
              }`}
            >
              {isValid ? (
                <CheckCircle className="h-10 w-10 text-success-600" />
              ) : (
                <XCircle className="h-10 w-10 text-error-600" />
              )}
            </motion.div>

            <h2 className={`text-3xl font-bold mb-4 ${
              isValid ? 'text-success-700' : 'text-error-700'
            }`}>
              {isValid ? '✅ Valid Certificate' : '❌ Fake Certificate'}
            </h2>

            <p className={`text-lg mb-6 ${
              isValid ? 'text-success-600' : 'text-error-600'
            }`}>
              {isValid 
                ? 'This certificate has been verified as authentic'
                : 'This certificate appears to be fraudulent'
              }
            </p>

            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
              isValid 
                ? 'bg-success-100 text-success-800' 
                : 'bg-error-100 text-error-800'
            }`}>
              <Shield className="h-4 w-4 mr-2" />
              Confidence Score: {verificationDetails.overallScore}%
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Certificate Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="h-5 w-5 text-primary-600 mr-2" />
              Certificate Details
            </h3>

            <div className="space-y-4">
              {Object.entries(ocrDetails).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="font-medium text-gray-900">
                    {key === 'certificateId' ? (
                      <span className="font-mono text-primary-600">{value}</span>
                    ) : key === 'honors' ? (
                      <span className="text-success-600">{value}</span>
                    ) : (
                      value
                    )}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Verification Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Shield className="h-5 w-5 text-primary-600 mr-2" />
              Verification Analysis
            </h3>

            <div className="space-y-4">
              {Object.entries(verificationDetails).map(([key, value]) => {
                if (key === 'overallScore') return null
                
                const isPassed = value === 'Valid' || value === 'Verified' || value === 'Confirmed' || value === 'Authentic'
                
                return (
                  <div key={key} className="flex items-center justify-between py-2">
                    <span className="text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <div className="flex items-center">
                      {isPassed ? (
                        <CheckCircle className="h-4 w-4 text-success-600 mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 text-error-600 mr-2" />
                      )}
                      <span className={`font-medium ${
                        isPassed ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {value}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Reasons / Flags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="card mt-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <AlertTriangle className="h-5 w-5 text-primary-600 mr-2" />
            {isValid ? 'Verification Reasons' : 'Issues Found'}
          </h3>

          <div className="space-y-3">
            {(flags && flags.length > 0 ? flags : reasons).map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                className={`flex items-start p-3 rounded-lg ${
                  isValid 
                    ? 'bg-success-50 border border-success-200' 
                    : 'bg-error-50 border border-error-200'
                }`}
              >
                {isValid ? (
                  <CheckCircle className="h-5 w-5 text-success-600 mr-3 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-error-600 mr-3 mt-0.5 flex-shrink-0" />
                )}
                <span className={`${isValid ? 'text-success-700' : 'text-error-700'}`}>{typeof reason === 'string' ? reason : reason.message}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/verifier')}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Verify Another Certificate</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default VerifierResult
