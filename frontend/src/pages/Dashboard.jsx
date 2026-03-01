import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import TeamCard from '../components/TeamCArd';
import CreateProjectModal from '../components/CreateProjectModel';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [activeTeamId, setActiveTeamId] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

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

  const openProjectModal = (teamId) => {
    setActiveTeamId(teamId);
    setIsProjectModalOpen(true);
  };

  const handleProjectCreated = (teamId, newProject) => {
    setTeams(teams.map(team => 
      team._id === teamId 
        ? { ...team, projects: [...team.projects, newProject] } 
        : team
    ));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 font-medium">Hello, {user?.name}. Here’s what’s happening today.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-blue-200 transition-all active:scale-95">
          <Plus size={20} /> New Team
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {teams.map((team) => (
          <TeamCard 
            key={team._id} 
            team={team} 
            onNewProject={openProjectModal} 
          />
        ))}
      </div>

      <CreateProjectModal 
        teamId={activeTeamId}
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
    </div>
  );
};

export default Dashboard;