import React from 'react';

function ViewLoanApplication() {
  return (
    <div className="container mt-5">
      <h1>View Your Loan Applications</h1>
      <div className="mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Loan ID</th>
              <th scope="col">Applicant Name</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Pending</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>Approved</td>
            </tr>
            {/* More rows can be added dynamically */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewLoanApplication;
