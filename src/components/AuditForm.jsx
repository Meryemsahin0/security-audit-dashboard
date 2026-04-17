import React, { useState } from 'react';

const AuditForm = ({ onAdd }) => {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('Düşük');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Dashboard'a veriyi gönder
    onAdd(input, priority);
    
    // Formu temizle
    setInput('');
    setPriority('Düşük');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mb-10 bg-slate-900 p-4 rounded border border-emerald-900/50 shadow-lg shadow-emerald-900/10">
      <input 
        type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Yeni güvenlik görevi (Örn: Nmap Tarama)..."
        className="flex-1 bg-slate-950 p-3 rounded border border-emerald-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-emerald-300"
      />
      <select 
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="bg-slate-950 p-3 rounded border border-emerald-800 text-emerald-400 cursor-pointer"
      >
        <option value="Düşük">Düşük</option>
        <option value="Orta">Orta</option>
        <option value="Yüksek">Yüksek</option>
      </select>
      <button 
        type="submit"
        className="bg-emerald-700 hover:bg-emerald-600 text-slate-950 px-6 py-2 rounded font-black transition-all active:scale-95"
      >
        SİSTEME EKLE
      </button>
    </form>
  );
};

export default AuditForm;