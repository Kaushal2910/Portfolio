import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const DATA_PATH = join(process.cwd(), 'data/projects.json');

async function readProjects() {
  const data = await readFile(DATA_PATH, 'utf-8');
  return JSON.parse(data);
}

async function writeProjects(projects: any[]) {
  await writeFile(DATA_PATH, JSON.stringify(projects, null, 2));
}

export async function GET() {
  const projects = await readProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const projects = await readProjects();
  const newProject = {
    id: String(Date.now()),
    title: body.title || '',
    description: body.description || '',
    tech: body.tech || [],
    githubUrl: body.githubUrl || '',
    demoUrl: body.demoUrl || '',
    image: body.image || '/projectsImages/placeholder.png',
    featured: body.featured || false,
  };
  projects.push(newProject);
  await writeProjects(projects);
  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const projects = await readProjects();
  const index = projects.findIndex((p: any) => p.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  projects[index] = { ...projects[index], ...body };
  await writeProjects(projects);
  return NextResponse.json(projects[index]);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const projects = await readProjects();
  const filtered = projects.filter((p: any) => p.id !== id);
  if (filtered.length === projects.length) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  await writeProjects(filtered);
  return NextResponse.json({ success: true });
}
