import { redirect } from 'next/navigation';
import { getReadingList } from '@/app/services/readingList';
import { getCurrentUser } from '@/app/services/session';
import ReadingListSection from './ReadingListSection';
import ApiTokenSection from './ApiTokenSection';

const Me = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  const readingList = await getReadingList(user.id);
  const unreadList = readingList.filter((entry) => !entry.read);
  const readList = readingList.filter((entry) => entry.read);

  return (
    <div
      data-testid="user-profile"
      className="max-w-2xl mx-auto mt-6 p-6 border rounded"
    >
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p data-testid="user-name" className="mb-2">
        <strong>Name:</strong> {user.name}
      </p>
      <p data-testid="user-username" className="mb-2">
        <strong>Username:</strong> {user.username}
      </p>
      <hr className="my-4" />
      <section data-testid="reading-list-section">
        <h2 className="text-xl font-bold mb-4">Reading List</h2>
        {readingList.length > 0 ? (
          <>
            <ReadingListSection
              heading="Unread"
              entries={unreadList}
              testId="unread-section"
              emptyTestId="no-unread-blogs"
            />
            <ReadingListSection heading="Read" entries={readList} />
          </>
        ) : (
          <p data-testid="empty-reading-list" className="text-gray-500">
            Your reading list is empty.
          </p>
        )}
      </section>
      <hr className="my-4" />
      <ApiTokenSection initialToken={user.apiToken} />
    </div>
  );
};

export default Me;
