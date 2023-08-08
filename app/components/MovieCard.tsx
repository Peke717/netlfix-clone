import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { BsFillPlayFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';
import { MovieInterface } from '@/types/movie';

interface MovieCardProps {
	data: MovieInterface;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
	const router = useRouter();
	const { openModal } = useInfoModal();

	const redirectToWatch = useCallback(
		() => router.push(`/watch/${data.id}`),
		[router, data.id]
	);

	// problem ##當hover圖片時，右半側的圖會被右邊的左側覆蓋
	return (
		<div className="group relative bg-transparent ">
			<img
				onClick={redirectToWatch}
				src={data.thumbnailUrl}
				alt="Thumbnail"
				className=" 
          object-cover
          cursor-pointer
          transition
          shadow-xl
					delay-300
          rounded-md
          w-full h-[16vw] md:h-[11vw] lg:h-[9vw] xl:h-[8vw]
        "
			/>
			<div
				className=" 
          absolute
          top-0
          transition
          w-full
					opacity-0
					duration-300
					group-hover:delay-300
          group-hover:scale-150
          group-hover:z-40
          group-hover:-translate-y-[4vw]
					group-hover:opacity-100
        "
			>
				<img
					onClick={redirectToWatch}
					className=" 
            cursor-pointer
            object-cover
            transition
            duration
            shashow-xl
            rounded-t-md
            w-full
            h-[16vw] md:h-[11vw] lg:h-[9vw] xl:h-[8vw]
          "
					src={data.thumbnailUrl}
					alt="Thumbnail"
				/>
				<div
					className=" z-10
            bg-zinc-800
            p-2 lg:p-4
            absolute
            w-full
            transition
            shashow-md
            rounded-b-md
						duration-300
            hidden
						group-hover:block
          "
				>
					<div className="flex flex-row items-center gap-2">
						<div
							className="
                cursor-pointer
                w-4 h-4
                lg:w-7 lg:h-7
                bg-white
                rounded-full
                flex
                justify-center
                items-center
                transition
                hover:bg-neutral-300
              "
							onClick={redirectToWatch}
						>
							<BsFillPlayFill size={20} />
						</div>
						<FavoriteButton movieId={data?.id} />
						<div
							onClick={() => openModal(data?.id)}
							className="
              cursor-pointer
              ml-auto
              group/item
              w-4 lg:w-7
              h-4 lg:h-7
              border-white
              border-2
              rounded-full
              flex justify-center items-center 
              transtion
              hover:border-neutral-300
              "
						>
							<BiChevronDown
								size={30}
								className="text-white group-hover/item:text-neutral-300"
							/>
						</div>
					</div>
					<div className="text-green-400 font-semibold text-sm mt-[6px] lg:mt-2">
						{data?.new ? '新' : ''}{' '}
						<span className="text-white flex flex-row font-normal text-xs">
							2023
						</span>
					</div>

					<div className="flex flex-row mt-1 lg:mt-2 gap-2 items-center text-white text-xs ">
						<p>{data.duration}</p>
						<p>{data.genre}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
