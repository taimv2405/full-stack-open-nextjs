import Link from 'next/link';
import Form from 'next/form';
import { getBlogs } from '../services/blogs';

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const blogs = (await getBlogs(filter)).toSorted((a, b) => b.likes - a.likes);

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
