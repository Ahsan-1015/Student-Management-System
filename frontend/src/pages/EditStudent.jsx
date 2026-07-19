import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import StudentForm from '../components/StudentForm';

const API_BASE_URL = 'http://localhost:5000/api/students';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch student details on mount
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        setStudent(response.data);
      } catch (err) {
        console.error('API Error fetching student details:', err);
        setError(err.response?.data?.message || 'Failed to fetch student details. Record might not exist.');
      } finally {
        setFetching(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (studentData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${API_BASE_URL}/${id}`, studentData);
      navigate('/');
    } catch (err) {
      console.error('API Error updating student:', err);
      setError(err.response?.data?.message || 'Failed to update student profile.');
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Edit Student Profile</h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">Modify the fields below to update the student record.</p>
        </div>

        {/* Error notification */}
        {error && !fetching && (
          <div className="flex items-center justify-between p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs md:text-sm max-w-3xl mx-auto transition-all">
            <span className="flex items-center gap-2">⚠️ {error}</span>
            <button className="text-lg leading-none hover:opacity-75 focus:outline-none cursor-pointer" onClick={() => setError(null)}>×</button>
          </div>
        )}

        {/* Fetching State */}
        {fetching ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin"></div>
            <p className="text-slate-450 text-sm font-medium animate-pulse-slow">Loading student profile details...</p>
          </div>
        ) : student ? (
          <StudentForm
            initialData={student}
            onSubmit={handleSubmit}
            submitText="Update Student"
            loading={loading}
          />
        ) : (
          <div className="text-center py-16 px-6 bg-slate-900/10 backdrop-blur-sm border border-slate-800 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Record Not Found</h3>
            <p className="text-slate-400 text-xs md:text-sm">We could not retrieve the details for this student profile.</p>
            <button 
              className="mt-4 px-5 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-350 hover:text-white font-semibold text-xs md:text-sm border border-slate-800 hover:border-slate-700 transition-all cursor-pointer" 
              onClick={() => navigate('/')}
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditStudent;
