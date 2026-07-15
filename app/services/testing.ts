import { db } from '@/db';
import { readingList, blogs, users } from '@/db/schema';

export const resetDatabase = async () => {
  await db.delete(readingList);
  await db.delete(blogs);
  await db.delete(users);
};
