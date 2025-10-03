import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import CompleteProfile from './components/CompleteProfile'
import StartupApplication from './components/StartupApplication'
import Login from './components/Login'
import Signup from './components/Signup'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/StartupOwner/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/StartupOwner/complete-profile" element={<PrivateRoute><CompleteProfile /></PrivateRoute>} />
          <Route path="/StartupOwner/startup-application" element={<PrivateRoute><StartupApplication /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
