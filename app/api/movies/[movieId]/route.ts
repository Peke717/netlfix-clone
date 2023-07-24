import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextResponse } from 'next/server';

interface IParams {
	movieId?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
	await serverAuth();

	const { movieId } = params;

	if (typeof movieId !== 'string') {
		throw new Error('Invalid ID');
	}

	if (!movieId) {
		throw new Error('Missing Id');
	}

	const movie = await prismadb.movie.findUnique({
		where: { id: movieId }
	});

	return NextResponse.json(movie);
}
