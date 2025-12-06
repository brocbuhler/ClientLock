import { Inter } from 'next/font/google';
import "./globals.css";
import ClientProvider from '@/utils/context/ClientProvider';
import { ReactNode } from 'react';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, minHeight: '100vh' }}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
