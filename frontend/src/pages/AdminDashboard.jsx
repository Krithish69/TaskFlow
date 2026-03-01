import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import { Users, ShieldCheck, Trash2, Mail } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalUsers: 0 });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { data } = await API.get('/users/admin/users');
        setUsers(data.data);
        setStats({ totalUsers: data.count });
      } catch (err) {
        console.error("Access denied or server error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      try {
        await API.delete(`/users/${id}`);
        setUsers(users.filter(u => u._id !== id));
        setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
      } catch (err) {
        console.error("Failed to delete user", err);
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Loading system metrics...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header & Stats Card */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <ShieldCheck className="text-blue-600" size={32} />
            System Administration
          </h1>
          <p className="text-slate-500 mt-1">Monitor user activity and manage platform access</p>
        </div>
        
        <div className="bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-xl shadow-blue-200 flex items-center gap-6">
          <div className="bg-white/20 p-3 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-blue-100 text-sm font-bold uppercase tracking-wider">Total Registered Users</p>
            <p className="text-3xl font-black">{stats.totalUsers}</p>
          </div>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h2 className="font-bold text-slate-800 text-lg">User Directory</h2>
          <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase">
            Live Database
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase font-bold tracking-widest">
                <th className="p-4 pl-8">User Details</th>
                <th className="p-4 text-center">Account Role</th>
                <th className="p-4">User ID</th>
                <th className="p-4 pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="p-4 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-blue-600 border border-slate-200">
                        {u.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{u.name}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Mail size={12} /> {u.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      u.role === 'Admin' 
                        ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                        : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[10px] text-slate-300">
                    {u._id}
                  </td>
                  <td className="p-4 pr-8 text-right">
                    <button 
                      onClick={() => handleDelete(u._id)}
                      className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;