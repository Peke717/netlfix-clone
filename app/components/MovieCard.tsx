import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { BsFillPlayFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';
import Image from 'next/image';

interface MovieCardProps {
	data: {
		id: string;
		title: string;
		description: string;
		thumbnailUrl: string;
		videoUrl: string;
		duration: string;
		genre: string;
	};
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
	const router = useRouter();
	const { openModal } = useInfoModal();

	const redirectToWatch = useCallback(
		() => router.push(`/watch/${data.id}`),
		[router, data.id]
	);

	return (
		<div className="group bg-zinc-900  relative h-[12vw]">
			<Image
				onClick={redirectToWatch}
				src={data.thumbnailUrl}
				alt="Thumbnail"
				className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          group-hover:opacity-0
          rounded-md
          delay-300
          w-full
          h-[12vw]
        "
			/>
			<div
				className="
          opacity-0
          absolute
          top-0
          left-0
          transition
          duration-200
          z-10
          invisible
          delay-300
          w-full
          group-hover:visible
          group-hover:scale-110
          group-hover:-translate-y-[6vw]
          group-hover:translate-x-[2vw]
          group-hover:opacity-100
        "
			>
				<Image
					onClick={redirectToWatch}
					className="
            cursor-pointer
            object-cover
            transition
            duration
            shashow-xl
            rounded-t-md
            w-full
            h-[12vw]
          "
					src={data.thumbnailUrl}
					alt="Thumbnail"
				/>
				<div
					className="
            z-10
            bg-zinc-800
            p-2
            lg:p-4
            absolute
            w-full
            transition
            shashow-md
            rounded-b-md
          "
				>
					<div className="flex flex-row items-center gap-3">
						<div
							className="
                cursor-pointer
                w-6 lg:w-10
                h-6 lg:h-10
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
              w-6 lg:w-10
              h-6 lg:h-10
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
					<p className="text-green-400 font-semibold mt-4">
						新 <span className="text-white">2023</span>
					</p>

					<div className="flex flex-row mt-4 gap-2 items-center">
						<p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
					</div>
					<div className="flex flex-row mt-4 gap-2 items-center">
						<p className="text-white text-[8px] lg:text-sm">{data.genre}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
