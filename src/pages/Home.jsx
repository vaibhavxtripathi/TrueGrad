import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, FileCheck, Upload, Scan, BarChart3, CheckCircle, Award, Users, Building } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: FileCheck,
      title: 'Single Certificate Verification',
      description: 'Verify individual academic certificates with advanced AI analysis',
      path: '/verifier',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Upload,
      title: 'Bulk Verification',
      description: 'Process multiple certificates simultaneously for institutions',
      path: '/bulk-verifier',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Scan,
      title: 'OCR Text Extraction',
      description: 'Extract text from certificates using advanced OCR technology',
      path: '/ocr',
      color: 'from-purple-500 to-purple-600'
    },
    {
    icon: Shield, // Changed from BarChart3 to Shield
    title: 'Blockchain Hash Generator', // Changed title
    description: 'Generate immutable blockchain hashes for verified certificates', // Changed description
    path: '/blockchain-hash', // Changed path
    color: 'from-orange-500 to-orange-600' // Keep the same color or change if you want
  }
  ];

  const stats = [
    { value: '50,000+', label: 'Certificates Verified', icon: CheckCircle },
    { value: '99.9%', label: 'Accuracy Rate', icon: Award },
    { value: '200+', label: 'Educational Partners', icon: Users },
    { value: '15+', label: 'Countries Served', icon: Building }
  ];

  return (
    <div className="min-h-screen "> {/* Added pt-16 for fixed navbar */}
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Gradient Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-4 rounded-2xl shadow-lg">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl opacity-30 blur-lg -z-10"></div>
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-primary-600">TrueGrad</span> - Academic Certificate Verification
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Advanced AI-powered platform to verify academic certificates, prevent fraud, 
              and maintain the integrity of educational credentials worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/verifier"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Verify Certificate
              </Link>
              <Link
                to="/signup"
                className="border-2 border-gray-300 text-gray-700 hover:border-primary-600 hover:text-primary-600 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg"
              >
                Institution Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-12 w-12 text-white mx-auto mb-4" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-primary-100">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Verification Solutions
            </h2>
            <p className="text-lg text-gray-600">
              End-to-end certificate authentication for educational institutions and employers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Link to={feature.path} className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} w-fit mb-4 group-hover:scale-105 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;