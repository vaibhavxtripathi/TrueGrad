
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Eye, EyeOff, LogIn, GraduationCap, Users } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100 py-4 px-4 -mt-8"> {/* Added pt-24 for navbar space */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden"
        style={{ maxHeight: 'calc(100vh - 120px)' }} 
      >
        <div className="md:flex min-h-[500px]"> {/* Reduced height */}
          
          {/* Left Side - Brand Section */}
          <div className="md:w-2/5 bg-gradient-to-br from-primary-600 to-primary-800 p-6 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center text-white relative z-10"
            >
              <div className="flex justify-center mb-4"> 
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm border border-white/30"> 
                  <Shield className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold mb-2">TrueGrad</h1>
              <p className="text-primary-100 text-sm mb-4">Academic Certificate Verification</p> 
            </motion.div>
          </div>

          {/* Right Side - Login Form */}
          <div className="md:w-3/5 p-6 flex flex-col justify-center"> 
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mb-6"> 
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2> 
                <p className="text-gray-600 mt-1 text-sm">Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto w-full"> 
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a
                  </label>
                  <div className="grid grid-cols-2 gap-3"> 
                    {['student', 'institution'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                          formData.userType === type
                            ? 'border-primary-600 bg-primary-50 text-primary-700 shadow-sm'
                            : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                        onClick={() => setFormData({...formData, userType: type})}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          {type === 'student' ? (
                            <GraduationCap className="h-4 w-4" /> 
                          ) : (
                            <Users className="h-4 w-4" /> 
                          )}
                          <span className="capitalize font-medium text-sm">{type}</span> 
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1"> {/* Reduced margin */}
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200" // Smaller padding and text
                    placeholder={
                      formData.userType === 'student' 
                        ? 'student@university.edu' 
                        : 'admin@institution.edu'
                    }
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1"> {/* Reduced margin */}
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 pr-10 transition-all duration-200" // Smaller padding
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" /> 
                      ) : (
                        <Eye className="h-4 w-4" /> 
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm"> {/* Smaller text */}
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="h-3 w-3 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" // Smaller checkbox
                    />
                    <span className="text-gray-700">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-primary-600 hover:text-primary-700 font-medium">
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center shadow-lg text-sm" // Smaller padding and text
                >
                  <LogIn className="h-4 w-4 mr-2" /> {/* Smaller icon */}
                  Sign In
                </motion.button>

                {/* Sign Up Link */}
                <div className="text-center text-sm"> {/* Smaller text */}
                  <span className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-semibold">
                      Create account
                    </Link>
                  </span>
                </div>
              </form>

              {/* Demo Credentials */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-lg text-center text-sm" // Smaller padding and text
              >
                <p className="text-primary-800">
                  <strong>Demo:</strong> demo@institution.edu / demo123
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;


