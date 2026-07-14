'use server';

import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

type RegisterErrors = {
  username?: string;
  password?: string;
  passwordConfirm?: string;
};

type RegisterState = {
  success?: boolean;
  errors?: RegisterErrors;
  values?: {
    username: string;
    name: string;
  };
};

export const registerUser = async (
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> => {
  const username = (formData.get('username') as string)?.trim();
  const name = (formData.get('name') as string)?.trim();
  const password = formData.get('password') as string;
  const passwordConfirm = formData.get('passwordConfirm') as string;

  const errors: RegisterErrors = {};

  if (!username || username.length < 4)
    errors.username = 'Username must be at least 4 characters long';
  if (!password || password.length < 4)
    errors.password = 'Password must be at least 4 characters long';
  if (password !== passwordConfirm)
    errors.passwordConfirm = 'Passwords do not match';

  if (Object.keys(errors).length === 0) {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    if (existingUser) errors.username = 'Username already exists';
  }

  if (Object.keys(errors).length > 0)
    return { success: false, errors, values: { username, name } };

  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({ username, name, passwordHash });

  return { success: true };
};
