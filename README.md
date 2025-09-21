# TrueGrad - Authenticity Validator for Academia

A React + Tailwind CSS + Framer Motion web application for verifying academic certificate authenticity, built for SIH 2025 Hackathon.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation bar
│   ├── StatsCard.jsx       # Reusable stats display card
│   ├── AlertsTable.jsx     # Security alerts table
│   └── BlacklistTable.jsx  # Blacklisted institutions table
├── pages/
│   ├── VerifierUpload.jsx  # Certificate upload page
│   ├── VerifierResult.jsx  # Verification results page
│   └── AdminDashboard.jsx  # Admin dashboard with analytics
├── App.jsx                 # Main app with routing
├── main.jsx               # Entry point
└── index.css              # Global styles with Tailwind
```

## 🎯 Features

### Verifier Flow (`/verifier`)
- **Drag & Drop Upload**: Interactive file upload with visual feedback
- **OCR Preview**: Mock extracted certificate details
- **Verification Process**: Simulated AI analysis with loading states

### Results Page (`/verifier/result`)
- **Validation Status**: Clear ✅ Valid or ❌ Fake indicators
- **Detailed Analysis**: Breakdown of verification checks
- **Confidence Score**: Percentage-based authenticity rating
- **Action Buttons**: Verify another or download report

### Admin Dashboard (`/admin`)
- **Statistics Cards**: Total, valid, fake certificates with trends
- **Interactive Charts**: Pie chart (valid vs fake) and bar chart (by institution)
- **Security Alerts**: Real-time flagged certificates table
- **Blacklist Management**: Add/remove suspicious institutions
- **Recent Activity**: Live feed of system events

## 🎨 Design System

- **Colors**: Primary blue (#3b82f6), Success green (#22c55e), Error red (#ef4444)
- **Components**: Consistent card design with shadows and rounded corners
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Responsive**: Mobile-first design with Tailwind CSS

## 🛠 Tech Stack

- **React 18** - UI framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

## 📊 Mock Data

The application includes comprehensive mock data for:
- Certificate verification results
- OCR extracted information
- Security alerts and flagged certificates
- Blacklisted institutions
- Analytics and statistics
- Recent activity feed

## 🚀 Deployment

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🎯 Hackathon Demo

This application is designed for immediate demo use with:
- **No backend required** - All data is mocked
- **Copy-paste ready** - Complete working codebase
- **Professional UI** - Modern, clean design suitable for presentations
- **Interactive features** - Drag & drop, animations, and responsive design

Perfect for showcasing your frontend development skills and UI/UX design capabilities!
