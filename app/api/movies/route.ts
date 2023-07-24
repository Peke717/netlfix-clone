import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import serverAuth from '@/lib/serverAuth';

export async function GET() {
	await serverAuth();

	const movies = await prismadb.movie.findMany();

	return NextResponse.json(movies);
}
