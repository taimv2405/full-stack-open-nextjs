import { notFound } from 'next/navigation';
import { getUserById } from '../../services/users';

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUserById(Number(id));

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
    </div>
  );
};

export default UserPage;
