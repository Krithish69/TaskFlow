import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

const KanbanBoard = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const columns = ['To Do', 'In Progress', 'Done'];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await API.get(`/tasks/project/${projectId}`);
        setTasks(data.data);
      } catch (err) {
        console.error("Error fetching tasks", err);
      }
    };
    fetchTasks();
  }, [projectId]);

  const moveTask = async (taskId, newStatus) => {
    try {
      const { data } = await API.put(`/tasks/${taskId}/status`, { status: newStatus });
      setTasks(tasks.map(t => (t._id === taskId ? data.data : t)));
    } catch (err) {
      console.error("Failed to move task", err);
    }
  };

  return (
    <div className="flex space-x-4 p-6 h-screen bg-gray-100">
      {columns.map(column => (
        <div key={column} className="flex-1 bg-gray-200 p-4 rounded-lg shadow-inner">
          <h2 className="font-bold text-lg mb-4 text-gray-700">{column}</h2>
          <div className="space-y-3">
            {tasks.filter(t => t.status === column).map(task => (
              <div key={task._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{task.description}</p>
  
              {/* Dropdown for status moves */}
              <select 
                value={task.status} 
                onChange={(e) => moveTask(task._id, e.target.value)}
                className="text-xs border rounded p-1 w-full"
              >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
              </select>

              {/* Comment System Integration */}
              <TaskComments taskId={task._id} initialComments={task.comments} />
            </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;