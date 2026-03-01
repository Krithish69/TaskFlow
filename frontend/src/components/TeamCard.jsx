import React from 'react';
import { Link } from 'react-router-dom';
import { FolderPlus, ChevronRight, Users } from 'lucide-react';

const TeamCard = ({ team, onNewProject }) => {
  // Logic to calculate progress across all projects in the team
  const allTasks = team.projects?.flatMap(p => p.tasks || []) || [];
  const doneTasks = allTasks.filter(t => t.status === 'Done').length;
  const progressPercent = allTasks.length > 0 ? Math.round((doneTasks / allTasks.length) * 100) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 hover:border-blue-100 dark:hover:border-blue-900/50 transition-all hover:shadow-xl hover:shadow-blue-900/5 group">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">{team.name}</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold tracking-widest flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-pulse ${progressPercent === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
              {progressPercent === 100 ? 'Completed' : 'Active Workspace'}
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => onNewProject(team._id)}
          className="bg-slate-900 dark:bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-slate-200 dark:shadow-none"
        >
          <FolderPlus size={20} />
        </button>
      </div>

      {/* --- INTEGRATED: Progress Bar --- */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Team Progress</span>
          <span className="text-xs font-black text-slate-900 dark:text-white">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-1000 ease-out" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center mb-2 px-1">
          <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Projects</h3>
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
            {team.projects?.length || 0} Total
          </span>
        </div>

        {team.projects && team.projects.length > 0 ? (
          team.projects.map(project => (
            <Link 
              to={`/project/${project._id}`} 
              key={project._id}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 group/item transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full group-hover/item:bg-blue-400 transition-colors"></div>
                <span className="font-bold text-slate-600 dark:text-slate-300 group-hover/item:text-blue-700 dark:group-hover/item:text-blue-400">
                  {project.name}
                </span>
              </div>
              <ChevronRight size={18} className="text-slate-300 dark:text-slate-600 group-hover/item:text-blue-400 transition-transform group-hover/item:translate-x-1" />
            </Link>
          ))
        ) : (
          <div className="text-center py-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-400 dark:text-slate-600 font-medium italic">No projects yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;