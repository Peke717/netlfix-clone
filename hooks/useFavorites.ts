import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useFavorites = () => {
	const { data, error, isLoading, mutate } = useSWR(
		'/api/getFavorites',
		fetcher
	);

	return {
		data,
		error,
		isLoading,
		mutate
	};
};

export default useFavorites;
