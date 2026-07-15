'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlog } from '@/app/actions/blogs';
import { useNotification } from '@/app/components/NotificationContext';

const NewBlogForm = () => {
  const [state, formAction] = useActionState(createBlog, {});
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification('Blog created successfully!', 'success');
      router.push('/blogs');
    }
  }, [state.success, showNotification, router]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">
            Title
            <input
              type="text"
              name="title"
              defaultValue={state.values?.title}
              required
              minLength={5}
              className="mt-1 w-full px-2 py-1 border rounded font-normal"
            />
          </label>
          {state.errors?.title && (
            <p className="text-red-600 text-sm mt-1">{state.errors.title}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">
            Author
            <input
              type="text"
              name="author"
              defaultValue={state.values?.author}
              required
              minLength={5}
              className="mt-1 w-full px-2 py-1 border rounded font-normal"
            />
          </label>
          {state.errors?.author && (
            <p className="text-red-600 text-sm mt-1">{state.errors.author}</p>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">
            URL
            <input
              type="text"
              name="url"
              defaultValue={state.values?.url}
              required
              minLength={5}
              className="mt-1 w-full px-2 py-1 border rounded font-normal"
            />
          </label>
          {state.errors?.url && (
            <p className="text-red-600 text-sm mt-1">{state.errors.url}</p>
          )}
        </div>
        <button
          type="submit"
          data-testid="create-blog-button"
          className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;
