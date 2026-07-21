import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentForm = ({ initialData, onSubmit, submitText, loading }) => {
  const navigate = useNavigate();

  // Helper to format date string to YYYY-MM-DD
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  // State for form fields
  const [formData, setFormData] = useState({
    studentId: '',
    fullName: '',
    email: '',
    phone: '',
    department: '',
    class: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    admissionDate: formatDateForInput(new Date()),
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});

  // Populate form if initialData is provided (Edit Mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        studentId: initialData.studentId || '',
        fullName: initialData.fullName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        department: initialData.department || '',
        class: initialData.class || '',
        address: initialData.address || '',
        dateOfBirth: formatDateForInput(initialData.dateOfBirth) || '',
        gender: initialData.gender || '',
        admissionDate: formatDateForInput(initialData.admissionDate) || formatDateForInput(new Date()),
      });
    }
  }, [initialData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when user types/selects
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.class) {
      newErrors.class = 'Class/Year is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      // Validate date of birth is in the past
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob >= today) {
        newErrors.dateOfBirth = 'Date of birth must be in the past';
      }
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-xl p-6 md:p-8 max-w-3xl mx-auto flex flex-col gap-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        
        {/* Student ID */}
        <div className="flex flex-col gap-2">
          <label htmlFor="studentId" className="text-xs font-semibold text-slate-350 uppercase tracking-wider">
            Student ID <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-950/40 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.studentId 
                ? 'border-red-500/80 focus:ring-red-500/10 focus:border-red-500' 
                : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/10'
            }`}
            placeholder="e.g. STU1001"
            value={formData.studentId}
            onChange={handleChange}
            disabled={!!initialData} // Disable editing ID for consistency
          />
          {errors.studentId && <span className="text-xs text-red-400 font-medium mt-0.5">{errors.studentId}</span>}
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-xs font-semibold text-slate-350 uppercase tracking-wider">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-950/40 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.fullName 
                ? 'border-red-500/80 focus:ring-red-500/10 focus:border-red-500' 
                : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/10'
            }`}
            placeholder="e.g. John Doe"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="text-xs text-red-400 font-medium mt-0.5">{errors.fullName}</span>}
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-semibold text-slate-350 uppercase tracking-wider">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-950/40 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.email 
                ? 'border-red-500/80 focus:ring-red-500/10 focus:border-red-500' 
                : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/10'
            }`}
            placeholder="e.g. johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="text-xs text-red-400 font-medium mt-0.5">{errors.email}</span>}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-xs font-semibold text-slate-350 uppercase tracking-wider">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-950/40 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.phone 
                ? 'border-red-500/80 focus:ring-red-500/10 focus:border-red-500' 
                : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/10'
            }`}
            placeholder="e.g. +8801700000000"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span className="text-xs text-red-400 font-medium mt-0.5">{errors.phone}</span>}
        </div>

        {/* Department Selection */}
        <div className="flex flex-col gap-2">
          <label htmlFor="department" className="text-xs font-semibold text-slate-350 uppercase tracking-wider">
            Department <span className="text-red-400">*</span>
          </label>
          <select
            id="department"
            name="department"
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-950 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.department 
                ? 'border-red-500/80 focus:ring-red-500/10 focus:border-red-500' 
                : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/10'
            }`}
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">-- Select Department --</option>
            <option value="CSE">CSE</option>
            <option value="EEE">EEE</option>
            <option value="BBA">BBA</option>
            <option value="English">English</option>
            <option value="Mathematics">Mathematics</option>
          </select>
          {errors.department && <span className="text-xs text-red-400 font-medium mt-0.5">{errors.department}</span>}
        </div>

        {/* Class Year Selection */}
        <div className="flex flex-col gap-2">
          <label htmlFor="class" className="text-xs font-semibold text-slate-350 uppercase tracking-wider">
            Class Year <span className="text-red-400">*</span>
          </label>
          <select
            id="class"
            name="class"
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-950 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.class 
                ? 'border-red-500/80 focus:ring-red-500/10 focus:border-red-500' 
                : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/10'
            }`}
            value={formData.class}
            onChange={handleChange}
          >
            <option value="">-- Select Class Year --</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
          {errors.class && <span className="text-xs text-red-400 font-medium mt-0.5">{errors.class}</span>}
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col gap-2">
          <label htmlFor="dateOfBirth" className="text-xs font-semibold text-slate-350 uppercase tracking-wider">
            Date of Birth <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-950/40 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.dateOfBirth 
                ? 'border-red-500/80 focus:ring-red-500/10 focus:border-red-500' 
                : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/10'
            }`}
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          {errors.dateOfBirth && <span className="text-xs text-red-400 font-medium mt-0.5">{errors.dateOfBirth}</span>}
        </div>

        {/* Gender Selection */}
        <div className="flex flex-col gap-2">
          <label htmlFor="gender" className="text-xs font-semibold text-slate-350 uppercase tracking-wider">
            Gender <span className="text-red-400">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-950 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
              errors.gender 
                ? 'border-red-500/80 focus:ring-red-500/10 focus:border-red-500' 
                : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/10'
            }`}
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <span className="text-xs text-red-400 font-medium mt-0.5">{errors.gender}</span>}
        </div>

        {/* Admission Date */}
        <div className="flex flex-col gap-2">
          <label htmlFor="admissionDate" className="text-xs font-semibold text-slate-350 uppercase tracking-wider">
            Admission Date
          </label>
          <input
            type="date"
            id="admissionDate"
            name="admissionDate"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/40 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
            value={formData.admissionDate}
            onChange={handleChange}
          />
        </div>

        {/* Address (Full Width) */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="address" className="text-xs font-semibold text-slate-350 uppercase tracking-wider">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows="3"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950/40 text-slate-100 text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
            placeholder="Enter physical address..."
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3.5 mt-8 border-t border-slate-850 pt-6">
        <button
          type="button"
          className="px-5 py-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm border border-slate-800 hover:border-slate-700 transition-all cursor-pointer disabled:opacity-50"
          onClick={() => navigate('/')}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-650 hover:to-purple-750 text-white font-semibold text-sm shadow-md shadow-indigo-500/10 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Saving...' : submitText || 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
