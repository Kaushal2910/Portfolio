'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

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
  category?: string;
  issuer?: string;
  year?: string;
}

type Tab = 'projects' | 'certificates' | 'categories' | 'site';

const inputClass =
  'w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white font-mono text-sm focus:border-amber-400/40 outline-none placeholder:text-gray-600';
const btnPrimary =
  'px-6 py-2.5 rounded-lg bg-amber-400/[0.12] text-amber-300 border border-amber-400/40 hover:bg-amber-400/[0.2] transition-all font-mono text-sm disabled:opacity-50';
const btnSecondary =
  'px-6 py-2.5 rounded-lg bg-white/5 text-gray-400 border border-white/10 hover:text-white transition-all font-mono text-sm';
const btnSmall =
  'px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 transition-colors text-sm font-mono';

function UploadField({
  label,
  value,
  folder,
  accept,
  onChange,
}: {
  label: string;
  value: string;
  folder: 'certificates' | 'projects';
  accept: string;
  onChange: (path: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File) => {
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs text-gray-500 font-mono mb-1">{label}</label>
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = '';
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={btnSmall + ' whitespace-nowrap hover:text-white'}
        >
          {uploading ? 'Uploading…' : 'Choose file'}
        </button>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/certificates/filename.jpg"
          className={inputClass + ' flex-1'}
        />
      </div>
      {error && <p className="text-xs text-red-400 font-mono mt-1">{error}</p>}
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const [tab, setTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [editing, setEditing] = useState<Project | Certificate | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState('');

  const emptyP = { title: '', description: '', tech: '', githubUrl: '', demoUrl: '', image: '', featured: false };
  const emptyC = { title: '', imageUrl: '', downloadUrl: '', category: 'Skills & Experience', issuer: '', year: '' };
  const [pForm, setPForm] = useState(emptyP);
  const [cForm, setCForm] = useState(emptyC);

  // Categories CRUD
  const [categories, setCategories] = useState<{ id: string; label: string }[]>([]);
  const [newCatLabel, setNewCatLabel] = useState('');
  const [editCatId, setEditCatId] = useState<string | null>(null);
  const [editCatLabel, setEditCatLabel] = useState('');

  // Site assets
  const [settings, setSettings] = useState<{ profilePhoto: string; resumeUrl: string }>({ profilePhoto: '', resumeUrl: '/resume.pdf' });
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const flash = useCallback((msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(''), 2500);
  }, []);

  const loadData = useCallback(async () => {
    const [pRes, cRes] = await Promise.all([fetch('/api/projects'), fetch('/api/certificates')]);
    if (pRes.ok) setProjects(await pRes.json());
    if (cRes.ok) setCerts(await cRes.json());
  }, []);

  const loadCategories = useCallback(async () => {
    const res = await fetch('/api/categories');
    if (res.ok) setCategories(await res.json());
  }, []);

  const loadSettings = useCallback(async () => {
    const res = await fetch('/api/settings');
    if (res.ok) setSettings(await res.json());
  }, []);

  useEffect(() => {
    fetch('/api/admin/verify')
      .then((r) => r.json())
      .then((d) => {
        setAuthed(!!d.authed);
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, []);

  useEffect(() => {
    if (authed) {
      loadData();
      loadCategories();
      loadSettings();
    }
  }, [authed, loadData, loadCategories, loadSettings]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword }),
      });
      if (!res.ok) {
        setLoginError('Wrong password');
        return;
      }
      setAuthed(true);
      setLoginPassword('');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthed(false);
  };

  const requireConfirm = (msg: string) => window.confirm(msg);

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      ...pForm,
      tech: pForm.tech.split(',').map((s) => s.trim()).filter(Boolean),
      ...(editing ? { id: editing.id } : {}),
    };
    const res = await fetch('/api/projects', {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      flash('Error: ' + ((await res.json().catch(() => ({}))).error || 'Save failed'));
      return;
    }
    setPForm(emptyP);
    setEditing(null);
    setShowForm(false);
    await loadData();
    flash(editing ? 'Project updated' : 'Project added');
  };

  const handleCertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { ...cForm, ...(editing ? { id: editing.id } : {}) };
    const res = await fetch('/api/certificates', {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      flash('Error: ' + ((await res.json().catch(() => ({}))).error || 'Save failed'));
      return;
    }
    setCForm(emptyC);
    setEditing(null);
    setShowForm(false);
    await loadData();
    flash(editing ? 'Certificate updated' : 'Certificate added');
  };

  const handleDelete = async (type: 'projects' | 'certificates', id: string) => {
    if (!requireConfirm('Delete this item?')) return;
    const res = await fetch(`/api/${type}?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      await loadData();
      flash('Deleted');
    } else {
      flash('Delete failed');
    }
  };

  // ---- Reordering ----
  const moveItem = async (type: 'projects' | 'certificates', index: number, dir: -1 | 1) => {
    const list: (Project | Certificate)[] =
      type === 'projects' ? [...projects] : [...certs];
    const target = index + dir;
    if (target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target], list[index]];

    // Optimistic update, then persist the full id order
    if (type === 'projects') setProjects(list as Project[]);
    else setCerts(list as Certificate[]);

    const res = await fetch(`/api/${type}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: list.map((i) => i.id) }),
    });
    if (!res.ok) {
      flash('Reorder failed');
      await loadData();
    }
  };

  // ---- Categories CRUD ----
  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: newCatLabel }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      flash('Error: ' + (data.error || 'Could not add category'));
      return;
    }
    setCategories(data);
    setNewCatLabel('');
    flash('Category added');
  };

  const renameCategory = async (id: string, label: string) => {
    const res = await fetch('/api/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, label }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      flash('Error: ' + (data.error || 'Could not rename'));
      return;
    }
    setCategories(data);
    setEditCatId(null);
    await Promise.all([loadData(), loadCategories()]);
    flash('Category renamed');
  };

  const deleteCategory = async (id: string) => {
    const used = certs.filter((c) => c.category === id).length;
    let url = `/api/categories?id=${encodeURIComponent(id)}`;
    if (used > 0) {
      const others = categories.filter((c) => c.id !== id);
      const firstOther = others[0]?.id;
      const ok = requireConfirm(
        `${used} certificate(s) use "${id}". OK = move them to "${firstOther}", Cancel = keep the category.`
      );
      if (!ok) return;
      url += `&moveTo=${encodeURIComponent(firstOther)}`;
    } else {
      if (!requireConfirm(`Delete category "${id}"?`)) return;
    }
    const res = await fetch(url, { method: 'DELETE' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      flash('Error: ' + (data.error || 'Could not delete'));
      return;
    }
    await Promise.all([loadCategories(), loadData()]);
    flash(used > 0 ? `Deleted — ${used} cert(s) reassigned` : 'Category deleted');
  };

  // ---- Site assets ----
  const uploadSiteAsset = async (file: File, target: 'profile' | 'resume') => {
    setUploadingField('site-' + target);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'site');
      fd.append('target', target);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        flash('Error: ' + (data.error || 'Upload failed'));
        return;
      }
      // Bust cache so the hero shows the new photo immediately
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          target === 'profile'
            ? { profilePhoto: data.path + '?v=' + Date.now() }
            : { resumeUrl: data.path + '?v=' + Date.now() }
        ),
      });
      await loadSettings();
      flash(target === 'profile' ? 'Profile photo updated' : 'Resume updated');
    } finally {
      setUploadingField(null);
    }
  };

  const startEdit = (item: Project | Certificate) => {
    setEditing(item);
    setShowForm(true);
    if (tab === 'projects') {
      const p = item as Project;
      setPForm({
        title: p.title, description: p.description, tech: (p.tech || []).join(', '),
        githubUrl: p.githubUrl, demoUrl: p.demoUrl || '', image: p.image, featured: !!p.featured,
      });
    } else {
      const c = item as Certificate;
      setCForm({
        title: c.title, imageUrl: c.imageUrl, downloadUrl: c.downloadUrl,
        category: c.category || 'Skills & Experience', issuer: c.issuer || '', year: c.year || '',
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------- Login screen ----------
  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-500 font-mono text-sm">
        Checking session…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm p-8 rounded-2xl bg-white/[0.02] border border-white/10"
        >
          <h1 className="text-xl font-bold text-white mb-1">Admin Access</h1>
          <p className="text-gray-500 font-mono text-xs mb-6">Portfolio management console</p>
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className={inputClass + ' mb-3'}
            required
          />
          {loginError && <p className="text-red-400 font-mono text-xs mb-3">{loginError}</p>}
          <button type="submit" disabled={loggingIn} className={btnPrimary + ' w-full'}>
            {loggingIn ? 'Verifying…' : 'Unlock'}
          </button>
          <Link href="/" className="block text-center text-gray-600 hover:text-gray-400 font-mono text-xs mt-6 transition-colors">
            ← Back to site
          </Link>
        </form>
      </div>
    );
  }

  // ---------- Dashboard ----------
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-gray-500 font-mono text-xs mt-1">
              Note: changes edit local files — commit &amp; push to deploy them.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {status && <span className="text-amber-300 font-mono text-xs mr-2">{status}</span>}
            <Link href="/" className={btnSmall + ' hover:text-white'}>View site</Link>
            <button onClick={handleLogout} className={btnSmall + ' hover:text-red-400'}>Logout</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {([
            ['projects', `Projects (${projects.length})`],
            ['certificates', `Certificates (${certs.length})`],
            ['categories', 'Categories'],
            ['site', 'Site Assets'],
          ] as [Tab, string][]).map(([t, label]) => (
            <button
              key={t}
              onClick={() => { setTab(t); setEditing(null); setShowForm(false); }}
              aria-pressed={tab === t}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all border ${
                tab === t
                  ? 'bg-white/[0.12] text-white border-amber-400/40'
                  : 'bg-white/5 text-gray-400 border-white/5 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {(tab === 'projects' || tab === 'certificates') && (
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditing(null);
              setPForm(emptyP);
              setCForm(emptyC);
            }}
            className="mb-6 px-4 py-2 rounded-lg bg-white/[0.06] text-white/80 border border-white/[0.12] hover:bg-white/[0.1] transition-all font-mono text-sm"
          >
            {showForm ? 'Close form' : `+ Add new ${tab === 'projects' ? 'project' : 'certificate'}`}
          </button>
        )}

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditing(null);
            setPForm(emptyP);
            setCForm(emptyC);
          }}
          className="mb-6 px-4 py-2 rounded-lg bg-white/[0.06] text-white/80 border border-white/[0.12] hover:bg-white/[0.1] transition-all font-mono text-sm"
        >
          {showForm ? 'Close form' : `+ Add new ${tab === 'projects' ? 'project' : 'certificate'}`}
        </button>

        {/* Form */}
        {showForm && (
          <div className="mb-8 p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <h3 className="text-base font-semibold mb-4">
              {editing ? 'Edit' : 'Add new'} {tab === 'projects' ? 'project' : 'certificate'}
            </h3>

            {tab === 'projects' ? (
              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <input placeholder="Title" value={pForm.title} onChange={(e) => setPForm({ ...pForm, title: e.target.value })} className={inputClass} required />
                <textarea placeholder="Description" value={pForm.description} onChange={(e) => setPForm({ ...pForm, description: e.target.value })} className={inputClass + ' h-24'} required />
                <input placeholder="Tech stack (comma separated: React, Docker)" value={pForm.tech} onChange={(e) => setPForm({ ...pForm, tech: e.target.value })} className={inputClass} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input placeholder="GitHub URL" value={pForm.githubUrl} onChange={(e) => setPForm({ ...pForm, githubUrl: e.target.value })} className={inputClass} />
                  <input placeholder="Demo URL (optional)" value={pForm.demoUrl} onChange={(e) => setPForm({ ...pForm, demoUrl: e.target.value })} className={inputClass} />
                </div>
                <UploadField
                  label="Project screenshot (PNG/JPG)"
                  value={pForm.image}
                  folder="projects"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(path) => setPForm((f) => ({ ...f, image: path }))}
                />
                <label className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                  <input type="checkbox" checked={pForm.featured} onChange={(e) => setPForm({ ...pForm, featured: e.target.checked })} className="accent-amber-400" />
                  Featured
                </label>
                <div className="flex gap-2">
                  <button type="submit" className={btnPrimary}>{editing ? 'Update' : 'Add'} project</button>
                  <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className={btnSecondary}>Cancel</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleCertSubmit} className="space-y-4">
                <input placeholder="Certificate title" value={cForm.title} onChange={(e) => setCForm({ ...cForm, title: e.target.value })} className={inputClass} required />
                <UploadField
                  label="Certificate image (JPG/PNG)"
                  value={cForm.imageUrl}
                  folder="certificates"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(path) => setCForm((f) => ({ ...f, imageUrl: path }))}
                />
                <UploadField
                  label="Certificate PDF (for download button)"
                  value={cForm.downloadUrl}
                  folder="certificates"
                  accept="application/pdf"
                  onChange={(path) => setCForm((f) => ({ ...f, downloadUrl: path }))}
                />
                <div>
                  <label className="block text-xs text-gray-500 font-mono mb-1">Category</label>
                  <select value={cForm.category} onChange={(e) => setCForm({ ...cForm, category: e.target.value })} className={inputClass}>
                    {categories.length === 0 && <option value={cForm.category}>{cForm.category}</option>}
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Issuer (e.g. Oracle)" value={cForm.issuer} onChange={(e) => setCForm({ ...cForm, issuer: e.target.value })} className={inputClass} />
                  <input placeholder="Year (e.g. 2026)" value={cForm.year} onChange={(e) => setCForm({ ...cForm, year: e.target.value })} className={inputClass} />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className={btnPrimary}>{editing ? 'Update' : 'Add'} certificate</button>
                  <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className={btnSecondary}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* List */}
        {(tab === 'projects' || tab === 'certificates') && (
          <p className="text-gray-600 font-mono text-xs mb-3">
            Use ↑ / ↓ to set the display order on the live site.
          </p>
        )}
        <div className="space-y-3">
          {tab === 'projects' &&
            projects.map((p, i) => (
              <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                <div className="flex flex-col gap-0.5 mr-3">
                  <button
                    onClick={() => moveItem('projects', i, -1)}
                    disabled={i === 0}
                    aria-label={`Move ${p.title} up`}
                    className="w-7 h-6 rounded bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-white/5 transition-all text-xs leading-none"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveItem('projects', i, 1)}
                    disabled={i === projects.length - 1}
                    aria-label={`Move ${p.title} down`}
                    className="w-7 h-6 rounded bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-white/5 transition-all text-xs leading-none"
                  >
                    ↓
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-mono text-xs">{i + 1}.</span>
                    <h4 className="text-white font-semibold truncate">{p.title}</h4>
                    {p.featured && <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-400 font-mono">Featured</span>}
                  </div>
                  <p className="text-gray-500 text-sm truncate mt-1">{p.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => startEdit(p)} className={btnSmall + ' hover:text-white'}>Edit</button>
                  <button onClick={() => handleDelete('projects', p.id)} className={btnSmall + ' hover:text-red-400'}>Delete</button>
                </div>
              </div>
            ))}
          {tab === 'certificates' &&
            certs.map((c, i) => (
              <div key={c.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                <div className="flex flex-col gap-0.5 mr-3">
                  <button
                    onClick={() => moveItem('certificates', i, -1)}
                    disabled={i === 0}
                    aria-label={`Move ${c.title} up`}
                    className="w-7 h-6 rounded bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-white/5 transition-all text-xs leading-none"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveItem('certificates', i, 1)}
                    disabled={i === certs.length - 1}
                    aria-label={`Move ${c.title} down`}
                    className="w-7 h-6 rounded bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-white/5 transition-all text-xs leading-none"
                  >
                    ↓
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-mono text-xs">{i + 1}.</span>
                    <h4 className="text-white font-semibold truncate">{c.title}</h4>
                  </div>
                  <p className="text-gray-500 text-sm font-mono mt-1">
                    {c.issuer || '—'}{c.year ? ` · ${c.year}` : ''}{c.category ? ` · ${c.category}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button onClick={() => startEdit(c)} className={btnSmall + ' hover:text-white'}>Edit</button>
                  <button onClick={() => handleDelete('certificates', c.id)} className={btnSmall + ' hover:text-red-400'}>Delete</button>
                </div>
              </div>
            ))}

          {tab === 'categories' && (
            <div className="space-y-4">
              <form onSubmit={addCategory} className="flex gap-2">
                <input
                  value={newCatLabel}
                  onChange={(e) => setNewCatLabel(e.target.value)}
                  placeholder="New category name (e.g. Networking)"
                  className={inputClass + ' flex-1'}
                  required
                />
                <button type="submit" className={btnPrimary + ' whitespace-nowrap'}>Add category</button>
              </form>

              {categories.map((cat) => {
                const used = certs.filter((c) => c.category === cat.id).length;
                const isEditing = editCatId === cat.id;
                return (
                  <div key={cat.id} className="flex items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    {isEditing ? (
                      <form
                        onSubmit={(e) => { e.preventDefault(); renameCategory(cat.id, editCatLabel); }}
                        className="flex-1 flex gap-2"
                      >
                        <input
                          value={editCatLabel}
                          onChange={(e) => setEditCatLabel(e.target.value)}
                          className={inputClass + ' flex-1'}
                          autoFocus
                          required
                        />
                        <button type="submit" className={btnSmall + ' hover:text-white'}>Save</button>
                        <button type="button" onClick={() => setEditCatId(null)} className={btnSmall}>Cancel</button>
                      </form>
                    ) : (
                      <>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold">{cat.label}</h4>
                          <p className="text-gray-500 text-xs font-mono mt-0.5">{used} certificate{used === 1 ? '' : 's'}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setEditCatId(cat.id); setEditCatLabel(cat.label); }}
                            className={btnSmall + ' hover:text-white'}
                          >
                            Rename
                          </button>
                          <button onClick={() => deleteCategory(cat.id)} className={btnSmall + ' hover:text-red-400'}>Delete</button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'site' && (
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/10 bg-white/[0.04] shrink-0">
                  {settings.profilePhoto ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={settings.profilePhoto} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-amber-300/80 font-bold">KS</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold">Profile photo</h4>
                  <p className="text-gray-500 text-xs font-mono mt-0.5">
                    {settings.profilePhoto ? settings.profilePhoto.split('?')[0] : 'Not set — hero shows "KS" initials'}
                  </p>
                </div>
                <label className={btnSmall + ' cursor-pointer hover:text-white whitespace-nowrap'}>
                  {uploadingField === 'site-profile' ? 'Uploading…' : 'Upload photo'}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadSiteAsset(f, 'profile');
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden ring-2 ring-white/10 bg-white/[0.04] shrink-0 flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold">Resume (PDF)</h4>
                  <p className="text-gray-500 text-xs font-mono mt-0.5">
                    {settings.resumeUrl ? settings.resumeUrl.split('?')[0] : 'Not set'}
                  </p>
                </div>
                <label className={btnSmall + ' cursor-pointer hover:text-white whitespace-nowrap'}>
                  {uploadingField === 'site-resume' ? 'Uploading…' : 'Upload PDF'}
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadSiteAsset(f, 'resume');
                      e.target.value = '';
                    }}
                  />
                </label>
              </div>

              <p className="text-gray-600 font-mono text-xs px-1">
                Uploads save into <code>public/</code> — commit &amp; push to deploy.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
