import { NextAuthProvider } from './providers';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import useInfoModal from '@/hooks/useInfoModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: '首頁 - Netflix',
	description: 'Netflix'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<link href="images/netflix.ico" rel="netflix icon" />
			<body
				className={`${inter.className} bg-[#141414] overflow-y-scroll scroll-smooth`}
			>
				<NextAuthProvider>{children}</NextAuthProvider>
			</body>
		</html>
	);
}
