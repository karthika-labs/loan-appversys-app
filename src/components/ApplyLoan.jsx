import React, { useState } from 'react';

function ApplyLoan() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    annualIncome: '',
     occupationType: '',
    occupation: '',
    loanAmount: '',
    loanPurpose: '',
    loanTenure: '',
    address: '',
    mobileNumber: '',
    altMobileNumber: '',
    email: '',
    maritalStatus: '',
    proofOfIncome: '',
    bankName: '',
    accountNumber: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    existingLoans: '',
    collateralDetails: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mt-5">
      <h1>Apply for a Loan</h1>
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
            <label className="form-label">Gender</label>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                onChange={handleChange}
                checked={formData.gender === 'Male'}
              />
              <label htmlFor="male" className="mx-2">Male</label>

              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                onChange={handleChange}
                checked={formData.gender === 'Female'}
              />
              <label htmlFor="female" className="mx-2">Female</label>

              <input
                type="radio"
                id="other"
                name="gender"
                value="Other"
                onChange={handleChange}
                checked={formData.gender === 'Other'}
              />
              <label htmlFor="other" className="mx-2">Other</label>
            </div>
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
            <div className="col-md-4 mb-3">
              <label htmlFor="aadhaar1" className="form-label">Aadhaar Number</label>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  id="aadhaar1"
                  name="aadhaar1"
                  maxLength="4"
                  value={formData.aadhaar1}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <span className="mx-1">-</span>
                <input
                  type="text"
                  className="form-control"
                  id="aadhaar2"
                  name="aadhaar2"
                  maxLength="4"
                  value={formData.aadhaar2}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <span className="mx-1">-</span>
                <input
                  type="text"
                  className="form-control"
                  id="aadhaar3"
                  name="aadhaar3"
                  maxLength="4"
                  value={formData.aadhaar3}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
            </div>
          </div>

          {/* PAN Details */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="panDetails" className="form-label">PAN Number</label>
              <input
                type="text"
                className="form-control"
                id="panDetails"
                name="panDetails"
                value={formData.panDetails}
                onChange={handleChange}
                required
                maxLength="10"
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
            <label htmlFor="loanPurpose" className="form-label">Loan Purpose</label>
            <select
              className="form-select"
              id="loanPurpose"
              name="loanPurpose"
              value={formData.loanPurpose}
              onChange={handleChange}
              required
            >
              <option value="">Select Purpose</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Education Loan">Education Loan</option>
              <option value="Car Loan">Car Loan</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="loanTenure" className="form-label">Preferred Loan Tenure</label>
            <input
              type="text"
              className="form-control"
              id="loanTenure"
              name="loanTenure"
              value={formData.loanTenure}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
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
            <label htmlFor="email" className="form-label">Email Address</label>
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

          
            
            


          <div className="col-md-6 mb-3">
            <label htmlFor="maritalStatus" className="form-label">Marital Status</label>
            <select
              className="form-select"
              id="maritalStatus"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Married">Married</option>
              <option value="Single">Single</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>
        <div>
        <div className="col-md-6 mb-3">
                <label htmlFor="occupationType" className="form-label">Occupation Type</label>
                <select
                className="form-select"
                id="occupationType"
                name="occupationType"
                value={formData.occupationType}
                onChange={handleChange}
                required
                >
                <option value="">Select Occupation Type</option>
                <option value="Salaried">Salaried</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Retired">Retired</option>
                </select>
            </div>
        </div>
        


        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="proofOfIncome" className="form-label">Proof of Income</label>
            <input
              type="file"
              className="form-control"
              id="proofOfIncome"
              name="proofOfIncome"
              onChange={handleChange}
              required
            />
          </div>

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
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="accountNumber" className="form-label">Bank Account Number</label>
            <input
              type="text"
              className="form-control"
              id="accountNumber"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              required
            />
          </div>

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
        </div>

        <div className="row">
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

          <div className="col-md-6 mb-3">
            <label htmlFor="existingLoans" className="form-label">Existing Loans</label>
            <textarea
              className="form-control"
              id="existingLoans"
              name="existingLoans"
              value={formData.existingLoans}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="collateralDetails" className="form-label">Collateral Details</label>
            <textarea
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
