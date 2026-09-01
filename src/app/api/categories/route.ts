import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { checkAdminAuth } from '@/lib/auth';

const CATEGORIES_PATH = join(process.cwd(), 'data/certificate-categories.json');
const CERTS_PATH = join(process.cwd(), 'src/data/certificates.ts');

async function readCategories(): Promise<{ id: string; label: string }[]> {
  const data = await readFile(CATEGORIES_PATH, 'utf-8');
  return JSON.parse(data);
}

async function writeCategories(categories: { id: string; label: string }[]) {
  await writeFile(CATEGORIES_PATH, JSON.stringify(categories, null, 2) + '\n');
}

async function readCerts(): Promise<Record<string, unknown>[]> {
  const data = await readFile(CERTS_PATH, 'utf-8');
  const match = data.match(/export const certificates: Certificate\[\] = (\[[\s\S]*?\]);/);
  if (!match) return [];
  return JSON.parse(match[1]);
}

async function writeCerts(certs: Record<string, unknown>[]) {
  const fileContent = `import type { Certificate } from '@/types';

export const certificates: Certificate[] = ${JSON.stringify(certs, null, 2)};
`;
  await writeFile(CERTS_PATH, fileContent);
}

export async function GET() {
  const categories = await readCategories();
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const unauthorized = checkAdminAuth(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  const label = typeof body.label === 'string' ? body.label.trim() : '';
  if (!label) {
    return NextResponse.json({ error: 'Label is required' }, { status: 400 });
  }

  const categories = await readCategories();
  if (categories.some((c) => c.id.toLowerCase() === label.toLowerCase())) {
    return NextResponse.json({ error: 'Category already exists' }, { status: 409 });
  }

  categories.push({ id: label, label });
  await writeCategories(categories);
  return NextResponse.json(categories, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const unauthorized = checkAdminAuth(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  const { id, label } = body as { id?: string; label?: string };
  if (!id || !label?.trim()) {
    return NextResponse.json({ error: 'id and label are required' }, { status: 400 });
  }

  const categories = await readCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  const trimmed = label.trim();
  const newId = trimmed;
  const oldId = categories[index].id;

  categories[index] = { id: newId, label: trimmed };
  await writeCategories(categories);

  // Cascade the rename onto every certificate using the old id
  if (newId !== oldId) {
    const certs = await readCerts();
    let changed = false;
    for (const cert of certs) {
      if (cert.category === oldId) {
        cert.category = newId;
        changed = true;
      }
    }
    if (changed) await writeCerts(certs);
  }

  return NextResponse.json(categories);
}

export async function DELETE(request: NextRequest) {
  const unauthorized = checkAdminAuth(request);
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const moveTo = searchParams.get('moveTo'); // optional: reassign certs to another category
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const categories = await readCategories();
  if (categories.length <= 1) {
    return NextResponse.json({ error: 'At least one category must remain' }, { status: 400 });
  }
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  const certs = await readCerts();
  const usedCount = certs.filter((c) => c.category === id).length;

  if (usedCount > 0) {
    if (!moveTo) {
      return NextResponse.json(
        {
          error: `This category is used by ${usedCount} certificate(s). Pass moveTo=<categoryId> to reassign them, or confirm deletion to leave them uncategorized.`,
        },
        { status: 409 }
      );
    }
    if (moveTo === id) {
      return NextResponse.json({ error: 'moveTo must differ from the deleted category' }, { status: 400 });
    }
    for (const cert of certs) {
      if (cert.category === id) cert.category = moveTo;
    }
    await writeCerts(certs);
  }

  categories.splice(index, 1);
  await writeCategories(categories);
  return NextResponse.json({ success: true, reassigned: usedCount });
}
