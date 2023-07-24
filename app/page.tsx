import Client from './client';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function getSession() {
	const session = await getServerSession(authOptions);
	return session;
}

const Home = async () => {
	const session = await getSession();
	if (!session) redirect('/auth');

	return <Client />;
};

export default Home;
