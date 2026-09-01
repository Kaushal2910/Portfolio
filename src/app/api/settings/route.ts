import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { checkAdminAuth } from '@/lib/auth';

const SETTINGS_PATH = join(process.cwd(), 'data/settings.json');

async function readSettings(): Promise<Record<string, string>> {
  const data = await readFile(SETTINGS_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function GET() {
  const settings = await readSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const unauthorized = checkAdminAuth(request);
  if (unauthorized) return unauthorized;

  const body = await request.json();
  const settings = await readSettings();

  if (typeof body.profilePhoto === 'string') settings.profilePhoto = body.profilePhoto;
  if (typeof body.resumeUrl === 'string') settings.resumeUrl = body.resumeUrl;

  await writeFile(SETTINGS_PATH, JSON.stringify(settings, null, 2) + '\n');
  return NextResponse.json(settings);
}
