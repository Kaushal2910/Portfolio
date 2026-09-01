import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { checkAdminAuth } from '@/lib/auth';

const DATA_PATH = join(process.cwd(), 'src/data/certificates.ts');

async function readCerts(): Promise<Record<string, unknown>[]> {
  const data = await readFile(DATA_PATH, 'utf-8');
  // Extract the array from the TypeScript file
  const match = data.match(/export const certificates: Certificate\[\] = (\[[\s\S]*?\]);/);
  if (!match) return [];
  return JSON.parse(match[1]);
}

async function writeCerts(certs: Record<string, unknown>[]) {
  const fileContent = `import type { Certificate } from '@/types';

export const certificates: Certificate[] = ${JSON.stringify(certs, null, 2)};
`;
  await writeFile(DATA_PATH, fileContent);
}

export async function GET() {
  const certs = await readCerts();
  return NextResponse.json(certs);
}

export async function POST(request: NextRequest) {
  const unauthorized = checkAdminAuth(request);
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const certs = await readCerts();
  const newCert = {
    id: String(Date.now()),
    title: body.title || '',
    imageUrl: body.imageUrl || '',
    downloadUrl: body.downloadUrl || '',
    category: body.category || 'Skills & Experience',
    issuer: body.issuer || '',
    year: body.year || '',
  };
  // New certificates go to the top so they appear first on the site
  certs.unshift(newCert);
  await writeCerts(certs);
  return NextResponse.json(newCert, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const unauthorized = checkAdminAuth(request);
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const certs = await readCerts();
  const index = certs.findIndex((c: Record<string, unknown>) => c.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
  }
  certs[index] = { ...certs[index], ...body };
  await writeCerts(certs);
  return NextResponse.json(certs[index]);
}

export async function DELETE(request: NextRequest) {
  const unauthorized = checkAdminAuth(request);
  if (unauthorized) return unauthorized;
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const certs = await readCerts();
  const filtered = certs.filter((c) => c.id !== id);
  if (filtered.length === certs.length) {
    return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
  }
  await writeCerts(filtered);
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
  const certs = await readCerts();
  const byId = new Map(certs.map((c) => [String(c.id), c]));
  if (
    body.ids.length !== certs.length ||
    !body.ids.every((id: string) => byId.has(id))
  ) {
    return NextResponse.json(
      { error: 'ids must contain every certificate id exactly once' },
      { status: 400 }
    );
  }
  const ordered = body.ids.map((id: string) => byId.get(id) as Record<string, unknown>);
  await writeCerts(ordered);
  return NextResponse.json(ordered);
}
