'use client';
import Navbar from './components/Navbar';
import BillBoard from './components/BillBoard';
import MovieList from './components/MovieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from './components/InfoModal';
import useInfoModal from '@/hooks/useInfoModal';

export default function Client() {
	const { data: movies = [] } = useMovieList();
	const { data: favorites = [] } = useFavorites();
	const { isOpen, closeModal } = useInfoModal();

	return (
		<>
			<InfoModal visible={isOpen} onClose={closeModal} />
			<Navbar />
			<BillBoard />
			<div className="pb-40">
				<MovieList title="現正熱播" data={movies} />
				<MovieList title="我的片單" data={favorites} />
			</div>
		</>
	);
}
