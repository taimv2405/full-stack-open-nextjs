import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import NewBlogForm from './NewBlogForm';

const NewBlogPage = async () => {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  return <NewBlogForm />;
};

export default NewBlogPage;
