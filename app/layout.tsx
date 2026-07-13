import Link from 'next/link';
import AuthSessionProvider from './components/SessionProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>
          <nav>
            <Link href="/">home</Link>
            {' | '}
            <Link href="/blogs">blogs</Link>
            {' | '}
            <Link href="/users">users</Link>
            {' | '}
            <Link href="/blogs/new">create new</Link>
          </nav>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
