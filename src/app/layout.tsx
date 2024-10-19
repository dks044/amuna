import type { Metadata } from 'next';
import './globals.scss';
import AuthContext from '@/context/AuthContext';
import { ToasterContext } from '@/context/ToasterContext';
import localFont from 'next/font/local';
import { Jua } from 'next/font/google';
import getCurrentUser from './actions/getCurrentUser';
import ActiveContext from '@/context/ActiveContext';

const jua = Jua({
  weight: ['400'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Amuna',
  description: '관심사 채팅',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={jua.className}>
        <AuthContext>
          <ActiveContext />
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
