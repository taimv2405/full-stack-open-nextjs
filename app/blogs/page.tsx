import { getBlogs } from '@/app/services/blogs';
import BlogFilterForm from './BlogFilterForm';
import BlogEntry from '@/app/components/BlogEntry';

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const blogs = (await getBlogs(filter)).toSorted((a, b) => b.likes - a.likes);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <BlogFilterForm defaultValue={filter} />
      <ul>
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="mb-2 border rounded p-3 hover:bg-gray-50"
          >
            <BlogEntry blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
