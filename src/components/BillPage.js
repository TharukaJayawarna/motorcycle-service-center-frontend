import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Bill = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicleNumber, selectedJobs, total, amountReceived, balance } = location.state || {};

  if (!vehicleNumber || !selectedJobs) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '12px' }}>
        <h2>Invalid Bill</h2>
        <p>No bill details found. Please generate a bill first.</p>
        <button className="btn btn-primary" onClick={() => navigate('/generate-bill')}>
          Go Back
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bill-container" style={{ padding: '20px', fontFamily: 'monospace', fontSize: '12px' }}>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .bill-container, .bill-container * {
              visibility: visible;
            }
            .bill-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 0;
              font-size: 12px;
            }
            .btn-group {
              display: none;
            }
          }
        `}
      </style>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h3 style={{ margin: '5px 0' }}>THARUKA MOTOR WORKS</h3>
        <p style={{ margin: '5px 0' }}>Dealer for David Peiris Motor Company (PVT) Limited</p>
        <p style={{ margin: '5px 0' }}>WARAPITIYA JUNCTION, NAKANDALAGODA, DHARGA TOWN</p>
        <p style={{ margin: '5px 0' }}>076-7241002</p>
      </div>

      <div style={{ marginBottom: '10px' }}>
      <p><strong>Vehicle Number:</strong> {vehicleNumber}</p>
        <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>Time:</strong> {new Date().toLocaleTimeString()}</p>
        
      </div>
      <h4>Selected Jobs:</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid black' }}>Service</th>
            <th style={{ textAlign: 'right', borderBottom: '1px solid black' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {selectedJobs.map(job => (
            <tr key={job._id}>
              <td style={{ textAlign: 'left', padding: '5px 0' }}>{job.name}</td>
              <td style={{ textAlign: 'right', padding: '5px 0' }}>Rs {job.cost.toFixed(2)}</td>
            </tr>
          ))}
          <tr>
            <td style={{ textAlign: 'left', paddingTop: '10px', fontWeight: 'bold' }}>Total:</td>
            <td style={{ textAlign: 'right', paddingTop: '10px', fontWeight: 'bold' }}>Rs {total.toFixed(2)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', paddingTop: '10px', fontWeight: 'bold' }}>Amount Received:</td>
            <td style={{ textAlign: 'right', paddingTop: '10px', fontWeight: 'bold' }}>Rs {amountReceived.toFixed(2)}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'left', paddingTop: '10px', fontWeight: 'bold' }}>Balance:</td>
            <td style={{ textAlign: 'right', paddingTop: '10px', fontWeight: 'bold' }}>Rs {balance.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>Thank you for choosing Tharuka Motor Works!</p>
      <div className="btn-group" style={{ marginTop: '20px' }}>
        <button className="btn btn-primary" onClick={handlePrint} style={{ marginRight: '10px' }}>
          Print Bill
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/generate-bill')} style={{ marginRight: '10px' }}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Bill;
