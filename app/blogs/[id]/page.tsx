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
    <div>
      <h2>{blog.title}</h2>
      <p>by {blog.author}</p>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>likes: {blog.likes}</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">like</button>
      </form>
    </div>
  );
};

export default BlogPage;
