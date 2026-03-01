import React from 'react';
import { MessageSquare, Clock, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onMove, onDelete, user }) => {
  const priorityColors = {
    High: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400',
    Medium: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400',
    Low: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400'
  };

  const getDeadlineStatus = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const deadline = new Date(dueDate);
    const diffDays = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: "Overdue", color: "text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-300" };
    if (diffDays === 0) return { label: "Due Today", color: "text-orange-700 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-300" };
    if (diffDays <= 3) return { label: `Due in ${diffDays}d`, color: "text-amber-700 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-300" };
    
    return { 
      label: deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
      color: "text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400" 
    };
  };

  const deadline = getDeadlineStatus(task.dueDate);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-xl dark:hover:shadow-blue-900/10 transition-all cursor-pointer group relative">
      
      {/* Top Badges */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2">
          <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${priorityColors[task.priority] || 'bg-slate-50 text-slate-500'}`}>
            {task.priority || 'Normal'}
          </span>
          {deadline && (
            <span className={`text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 ${deadline.color}`}>
              <Clock size={10} /> {deadline.label}
            </span>
          )}
        </div>

        {user?.role === 'admin' && (
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(task._id); }} 
            className="text-slate-300 dark:text-slate-600 hover:text-red-500 transition-all p-1 opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
        {task.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
        {task.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
        <div className="flex gap-4 text-slate-400 dark:text-slate-600">
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <MessageSquare size={14} /> {task.comments?.length || 0}
          </div>
        </div>
        
        <select 
          value={task.status} 
          onChange={(e) => onMove(task._id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 border-none rounded-lg px-2 py-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors outline-none cursor-pointer"
        >
          <option value="To Do">TO DO</option>
          <option value="In Progress">IN PROGRESS</option>
          <option value="Done">DONE</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;