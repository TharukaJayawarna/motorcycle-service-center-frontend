import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [editJob, setEditJob] = useState(null);
    const [newCost, setNewCost] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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
            MySwal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Job deleted successfully!',
            });
        } catch (error) {
            console.error('Error deleting job', error);
            MySwal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error deleting job!',
            });
        }
    };

    const handleUpdate = async () => {
        if (!editJob) return;

        try {
            await axios.put(`http://localhost:5001/api/jobs/${editJob._id}`, {
                ...editJob,
                cost: newCost,
            });
            fetchJobs();
            setEditJob(null);
            setNewCost('');
            MySwal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Job updated successfully!',
            });
        } catch (error) {
            console.error('Error updating job', error);
            MySwal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error updating job!',
            });
        }
    };

    const confirmDelete = (id) => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id);
            }
        });
    };

    // Filter jobs based on search term
    const filteredJobs = jobs.filter(job =>
        job.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ margin: '0 auto', width: '90%' }}>
            <h2 style={{ textAlign: 'center' }}>Job List</h2>

            {/* Search Bar */}
            <div className="form-group" style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search By Job Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%' }}
                />
            </div>

            {/* Table Container */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table className="table" style={{ width: '100%', maxWidth: '1000px' }}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Job Name</th>
                            <th style={{ textAlign: 'center' }}>Job Cost</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredJobs.map((job, index) => (
                            <tr key={job._id}>
                                <td>{index + 1}</td>
                                <td>{job.name}</td>
                                <td style={{ textAlign: 'center' }}>Rs {job.cost.toFixed(2)}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => {
                                            setEditJob(job);
                                            setNewCost(job.cost);
                                        }}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => confirmDelete(job._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editJob && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1050
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '5px',
                        maxWidth: '500px',
                        width: '100%',
                        padding: '20px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #e9ecef',
                            paddingBottom: '10px'
                        }}>
                            <h5 style={{ margin: 0 }}>Update Job Cost</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => setEditJob(null)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    color: '#333'
                                }}
                            >
                                &times;
                            </button>
                        </div>
                        <div style={{ padding: '10px 0' }}>
                            <div className="form-group">
                                <label htmlFor="newCost">New Cost</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="newCost"
                                    value={newCost}
                                    onChange={(e) => setNewCost(e.target.value)}
                                />
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            paddingTop: '10px',
                            borderTop: '1px solid #e9ecef'
                        }}>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setEditJob(null)}
                                style={{ marginRight: '10px' }}
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobList;
