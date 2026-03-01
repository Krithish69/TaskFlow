import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import { Users, UserPlus, Shield, Trash2, Mail } from 'lucide-react';

const Teams = () => {
  const { user } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { data } = await API.get('/teams/my-teams');
        setTeams(data.teams);
      } catch (err) {
        console.error("Error fetching teams", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading your workspace...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Teams</h1>
          <p className="text-slate-500">Manage your collaborative workspaces and members</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all">
          <UserPlus size={20} /> Create Team
        </button>
      </div>

      <div className="grid gap-8">
        {teams.map((team) => (
          <div key={team._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Team Header */}
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-inner">
                  <Users size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{team.name}</h2>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Team ID: {team._id.slice(-6)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Mail size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            {/* Members List */}
            <div className="p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                Members ({team.members?.length || 0})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {team.members?.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-50 bg-slate-50/30">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                      {member.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{member.name || "Member Name"}</p>
                      <p className="text-xs text-slate-500 truncate">{member.email || "user@taskflow.com"}</p>
                    </div>
                    {team.owner === member._id && (
                      <Shield size={16} className="text-amber-500" title="Team Owner" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;