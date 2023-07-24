'use client';
import React from 'react';
import useMovie from '@/hooks/useMovie';
import { useRouter, useParams } from 'next/navigation';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Watch = () => {
	const router = useRouter();
	const { movieId } = useParams();

	const { data } = useMovie(movieId as string);
	console.log(data);
	return (
		<div className="h-screen w-screen bg-black">
			<nav
				className="
          fixed 
          w-full
          p-4
          z-10
          flex flex-row items-center gap-8
          bg-black
          bg-opacity-70
        "
			>
				<AiOutlineArrowLeft
					onClick={() => router.push('/')}
					className="text-white cursor-pointer"
					size={30}
				/>
				<p className="text-white text-xl md:text-3xl font-bold">
					<span className="font-light">Watching:{data?.title}</span>
				</p>
			</nav>
			<video
				autoPlay
				controls
				className="h-full w-full"
				src={data?.videoUrl}
			></video>
		</div>
	);
};

export default Watch;
