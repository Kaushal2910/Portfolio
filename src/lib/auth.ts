import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

// Set ADMIN_PASSWORD in .env.local — the fallback below is for local dev only.
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kaushal2910';

export const ADMIN_COOKIE = 'ks_admin';

function expectedToken(): string {
  return createHash('sha256').update(`ks-admin::${ADMIN_PASSWORD}`).digest('hex');
}

/**
 * Returns a 401 response if the request is not authenticated, otherwise null.
 * Accepts either the HttpOnly session cookie or an x-admin-password header.
 */
export function checkAdminAuth(request: NextRequest): NextResponse | null {
  const cookieToken = request.cookies.get(ADMIN_COOKIE)?.value;
  const headerPassword = request.headers.get('x-admin-password');

  const cookieOk = cookieToken === expectedToken();
  const headerOk = headerPassword !== null && headerPassword === ADMIN_PASSWORD;

  if (!cookieOk && !headerOk) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  };
}

export { expectedToken };
