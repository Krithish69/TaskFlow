import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const StatsChart = ({ tasks = [] }) => {
  // 1. Prepare data for the chart
  const data = [
    {
      name: "To Do",
      value: tasks.filter((t) => t.status === "To Do").length,
      color: "#94a3b8",
    }, // slate-400
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "In Progress").length,
      color: "#3b82f6",
    }, // blue-500
    {
      name: "Done",
      value: tasks.filter((t) => t.status === "Done").length,
      color: "#10b981",
    }, // emerald-500
  ].filter((item) => item.value > 0); // Only show statuses that have tasks

  const totalTasks = tasks.length;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-900">Task Overview</h3>
        <p className="text-sm text-slate-400 font-medium">
          Distribution by status
        </p>
      </div>

      <div className="flex-1 relative min-h-[250px]">
        {totalTasks > 0 ? (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-slate-900">
                {totalTasks}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Total Tasks
              </span>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-300 italic text-sm">
            No data available
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-2">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="font-bold text-slate-600">{item.name}</span>
            </div>
            <span className="font-black text-slate-900">
              {Math.round((item.value / totalTasks) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsChart;
