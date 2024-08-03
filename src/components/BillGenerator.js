// src/components/BillGenerator.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BillGenerator = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [total, setTotal] = useState(0);

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

    const handleJobSelection = (e) => {
        const jobId = e.target.value;
        const selectedJob = jobs.find(job => job._id === jobId);
        if (selectedJob && !selectedJobs.some(job => job._id === selectedJob._id)) {
            setSelectedJobs([...selectedJobs, selectedJob]);
            setTotal(total + selectedJob.cost);
        }
    };

    const handleRemoveJob = (id) => {
        const jobToRemove = selectedJobs.find(job => job._id === id);
        if (jobToRemove) {
            setSelectedJobs(selectedJobs.filter(job => job._id !== id));
            setTotal(total - jobToRemove.cost);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div>
            <h2>Generate Bill</h2>
            <select className="form-control mb-3" onChange={handleJobSelection}>
                <option value="">Select Job</option>
                {jobs.map(job => (
                    <option key={job._id} value={job._id}>
                        {job.name} - Rs:{job.cost}
                    </option>
                ))}
            </select>
            <h3>Selected Jobs:</h3>
            <ul className="list-group">
                {selectedJobs.map(job => (
                    <li key={job._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {job.name} - Rs:{job.cost}
                        <button className="btn btn-danger btn-sm" onClick={() => handleRemoveJob(job._id)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3>Total: Rs:{total}</h3>
            <button className="btn btn-primary mt-3" onClick={handlePrint}>Print Bill</button>
        </div>
    );
};

export default BillGenerator;
