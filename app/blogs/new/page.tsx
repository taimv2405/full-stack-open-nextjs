'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlog } from '@/app/actions/blogs';
import { useNotification } from '@/app/components/NotificationContext';

const NewBlog = () => {
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
    <div>
      <h2>Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title
            <input
              type="text"
              name="title"
              defaultValue={state.values?.title}
              required
              minLength={5}
            />
          </label>
          {state.errors?.title && (
            <p style={{ color: 'red' }}>{state.errors.title}</p>
          )}
        </div>
        <div>
          <label>
            Author
            <input
              type="text"
              name="author"
              defaultValue={state.values?.author}
              required
              minLength={5}
            />
          </label>
          {state.errors?.author && (
            <p style={{ color: 'red' }}>{state.errors.author}</p>
          )}
        </div>
        <div>
          <label>
            Url
            <input
              type="text"
              name="url"
              defaultValue={state.values?.url}
              required
              minLength={5}
            />
          </label>
          {state.errors?.url && (
            <p style={{ color: 'red' }}>{state.errors.url}</p>
          )}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
