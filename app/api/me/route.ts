import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization');
  const apiToken = authHeader?.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : null;

  if (!apiToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.apiToken, apiToken),
    columns: {
      id: true,
      username: true,
      name: true,
    },
    with: {
      blogs: {
        columns: {
          id: true,
          title: true,
          author: true,
          url: true,
          likes: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ user });
};
