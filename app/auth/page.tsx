import Client from './authClient';
import { redirect } from 'next/navigation';
import { getSession } from '../page';

const Auth = async () => {
	const session = await getSession();
	if (session) redirect('/');

	return <Client />;
};

export default Auth;
