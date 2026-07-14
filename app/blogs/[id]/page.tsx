import { notFound } from 'next/navigation';
import { getBlogById } from '@/app/services/blogs';
import { likeBlog } from '@/app/actions/blogs';

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-1">{blog.title}</h2>
      <p className="text-amber-600 mb-3">by {blog.author}</p>
      <p className="mb-3">
        <a
          href={blog.url}
          className="text-blue-600 hover:underline break-all"
        >
          {blog.url}
        </a>
      </p>
      <p className="mb-3">likes: {blog.likes}</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button
          type="submit"
          className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-700"
        >
          like
        </button>
      </form>
    </div>
  );
};

export default BlogPage;
