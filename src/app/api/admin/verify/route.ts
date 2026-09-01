import { NextRequest, NextResponse } from 'next/server';
import { checkAdminAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const unauthorized = checkAdminAuth(request);
  return NextResponse.json({ authed: !unauthorized });
}
