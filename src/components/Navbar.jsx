
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Shield, Menu, X, LogIn } from "lucide-react";
import { useState } from "react";

// Custom BulkUpload icon component
const BulkUpload = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const FileText = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/verifier", label: "Verifier", icon: Shield },
    { path: "/bulk-verifier", label: "Bulk Verifier", icon: BulkUpload },
    { path: "/ocr", label: "OCR Text Extraction", icon: FileText },
  ];


  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg border-b border-gray-200 fixed w-full top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Gradient */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-2 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              {/* Gradient overlay that extends beyond the icon */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl opacity-20 blur-sm -z-10"></div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">TrueGrad</span>
              <span className="text-xs text-gray-500 font-medium">Authenticity Validator</span>
            </div>
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary-100 text-primary-700 shadow-sm"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}

            
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-sm"
            >
              <LogIn className="h-4 w-4" />
              <span className="font-medium">Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-50"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname.startsWith(item.path);

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                        isActive
                          ? "bg-primary-100 text-primary-700"
                          : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
                
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 mt-4"
                >
                  <LogIn className="h-5 w-5" />
                  <span className="font-medium">Login</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;