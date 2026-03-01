import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import TaskComments from '../components/TaskComments';
import CreateTaskModal from '../components/CreateTaskModal'; // Import the new modal

const KanbanBoard = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
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

  // Logic to update state when a new task is added
  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="p-6 h-screen bg-gray-100 overflow-hidden flex flex-col">
      {/* Header Section with Add Task Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Project Board</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition"
        >
          + Add Task
        </button>
      </div>

      {/* Kanban Grid */}
      <div className="flex space-x-4 flex-1 overflow-x-auto pb-4">
        {columns.map(column => (
          <div key={column} className="flex-1 min-w-[300px] bg-gray-200 p-4 rounded-lg shadow-inner flex flex-col">
            <h2 className="font-bold text-lg mb-4 text-gray-700">{column}</h2>
            <div className="space-y-3 overflow-y-auto flex-1 pr-2">
              {tasks.filter(t => t.status === column).map(task => (
                <div key={task._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{task.description}</p>
    
                  <select 
                    value={task.status} 
                    onChange={(e) => moveTask(task._id, e.target.value)}
                    className="text-xs border border-gray-300 rounded p-1.5 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>

                  <TaskComments taskId={task._id} initialComments={task.comments} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Integration */}
      <CreateTaskModal 
        projectId={projectId} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onTaskCreated={handleTaskCreated} 
      />
    </div>
  );
};

export default KanbanBoard;