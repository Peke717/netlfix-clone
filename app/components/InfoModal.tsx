import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import PlayButton from './playButton';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';
import { useRouter } from 'next/navigation';

interface InfoModalProps {
	visible?: boolean;
	onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
	const [isVisible, setIsvisible] = useState(!!visible);

	const { movieId } = useInfoModal();
	const { data = {} } = useMovie(movieId);

	const router = useRouter();

	const redirectToWatch = useCallback(
		() => router.push(`/watch/${data.id}`),
		[router, data.id]
	);

	useEffect(() => {
		setIsvisible(!!visible);
	}, [visible]);

	const handleClose = useCallback(() => {
		setIsvisible(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [onClose]);

	if (!visible) {
		return null;
	}

	return (
		<div
			className="
        z-30
        flex justify-center items-center
        box-border
				absolute
				top-0 left-0
				h-full w-full
      "
		>
			<div
				className="w-[435px] lg:w-[850px] origin-[50%_12.5%] left-auto
					top-[2em]
					mb-[2em]
					absolute
          rounded-md
          overflow-hidden
        "
			>
				<div
					className={`${isVisible ? 'scale-100' : 'scale-50'}
            transform
            duration-300
            relative
            drop-shadow-md
						
					`}
				>
					<div className="relative h-96 ">
						<video
							onClick={redirectToWatch}
							className="
							w-full h-full
							bg-transparent
              object-cover
							cursor-pointer
              "
							preload="auto"
							autoPlay
							muted
							poster={data?.thumbnailUrl}
							src={data?.videoUrl}
						></video>
						<div
							className=" active:ring-2 active:ring-white
                cursor-pointer
                absolute top-3 right-3
                h-10 w-10
                rounded-full

                bg-black bg-opacity-70
                flex items-center justify-center
              "
							onClick={handleClose}
						>
							<AiOutlineClose className="text-white" size={20} />
						</div>

						<div className="absolute bottom-[10%] left-10">
							<p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
								{data?.title}
							</p>
							<div className="flex flex-row gap-4 items-center">
								<PlayButton movieId={data?.id} />
								<FavoriteButton movieId={data?.id} />
							</div>
						</div>
					</div>

					<div className="px-12 py-8 bg-zinc-900">
						<p className="text-green-400 font-semibold text-lg">
							{data?.new ? '新' : ''}
						</p>
						<p className="text-white">{data?.duration}</p>
						<p className="text-white">{data?.genre}</p>
						<p className="text-white">{data?.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InfoModal;
