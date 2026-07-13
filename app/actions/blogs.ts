'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { addBlog, incrementLikes } from '@/app/services/blogs';
import { auth } from '@/auth';

type CreateBlogErrors = {
  title?: string;
  author?: string;
  url?: string;
};

type CreateBlogState = {
  errors?: CreateBlogErrors;
  values?: { title: string; author: string; url: string };
};

export const createBlog = async (
  _prevState: CreateBlogState,
  formData: FormData,
): Promise<CreateBlogState> => {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const url = formData.get('url') as string;

  const errors: CreateBlogErrors = {};

  if (!title || title.length < 5)
    errors.title = 'Blog title must be at least 5 characters long';
  if (!author || author.length < 5)
    errors.author = 'Blog author must be at least 5 characters long';
  if (!url || url.length < 5)
    errors.url = 'Blog url must be at least 5 characters long';

  if (Object.keys(errors).length > 0)
    return { errors, values: { title, author, url } };

  await addBlog(title, author, url);
  revalidatePath('/blogs');
  redirect('/blogs');
};

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get('id'));
  await incrementLikes(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath('/blogs');
};
