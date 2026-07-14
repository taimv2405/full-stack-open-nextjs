import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { db } from '@/db';
import { users } from '@/db/schema';

export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getUserByUsername = async (username: string) => {
  const user = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  return user ?? null;
};

export const getUserByApiToken = async (apiToken: string) => {
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

  return user ?? null;
};

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
};

export const createUser = async (
  username: string,
  name: string,
  password: string,
) => {
  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({ username, name, passwordHash });
};

export const regenerateApiToken = async (userId: number) => {
  const apiToken = crypto.randomUUID();
  await db.update(users).set({ apiToken }).where(eq(users.id, userId));

  return apiToken;
};
