'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  addToReadingList,
  removeFromReadingList,
  markEntryAsRead,
} from '@/app/services/readingList';
import { getCurrentUser } from '@/app/services/session';

export const toggleReadingList = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const blogId = Number(formData.get('blogId'));
  const remove = formData.get('remove') === 'true';

  if (remove) {
    await removeFromReadingList(user.id, blogId);
  } else {
    await addToReadingList(user.id, blogId);
  }

  revalidatePath(`/blogs/${blogId}`);
  revalidatePath('/me');
};

export const markAsRead = async (formData: FormData) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const entryId = Number(formData.get('entryId'));
  await markEntryAsRead(user.id, entryId);

  revalidatePath('/me');
};
