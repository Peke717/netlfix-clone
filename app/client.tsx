'use client';
import Navbar from './components/Navbar';
import BillBoard from './components/BillBoard';
import MovieList from './components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from './components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';
import { useEffect, useState } from 'react';

export default function Client(this: any) {
	const { data: movies = [] } = useMovieList();
	const { data: favorites = [] } = useFavorites();
	const { isOpen, closeModal } = useInfoModal();
	// problem position從fixed改為static畫面無法保持在原位，用了scrollTo      不同scrollY需要至少觸發一次才能讓bd的fixed.top保持在原位置
	const [top, setTop] = useState(0);

	useEffect(() => {
		if (isOpen === true) {
			const bdElement = document.querySelector('.bd');
			const bdRect = bdElement?.getBoundingClientRect();
			const bdTop = -bdRect!.top;
			console.log('T:', bdTop);
			// bdElement.style.top = -bdTop;
			setTop(bdTop);
		}
		window.scrollTo(0, top);
		// console.log('scroll:', top);
	}, [isOpen]);
	// console.log('isOpen:', isOpen);

	return (
		<>
			<div
				className="bd"
				style={
					isOpen === true
						? { position: 'fixed', top: -window.scrollY, overflow: 'visible' }
						: { overflow: 'visible' }
				}
			>
				<Navbar />
				<BillBoard />
				<div className="pb-60">
					<MovieList title="現正熱播" data={movies} />
					<MovieList title="我的片單" data={favorites} />
				</div>
			</div>
			<div>
				<InfoModal visible={isOpen} onClose={closeModal} />
			</div>
			<div
				onClick={closeModal}
				className={`${
					!isOpen
						? `invisible`
						: 'bg-black opacity-70 top-0 left-0 fixed w-full h-full transition'
				}`}
			></div>
		</>
	);
}
