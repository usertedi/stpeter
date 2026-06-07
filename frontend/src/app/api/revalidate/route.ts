import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const getBackendBaseUrl = () => {
  const apiUrl = (process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL)?.trim().replace(/\/+$/, '');
  return apiUrl ?? null;
};

async function isAdminRequest(request: NextRequest) {
  const authorization = request.headers.get('authorization');

  if (!authorization?.startsWith('Bearer ')) {
    return false;
  }

  const backendBaseUrl = getBackendBaseUrl();

  if (!backendBaseUrl) {
    return false;
  }

  try {
    const response = await fetch(`${backendBaseUrl}/api/auth/me`, {
      headers: { Authorization: authorization },
      cache: 'no-store',
    });

    if (!response.ok) {
      return false;
    }

    const payload = await response.json();
    const user = payload?.data;

    return Boolean(user?.isAdmin || user?.role === 'admin');
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  let paths: unknown;

  try {
    const body = await request.json();
    paths = body?.paths;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  if (!Array.isArray(paths) || paths.length === 0) {
    return NextResponse.json({ success: false, error: 'paths must be a non-empty array' }, { status: 400 });
  }

  const revalidated: string[] = [];

  for (const path of paths) {
    if (typeof path !== 'string' || !path.startsWith('/')) {
      continue;
    }

    revalidatePath(path);
    revalidated.push(path);
  }

  if (revalidated.length === 0) {
    return NextResponse.json({ success: false, error: 'No valid paths provided' }, { status: 400 });
  }

  return NextResponse.json({ success: true, revalidated });
}
