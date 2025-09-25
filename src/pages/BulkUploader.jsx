import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BulkUploadCard from '../components/BulkUploadCard';
import { mockBulkResults } from '../sample-data/bulkmockdata';

const BulkUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [verificationResults, setVerificationResults] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleFilesUpload = (files) => {
    setUploadedFiles(files);
  };

  const handleVerifyAll = () => {
    if (uploadedFiles.length === 0) return;

    setIsVerifying(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = uploadedFiles.map((file, index) => {
        const mockResult = mockBulkResults[index % mockBulkResults.length];
        return {
          ...file,
          ...mockResult,
          status: Math.random() > 0.3 ? 'valid' : 'fake',
          confidence: Math.floor(Math.random() * 40) + 60
        };
      });
      
      setVerificationResults(results);
      setIsVerifying(false);
    }, 2000);
  };

  const getStatusColor = (status) => {
    return status === 'valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getStatusIcon = (status) => {
    return status === 'valid' ? '✅' : '❌';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bulk Certificate Verification</h1>
          <p className="text-gray-600">Upload multiple certificates for batch verification</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <BulkUploadCard onFilesUpload={handleFilesUpload} />
            
            {uploadedFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 "
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Verification Control</h3>
                  <span className="text-sm text-gray-500">{uploadedFiles.length} files ready</span>
                </div>
                
                <button
                  onClick={handleVerifyAll}
                  disabled={isVerifying}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    isVerifying
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white`}
                >
                  {isVerifying ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Verifying...
                    </div>
                  ) : (
                    `Verify All Certificates (${uploadedFiles.length})`
                  )}
                </button>
              </motion.div>
            )}
          </div>

          {/* Results Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-12 ">Verification Results</h3>
              
              <AnimatePresence>
                {verificationResults.length > 0 ? (
                  <div className="space-y-4">
                    {verificationResults.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{getStatusIcon(result.status)}</span>
                            <div>
                              <p className="font-medium text-gray-900">{result.fileName}</p>
                              <p className="text-sm text-gray-500">{result.institution}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                            {result.status.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Student:</span> {result.studentName}
                          </div>
                          <div>
                            <span className="text-gray-600">Confidence:</span> {result.confidence}%
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <span className="text-gray-600 text-sm">Details:</span>
                          <p className="text-sm text-gray-700">{result.details}</p>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Summary */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-green-600">
                            {verificationResults.filter(r => r.status === 'valid').length}
                          </p>
                          <p className="text-sm text-gray-600">Valid</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-red-600">
                            {verificationResults.filter(r => r.status === 'fake').length}
                          </p>
                          <p className="text-sm text-gray-600">Fake</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-600">
                            {verificationResults.length}
                          </p>
                          <p className="text-sm text-gray-600">Total</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-gray-500"
                  >
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="mt-4">Upload certificates to see verification results</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUploader;