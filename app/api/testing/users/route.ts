import { NextRequest, NextResponse } from 'next/server';
import { createUser, validateNewUser } from '@/app/services/users';

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 },
    );
  }
  const { username, name, password } = await req.json();

  const errors = await validateNewUser(username, password);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  await createUser(username, name, password);
  return NextResponse.json({ message: 'User created successfully' });
};
