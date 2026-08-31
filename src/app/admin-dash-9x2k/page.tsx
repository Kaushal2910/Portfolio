'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
  image: string;
  featured: boolean;
}

interface Certificate {
  id: string;
  title: string;
  imageUrl: string;
  downloadUrl: string;
}

type Tab = 'projects' | 'certificates';

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const [pForm, setPForm] = useState({ title: '', description: '', tech: '', githubUrl: '', demoUrl: '', image: '', featured: false });
  const [cForm, setCForm] = useState({ title: '', imageUrl: '', downloadUrl: '', category: 'Skills & Experience', issuer: '', year: '' });

  const fetchData = async () => {
    const pRes = await fetch('/api/projects');
    setProjects(await pRes.json());
    const cRes = await fetch('/api/certificates');
    setCerts(await cRes.json());
  };

  useEffect(() => { fetchData(); }, []);

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { ...pForm, tech: pForm.tech.split(',').map(s => s.trim()).filter(Boolean) };
    if (editing) {
      await fetch('/api/projects', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, id: editing.id }) });
    } else {
      await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    }
    setPForm({ title: '', description: '', tech: '', githubUrl: '', demoUrl: '', image: '', featured: false });
    setEditing(null);
    setShowForm(false);
    fetchData();
  };

  const handleCertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      await fetch('/api/certificates', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...cForm, id: editing.id }) });
    } else {
      await fetch('/api/certificates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cForm) });
    }
    setCForm({ title: '', imageUrl: '', downloadUrl: '', category: 'Skills & Experience', issuer: '', year: '' });
    setEditing(null);
    setShowForm(false);
    fetchData();
  };

  const handleDelete = async (type: 'projects' | 'certificates', id: string) => {
    if (!confirm('Delete this item?')) return;
    await fetch('/api/' + type + '?id=' + id, { method: 'DELETE' });
    fetchData();
  };

  const startEdit = (item: any) => {
    setEditing(item);
    setShowForm(true);
    if (tab === 'projects') {
      setPForm({ title: item.title, description: item.description, tech: (item.tech || []).join(', '), githubUrl: item.githubUrl, demoUrl: item.demoUrl || '', image: item.image, featured: item.featured });
    } else {
      setCForm({ title: item.title, imageUrl: item.imageUrl, downloadUrl: item.downloadUrl, category: item.category || 'Skills & Experience', issuer: item.issuer || '', year: item.year || '' });
    }
  };

  const inputClass = "w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-sm focus:border-blue-500/50 outline-none";
  const btnPrimary = "px-6 py-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-all font-mono text-sm";
  const btnSecondary = "px-6 py-2 rounded-lg bg-white/5 text-gray-400 border border-white/10 hover:text-white transition-all font-mono text-sm";
  const btnSmall = "px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 transition-colors text-sm font-mono";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
        <p className="text-gray-500 font-mono text-sm mb-8">Manage your portfolio data</p>

        <div className="flex gap-2 mb-8">
          <button onClick={() => { setTab('projects'); setEditing(null); setShowForm(false); }} className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${tab === 'projects' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white/5 text-gray-400 border border-white/5'}`}>
            Projects ({projects.length})
          </button>
          <button onClick={() => { setTab('certificates'); setEditing(null); setShowForm(false); }} className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${tab === 'certificates' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white/5 text-gray-400 border border-white/5'}`}>
            Certificates ({certs.length})
          </button>
        </div>

        <button onClick={() => { setShowForm(!showForm); setEditing(null); }} className="mb-6 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all font-mono text-sm">
          + Add New {tab === 'projects' ? 'Project' : 'Certificate'}
        </button>

        {showForm && (
          <div className="mb-8 p-6 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="text-lg font-semibold mb-4">{editing ? 'Edit' : 'Add New'} {tab === 'projects' ? 'Project' : 'Certificate'}</h3>
            {tab === 'projects' ? (
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <input placeholder="Title" value={pForm.title} onChange={e => setPForm({ ...pForm, title: e.target.value })} className={inputClass} required />
                <textarea placeholder="Description" value={pForm.description} onChange={e => setPForm({ ...pForm, description: e.target.value })} className={inputClass + ' h-24'} required />
                <input placeholder="Tech (comma separated)" value={pForm.tech} onChange={e => setPForm({ ...pForm, tech: e.target.value })} className={inputClass} />
                <input placeholder="GitHub URL" value={pForm.githubUrl} onChange={e => setPForm({ ...pForm, githubUrl: e.target.value })} className={inputClass} />
                <input placeholder="Demo URL (optional)" value={pForm.demoUrl} onChange={e => setPForm({ ...pForm, demoUrl: e.target.value })} className={inputClass} />
                <input placeholder="Image path" value={pForm.image} onChange={e => setPForm({ ...pForm, image: e.target.value })} className={inputClass} />
                <label className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                  <input type="checkbox" checked={pForm.featured} onChange={e => setPForm({ ...pForm, featured: e.target.checked })} className="accent-blue-500" /> Featured
                </label>
                <div className="flex gap-2">
                  <button type="submit" className={btnPrimary}>{editing ? 'Update' : 'Add'} Project</button>
                  <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className={btnSecondary}>Cancel</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleCertSubmit} className="space-y-4">
                <input placeholder="Title" value={cForm.title} onChange={e => setCForm({ ...cForm, title: e.target.value })} className={inputClass} required />
                <input placeholder="Image URL" value={cForm.imageUrl} onChange={e => setCForm({ ...cForm, imageUrl: e.target.value })} className={inputClass} required />
                <input placeholder="Download URL" value={cForm.downloadUrl} onChange={e => setCForm({ ...cForm, downloadUrl: e.target.value })} className={inputClass} required />
                <div>
                  <label className="block text-xs text-gray-500 font-mono mb-1">Category</label>
                  <select value={cForm.category} onChange={e => setCForm({ ...cForm, category: e.target.value })} className={inputClass}>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="AI & Data">AI & Data</option>
                    <option value="Skills & Experience">Skills & Experience</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Issuer (e.g. Oracle)" value={cForm.issuer} onChange={e => setCForm({ ...cForm, issuer: e.target.value })} className={inputClass} />
                  <input placeholder="Year (e.g. 2025)" value={cForm.year} onChange={e => setCForm({ ...cForm, year: e.target.value })} className={inputClass} />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className={btnPrimary}>{editing ? 'Update' : 'Add'} Certificate</button>
                  <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className={btnSecondary}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        )}

        <div className="space-y-3">
          {tab === 'projects' && projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-semibold truncate">{p.title}</h4>
                  {p.featured && <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono">Featured</span>}
                </div>
                <p className="text-gray-500 text-sm truncate mt-1">{p.description}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button onClick={() => startEdit(p)} className={btnSmall + ' hover:text-blue-400'}>Edit</button>
                <button onClick={() => handleDelete('projects', p.id)} className={btnSmall + ' hover:text-red-400'}>Delete</button>
              </div>
            </div>
          ))}
          {tab === 'certificates' && certs.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold truncate">{c.title}</h4>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button onClick={() => startEdit(c)} className={btnSmall + ' hover:text-blue-400'}>Edit</button>
                <button onClick={() => handleDelete('certificates', c.id)} className={btnSmall + ' hover:text-red-400'}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}