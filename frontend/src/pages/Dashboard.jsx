import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // You'll need to create this endpoint in your teamController later
        const { data } = await API.get('/teams/my-teams');
        setTeams(data.teams);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Workspace...</div>;

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">+ Create Team</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team._id} className="border rounded-lg p-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold border-b pb-2 mb-4">{team.name}</h2>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500 uppercase">Projects</h3>
              {team.projects?.length > 0 ? (
                team.projects.map(project => (
                  <Link 
                    to={`/project/${project._id}`} 
                    key={project._id}
                    className="block p-2 hover:bg-gray-50 rounded border text-blue-600"
                  >
                    {project.name}
                  </Link>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No projects yet.</p>
              )}
            </div>
            <button className="mt-4 text-sm text-gray-600 hover:text-blue-600">+ New Project</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;