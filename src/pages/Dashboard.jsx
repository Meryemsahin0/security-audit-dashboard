import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('DASHBOARD'); // Aktif sekmeyi tutar
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('Düşük');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('audit-tasks')) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('audit-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask = { id: Date.now(), text: input, priority, completed: false };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const toggleComplete = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  // --- SEKME İÇERİKLERİ ---
  const renderContent = () => {
    switch(activeTab) {
      case 'TARAMALAR':
        return (
          <div className="p-10 border border-dashed border-emerald-900 text-center">
            <h2 className="text-xl mb-4">🔍 NETWORK SCANNER</h2>
            <p className="text-sm text-emerald-800 italic animate-pulse">Tarama modülü başlatılıyor... Hedef bekleniyor.</p>
            <div className="mt-6 text-[10px] text-left bg-black p-4 text-emerald-900">
              [SYSTEM]: Scanning 192.168.1.1/24...<br/>
              [SYSTEM]: No open ports found in this range.
            </div>
          </div>
        );
      case 'AÇIKLAR':
        return (
          <div className="space-y-4">
            <h2 className="text-xl border-b border-red-900 text-red-500 pb-2">🔓 KRİTİK ZAFİYETLER</h2>
            <div className="bg-red-900/10 border border-red-900/30 p-4">
              <p className="text-xs font-bold text-red-500 underline uppercase">CVE-2024-X12:</p>
              <p className="text-xs text-red-700">SQL Injection riski tespit edildi. Acil müdahale gerekli.</p>
            </div>
          </div>
        );
      case 'AYARLAR':
        return (
          <div className="max-w-md">
            <h2 className="text-xl mb-6">⚙️ SİSTEM AYARLARI</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-emerald-900/20 pb-2">
                <span>Otomatik Tarama</span>
                <span className="text-emerald-700 font-bold">[AKTİF]</span>
              </div>
              <div className="flex justify-between border-b border-emerald-900/20 pb-2">
                <span>Veritabanı Senkronu</span>
                <span className="text-emerald-700 font-bold">[LOCAL_STORAGE]</span>
              </div>
              <div className="flex justify-between border-b border-emerald-900/20 pb-2">
                <span>Tema Seçimi</span>
                <span className="text-emerald-700 font-bold">[KALI_DARK]</span>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <>
            {/* Mevcut Dashboard İçeriği (İstatistikler, Form ve Liste) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900/50 border border-emerald-900/30 p-4 rounded-sm shadow-sm">
                <p className="text-[10px] text-emerald-700 uppercase font-bold">Bekleyen Görev</p>
                <p className="text-3xl font-black text-red-500">{pendingCount}</p>
              </div>
              <div className="bg-slate-900/50 border border-emerald-900/30 p-4 rounded-sm shadow-sm">
                <p className="text-[10px] text-emerald-700 uppercase font-bold">Çözülen Açık</p>
                <p className="text-3xl font-black text-emerald-500">{completedCount}</p>
              </div>
              <div className="bg-slate-900/50 border border-emerald-900/30 p-4 rounded-sm shadow-sm">
                <p className="text-[10px] text-emerald-700 uppercase font-bold">Bağlantı</p>
                <p className="text-3xl font-black text-blue-500 font-mono">OK</p>
              </div>
            </div>

            <form onSubmit={addTask} className="mb-10 flex flex-col md:flex-row gap-2 bg-slate-900/30 p-4 border border-emerald-900/20">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Yeni Görev Girişi..." className="flex-1 bg-black/50 border border-emerald-900 p-2 text-sm text-emerald-400 focus:outline-none focus:border-emerald-500" />
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="bg-black/50 border border-emerald-900 p-2 text-sm text-emerald-400">
                <option value="Düşük">Düşük</option>
                <option value="Orta">Orta</option>
                <option value="Yüksek">Yüksek</option>
              </select>
              <button className="bg-emerald-600 text-black px-6 py-2 text-sm font-black hover:bg-emerald-400 transition-all uppercase">Sisteme İşle</button>
            </form>

            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="bg-slate-900 border border-emerald-900/20 p-4 flex justify-between items-center group hover:border-emerald-500/50 transition-all">
                  <div>
                    <p className={`text-md font-bold tracking-tight ${task.completed ? 'line-through text-emerald-900' : 'text-emerald-300'}`}>{'>'} {task.text}</p>
                    <span className={`text-[10px] font-bold uppercase ${task.priority === 'Yüksek' ? 'text-red-500' : 'text-emerald-700'}`}>Priority: {task.priority}</span>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => toggleComplete(task.id)} className="text-[10px] border border-emerald-800 px-3 py-1 text-emerald-700 hover:bg-emerald-900/30 uppercase font-bold">{task.completed ? 'Geri Al' : 'İşle'}</button>
                    <button onClick={() => deleteTask(task.id)} className="text-[10px] border border-red-900 px-3 py-1 text-red-900 hover:bg-red-950 uppercase font-bold">Sil</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
        {/* SİSTEM ARAÇLARI */}
<div className="flex justify-center mb-6">
  <button 
    onClick={() => {
      if(window.confirm("Tüm denetim verileri silinecek. Emin misiniz?")) {
        setTasks([]);
        localStorage.removeItem('audit-tasks');
      }
    }}
    className="text-[10px] border border-emerald-900/50 bg-slate-900/50 px-4 py-1 text-emerald-800 hover:text-red-500 hover:border-red-500 transition-all flex items-center gap-2 italic"
  >
    🔄 SİSTEMİ SIFIRLA (LOCALSTORAGE_WIPE)
  </button>
</div>
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-500 font-mono flex">
      {/* SOL MENÜ */}
      <aside className="hidden lg:flex w-64 border-r border-emerald-900/30 flex-col p-6 bg-slate-900/20">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-2 border-emerald-500 rounded-full flex items-center justify-center bg-emerald-900/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span className="text-xl font-bold">MŞ</span>
          </div>
          <h2 className="text-xs font-bold tracking-widest uppercase italic">Meryem Şahin</h2>
          <p className="text-[9px] text-emerald-700">Security Engineer</p>
        </div>

        <nav className="space-y-4 flex-1 text-[11px]">
          <div className="text-emerald-900 font-black mb-2 uppercase">Navigasyon</div>
          <button onClick={() => setActiveTab('DASHBOARD')} className={`w-full text-left p-2 transition-all ${activeTab === 'DASHBOARD' ? 'bg-emerald-900/20 border-l-2 border-emerald-500' : 'text-emerald-800 hover:text-emerald-500'}`}>🛡️ DASHBOARD</button>
          <button onClick={() => setActiveTab('TARAMALAR')} className={`w-full text-left p-2 transition-all ${activeTab === 'TARAMALAR' ? 'bg-emerald-900/20 border-l-2 border-emerald-500' : 'text-emerald-800 hover:text-emerald-500'}`}>🔍 TARAMALAR</button>
          <button onClick={() => setActiveTab('AÇIKLAR')} className={`w-full text-left p-2 transition-all ${activeTab === 'AÇIKLAR' ? 'bg-emerald-900/20 border-l-2 border-emerald-500' : 'text-emerald-800 hover:text-emerald-500'}`}>🔓 AÇIKLAR</button>
          <button onClick={() => setActiveTab('AYARLAR')} className={`w-full text-left p-2 transition-all ${activeTab === 'AYARLAR' ? 'bg-emerald-900/20 border-l-2 border-emerald-500' : 'text-emerald-800 hover:text-emerald-500'}`}>⚙️ AYARLAR</button>
        </nav>

        <div className="mt-auto pt-4 border-t border-emerald-900/20 text-[9px] text-emerald-900">
          <div>NODE: Kali-Linux-v2026.1</div>
          <div>STATUS: Connected</div>
        </div>
      </aside>

      {/* SAĞ ANA İÇERİK */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <header className="flex justify-between items-end mb-8 border-b border-emerald-900/30 pb-4">
            <div>
              <h1 className="text-xl font-black tracking-tighter italic text-emerald-400">AUDIT_CORE_v4.0</h1>
              <p className="text-[10px] text-emerald-800 uppercase font-bold">Tab: {activeTab}</p>
            </div>
          </header>

          {/* DİNAMİK İÇERİK BURADA RENDER EDİLİYOR */}
          {renderContent()}

          <footer className="mt-12 p-3 bg-black/40 border-t border-emerald-900/30 font-mono text-[9px] text-emerald-900">
            <p>{'>'} [SYSTEM]: Current Tab: {activeTab}</p>
            <p>{'>'} [DATABASE]: LocalStorage sync successful.</p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;