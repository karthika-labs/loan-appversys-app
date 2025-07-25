// UserLoanApplications.jsx
import React, { useState, useEffect } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import UserSidebar from './UserSideBar.jsx';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import '../styles/userLoanApplications.css';  // Custom CSS for the main content page

const UserLoanApplications = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found. Please login again.');
      navigate('/');
      return;
    }

    let userId = null;
    try {
      const decoded = jwt_decode(token);
      userId = decoded.userID;
    } catch (err) {
      console.error("Failed to decode token", err);
      toast.error('Invalid token. Please login again.');
      navigate('/');
      return;
    }

    const fetchLoanApplications = async () => {
      try {
        const response = await fetch(`http://localhost:5123/api/loans/user/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          toast.error('Failed to fetch loan applications');
          throw new Error('Failed to fetch loan applications');
        }

        const data = await response.json();
        setLoanApplications(data);
        toast.success('Loan applications loaded successfully!');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanApplications();
  }, [navigate]);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="main-content container mt-5">
        <h2>Your Loan Applications</h2>

        {loading && (
          <div className="d-flex justify-content-center mt-3">
            <Spinner animation="border" role="status" />
          </div>
        )}

        {error && (
          <Alert variant="danger" className="mt-3">
            <strong>Error:</strong> {error}
          </Alert>
        )}

        {!loading && !error && loanApplications.length === 0 && (
          <p>You have no loan applications yet.</p>
        )}

        {!loading && !error && loanApplications.length > 0 && (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Loan Application ID</th>
                <th>Loan Amount</th>
                <th>Tenure</th>
                <th>Status</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {loanApplications.map((application) => (
                <tr key={application.loanApplicationID}>
                  <td>{application.loanApplicationID}</td>
                  <td>₹{application.loanAmount}</td>
                  <td>{application.tenure} months</td>
                  <td>
                    <span className={`badge ${
                      application.status === 'Approved' ? 'bg-success' :
                      application.status === 'Rejected' ? 'bg-danger' :
                      'bg-warning text-dark'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                  <td>{application.remark || 'No remark available'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default UserLoanApplications;
