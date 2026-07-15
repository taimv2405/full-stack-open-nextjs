import BlogEntry from '@/app/components/BlogEntry';
import { markAsRead } from '@/app/actions/readingList';
import type { getReadingList } from '@/app/services/readingList';

type ReadingListEntry = Awaited<ReturnType<typeof getReadingList>>[number];

const ReadingListSection = ({
  heading,
  entries,
  testId,
  emptyTestId,
}: {
  heading: string;
  entries: ReadingListEntry[];
  testId?: string;
  emptyTestId?: string;
}) => {
  return (
    <section className="mb-4" data-testid={testId}>
      <h3 className="text-lg font-semibold mb-2">
        {heading} ({entries.length})
      </h3>
      {entries.length === 0 && emptyTestId ? (
        <p data-testid={emptyTestId} className="text-gray-500">
          No {heading.toLowerCase()} blogs
        </p>
      ) : (
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
                    data-testid={`mark-read-${entry.id}`}
                    className="px-2 py-1 rounded text-white bg-green-500 hover:bg-green-600"
                  >
                    mark as read
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ReadingListSection;
