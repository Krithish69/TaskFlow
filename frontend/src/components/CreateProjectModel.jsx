import React, { useState } from 'react';
import { X } from 'lucide-react';
import API from '../api/axios';

const CreateProjectModal = ({ teamId, isOpen, onClose, onProjectCreated }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Calls the POST /api/projects endpoint
      const { data } = await API.post('/projects', { name, team: teamId });
      onProjectCreated(teamId, data.data);
      onClose();
      setName('');
    } catch (err) {
      console.error("Error creating project", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-slate-800">New Project</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Project Name</label>
            <input 
              required
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g., Q1 Marketing Campaign"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;