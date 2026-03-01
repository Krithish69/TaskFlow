import { LayoutDashboard, Users, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0 shadow-2xl">
      <div className="p-8 text-2xl font-black italic tracking-tighter text-blue-500">
        TASKFLOW
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all font-medium">
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link to="/teams" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all font-medium">
          <Users size={20} /> My Teams
        </Link>
      </nav>

      <div className="p-6 border-t border-white/5 bg-white/5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
            {user?.name?.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">{user?.name}</p>
            <span className="text-[10px] uppercase tracking-widest text-slate-400">{user?.role}</span>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold">
          <LogOut size={16} /> SIGN OUT
        </button>
      </div>
    </div>
  );
};

export default Sidebar;