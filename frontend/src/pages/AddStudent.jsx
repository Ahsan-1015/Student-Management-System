import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import Navbar from '../components/Navbar';
import StudentForm from '../components/StudentForm';

const AddStudent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (studentData) => {
    setLoading(true);
    setError(null);
    try {
      await api.post('/students', studentData);
      // Navigate to Home upon successful creation
      navigate('/');
    } catch (err) {
      console.error('API Error adding student:', err);
      setError(err.response?.data?.message || 'Failed to add student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:px-6">
        {/* Page Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Add New Student</h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">Create a new student profile in the database system.</p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="flex items-center justify-between p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs md:text-sm max-w-3xl mx-auto transition-all">
            <span className="flex items-center gap-2">⚠️ {error}</span>
            <button className="text-lg leading-none hover:opacity-75 focus:outline-none cursor-pointer" onClick={() => setError(null)}>×</button>
          </div>
        )}

        {/* Student Form */}
        <StudentForm
          onSubmit={handleSubmit}
          submitText="Add Student"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default AddStudent;
