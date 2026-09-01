import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, expectedToken, sessionCookieOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === 'string' ? body.password : '';

  // Small delay to slow down brute-force attempts
  await new Promise((r) => setTimeout(r, 300));

  if (password !== (process.env.ADMIN_PASSWORD || 'kaushal2910')) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, expectedToken(), sessionCookieOptions());
  return res;
}
