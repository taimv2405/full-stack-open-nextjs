'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  return (
    <nav>
      <Link href="/">home</Link>
      {' | '}
      <Link href="/blogs">blogs</Link>
      {' | '}
      <Link href="/users">users</Link>
      {' | '}
      {session ? (
        <>
          <Link href="/blogs/new">create new</Link>
          {' | '}
          <em>{session.user?.name} logged in</em>{' '}
          <button onClick={handleLogout}>logout</button>
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
          {' | '}
          <Link href="/register">register</Link>
        </>
      )}
    </nav>
  );
};
export default NavBar;
