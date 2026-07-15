import Link from 'next/link';

const BlogEntry = ({
  blog,
}: {
  blog: { id: number; title: string; author: string; likes: number };
}) => (
  <>
    <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline">
      {blog.title}
    </Link>{' '}
    <span className="text-amber-600">by {blog.author}</span>{' '}
    <span className="text-gray-500">{blog.likes} likes</span>
  </>
);

export default BlogEntry;
