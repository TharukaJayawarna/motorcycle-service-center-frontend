// src/components/JobForm.js

import React, { useState } from 'react';
import axios from 'axios';

const JobForm = () => {
    const [formData, setFormData] = useState({ name: '', cost: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/jobs', formData);
            setFormData({ name: '', cost: '' });
            alert('Job added successfully!');
        } catch (error) {
            console.error('Error adding job', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary">Add Job</button>
        </form>
    );
};

export default JobForm;
