'use server';

import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/app/services/session';
import {
  createUser,
  regenerateApiToken,
  validateNewUser,
  type NewUserErrors,
} from '@/app/services/users';

type RegisterErrors = NewUserErrors & {
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

  const errors: RegisterErrors = await validateNewUser(username, password);

  if (password !== passwordConfirm)
    errors.passwordConfirm = 'Passwords do not match';

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

  const apiToken = await regenerateApiToken(user.id);
  revalidatePath('/me');
  return apiToken;
};
