import { auth } from '@/auth';
import NavLink from './NavLink';
import LogoutButton from './LogoutButton';

const NavBar = async () => {
  const session = await auth();

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
            <NavLink href="/me">me</NavLink>
            <LogoutButton />
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
