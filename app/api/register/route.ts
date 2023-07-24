import prismadb from '@/lib/prismadb';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { email, name, password } = (await req.json()) as {
		email: string;
		name: string;
		password: string;
	};

	const existingUser = await prismadb.user.findUnique({
		where: {
			email
		}
	});

	if (existingUser) {
		return NextResponse.json({ error: 'Email taken' });
	}

	const hashedPassword = await bcrypt.hash(password, 12);

	const user = await prismadb.user.create({
		data: {
			email,
			name,
			hashedPassword,
			image: '',
			emailVerified: new Date()
		}
	});

	return NextResponse.json(user);
}
