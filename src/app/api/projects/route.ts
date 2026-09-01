import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { checkAdminAuth } from '@/lib/auth';

const DATA_PATH = join(process.cwd(), 'data/projects.json');

interface ProjectRecord {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
  image: string;
  featured: boolean;
}

async function readProjects(): Promise<ProjectRecord[]> {
  const data = await readFile(DATA_PATH, 'utf-8');
  return JSON.parse(data);
}

async function writeProjects(projects: ProjectRecord[]) {
  await writeFile(DATA_PATH, JSON.stringify(projects, null, 2));
}

export async function GET() {
  const projects = await readProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const unauthorized = checkAdminAuth(request);
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const projects = await readProjects();
  const newProject: ProjectRecord = {
    id: String(Date.now()),
    title: body.title || '',
    description: body.description || '',
    tech: body.tech || [],
    githubUrl: body.githubUrl || '',
    demoUrl: body.demoUrl || '',
    image: body.image || '/projectsImages/placeholder.png',
    featured: body.featured || false,
  };
  // New projects go to the top so they appear first on the site
  projects.unshift(newProject);
  await writeProjects(projects);
  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const unauthorized = checkAdminAuth(request);
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const projects = await readProjects();
  const index = projects.findIndex((p) => p.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  projects[index] = { ...projects[index], ...body };
  await writeProjects(projects);
  return NextResponse.json(projects[index]);
}

export async function DELETE(request: NextRequest) {
  const unauthorized = checkAdminAuth(request);
  if (unauthorized) return unauthorized;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const projects = await readProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  await writeProjects(filtered);
  return NextResponse.json({ success: true });
}

// Reorder: body { ids: string[] } — complete list of ids in the new display order
export async function PATCH(request: NextRequest) {
  const unauthorized = checkAdminAuth(request);
  if (unauthorized) return unauthorized;
  const body = await request.json();
  if (!Array.isArray(body.ids)) {
    return NextResponse.json({ error: 'ids array required' }, { status: 400 });
  }
  const projects = await readProjects();
  const byId = new Map(projects.map((p) => [p.id, p]));
  if (body.ids.length !== projects.length || !body.ids.every((id: string) => byId.has(id))) {
    return NextResponse.json(
      { error: 'ids must contain every project id exactly once' },
      { status: 400 }
    );
  }
  const ordered = body.ids.map((id: string) => byId.get(id) as ProjectRecord);
  await writeProjects(ordered);
  return NextResponse.json(ordered);
}
