'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import NavLink from './NavLink';

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  return (
    <nav className="bg-gray-800 text-white px-6 h-14 flex items-center gap-4">
      <NavLink href="/">home</NavLink>
      {' | '}
      <NavLink href="/blogs">blogs</NavLink>
      {' | '}
      <NavLink href="/users">users</NavLink>
      {session && (
        <>
          {' | '} <NavLink href="/blogs/new">create blog</NavLink>
        </>
      )}

      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <em className="text-gray-300">{session.user?.name} logged in</em>
            <button
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">login</NavLink>
            {' | '}
            <NavLink href="/register">register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
