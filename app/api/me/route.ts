import { NextRequest, NextResponse } from 'next/server';
import { getUserByApiToken } from '@/app/services/users';

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization');
  const apiToken = authHeader?.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : null;

  if (!apiToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await getUserByApiToken(apiToken);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ user });
};
