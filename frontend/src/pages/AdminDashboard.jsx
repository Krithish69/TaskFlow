import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, activeProjects: 0 });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { data } = await API.get('/users/admin/users');
        setUsers(data.data);
        setStats(prev => ({ ...prev, totalUsers: data.count }));
      } catch (err) {
        console.error("Access denied or server error", err);
      }
    };
    fetchAdminData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await API.delete(`/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">System Administration</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-6 bg-blue-600 text-white rounded-lg shadow">
          <p className="text-lg">Total Users</p>
          <p className="text-4xl font-bold">{stats.totalUsers}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b hover:bg-gray-50">
                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${u.role === 'Admin' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 text-red-600 cursor-pointer" onClick={() => handleDelete(u._id)}>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;