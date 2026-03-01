import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Trash2, Clock } from 'lucide-react'; 
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext'; 
import TaskComments from '../components/TaskComments';
import CreateTaskModal from '../components/CreateTaskModel'; 

// INTEGRATED: Added priorityFilter to props
const KanbanBoard = ({ searchQuery = "", setSearchQuery, priorityFilter = "All" }) => {
  const { projectId } = useParams();
  const { user } = useContext(AuthContext); 
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const columns = ['To Do', 'In Progress', 'Done'];

  // --- INTEGRATED: Multi-Criteria Filter Logic ---
  const filteredTasks = tasks.filter(task => {
    // 1. Check Search Match (Title or Description)
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Check Priority Match
    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;

    // Only return tasks that pass BOTH filters
    return matchesSearch && matchesPriority;
  });

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

  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await API.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const getDeadlineStatus = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const deadline = new Date(dueDate);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: "Overdue", color: "text-red-600 bg-red-50" };
    if (diffDays === 0) return { label: "Due Today", color: "text-orange-600 bg-orange-50" };
    if (diffDays <= 3) return { label: `Due in ${diffDays}d`, color: "text-amber-600 bg-amber-50" };
    return { 
      label: deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
      color: "text-slate-500 bg-slate-50" 
    };
  };

  return (
    <div className="p-6 h-screen bg-gray-100 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Project Board</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition"
        >
          + Add Task
        </button>
      </div>

      {/* Logic for Empty State (Search or Priority Filter results in 0 tasks) */}
      {filteredTasks.length === 0 && (searchQuery !== "" || priorityFilter !== "All") ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
           <h3 className="text-xl font-bold text-gray-800 mb-2">No tasks found</h3>
           <p className="text-gray-500 mb-6">Try adjusting your search or priority filter.</p>
           <button onClick={() => setSearchQuery("")} className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold">Clear All Filters</button>
        </div>
      ) : (
        <div className="flex space-x-4 flex-1 overflow-x-auto pb-4">
          {columns.map(column => (
            <div key={column} className="flex-1 min-w-[300px] bg-gray-200 p-4 rounded-lg shadow-inner flex flex-col">
              
              <div className="flex justify-between items-center mb-4 px-1">
                <h2 className="font-bold text-lg text-gray-700">{column}</h2>
                <span className="bg-gray-300 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-black shadow-sm">
                  {filteredTasks.filter(t => t.status === column).length}
                </span>
              </div>

              <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                {filteredTasks.filter(t => t.status === column).map(task => {
                  const deadline = getDeadlineStatus(task.dueDate);
                  return (
                    <div key={task._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow group relative">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-2">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            task.priority === 'High' ? 'bg-red-100 text-red-700' :
                            task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {task.priority || 'Low'}
                          </span>

                          {deadline && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${deadline.color}`}>
                              <Clock size={10} />
                              {deadline.label}
                            </span>
                          )}
                        </div>

                        {user?.role === 'admin' && (
                          <button 
                            onClick={() => deleteTask(task._id)}
                            className="text-slate-300 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      <h3 className="font-bold text-gray-800 mb-1">{task.title}</h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{task.description}</p>

                      <div className="pt-4 border-t border-gray-50">
                        <select 
                          value={task.status} 
                          onChange={(e) => moveTask(task._id, e.target.value)}
                          className="text-xs border border-gray-300 rounded-lg p-1.5 w-full bg-gray-50 font-medium focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                        >
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Done">Done</option>
                        </select>
                      </div>
                      <TaskComments taskId={task._id} initialComments={task.comments} />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

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