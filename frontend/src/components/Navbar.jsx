import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/85 backdrop-blur-md border-b border-slate-850 shadow-lg">
      <div className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <NavLink to="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span>🎓</span> 
          <span>StudentSphere</span> 
          <span className="bg-indigo-500/20 text-indigo-400 text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
            Admin
          </span>
        </NavLink>
        <div className="flex gap-2 items-center">
          <NavLink 
            to="/" 
            className={({ isActive }) => `text-xs md:text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 ${
              isActive 
                ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/10' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            end
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/add" 
            className={({ isActive }) => `text-xs md:text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 ${
              isActive 
                ? 'text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/10' 
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            + Add Student
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
