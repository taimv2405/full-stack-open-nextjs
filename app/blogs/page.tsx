import Link from 'next/link';
import Form from 'next/form';
import { getBlogs, getBlogsByTitle } from '../services/blogs';

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const trimmedFilter = filter?.trim();
  const blogs = (
    trimmedFilter ? await getBlogsByTitle(trimmedFilter) : await getBlogs()
  ).toSorted((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>
      <Form action="">
        <input type="text" name="filter" defaultValue={filter} />
        <button type="submit">filter</button>
      </Form>
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
