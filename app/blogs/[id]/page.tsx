import { notFound } from 'next/navigation';
import { getBlogById } from '@/app/services/blogs';
import { isInReadingList } from '@/app/services/readingList';
import { getCurrentUser } from '@/app/services/session';
import { likeBlog } from '@/app/actions/blogs';
import { toggleReadingList } from '@/app/actions/readingList';

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  const user = await getCurrentUser();
  const isOwnBlog = user?.id === blog.userId;
  const inReadingList =
    user !== null && !isOwnBlog && (await isInReadingList(user.id, blog.id));

  return (
    <div data-testid="blog-detail" className="max-w-2xl mx-auto p-6">
      <h2 data-testid="blog-title" className="text-2xl font-bold mb-1">
        {blog.title}
      </h2>
      <p data-testid="blog-author" className="text-amber-600 mb-3">
        by {blog.author}
      </p>
      <p className="mb-3">
        <a href={blog.url} className="text-blue-600 hover:underline break-all">
          {blog.url}
        </a>
      </p>
      <p className="mb-3">likes: {blog.likes}</p>
      <div className="flex gap-2">
        <form action={likeBlog}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="px-3 py-1 rounded bg-blue-700 text-white hover:bg-blue-800"
          >
            like
          </button>
        </form>
        {user && !isOwnBlog && (
          <form action={toggleReadingList}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button
              type="submit"
              name="remove"
              value={String(inReadingList)}
              data-testid={
                inReadingList
                  ? 'remove-from-reading-list-button'
                  : 'add-to-reading-list-button'
              }
              className={`px-3 py-1 rounded text-white transition-colors ${
                inReadingList
                  ? 'bg-gray-500 hover:bg-gray-600'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {inReadingList
                ? 'remove from reading list'
                : 'add to reading list'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
