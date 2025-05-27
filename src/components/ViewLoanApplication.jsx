import React, { useState, useEffect } from 'react';
import { Modal, Button, Nav, Col, Row, Container, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ViewLoanApplications = () => {
  const [loanApplications, setLoanApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedLoan, setExpandedLoan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [remark, setRemark] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); 
    if (!token) {
      navigate('/');
      return;
    }
    const userId = localStorage.getItem('userId');

  const fetchLoanApplications = async () => {
    try {
      const response = await fetch('http://localhost:5123/api/loans', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLoanApplications(data);
    } catch (error) {
      console.error('Error fetching loan applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanApplications();
  }, []);

  const handleViewClick = async (loanId) => {
    try {
      const response = await fetch(`http://localhost:5123/api/loans/${loanId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const loanDetails = await response.json();
      setExpandedLoan(loanDetails);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching loan details:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setExpandedLoan(null);
    setRemark('');
    setSelectedStatus(null);
  };

  const handleApproval = async (status) => {
    if (!expandedLoan) return;

   
    try {
      await fetch(`http://localhost:5123/api/loans/${expandedLoan.loanApplicationID}/approval`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status, remark }),
      });

      handleCloseModal();
      fetchLoanApplications(); // Refresh list
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };
  const handleActionClick = (status) => {
    setSelectedStatus(status);
    setRemark(''); // Clear old remark
  };
  const handleVerifyDocument = async (loanApplicationID) => {
  try {
    const response = await fetch(`http://localhost:5123/api/loans/${loanApplicationID}/document/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    console.log(data);
    console.log(response)

    if (response.ok) {
      toast.success(data.verificationStatus || 'Document verified successfully!');
    } else {
      toast.error(data.verificationStatus || 'Document verification failed.');
    }
  } catch (error) {
    toast.error(`Error verifying document: ${error.message}`);
  }
};

  const handleViewDocument = async (loanApplicationID) => {
  try {
    const response = await fetch(`http://localhost:5123/api/loans/${loanApplicationID}/document`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch document details.');
    }

    const { documentPath } = await response.json();
    if (documentPath) {
      const documentURL = `http://localhost:5123/${documentPath}`;
      window.open(documentURL, '_blank');
    } else {
      toast.error('Document path is empty or invalid.');
    }
  } catch (error) {
    toast.error(`Error viewing document: ${error.message}`);
  }
};

  return (
    <Container fluid>
      
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-white vh-100 p-3">
          <h4 className="mb-4">Welcome User</h4>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/admin-dashboard" className="text-white">Home</Nav.Link>
            
            <Nav.Link onClick={() => { localStorage.removeItem('token'); navigate('/'); }} className="text-white">Logout</Nav.Link>
          </Nav>
        </Col>

        {/* Main content */}
        <Col md={10} className="p-4">
          <h2 className="mb-4">Loan Applications</h2>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Applicant Name</th>
                  <th>Loan Amount</th>
                  <th>Tenure</th>
                  <th>Annual Income</th>
                  <th>Existing Loan</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loanApplications.length > 0 ? (
                  loanApplications.map((application) => (
                    <tr key={application.loanApplicationID}>
                      <td>{`${application.firstName} ${application.lastName}`}</td>
                      <td>₹{application.loanAmount}</td>
                      <td>{application.tenure}</td>
                      <td>₹{application.annualIncome}</td>
                      <td>{application.existing_loan}</td>
                      <td>
                        <span className={`badge ${
                          application.approvalStatus === 'Approved' ? 'bg-success' :
                          application.approvalStatus === 'Rejected' ? 'bg-danger' :
                          'bg-warning text-dark'
                        }`}>
                          {application.approvalStatus}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-info" onClick={() => handleViewClick(application.loanApplicationID)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No loan applications available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {/* Modal */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Loan Application Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {expandedLoan && (
                <div>
                  <p><strong>Loan Application ID:</strong> {expandedLoan.loanApplicationID}</p>
                  <p><strong>Applicant Name:</strong> {`${expandedLoan.firstName} ${expandedLoan.lastName}`}</p>
                  <p><strong>Applicant DOB:</strong> {new Date(expandedLoan.applicantDOB).toLocaleDateString()}</p>
                  <p><strong>Gender:</strong> {expandedLoan.gender}</p>
                  <p><strong>Annual Income:</strong> ₹{expandedLoan.annualIncome}</p>
                  <p><strong>Occupation:</strong> {expandedLoan.occupation}</p>
                  <p><strong>Loan Amount:</strong> ₹{expandedLoan.loanAmount}</p>
                  <p><strong>Tenure:</strong> {expandedLoan.tenure} months</p>
                  <p><strong>Address:</strong> {expandedLoan.address}</p>
                  <p><strong>Mobile No:</strong> {expandedLoan.mobNo}</p>
                  <p><strong>Alternate Mobile No:</strong> {expandedLoan.alternateMobileNo}</p>
                  <p><strong>Email:</strong> {expandedLoan.email}</p>
                  <p><strong>Emergency Contact Name:</strong> {expandedLoan.emrContactName}</p>
                  <p><strong>Emergency Contact Number:</strong> {expandedLoan.emrContactNum}</p>
                  <p><strong>Bank Name:</strong> {expandedLoan.pBank_Name}</p>
                  <p><strong>IFSC Code:</strong> {expandedLoan.ifsc_code}</p>
                  <p><strong>Existing Loan:</strong> {expandedLoan.existing_loan}</p>
                  <p><strong>Collateral Details:</strong> {expandedLoan.collateral_details}</p>
                  <p><strong>Approval Status:</strong> {expandedLoan.approvalStatus}</p>
                  <p><strong>Remark:</strong> {expandedLoan.remark || 'No remark available'}</p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer className="flex-column align-items-stretch gap-2">
              {selectedStatus ? (
                <>
                  <div className="w-100">
                    <label>
                      Remark for <strong>{selectedStatus}</strong>:
                    </label>
                    <textarea
                      className="form-control mt-2"
                      rows={3}
                      placeholder="Enter your remark here..."
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-end gap-2 w-100 mt-3">
                    <Button
                      variant="primary"
                      onClick={() => handleApproval(selectedStatus)}
                      disabled={!remark.trim()}
                    >
                      Submit {selectedStatus}
                    </Button>
                    <Button variant="secondary" onClick={() => setSelectedStatus(null)}>
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex gap-2 flex-wrap">
                    <Button variant="info" onClick={() => handleViewDocument(expandedLoan.loanApplicationID)}>
                      View Document
                    </Button>
                    <Button variant="warning" onClick={() => handleVerifyDocument(expandedLoan.loanApplicationID)}>
                      Verify Document
                    </Button>
                  </div>
                  <Button variant="success" onClick={() => handleActionClick("Approved")}>
                    Approve
                  </Button>
                  <Button variant="danger" onClick={() => handleActionClick("Rejected")}>
                    Reject
                  </Button>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                  </Button>
                </>
              )}
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>

    </Container>
    
  );
};

export default ViewLoanApplications;
