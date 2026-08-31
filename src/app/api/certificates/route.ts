import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const DATA_PATH = join(process.cwd(), 'src/data/certificates.ts');

async function readCerts() {
  const data = await readFile(DATA_PATH, 'utf-8');
  // Extract the array from the TypeScript file
  const match = data.match(/export const certificates: Certificate\[\] = (\[[\s\S]*?\]);/);
  if (!match) return [];
  return JSON.parse(match[1]);
}

async function writeCerts(certs: any[]) {
  const fileContent = `import type { Certificate } from '@/types';

export const certificateCategories = [
  { id: 'All', label: 'All' },
  { id: 'Cloud & DevOps', label: 'Cloud & DevOps' },
  { id: 'AI & Data', label: 'AI & Data' },
  { id: 'Skills & Experience', label: 'Skills & Experience' },
];

export const certificates: Certificate[] = ${JSON.stringify(certs, null, 2)};
`;
  await writeFile(DATA_PATH, fileContent);
}

export async function GET() {
  const certs = await readCerts();
  return NextResponse.json(certs);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const certs = await readCerts();
  const newCert = {
    id: String(Date.now()),
    title: body.title || '',
    imageUrl: body.imageUrl || '',
    downloadUrl: body.downloadUrl || '',
  };
  certs.push(newCert);
  await writeCerts(certs);
  return NextResponse.json(newCert, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const certs = await readCerts();
  const index = certs.findIndex((c: any) => c.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
  }
  certs[index] = { ...certs[index], ...body };
  await writeCerts(certs);
  return NextResponse.json(certs[index]);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const certs = await readCerts();
  const filtered = certs.filter((c: any) => c.id !== id);
  if (filtered.length === certs.length) {
    return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
  }
  await writeCerts(filtered);
  return NextResponse.json({ success: true });
}
