'use client';
import Input from '@/app/components/Input';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';

const Client = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const [variant, setVariant] = useState('login');

	const toggleVariant = useCallback(() => {
		setVariant(currentVariant =>
			currentVariant === 'login' ? 'register' : 'login'
		);
	}, []);

	const login = useCallback(async () => {
		try {
			await signIn('credentials', {
				email,
				password,
				callbackUrl: '/profiles'
			});
		} catch (error) {
			console.log(error);
		}
	}, [email, password]);

	const register = useCallback(async () => {
		try {
			await axios.post('/api/register', {
				email,
				name,
				password
			});

			login();
		} catch (error) {
			console.log(error);
		}
	}, [email, name, password, login]);

	return (
		<div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat">
			<div className="bg-black w-full h-full md:bg-opacity-50">
				<nav className="px-4 py-4 md:px-12 md:py-6">
					{/* logo大小RWD  登入註冊框RWD 再來用資料庫*/}
					<Image src="/images/logo.png" alt="logo" className="h-10 sm:h-12 " />
					<div className="flex justify-center mt-5">
						<div className="bg-black bg-opacity-75 px-[5%] pt-5 pb-7 md:p-16 md:pb-10 md:max-w-md rounded-md w-full">
							<h2 className="text-white text-4xl mb-8 font-semibold">
								{variant === 'login' ? '登入' : '註冊會員'}
							</h2>
							<div className="flex flex-col gap-4">
								{variant === 'register' && (
									<Input
										label="使用者名稱"
										onChange={(e: any) => {
											setName(e.target.value);
										}}
										id="name"
										type="text"
										value={name}
									/>
								)}
								<Input
									label="電子郵件"
									onChange={(e: any) => {
										setEmail(e.target.value);
									}}
									id="email"
									type="email"
									value={email}
								/>
								<Input
									label="密碼"
									onChange={(e: any) => {
										setPassword(e.target.value);
									}}
									id="password"
									type="password"
									value={password}
								/>
								{/* {variant === "register" && (
									<Input
										label="確認密碼"
										onChange={e => {
											setPassword(e.target.value);
										}}
										id="password"
										type="password"
										value={password}
									/>
								)} */}
								<button
									onClick={variant === 'login' ? login : register}
									className="bg-red-600 py-3 text-white rounded-md w-full mt-6 hover:bg-red-700 transition"
								>
									{variant === 'login' ? '登入' : '註冊'}
								</button>

								<div className="flex flex-row items-center gap-4 mt-8 justify-center">
									<div
										onClick={() =>
											signIn('google', { callbackUrl: '/profiles' })
										}
										className="
											w-10
											h-10
											bg-white
											rounded-full
											flex
											items-center
											justify-center
											cursor-pointer
											hover:opacity-80
											transition
										"
									>
										<FcGoogle size={30} />
									</div>
									<div
										onClick={() =>
											signIn('github', { callbackUrl: '/profiles' })
										}
										className="
											w-10
											h-10
											bg-white
											rounded-full
											flex
											items-center
											justify-center
											cursor-pointer
											hover:opacity-80
											transition
										"
									>
										<FaGithub size={30} />
									</div>
								</div>

								<p className=" text-neutral-500  mt-14">
									{variant === 'login'
										? '尚未加入 Netflix？'
										: '已經有帳戶了？'}
									<a
										onClick={toggleVariant}
										className="text-white ml-1 hover:underline cursor-pointer"
									>
										{variant === 'login' ? '馬上註冊' : '登入'}
									</a>
								</p>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
};
export default Client;
