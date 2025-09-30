import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Github, 
  CheckCircle,
  FileCheck,
  Users,
  Scan,
  BarChart3,
  Award,
  Clock,
  Building,
  GraduationCap
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      
      {/* Trust Badges Section */}
      <div className="bg-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Award, value: '99.9%', label: 'Accuracy Rate' },
              { icon: Clock, value: '<2s', label: 'Verification Speed' },
              { icon: Shield, value: '256-bit', label: 'SSL Encryption' },
              { icon: Building, value: '200+', label: 'Institutions' }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
                <stat.icon className="h-6 w-6 text-primary-200" />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-primary-100 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/30">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">TrueGrad</div>
                <div className="text-primary-200 text-xs">Authenticity Validator</div>
              </div>
            </div>
            <p className="text-primary-100 mb-4 leading-relaxed text-sm">
              Advanced AI-powered platform to verify academic certificates, prevent fraud, 
              and maintain the integrity of educational credentials worldwide.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-2">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Github, label: 'GitHub' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-white/10 rounded-lg transition-all duration-200 hover:bg-white/20 hover:scale-110 backdrop-blur-sm"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-md font-semibold mb-4 text-white border-b border-primary-300/30 pb-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { icon: FileCheck, name: 'Single Verifier', path: '/verifier' },
                { icon: Users, name: 'Bulk Verifier', path: '/bulk-verifier' },
                { icon: Scan, name: 'OCR Text Extraction', path: '/ocr' },
                { icon: BarChart3, name: 'Admin Dashboard', path: '/admin' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-primary-100 hover:text-white transition-all duration-200 flex items-center space-x-2 group py-1"
                  >
                    <item.icon className="h-3 w-3 text-primary-300 group-hover:scale-125 transition-transform" />
                    <span className="text-sm group-hover:translate-x-1 transition-transform">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-md font-semibold mb-4 text-white border-b border-primary-300/30 pb-2">
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                'Documentation',
                'API Integration',
                'Security Overview',
                'Compliance Guide',
                'Support Center',
                'Case Studies'
              ].map((resource, index) => (
                <li key={index}>
                  <a href="#" className="text-primary-100 hover:text-white transition-colors duration-200 flex items-center space-x-2 py-1 group">
                    <CheckCircle className="h-3 w-3 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm">{resource}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Verification */}
          <div>
            <h3 className="text-md font-semibold mb-4 text-white border-b border-primary-300/30 pb-2">
              Get Verified
            </h3>
            <div className="space-y-3 mb-4">
              <div className="bg-white/5 rounded-lg p-3 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-sm font-semibold">Instant Verification</span>
                </div>
                <p className="text-primary-100 text-xs">AI-powered certificate authentication</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 group">
                  <Mail className="h-3 w-3 text-primary-300" />
                  <span className="text-primary-100 text-sm group-hover:text-white">support@truegrad.com</span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <Phone className="h-3 w-3 text-primary-300" />
                  <span className="text-primary-100 text-sm group-hover:text-white">+91 XXX XXX XXXX</span>
                </div>
              </div>
            </div>

         
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-300/20 bg-primary-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-primary-200 text-xs text-center md:text-left">
              © 2025 TrueGrad - Academic Certificate Verification System
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <a href="#" className="text-primary-200 hover:text-white transition-colors duration-200">Privacy</a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors duration-200">Terms</a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors duration-200">Security</a>
              <a href="#" className="text-primary-200 hover:text-white transition-colors duration-200">Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;