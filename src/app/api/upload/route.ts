import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { checkAdminAuth } from '@/lib/auth';

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'application/pdf': 'pdf',
};

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

function slugify(name: string): string {
  return name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 60) || 'file';
}

export async function POST(request: NextRequest) {
  const unauthorized = checkAdminAuth(request);
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const rawFolder = formData.get('folder');
    const folder = rawFolder === 'projects' ? 'projectsImages' : rawFolder === 'site' ? 'site' : 'certificates';

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        { error: 'Unsupported file type. Use JPG, PNG, WebP, or PDF.' },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large (max 10 MB).' }, { status: 400 });
    }

    // Site assets get fixed filenames and overwrite (single source of truth)
    if (folder === 'site') {
      const target = formData.get('target') === 'resume' ? 'resume' : 'profile';
      const fixedName = target === 'resume' ? 'resume.pdf' : 'profile.jpg';
      if (target === 'resume' && file.type !== 'application/pdf') {
        return NextResponse.json({ error: 'Resume must be a PDF.' }, { status: 400 });
      }
      if (target === 'profile' && !file.type.startsWith('image/')) {
        return NextResponse.json({ error: 'Profile must be an image.' }, { status: 400 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(join(process.cwd(), 'public', fixedName), buffer);
      return NextResponse.json({ path: `/${fixedName}`, size: file.size });
    }

    const dir = join(process.cwd(), 'public', folder);
    await mkdir(dir, { recursive: true });

    const filename = `${slugify(file.name)}.${ext}`;
    // Prefix with timestamp so re-uploads never overwrite different files
    const uniqueName = `${Date.now()}_${filename}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(join(dir, uniqueName), buffer);

    return NextResponse.json({
      path: `/${folder}/${uniqueName}`,
      size: file.size,
    });
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
