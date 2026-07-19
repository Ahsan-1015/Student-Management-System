import React from 'react';
import { Link } from 'react-router-dom';

const StudentCard = ({ student, onDelete }) => {
  const {
    _id,
    studentId,
    fullName,
    email,
    phone,
    department,
    class: classVal,
    address,
    dateOfBirth,
    gender,
    admissionDate,
  } = student;

  // Format date strings to a readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'S';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Get Badge style based on department
  const getDeptBadgeStyle = (dept) => {
    const d = dept ? dept.toLowerCase() : '';
    switch (d) {
      case 'cse': return 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
      case 'eee': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      case 'bba': return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      case 'english': return 'bg-pink-500/10 text-pink-400 border border-pink-500/20';
      case 'mathematics': return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border border-slate-500/20';
    }
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-xl hover:shadow-indigo-950/20 hover:border-indigo-550/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-slate-850 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-md flex items-center justify-center shadow-lg shadow-indigo-550/15 shrink-0">
          {getInitials(fullName)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-slate-100 text-base truncate" title={fullName}>
            {fullName}
          </h3>
          <span className={`inline-block px-2.5 py-0.5 mt-1 rounded-full text-[10px] font-semibold tracking-wider uppercase ${getDeptBadgeStyle(department)}`}>
            {department}
          </span>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-5 flex-1 flex flex-col gap-3 text-xs md:text-sm text-slate-350">
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-sm w-4 shrink-0 text-center">🆔</span>
          <span className="truncate"><strong>ID:</strong> {studentId}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-sm w-4 shrink-0 text-center">📅</span>
          <span className="truncate"><strong>Class:</strong> {classVal}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-sm w-4 shrink-0 text-center">✉️</span>
          <span className="truncate" title={email}><strong>Email:</strong> {email}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-sm w-4 shrink-0 text-center">📞</span>
          <span className="truncate"><strong>Phone:</strong> {phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-sm w-4 shrink-0 text-center">👤</span>
          <span className="truncate"><strong>Gender:</strong> {gender}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-sm w-4 shrink-0 text-center">🎂</span>
          <span className="truncate"><strong>DOB:</strong> {formatDate(dateOfBirth)}</span>
        </div>
        {address && (
          <div className="flex items-center gap-3">
            <span className="text-slate-500 text-sm w-4 shrink-0 text-center">📍</span>
            <span className="truncate" title={address}><strong>Address:</strong> {address}</span>
          </div>
        )}
        <div className="flex items-center gap-3">
          <span className="text-slate-500 text-sm w-4 shrink-0 text-center">📝</span>
          <span className="truncate"><strong>Admitted:</strong> {formatDate(admissionDate)}</span>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-5 py-3.5 bg-slate-950/40 border-t border-slate-850 flex gap-3">
        <Link 
          to={`/edit/${_id}`} 
          className="flex-1 py-2 px-3 rounded-xl bg-slate-850 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-1.5"
        >
          ✏️ Edit
        </Link>
        <button 
          onClick={() => onDelete(student)} 
          className="flex-1 py-2 px-3 rounded-xl bg-red-950/20 hover:bg-red-650 text-red-400 hover:text-white text-xs font-semibold border border-red-900/30 hover:border-transparent transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          aria-label={`Delete student ${fullName}`}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
