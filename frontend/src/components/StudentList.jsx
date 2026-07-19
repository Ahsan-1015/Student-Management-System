import React from 'react';
import StudentCard from './StudentCard';

const StudentList = ({
  students,
  onDelete,
  searchQuery,
  setSearchQuery,
  deptFilter,
  setDeptFilter,
  classFilter,
  setClassFilter,
  loading,
}) => {
  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-550 text-sm pointer-events-none">🔍</span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800/60 bg-slate-950/40 text-slate-100 text-xs md:text-sm placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition-all duration-200"
            placeholder="Search by student name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <select
            className="flex-1 md:w-44 px-3 py-2.5 rounded-xl border border-slate-800/60 bg-slate-950 text-slate-100 text-xs md:text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition-all duration-200 cursor-pointer"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            aria-label="Filter by department"
          >
            <option value="All">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="EEE">EEE</option>
            <option value="BBA">BBA</option>
            <option value="English">English</option>
            <option value="Mathematics">Mathematics</option>
          </select>

          <select
            className="flex-1 md:w-44 px-3 py-2.5 rounded-xl border border-slate-800/60 bg-slate-950 text-slate-100 text-xs md:text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition-all duration-200 cursor-pointer"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            aria-label="Filter by class/year"
          >
            <option value="All">All Classes</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>
      </div>

      {/* List content states */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-slate-450 text-sm font-medium animate-pulse-slow">Fetching student records...</p>
        </div>
      ) : students.length === 0 ? (
        <div className="text-center py-20 px-6 bg-slate-900/10 backdrop-blur-sm border border-dashed border-slate-850 rounded-2xl">
          <div className="text-5xl mb-4 opacity-75">📭</div>
          <h3 className="text-lg font-semibold text-slate-200 mb-1">No Students Found</h3>
          <p className="text-slate-450 text-xs md:text-sm max-w-xs mx-auto">We couldn't find any students matching your search criteria or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
