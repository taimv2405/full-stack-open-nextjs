import BlogEntry from '@/app/components/BlogEntry';
import { markAsRead } from '@/app/actions/readingList';
import type { getReadingList } from '@/app/services/readingList';

type ReadingListEntry = Awaited<ReturnType<typeof getReadingList>>[number];

const ReadingListSection = ({
  heading,
  entries,
}: {
  heading: string;
  entries: ReadingListEntry[];
}) => {
  return (
    <section className="mb-4">
      <h3 className="text-lg font-semibold mb-2">
        {heading} ({entries.length})
      </h3>
      <ul className="list-disc pl-5 space-y-2">
        {entries.map((entry) => (
          <li key={entry.id} className="flex items-center">
            <div>
              <BlogEntry blog={entry.blog} />
            </div>
            {!entry.read && (
              <form action={markAsRead} className="ml-auto">
                <input type="hidden" name="entryId" value={entry.id} />
                <button
                  type="submit"
                  className="px-2 py-1 rounded text-white bg-green-500 hover:bg-green-600"
                >
                  mark as read
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ReadingListSection;
