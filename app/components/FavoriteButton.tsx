import axios from 'axios';
import React, { useCallback, useMemo } from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';

interface FavoriteButtonProps {
	movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
	const { mutate: mutateFavorites } = useFavorites();
	const { data: currentUser, mutate } = useCurrentUser();

	const isFavorite = useMemo(() => {
		const list = currentUser?.favoriteIds || [];

		return list.includes(movieId);
	}, [currentUser, movieId]);

	const toggleFavorites = useCallback(async () => {
		let response;

		if (isFavorite) {
			response = await axios.delete('/api/favorite', { data: { movieId } });
		} else {
			response = await axios.post('/api/favorite', { movieId });
		}

		const updatedFavoriteIds = response?.data?.favoriteIds;

		mutate({ ...currentUser, favoriteIds: updatedFavoriteIds });

		// 更新fetch最愛
		mutateFavorites();
	}, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

	const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

	return (
		<div
			onClick={toggleFavorites}
			className="
        cursor-pointer
        group/item
        w-4 lg:w-7
				h-4 lg:h-7
        border-neutral-300
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-white
      "
		>
			<Icon className="text-neutral-300" size={20} />
		</div>
	);
};

export default FavoriteButton;
