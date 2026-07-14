import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { readingList } from '@/db/schema';

export const getReadingList = async (userId: number) => {
  return db.query.readingList.findMany({
    where: eq(readingList.userId, userId),
    with: { blog: true },
  });
};

export const addToReadingList = async (userId: number, blogId: number) => {
  await db.insert(readingList).values({ userId, blogId }).onConflictDoNothing();
};
