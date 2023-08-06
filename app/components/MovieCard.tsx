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
          duration-300
          delay-300
          object-cover
          cursor-pointer
          transition
          shadow-xl
          opacity-100
          group-hover:opacity-0
          rounded-md
          w-full h-[8vw]
        "
			/>
			<div
				className="
          absolute
          top-0
          transition
          duration-300 
          w-full
          group-hover:scale-150
          group-hover:z-40
          group-hover:-translate-y-[4vw]
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
            rounded-md
            group-hover:rounded-b-none
            w-full
            h-[8vw]
          "
					src={data.thumbnailUrl}
					alt="Thumbnail"
				/>
				<div
					className="
            bg-zinc-800
            p-2 lg:p-4
            absolute
            w-full
            transition
            shashow-md
            rounded-b-md
            invisible
            group-hover:visible
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
					<div className="text-green-400 font-semibold text-sm  mt-2 lg:mt-4">
						{data?.new ? '新' : ''}{' '}
						<span className="text-white flex flex-row gap-3 font-normal text-xs">
							<p>2023</p>
							<p>{data.duration}</p>
							<p>{data.genre}</p>
						</span>
					</div>

					{/* <div className="flex flex-row mt-2 lg:mt-4 gap-2 items-center">
						<p className="text-white text-[10px] ">{data.duration}</p>
					</div>
					<div className="flex flex-row mt-2 lg:mt-4 gap-2 items-center">
						<p className="text-white text-[8px] ">{data.genre}</p>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
