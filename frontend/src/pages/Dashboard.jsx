import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import TeamCard from '../components/TeamCArd';
import CreateProjectModal from '../components/CreateProjectModel';
import StatsChart from '../components/StatsChart';
import ActivityFeed from '../components/ActivityFeed';
import useLocalStorage from '../hooks/useLocalStorage'; // INTEGRATED hook
import { Plus, Moon, Sun } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [activeTeamId, setActiveTeamId] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  
  // --- INTEGRATED: Persistent Dark Mode State ---
  const [darkMode, setDarkMode] = useLocalStorage('theme-dark', false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await API.get('/teams/my-teams');
        setTeams(data.teams);
      } catch (err) {
        console.error("Error fetching teams", err);
      }
    };
    fetchDashboardData();
  }, []);

  const allTasks = teams.flatMap(team => 
    team.projects.flatMap(proj => proj.tasks || [])
  );

  const mockActivities = [
    { userName: "Krithish", action: "added a comment to", taskTitle: "API Integration", time: "2 MINS AGO", type: "comment" },
    { userName: "Angel", action: "moved to In Progress", taskTitle: "Database Schema", time: "45 MINS AGO", type: "status" },
    { userName: "Ravindra", action: "completed", taskTitle: "UI Design Mockups", time: "2 HOURS AGO", type: "complete" },
  ];

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      {/* Container with theme-aware background */}
      <div className="p-8 max-w-[1600px] mx-auto min-h-screen transition-all duration-500 bg-slate-50 dark:bg-slate-950">
        
        {/* Header with Persistent Toggle */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Hello, {user?.name}. Here’s what’s happening.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-600 dark:text-yellow-400 shadow-sm border border-slate-200 dark:border-slate-800 hover:scale-110 transition-all"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-blue-200 dark:shadow-none transition-all active:scale-95">
              <Plus size={20} /> New Team
            </button>
          </div>
        </header>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-3">
            <StatsChart tasks={allTasks} />
          </div>
          <div className="lg:col-span-6 bg-blue-600 rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-3">Welcome back, {user?.name}!</h2>
              <p className="text-blue-100 font-medium mb-8 max-w-md leading-relaxed">
                You have {allTasks.filter(t => t.status !== 'Done').length} pending tasks across {teams.length} teams.
              </p>
              <button className="bg-white text-blue-600 px-8 py-3.5 rounded-2xl font-bold hover:bg-blue-50 transition-all">
                View Reports
              </button>
            </div>
          </div>
          <div className="lg:col-span-3">
            <ActivityFeed activities={mockActivities} />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Your Teams</h2>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {teams.map((team) => (
            <TeamCard 
              key={team._id} 
              team={team} 
              onNewProject={() => {
                setActiveTeamId(team._id);
                setIsProjectModalOpen(true);
              }} 
            />
          ))}
        </div>

        <CreateProjectModal 
          teamId={activeTeamId}
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          onProjectCreated={(teamId, newProject) => {
            setTeams(teams.map(team => 
              team._id === teamId ? { ...team, projects: [...team.projects, newProject] } : team
            ));
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;