import React, { useCallback } from 'react';
import useBillBoard from '@/hooks/useBillBoard';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './playButton';
import useInfoModal from '@/hooks/useInfoModal';

const BillBoard = () => {
	const { data } = useBillBoard();
	const { openModal } = useInfoModal();

	const handleOpenModal = useCallback(() => {
		openModal(data?.id);
	}, [openModal, data?.id]);

	return (
		<div className="relative mb-5 pb-[40%] touch-pan-y select-none">
			<div className="absolute w-full h-[56.25vw] z-0">
				<div>
					<video
						className="object-cover bg-cover bg-[50%] w-[100%]"
						// autoPlay
						muted
						poster={data?.thumbnailUrl}
						src={data?.videoUrl}
					></video>
					<div className="bg-gradient-to-r from-black/60  to-transparent to-85% bottom-0 left-0 absolute right-[26.09%] top-0 transition-opacity duration-500 opacity-1 z-8"></div>
					<div
						style={{
							backgroundImage:
								'linear-gradient(180deg,rgb(20 20 20 / 0%) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)'
						}}
						className=" bg-top bg-repeat-x bottom-[-1px] left-0 right-0 z-8 absolute h-[14.7vw] opacity-1 top-auto w-[100%]
          "
					></div>
				</div>
				<div className="h-[100%] w-[100%] absolute bottom-0 left-0 right-0 top-0">
					<div className=" bottom-[35%] flex flex-col justify-end left-[4%] absolute top-0 w-[36%] z-10">
						<p
							className="
          text-white 
          text-[4vw]
          duration-300
          font-bold
          mb-[1.2vw]
          "
						>
							{data?.title}
						</p>
						<p className="text-white text-[1.2vw] font-normal mt-[0.1vw] w-[100%]  drop-shadow-xl">
							{data?.description}
						</p>
						<div className="flex flex-row relative whitespace-nowrap z-10  items-center mt-[1.5vw] gap-3">
							<PlayButton movieId={data?.id} />
							<button
								onClick={handleOpenModal}
								className="
                bg-neutral-500 focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-transparent
                active:bg-opacity-50             
                bg-opacity-80
                text-white
                rounded-md
                py-1 md:py-2
                px-2 md:px-4
                w-auto
                text-xs md:text-base lg:text-lg
                font-semibold
                flex
                flex-row
                justify-center
                items-center
                hover:bg-opacity-60
                transition
            "
							>
								<AiOutlineInfoCircle className="mr-2" size={20} />
								更多資訊
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BillBoard;
