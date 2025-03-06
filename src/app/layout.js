import { AuthProvider } from '@/utils/context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'Giddaa',
  description: 'Test Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
