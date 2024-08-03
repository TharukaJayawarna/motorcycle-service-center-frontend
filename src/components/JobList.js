// src/components/JobList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/api/jobs/${id}`);
            fetchJobs();
            alert('Job deleted successfully!');
        } catch (error) {
            console.error('Error deleting job', error);
        }
    };

    return (
        <div>
            <h2>Job List</h2>
            <ul className="list-group">
                {jobs.map(job => (
                    <li key={job._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {job.name} - Rs:{job.cost}
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(job._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;
