import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const JobForm = () => {
    const [formData, setFormData] = useState({ name: '', cost: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/jobs', formData);
            setFormData({ name: '', cost: '' });
            MySwal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Job added successfully!',
            }).then(() => {
                navigate('/job-list');
            });
        } catch (error) {
            console.error('Error adding job', error);
            MySwal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to add job. Please try again later.',
            });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <form onSubmit={handleSubmit} style={{ width: '600px' }}>
                <div className="form-group">
                    <label>Job Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Cost</label>
                    <input
                        type="number"
                        className="form-control"
                        name="cost"
                        value={formData.cost}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button type="submit" className="btn btn-primary">
                        Add Job
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobForm;
