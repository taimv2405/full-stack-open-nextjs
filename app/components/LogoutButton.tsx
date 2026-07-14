'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded text-sm"
    >
      logout
    </button>
  );
};

export default LogoutButton;
