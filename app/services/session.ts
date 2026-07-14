import { auth } from '@/auth';
import { getUserByUsername } from './users';

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  return getUserByUsername(session.user.email);
};
