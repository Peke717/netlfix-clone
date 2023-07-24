import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export async function GET(req: Request) {
	const { currentUser } = await serverAuth();
	const favoriteMovies = await prismadb.movie.findMany({
		where: {
			id: {
				in: currentUser?.favoriteIds
			}
		}
	});
	return NextResponse.json(favoriteMovies);
}
