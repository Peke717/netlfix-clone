'use client';
import Navbar from './components/Navbar';
import BillBoard from './components/BillBoard';
import MovieList from './components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from './components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';
import { useCallback, useEffect, useState, useRef } from 'react';

export default function Client(this: any) {
	const { data: movies = [] } = useMovieList();
	const { data: favorites = [] } = useFavorites();
	const { isOpen, closeModal } = useInfoModal();

	//useRef 不會觸發組件重新渲染，它在更新時能夠立即反映最新的值。
	//這裡不能用useState原因是setState會在render完才更新狀態(異步)，所以在讀取完state才會是上次的狀態
	const topRef = useRef(0); // 使用 useRef 存儲 top 的即時值

	useEffect(() => {
		if (isOpen === false) {
			window.scrollTo(0, Math.abs(topRef.current)); // 使用 topRef.current 獲取最新值
		} else {
			const bdElement = document.getElementById('bd');
			const bdTop = bdElement!.getBoundingClientRect().top;
			topRef.current = bdTop; // 更新 top 的即時值
		}
	}, [isOpen]);

	return (
		<>
			<div
				id="bd"
				style={
					isOpen
						? { overflow: 'visible', position: 'fixed', top: -window.scrollY }
						: { overflow: 'visible', position: 'static' }
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
				className={`${
					!isOpen
						? `invisible`
						: 'bg-black opacity-70 top-0 left-0 fixed w-full h-full transition'
				}`}
			></div>
		</>
	);
}
