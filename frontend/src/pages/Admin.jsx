import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiDroplet, FiLogOut, FiBarChart2, FiMessageSquare, FiCalendar, FiUsers } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { adminApi } from '../utils/api';
import { Spinner, Empty } from '../components/ui/index.jsx';
import { useDisclosure } from '../hooks/index.js';
import toast from 'react-hot-toast';

const NAV = [
  { id:'dashboard',    icon:<FiBarChart2/>,    label:'Dashboard' },
  { id:'messages',     icon:<FiMessageSquare/>,label:'Messages' },
  { id:'appointments', icon:<FiCalendar/>,     label:'Appointments' },
  { id:'pledges',      icon:<FiUsers/>,        label:'Pledges' },
];

function Sidebar({ active, setActive, onClose }) {
  const { user, logout } = useAuth();
  return (
    <aside className="flex flex-col h-full bg-slate-900 text-white w-60 shrink-0">
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center"><FiDroplet size={14}/></div>
            <span className="font-bold text-sm" style={{fontFamily:'Sora,sans-serif'}}>SickleCare Admin</span>
          </Link>
          {onClose && <button onClick={onClose} className="text-slate-400 hover:text-white lg:hidden"><FiX size={16}/></button>}
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {NAV.map(({ id, icon, label }) => (
          <button key={id} onClick={() => { setActive(id); onClose?.(); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active === id ? 'bg-red-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}>
            {icon} {label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-slate-800">
        <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
          <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center">
            {user?.username?.[0]?.toUpperCase() || 'A'}
          </div>
          <div>
            <div className="text-white text-xs font-semibold">{user?.username}</div>
            <div className="text-slate-500 text-[10px]">{user?.role}</div>
          </div>
        </div>
        <button onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors">
          <FiLogOut size={12}/> Sign out
        </button>
      </div>
    </aside>
  );
}

function DashboardTab({ data }) {
  if (!data) return <div className="flex items-center justify-center h-48"><Spinner size={28} className="text-red-500"/></div>;
  const s = data.stats || {};
  return (
    <div>
      <h2 className="font-bold text-slate-900 text-xl mb-5" style={{fontFamily:'Sora,sans-serif'}}>Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { l:'Total Pledges',      v: s.pledges||0,              i:'🤝', c:'bg-red-50 text-red-600' },
          { l:'Newsletter Subs',    v: s.subscribers||0,          i:'✉️', c:'bg-blue-50 text-blue-600' },
          { l:'Contact Messages',   v:`${s.contacts||0} (${s.new_contacts||0} new)`, i:'💬', c:'bg-amber-50 text-amber-600' },
          { l:'Appointments',       v:`${s.appointments||0} (${s.pending_apts||0} pending)`, i:'📅', c:'bg-green-50 text-green-600' },
        ].map(({ l, v, i, c }) => (
          <div key={l} className="card p-5">
            <div className={`w-10 h-10 ${c} rounded-lg flex items-center justify-center text-lg mb-3`}>{i}</div>
            <div className="font-bold text-slate-900 text-2xl" style={{fontFamily:'Sora,sans-serif'}}>{v}</div>
            <div className="text-xs text-slate-500 mt-1">{l}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 text-sm mb-4">Recent Messages</h3>
          {data.recent_contacts?.length ? data.recent_contacts.slice(0,5).map(m=>(
            <div key={m.id} className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg mb-2">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-700 truncate">{m.name}</div>
                <div className="text-xs text-slate-400 truncate">{m.subject}</div>
              </div>
              <span className={`tag text-[10px] ${m.status==='new'?'tag-red':m.status==='replied'?'tag-green':'tag-slate'}`}>{m.status}</span>
            </div>
          )) : <p className="text-sm text-slate-400">No messages yet.</p>}
        </div>
        <div className="card p-5">
          <h3 className="font-semibold text-slate-800 text-sm mb-4">Recent Appointments</h3>
          {data.recent_appointments?.length ? data.recent_appointments.slice(0,5).map(a=>(
            <div key={a.id} className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-lg mb-2">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-slate-700 truncate">{a.name}</div>
                <div className="text-xs text-slate-400 truncate">{a.centre_name} · {a.preferred_date}</div>
              </div>
              <span className={`tag text-[10px] ${a.status==='pending'?'tag-amber':a.status==='confirmed'?'tag-green':'tag-slate'}`}>{a.status}</span>
            </div>
          )) : <p className="text-sm text-slate-400">No appointments yet.</p>}
        </div>
      </div>
    </div>
  );
}

function MessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    adminApi.getMessages(1)
      .then(r => { setMessages(r.messages||[]); })
      .catch(() => toast.error('Failed to load messages.'))
      .finally(() => setLoading(false));
  }, []);

  const update = async (id, status) => {
    try {
      await adminApi.updateMessage({ id, status });
      setMessages(m => m.map(msg => msg.id===id ? {...msg, status} : msg));
      toast.success('Updated.');
    } catch { toast.error('Update failed.'); }
  };

  if (loading) return <div className="flex justify-center py-12"><Spinner size={24} className="text-red-500"/></div>;
  return (
    <div>
      <h2 className="font-bold text-slate-900 text-xl mb-5" style={{fontFamily:'Sora,sans-serif'}}>Contact Messages</h2>
      {messages.length===0 ? <Empty icon="📬" title="No messages" body="Contact form submissions will appear here."/> : (
        <div className="space-y-3">
          {messages.map(m=>(
            <div key={m.id} className="card p-5">
              <div className="flex flex-wrap items-start gap-2 mb-2">
                <span className="font-semibold text-slate-800 text-sm">{m.name}</span>
                <span className="text-xs text-slate-400">{m.email}</span>
                <span className={`tag text-[10px] ${m.status==='new'?'tag-red':m.status==='replied'?'tag-green':m.status==='spam'?'bg-slate-100 text-slate-500':'tag-amber'}`}>{m.status}</span>
                <span className="text-xs text-slate-400 ml-auto">{new Date(m.created_at).toLocaleDateString()}</span>
              </div>
              <div className="text-xs font-semibold text-slate-600 mb-1">{m.subject}</div>
              <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{m.message}</p>
              <div className="flex gap-1.5">
                {['new','read','replied','spam'].map(s=>(
                  <button key={s} onClick={()=>update(m.id,s)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${m.status===s?'bg-slate-900 text-white':'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [active, setActive]    = useState('dashboard');
  const { isOpen, open, close } = useDisclosure();
  const [dashData, setDashData] = useState(null);

  useEffect(() => {
    adminApi.dashboard().then(setDashData).catch(()=>{});
  }, []);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <div className="hidden lg:flex"><Sidebar active={active} setActive={setActive}/></div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={close}/>
          <div className="relative z-10"><Sidebar active={active} setActive={setActive} onClose={close}/></div>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-slate-200 px-5 py-3 flex items-center gap-3">
          <button onClick={open} className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-600"><FiMenu size={18}/></button>
          <span className="text-sm text-slate-500 capitalize">{active}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-5 lg:p-8">
          {active==='dashboard' && <DashboardTab data={dashData}/>}
          {active==='messages'  && <MessagesTab/>}
          {active==='appointments' && <Empty icon="📅" title="Appointments" body="All appointment requests will appear here."/>}
          {active==='pledges'   && <Empty icon="🤝" title="Pledges" body="Community pledges will appear here."/>}
        </div>
      </div>
    </div>
  );
}
