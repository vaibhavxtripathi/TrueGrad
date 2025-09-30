import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BulkUploadCard from '../components/BulkUploadCard';
import { mockBulkResults } from '../data/mockData';
import { Shield, CheckCircle, XCircle, BarChart3, Download, FileText, FolderUp } from 'lucide-react';


const BulkVerifier = () => {
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
    return status === 'valid' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getStatusIcon = (status) => {
    return status === 'valid' ? 
      <CheckCircle className="h-5 w-5 text-green-600" /> : 
      <XCircle className="h-5 w-5 text-red-600" />;
  };

  const validCount = verificationResults.filter(r => r.status === 'valid').length;
  const fakeCount = verificationResults.filter(r => r.status === 'fake').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 pt-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-3 rounded-xl">
              <FolderUp className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Bulk Certificate Verification
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload multiple certificates for batch verification with AI-powered analysis and instant results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column - Upload Card */}
          <div className="flex flex-col">
            <BulkUploadCard onFilesUpload={handleFilesUpload} />
          </div>

          {/* Right Column - Results Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-2 rounded-lg">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Verification Results</h3>
              </div>
              {verificationResults.length > 0 && (
                <button className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              )}
            </div>
            
            <div className="flex-1 flex items-center justify-center min-h-[300px]">
              <AnimatePresence>
                {verificationResults.length > 0 ? (
                  <div className="w-full space-y-4 max-h-[500px] overflow-y-auto">
                    {verificationResults.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(result.status)}
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{result.fileName}</p>
                              <p className="text-xs text-gray-500">{result.institution}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(result.status)}`}>
                            {result.status.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm mb-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Student:</span>
                            <span className="font-medium">{result.studentName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Confidence:</span>
                            <span className="font-medium text-primary-600">{result.confidence}%</span>
                          </div>
                        </div>
                        
                        <div className="text-xs">
                          <span className="text-gray-600">Details: </span>
                          <span className="text-gray-700">{result.details}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500 w-full"
                  >
                    <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-2">No verification results yet</p>
                    <p className="text-sm text-gray-500">Upload certificates to see verification results</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Control Card - Appears only when files are uploaded */}
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-2 rounded-lg">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Verification Control</h3>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleVerifyAll}
                disabled={isVerifying}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 shadow-md ${
                  isVerifying
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800'
                }`}
              >
                {isVerifying ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Verifying {uploadedFiles.length} certificates...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 md:space-x-3">
                    <Shield className="h-4 w-4" />
                    <span>Verify All Certificates</span>
                  </div>
                )}
              </motion.button>

              {/* Quick Stats */}
              {verificationResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-3 gap-3"
                >
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-lg font-bold text-green-600">{validCount}</div>
                    <div className="text-xs text-green-700">Valid</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-lg font-bold text-red-600">{fakeCount}</div>
                    <div className="text-xs text-red-700">Fake</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-lg font-bold text-blue-600">{verificationResults.length}</div>
                    <div className="text-xs text-blue-700">Total</div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-lg p-4 shadow border border-gray-200 text-center">
            <div className="bg-blue-100 w-10 h-10 rounded flex items-center justify-center mx-auto mb-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Batch Processing</h3>
            <p className="text-xs text-gray-600">Verify multiple certificates at once</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow border border-gray-200 text-center">
            <div className="bg-green-100 w-10 h-10 rounded flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Instant Results</h3>
            <p className="text-xs text-gray-600">AI-powered analysis in seconds</p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow border border-gray-200 text-center">
            <div className="bg-purple-100 w-10 h-10 rounded flex items-center justify-center mx-auto mb-2">
              <Download className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">Export Reports</h3>
            <p className="text-xs text-gray-600">Download comprehensive results</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BulkVerifier;