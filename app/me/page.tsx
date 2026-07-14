import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/services/session';
import { generateToken } from '@/app/actions/users';

const Me = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p className="mb-2">
        <strong>Name:</strong> {user.name}
      </p>
      <p className="mb-2">
        <strong>Username:</strong> {user.username}
      </p>
      <hr className="my-4" />
      <h2 className="text-xl font-bold mb-4">API Token</h2>
      {user.apiToken ? (
        <div className="mb-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 rounded">
          <p className="mb-2 font-bold">Current token:</p>
          <p className="bg-gray-200 dark:bg-gray-700 p-2 rounded break-all">
            {user.apiToken}
          </p>
        </div>
      ) : (
        <p className="text-gray-500 mb-2">No token has been generated yet</p>
      )}
      <form action={generateToken}>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate New Token
        </button>
      </form>
    </div>
  );
};

export default Me;
