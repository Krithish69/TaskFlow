import React, { useState } from 'react';
import { X } from 'lucide-react';
import API from '../api/axios';

const CreateTaskModal = ({ projectId, isOpen, onClose, onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/tasks', { ...formData, project: projectId });
      onTaskCreated(data.data);
      onClose();
      // Reset form state
      setFormData({ title: '', description: '', priority: 'Medium', dueDate: '' });
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">New Task</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Task Title</label>
            <input 
              required
              value={formData.title}
              className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              placeholder="e.g., Design System Update"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Description</label>
            <textarea 
              value={formData.description}
              className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none h-24 transition-all resize-none"
              placeholder="What needs to be done?"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* Integrated Priority and Deadline Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Priority</label>
              <select 
                className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all"
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Deadline</label>
              <input 
                type="date"
                value={formData.dueDate}
                className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] mt-4"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;