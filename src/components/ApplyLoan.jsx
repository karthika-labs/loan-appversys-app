import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';



function ApplyLoan() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    applicantDOB: '',
    gender: '',
    annualIncome: '',
    occupation: '',
    loanAmount: '',
    tenure: '',
    address: '',
    mobNo: '',
    alternateMobileNo: '',
    email: '',
    marital_status: '',  // Added marital_status field
    aadharNo: '',
    panNo: '',
    pBank_Name: '',
    ifsc_code: '',
    emergency_contact_name: '',
    emergency_contact_num: '',
    emrContactName: '',
    emrContactNum: '',
    existing_loan: '',
    collateral_details: '',
    document: null
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [documentID, setDocumentID] = useState(null);
  
  const token = localStorage.getItem('token');
  
  if (!token) {
    navigate('/');
    return;
  }
  let userId = null;
if (token) {
  const decoded = jwt_decode(token);
  userId = decoded.userID;
}
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
  setFormData({ ...formData, document: e.target.files[0] });
  };

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('document', formData.document);

    try {
      const response = await axios.post(`http://localhost:5123/api/loans/uploadDocument`, payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Set token for auth
        }
      });
      setDocumentID(response.data.documentID); // Save documentID
      toast.success("Document uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload document");
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!documentID) {
      toast.error("Please upload the necessary documents before submitting your application.");
      return;
    }

    const payload = {
      ...formData,
      emrContactName: formData.emergency_contact_name,
      emrContactNum: formData.emergency_contact_num,
      documentID: documentID,
      userid: userId,
      
      
    };

    try {
      const response = await axios.post('http://localhost:5123/api/loans/apply', payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Set token for auth
        }
      });
      toast.success(response.data.message || "Loan application submitted successfully");
      setError(null);
      setSuccess("Application submitted Successfully");
    } catch (err) {
      if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Error submitting the loan application. Please try again.");
      }
      setError("Error submitting the loan application.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Apply for a Loan</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="dob" className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="applicantDOB"
              value={formData.applicantDOB}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select
              className="form-control"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="annualIncome" className="form-label">Annual Income</label>
            <input
              type="number"
              className="form-control"
              id="annualIncome"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="occupation" className="form-label">Occupation</label>
            <input
              type="text"
              className="form-control"
              id="occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="loanAmount" className="form-label">Loan Amount</label>
            <input
              type="number"
              className="form-control"
              id="loanAmount"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="loanTenure" className="form-label">Loan Tenure (Months)</label>
            <input
              type="number"
              className="form-control"
              id="loanTenure"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobileNumber"
              name="mobNo"
              value={formData.mobNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="alternateMobileNo" className="form-label">Alternate Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="alternateMobileNo"
              name="alternateMobileNo"
              value={formData.alternateMobileNo}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="marital_status" className="form-label">Marital Status</label>
            <select
              className="form-control"
              id="marital_status"
              name="marital_status"
              value={formData.marital_status}
              onChange={handleChange}
              required
            >
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
     

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="aadharNo" className="form-label">Aadhar Number</label>
            <input
              type="text"
              className="form-control"
              id="aadharNo"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="panNo" className="form-label">PAN Number</label>
            <input
              type="text"
              className="form-control"
              id="panNo"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="bankName" className="form-label">Bank Name</label>
            <input
              type="text"
              className="form-control"
              id="bankName"
              name="pBank_Name"
              value={formData.pBank_Name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="ifscCode" className="form-label">IFSC Code</label>
            <input
              type="text"
              className="form-control"
              id="ifscCode"
              name="ifsc_code"
              value={formData.ifsc_code}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="emergencyContactName" className="form-label">Emergency Contact Name</label>
            <input
              type="text"
              className="form-control"
              id="emergencyContactName"
              name="emergency_contact_name"
        
              value={formData.emergency_contact_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="emergencyContactNumber" className="form-label">Emergency Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="emergencyContactNumber"
              name="emergency_contact_num"
              value={formData.emergency_contact_num}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="existingLoans" className="form-label">Existing Loan</label>
            <select
              className="form-control"
              id="existingLoans"
              name="existing_loan"
              value={formData.existing_loan}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="collateralDetails" className="form-label">Collateral Details</label>
            <input
              type="text"
              className="form-control"
              id="collateralDetails"
              name="collateral_details"
              value={formData.collateral_details}
              onChange={handleChange}
            />
          </div>
          </div>
          <div className="mb-3">
            <label htmlFor="document" className="form-label">Upload Document</label>
            <input
              type="file"
              className="form-control"
              id="document"
              name="document"
              onChange={handleFileChange} // This keeps track of file input
            />
            <button type="button" className="btn btn-secondary mt-2" onClick={handleDocumentUpload}>
              Upload Document
            </button>
            {documentID && (
              <div className="mt-2 text-success">
                Document uploaded successfully. Document ID: {documentID}
              </div>
            )}
          </div>

          


        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default ApplyLoan;
