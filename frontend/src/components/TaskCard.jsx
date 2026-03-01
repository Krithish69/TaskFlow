import { MessageSquare, Clock } from 'lucide-react';

const TaskCard = ({ task, onMove }) => {
  const priorityColors = {
    High: 'text-red-500 bg-red-50',
    Medium: 'text-amber-500 bg-amber-50',
    Low: 'text-emerald-500 bg-emerald-50'
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${priorityColors[task.priority] || 'bg-slate-50'}`}>
          {task.priority || 'Normal'}
        </span>
      </div>

      <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors mb-2">
        {task.title}
      </h3>
      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
        {task.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex gap-4 text-slate-400">
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <MessageSquare size={14} /> {task.comments?.length || 0}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <Clock size={14} /> 2d
          </div>
        </div>
        
        <select 
          value={task.status} 
          onChange={(e) => onMove(task._id, e.target.value)}
          className="text-[10px] font-black bg-slate-100 border-none rounded-lg px-2 py-1 hover:bg-slate-200 transition-colors"
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