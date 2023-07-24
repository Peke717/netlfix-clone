import { NextResponse } from 'next/server';
import { without } from 'lodash';

import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export async function POST(req: Request) {
	const { currentUser } = await serverAuth();

	const { movieId } = await req.json();

	const exisitingMovie = await prismadb.movie.findUnique({
		where: {
			id: movieId
		}
	});

	if (!exisitingMovie) {
		throw new Error('Invalid ID');
	}

	const user = await prismadb.user.update({
		where: {
			email: currentUser.email || ''
		},
		data: {
			favoriteIds: {
				push: movieId
			}
		}
	});

	return NextResponse.json(user);

	// return new NextResponse('end', { status: 405 });
}

export async function DELETE(req: Request) {
	const { currentUser } = await serverAuth();

	const { movieId } = (await req.json()) as {
		movieId: string;
	};

	const exisitingMovie = await prismadb.movie.findUnique({
		where: {
			id: movieId
		}
	});

	if (!exisitingMovie) {
		throw new Error('Invalid ID');
	}

	const updateFavoriteIds = without(currentUser.favoriteIds, movieId);

	const updateUser = await prismadb.user.update({
		where: {
			email: currentUser.email || ''
		},
		data: {
			favoriteIds: updateFavoriteIds
		}
	});
	return NextResponse.json(updateUser);
}
// return new NextResponse('end', { status: 405 });
