import Client from './profilesClient';
import { redirect } from 'next/navigation';
import { getSession } from '../page';

const Profiles = async () => {
	const session = await getSession();
	if (!session) redirect('/auth');

	return <Client />;
};

export default Profiles;
