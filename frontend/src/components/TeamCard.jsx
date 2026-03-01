import { Link } from 'react-router-dom';
import { FolderPlus, ChevronRight, Users } from 'lucide-react';

const TeamCard = ({ team, onNewProject }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 hover:border-blue-100 transition-all hover:shadow-xl hover:shadow-blue-900/5 group">
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-1">{team.name}</h2>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Active Workspace
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => onNewProject(team._id)}
          className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
          title="Create New Project"
        >
          <FolderPlus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center mb-2 px-1">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Projects</h3>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {team.projects?.length || 0} Total
          </span>
        </div>

        {team.projects && team.projects.length > 0 ? (
          team.projects.map(project => (
            <Link 
              to={`/project/${project._id}`} 
              key={project._id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 group/item transition-all border border-transparent hover:border-blue-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-slate-300 rounded-full group-hover/item:bg-blue-400 transition-colors"></div>
                <span className="font-bold text-slate-600 group-hover/item:text-blue-700">
                  {project.name}
                </span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover/item:text-blue-400 transition-transform group-hover/item:translate-x-1" />
            </Link>
          ))
        ) : (
          <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-2xl">
            <p className="text-sm text-slate-400 font-medium italic">No projects yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;