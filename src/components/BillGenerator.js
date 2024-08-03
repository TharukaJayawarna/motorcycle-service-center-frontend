import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MotorcycleBillGenerator = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showJobList, setShowJobList] = useState(false);
  const [amountReceived, setAmountReceived] = useState(0);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() !== '') {
      const filtered = jobs.filter(job => job.name.toLowerCase().includes(term.toLowerCase()));
      setFilteredJobs(filtered);
      setShowJobList(true);
    } else {
      setFilteredJobs([]);
      setShowJobList(false);
    }
  };

  const handleJobSelection = (job) => {
    if (!selectedJobs.some(j => j._id === job._id)) {
      setSelectedJobs([...selectedJobs, job]);
      setTotal(total + job.cost);
    }
  };

  const handleRemoveJob = (id) => {
    const jobToRemove = selectedJobs.find(job => job._id === id);
    if (jobToRemove) {
      setSelectedJobs(selectedJobs.filter(job => job._id !== id));
      setTotal(total - jobToRemove.cost);
    }
  };

  const handleAmountReceivedChange = (e) => {
    const amount = parseFloat(e.target.value);
    setAmountReceived(amount);
    setBalance(amount - total);
  };

  const handlePrint = () => {
    navigate('/bill', {
      state: {
        vehicleNumber,
        selectedJobs,
        total,
        amountReceived,
        balance,
      },
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div className="form-group" style={{ marginBottom: '20px' }}>
        <label htmlFor="vehicleNumber" style={{ fontWeight: 'bold' }}>Vehicle Number:</label>
        <input
          type="text"
          className="form-control"
          id="vehicleNumber"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '5px' }}
        />
      </div>
      <div className="form-group" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: '100%', padding: '10px' }}
        />
      </div>
      {showJobList && (
        <div>
          <h3 style={{ marginBottom: '20px' }}>Services:</h3>
          <table className="table" style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Service</th>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Price</th>
                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map(job => (
                <tr key={job._id}>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{job.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>Rs {job.cost}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleJobSelection(job)}
                      style={{ padding: '5px 10px' }}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <h3 style={{ marginBottom: '20px' }}>Selected Jobs:</h3>
      <table className="table" style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Service</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedJobs.map(job => (
            <tr key={job._id}>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{job.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>Rs {job.cost}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveJob(job._id)}
                  style={{ padding: '5px 10px' }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2} style={{ border: '1px solid #ddd', padding: '10px' }}>Total: Rs {total}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '10px' }}>Amount Received:</td>
            <td style={{ border: '1px solid #ddd', padding: '10px' }}>
              <input
                type="number"
                className="form-control"
                value={amountReceived}
                onChange={handleAmountReceivedChange}
                style={{ width: '100%', padding: '10px' }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '10px' }}>Balance:</td>
            <td style={{ border: '1px solid #ddd', padding: '10px' }}>Rs {balance.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <button
        className="btn btn-primary"
        onClick={handlePrint}
        style={{ padding: '10px 20px' }}
      >
        Print Bill
      </button>
    </div>
  );
};

export default MotorcycleBillGenerator;
