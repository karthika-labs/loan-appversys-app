import React, { useState } from 'react';
import axios from 'axios';

function ApplyLoan() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    annualIncome: '',
    occupation: '',
    loanAmount: '',
    loanTenure: '',
    address: '',
    mobileNumber: '',
    altMobileNumber: '',
    email: '',
    maritalStatus: '',  // Added maritalStatus field
    aadharNo: '',
    panNo: '',
    bankName: '',
    ifscCode: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    existingLoans: '',
    collateralDetails: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare payload as per API
    const payload = {
      userid: 1, // Example static userID
      applicantDOB: formData.dob,
      gender: formData.gender,
      annualIncome: formData.annualIncome,
      occupation: formData.occupation,
      loanAmount: formData.loanAmount,
      firstName: formData.firstName,
      lastName: formData.lastName,
      aadharNo: formData.aadharNo,
      panNo: formData.panNo,
      tenure: formData.loanTenure,
      address: formData.address,
      mobNo: formData.mobileNumber,
      alternateMobileNo: formData.altMobileNumber,
      email: formData.email,
      emrContactName: formData.emergencyContactName,
      emrContactNum: formData.emergencyContactNumber,
      marital_status: formData.maritalStatus,  // Added marital_status in payload
      pBank_Name: formData.bankName,
      ifsc_code: formData.ifscCode,
      emergency_contact_name: formData.emergencyContactName,
      emergency_contact_num: formData.emergencyContactNumber,
      existing_loan: formData.existingLoans,
      collateral_details: formData.collateralDetails
    };

    // Send POST request to the API
    axios.post('http://localhost:5123/api/loans/apply', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'Cookie_1=value',  // Replace with actual cookie value
      }
    })
    .then(response => {
      setSuccess("Loan application submitted successfully!");
      setError(null);  // Clear any previous errors
    })
    .catch(err => {
      setSuccess(null);  // Clear any previous success messages
      setError("Error submitting the loan application. Please try again.");
    });
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
              name="dob"
              value={formData.dob}
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
              name="loanTenure"
              value={formData.loanTenure}
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
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="altMobileNumber" className="form-label">Alternate Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="altMobileNumber"
              name="altMobileNumber"
              value={formData.altMobileNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="maritalStatus" className="form-label">Marital Status</label>
            <select
              className="form-control"
              id="maritalStatus"
              name="maritalStatus"
              value={formData.maritalStatus}
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
              name="bankName"
              value={formData.bankName}
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
              name="ifscCode"
              value={formData.ifscCode}
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
              name="emergencyContactName"
              value={formData.emergencyContactName}
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
              name="emergencyContactNumber"
              value={formData.emergencyContactNumber}
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
              name="existingLoans"
              value={formData.existingLoans}
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
              name="collateralDetails"
              value={formData.collateralDetails}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default ApplyLoan;
