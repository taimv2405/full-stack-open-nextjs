import Link from 'next/link';
import { getBlogs, getBlogsByTitle } from '../services/blogs';

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const blogs = (
    filter ? await getBlogsByTitle(filter) : await getBlogs()
  ).toSorted((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>
      <form>
        <input type="text" name="filter" defaultValue={filter} />
        <button type="submit">filter</button>
      </form>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by{' '}
            {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
