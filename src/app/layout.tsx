import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import AuthContext from '@/context/AuthContext';
import { ReactNode } from 'react';
import { ToasterContext } from '@/context/ToasterContext';

export const metadata: Metadata = {
  title: 'Amuna',
  description: '관심사 채팅',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
