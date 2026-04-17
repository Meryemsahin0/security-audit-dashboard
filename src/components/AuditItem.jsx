import React from 'react';

const AuditItem = ({ task, onToggle, onDelete }) => {
  return (
    <div 
      className={`flex items-center justify-between p-4 rounded border transition-all ${
        task.completed ? 'bg-slate-950 border-slate-800 opacity-50' : 'bg-slate-900 border-emerald-900/30'
      }`}
    >
      <div className="flex flex-col gap-1">
        <span className={`text-lg ${task.completed ? 'line-through text-slate-500' : 'text-emerald-100'}`}>
          {'>'} {task.text}
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded w-fit ${
          task.priority === 'Yüksek' ? 'bg-red-900/30 text-red-500' : 
          task.priority === 'Orta' ? 'bg-yellow-900/30 text-yellow-500' : 'bg-blue-900/30 text-blue-500'
        }`}>
          ÖNCELİK: {task.priority.toUpperCase()}
        </span>
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={() => onToggle(task.id)}
          className={`text-xs p-2 rounded border transition-colors ${
            task.completed ? 'border-emerald-500 text-emerald-500 font-bold' : 'border-slate-700 text-slate-400 hover:text-emerald-400'
          }`}
        >
          {task.completed ? '✓ TAMAM' : 'İŞLE'}
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          className="text-xs p-2 rounded border border-red-900/50 text-red-900 hover:bg-red-900 hover:text-white transition-colors"
        >
          SİL
        </button>
      </div>
    </div>
  );
};

export default AuditItem;