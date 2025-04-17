import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ApplyLoan from './components/ApplyLoan';
import ViewLoanApplication from './components/ViewLoanApplication';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apply-loan" element={<ApplyLoan />} />
        <Route path="/view-loan-application" element={<ViewLoanApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
