// components/BlockchainHashGenerator.jsx
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, Hash, Copy, CheckCircle, Download, QrCode, Lock, FileText } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';


const BlockchainHashGenerator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { certificateData, verificationResult } = location.state || {};

  const [isGenerating, setIsGenerating] = useState(false);
  const [hashGenerated, setHashGenerated] = useState(false);
  const [hashId, setHashId] = useState('');
  const [copied, setCopied] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  
  // QR Code ref and configuration
  const qrRef = useRef(null);
  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    type: "svg",
    data: hashId || "https://truegrad.com",
    dotsOptions: {
      color: "#2563eb",
      type: "rounded"
    },
    backgroundOptions: {
      color: "#ffffff",
    }
  });

  useEffect(() => {
    if (showQrCode && qrRef.current && hashId) {
      qrCode.update({
        data: `https://truegrad.com/verify/${hashId}`
      });
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
    }
  }, [showQrCode, hashId]);

  // Mock certificate data if not passed via state
  const mockCertificateData = {
    studentName: 'John Doe',
    institution: 'University of Technology',
    degree: 'Bachelor of Computer Science',
    graduationDate: '2024-05-15',
    certificateId: 'CERT-2024-001',
    gpa: '3.8',
    verificationDate: new Date().toISOString().split('T')[0],
    status: 'Verified'
  };

  const finalCertificateData = certificateData || mockCertificateData;

  const generateBlockchainHash = async () => {
    setIsGenerating(true);
    
    // Simulate blockchain hash generation with example hash
    setTimeout(() => {
      const timestamp = Date.now();
      
      // Example blockchain hash (real-looking format)
      const exampleHashes = [
        "0x1a2b3c4d5e6f7890abcdef1234567890fedcba9876543210",
        "0x5f3a8b2c7d1e9f4a6b8c3d2e7f1a9b5c8d",
        "0x8e4f7a2b6c9d3e1f5a7b8c9d2e3f4a5b6c",
        "0x3b6e9a4c8f2d7e1b5a9c8d7e2f3a4b5c6d"
      ];
      
      // Randomly select an example hash
      const mockHash = exampleHashes[Math.floor(Math.random() * exampleHashes.length)];
      
      setHashId(mockHash);
      setHashGenerated(true);
      setIsGenerating(false);
    }, 2000); // Reduced from 3s to 2s for better UX
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(hashId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadHashCertificate = () => {
    const content = `
TrueGrad - Blockchain Verified Certificate
==========================================

Certificate Details:
-------------------
Student Name: ${finalCertificateData.studentName}
Institution: ${finalCertificateData.institution}
Degree: ${finalCertificateData.degree}
Graduation Date: ${finalCertificateData.graduationDate}
Certificate ID: ${finalCertificateData.certificateId}

Blockchain Verification:
-----------------------
Hash ID: ${hashId}
Generated On: ${new Date().toLocaleDateString()}
Status: ✅ Verified on Blockchain

Verification URL: https://truegrad.com/verify/${hashId}
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `truegrad-verification-${finalCertificateData.certificateId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-5 rounded-2xl shadow-2xl">
              <Lock className="h-16 w-16 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-black text-gray-900 leading-tight">
                BLOCKCHAIN VERIFICATION
                <br />
                <span className="text-primary-600">HASH GENERATOR</span>
              </h1>
              <p className="text-xl text-gray-700 mt-4 font-medium">
                Generate immutable blockchain hash for your verified certificate
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Certificate Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Certificate Details</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 font-medium">Student Name:</span>
                  <p className="font-bold text-gray-900">{finalCertificateData.studentName}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Institution:</span>
                  <p className="font-bold text-gray-900">{finalCertificateData.institution}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Degree:</span>
                  <p className="font-bold text-gray-900">{finalCertificateData.degree}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Graduation Date:</span>
                  <p className="font-bold text-gray-900">{finalCertificateData.graduationDate}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Certificate ID:</span>
                  <p className="font-bold text-primary-600">{finalCertificateData.certificateId}</p>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Status:</span>
                  <p className="font-bold text-green-600">✓ Verified</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Hash Generation Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-2 rounded-lg">
                <Hash className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Blockchain Hash</h2>
            </div>

            {!hashGenerated ? (
              <div className="text-center py-8">
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <Lock className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-6 font-medium">
                  Generate an immutable blockchain hash to permanently verify this certificate.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateBlockchainHash}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200 shadow-lg"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Generating Hash...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Generate Blockchain Hash</span>
                    </div>
                  )}
                </motion.button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-bold text-green-800">Hash Generated Successfully!</span>
                  </div>
                  <p className="text-sm text-green-700">
                    This certificate is now permanently recorded on the blockchain.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blockchain Hash ID:
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={hashId}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={downloadHashCertificate}
                    className="flex-1 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Proof</span>
                  </button>
                  
                  <button
                    onClick={() => setShowQrCode(!showQrCode)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    <QrCode className="h-4 w-4" />
                    <span>QR Code</span>
                  </button>
                </div>

                {showQrCode && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center"
                  >
                    <div className="bg-white p-4 rounded inline-block">
                      {/* Simple QR code representation */}
                      <div className="grid grid-cols-4 gap-1 w-32 h-32 mx-auto bg-white p-2 border-2 border-gray-300">
                        {Array(16).fill().map((_, i) => (
                          <div key={i} className="bg-black rounded-sm"></div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Scan to verify certificate</p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Immutable Record</h3>
            <p className="text-gray-600 font-medium">Permanently stored on blockchain</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Tamper-Proof</h3>
            <p className="text-gray-600 font-medium">Cannot be altered or forged</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Verification</h3>
            <p className="text-gray-600 font-medium">Verify anytime with hash or QR code</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlockchainHashGenerator;