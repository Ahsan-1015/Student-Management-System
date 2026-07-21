import React, { useState, useEffect, useCallback } from 'react';
import api from '../lib/api';
import Navbar from '../components/Navbar';
import StudentList from '../components/StudentList';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');

  // Deletion Modal States
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Success Banner state
  const [successMessage, setSuccessMessage] = useState('');

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchQuery.trim()) params.search = searchQuery.trim();
      if (deptFilter !== 'All') params.department = deptFilter;
      if (classFilter !== 'All') params.class = classFilter;

      const response = await api.get('/students', { params });
      setStudents(response.data);
    } catch (err) {
      console.error('API Error fetching students:', err);
      setError(err.response?.data?.message || 'Failed to load students list. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, deptFilter, classFilter]);

  // Debounced effect for search/filters
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [fetchStudents]);

  // Handle Delete Confirmation
  const handleDeleteConfirm = async () => {
    if (!studentToDelete) return;
    setDeleteLoading(true);
    setError(null);
    try {
      await api.delete(`/students/${studentToDelete._id}`);
      setSuccessMessage(`Successfully deleted student: ${studentToDelete.fullName}`);
      setStudentToDelete(null);
      fetchStudents(); // Refresh list
      
      // Auto-dismiss success message
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error('API Error deleting student:', err);
      setError(err.response?.data?.message || 'Failed to delete student.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Student Directory</h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">Manage your university student records, filters, and credentials.</p>
          </div>
        </div>

        {/* Global Notifications */}
        {successMessage && (
          <div className="flex items-center justify-between p-4 mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs md:text-sm transition-all animate-pulse-slow">
            <span className="flex items-center gap-2">✅ {successMessage}</span>
            <button className="text-lg leading-none hover:opacity-75 focus:outline-none cursor-pointer" onClick={() => setSuccessMessage('')}>×</button>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-between p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs md:text-sm transition-all">
            <span className="flex items-center gap-2">⚠️ {error}</span>
            <button className="text-lg leading-none hover:opacity-75 focus:outline-none cursor-pointer" onClick={() => setError(null)}>×</button>
          </div>
        )}

        {/* Student Records Grid Container */}
        <StudentList
          students={students}
          onDelete={(student) => setStudentToDelete(student)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          deptFilter={deptFilter}
          setDeptFilter={setDeptFilter}
          classFilter={classFilter}
          setClassFilter={setClassFilter}
          loading={loading}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={() => setStudentToDelete(null)}>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden transition-all" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-lg shrink-0">⚠️</div>
              <h2 className="text-lg font-bold text-white">Delete Student Record</h2>
            </div>
            
            <div className="text-slate-300 text-xs md:text-sm flex flex-col gap-2.5">
              <p>Are you sure you want to delete the student profile for <strong>{studentToDelete.fullName}</strong>?</p>
              <p className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-850 font-mono text-xs">
                Student ID: <span className="text-indigo-400">{studentToDelete.studentId}</span>
              </p>
              <p className="text-red-400 text-xs mt-1">
                This operation is permanent and cannot be undone.
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-6 border-t border-slate-850 pt-4">
              <button
                className="px-4 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs md:text-sm border border-slate-800 hover:border-slate-700 transition-all cursor-pointer disabled:opacity-50"
                onClick={() => setStudentToDelete(null)}
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-xl bg-red-650 hover:bg-red-600 text-white font-semibold text-xs md:text-sm shadow-md shadow-red-600/10 transition-all cursor-pointer disabled:opacity-50"
                onClick={handleDeleteConfirm}
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
