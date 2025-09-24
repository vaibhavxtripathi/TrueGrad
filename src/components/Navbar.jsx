import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Shield, Settings } from "lucide-react";

// Custom BulkUpload icon component
const BulkUpload = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/verifier", label: "Verifier", icon: Shield },
    { path: "/bulk-verifier", label: "Bulk Verifier", icon: BulkUpload },
    { path: "/admin", label: "Admin", icon: Settings },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-lg border-b border-gray-200"
    >


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">


          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <GraduationCap className="h-8 w-8 text-primary-600" />
            </motion.div>
            
            <span className="text-xl font-bold text-gray-900">TrueGrad</span>
            <span className="text-sm text-gray-500 font-medium">
              Authenticity Validator
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
