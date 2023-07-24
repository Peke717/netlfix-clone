import React from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

interface PlayButtonProps {
	movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
	const router = useRouter();
	return (
		<button
			onClick={() => router.push(`/watch/${movieId}`)}
			className="
      focus:ring-1 focus:ring-white 
      focus:ring-offset-transparent focus:ring-offset-1
      active:bg-opacity-60  
      bg-white
      rounded-md
      py-1 md:py-2
      px-2 md:px-4
      w-auto
      text-xs md:text-base lg:text-lg
      flex flex-row items-center
      hover:bg-neutral-300 
      hover:opacity-80
      transition
    "
		>
			<BsFillPlayFill size={20} className="mr-1" />
			播放
		</button>
	);
};

export default PlayButton;
