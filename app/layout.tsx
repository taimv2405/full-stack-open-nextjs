import './globals.css';
import NavBar from './components/NavBar';
import { NotificationProvider } from './components/NotificationContext';
import Notification from './components/Notification';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NotificationProvider>
          <NavBar />
          <Notification />
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
