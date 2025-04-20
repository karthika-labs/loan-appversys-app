import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleApplyLoan = () => {
    navigate('/apply-loan');
  };

  const handleViewLoanApplication = () => {
    navigate('/view-myloan-application');
  };

  return (
    <div className="container text-center mt-5">
      <h1>Welcome to the Loan Application System</h1>
      <div className="mt-4">
        <button
          onClick={handleApplyLoan}
          className="btn btn-primary mx-2"
        >
          Apply Loan
        </button>
        <button
          onClick={handleViewLoanApplication}
          className="btn btn-secondary mx-2"
        >
          View My Loan Application
        </button>
      </div>
    </div>
  );
}

export default HomePage;
