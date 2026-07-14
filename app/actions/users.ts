'use server';

import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/app/services/session';
import {
  createUser,
  getUserByUsername,
  regenerateApiToken,
} from '@/app/services/users';

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
    const existingUser = await getUserByUsername(username);
    if (existingUser) errors.username = 'Username already exists';
  }

  if (Object.keys(errors).length > 0)
    return { success: false, errors, values: { username, name } };

  await createUser(username, name, password);

  return { success: true };
};

export const generateToken = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Not logged in');
  }

  await regenerateApiToken(user.id);
  revalidatePath('/me');
};
