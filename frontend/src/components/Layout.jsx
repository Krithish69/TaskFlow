import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBAr';

const Layout = ({ children, projectName }) => {
  const [searchQuery, setSearchQuery] = useState("");
  // --- INTEGRATED: Priority Filter State ---
  const [priorityFilter, setPriorityFilter] = useState("All");

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* --- INTEGRATED: TopBar with Priority Props --- */}
        <TopBar 
          projectName={projectName} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-7xl mx-auto">
            {/* CONSOLIDATED: Single map to pass all props to children */}
            {React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, { 
                  searchQuery, 
                  setSearchQuery, 
                  priorityFilter 
                });
              }
              return child;
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;