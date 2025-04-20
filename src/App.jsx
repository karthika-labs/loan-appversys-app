import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './components/LoginRegister';
import HomePage from './components/HomePage';
import ApplyLoan from './components/ApplyLoan';
import ViewLoanApplication from './components/ViewLoanApplication';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserLoanApplications from './components/UserLoanApplications';
import AdminDashboard from './components/AdminDashboard';  // Add this line
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/apply-loan" element={<ApplyLoan />} />
          <Route path="/view-loan-application" element={<ViewLoanApplication />} />
          <Route path="/view-myloan-application" element={<UserLoanApplications />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
