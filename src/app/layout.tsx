import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import { Navbar } from '@/components';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quiz App',
  description: 'Quiz App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'antialiased min-h-screen pt-16')}>
        {/* <Providers> */}
        <Navbar />
        {children}
        {/* <Toaster /> */}
        {/* </Providers> */}
      </body>
    </html>
  );
}
