import React from 'react';
import { MessageSquare, RefreshCw, User, CheckCircle2 } from 'lucide-react';

const ActivityFeed = ({ activities = [] }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-900">Recent Activity</h3>
        <p className="text-sm text-slate-400 font-medium">Updates from your teams</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={index} className="flex gap-4 relative">
              {/* Timeline Line */}
              {index !== activities.length - 1 && (
                <div className="absolute left-5 top-10 bottom-[-24px] w-px bg-slate-100" />
              )}

              {/* Icon Container */}
              <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                activity.type === 'comment' ? 'bg-blue-50 text-blue-500' : 
                activity.type === 'status' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'
              }`}>
                {activity.type === 'comment' ? <MessageSquare size={18} /> : 
                 activity.type === 'status' ? <RefreshCw size={18} /> : <CheckCircle2 size={18} />}
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <p className="text-sm text-slate-600 leading-snug">
                  <span className="font-bold text-slate-900">{activity.userName}</span>{' '}
                  {activity.action}{' '}
                  <span className="font-bold text-slate-900">"{activity.taskTitle}"</span>
                </p>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                  {activity.time}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-300">
             <User size={40} className="mb-2 opacity-20" />
             <p className="text-sm italic">No recent updates</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;