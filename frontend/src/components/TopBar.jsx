import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';

const TopBar = ({ 
  projectName = "General Workspace", 
  searchQuery, 
  setSearchQuery, 
  priorityFilter, 
  setPriorityFilter 
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10">
      
      {/* 1. Left: Context / Title */}
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-r border-slate-100 pr-4">
          TaskFlow
        </h2>
        <span className="text-sm font-semibold text-slate-800">
          {projectName}
        </span>
      </div>

      {/* 2. Middle: Search Bar & Filter Group */}
      <div className="flex-1 flex items-center max-w-2xl mx-8">
        {/* Search Bar Container */}
        <div className="flex-1 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-transparent rounded-xl py-2 pl-10 pr-4 text-sm focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
          />
        </div>

        {/* --- INTEGRATED: Priority Filter Dropdown --- */}
        <div className="flex items-center gap-2 ml-4 shrink-0">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Filter:</label>
          <select 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-slate-50 border-none rounded-lg text-xs font-bold text-slate-600 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer hover:bg-slate-100"
          >
            <option value="All">All Priorities</option>
            <option value="High">🔴 High Only</option>
            <option value="Medium">🟠 Medium</option>
            <option value="Low">🟢 Low</option>
          </select>
        </div>
      </div>

      {/* 3. Right: Global Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
          <HelpCircle size={20} />
        </button>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
};

export default TopBar;