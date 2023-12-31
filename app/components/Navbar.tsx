import { useCallback, useEffect, useState } from 'react';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';
import MobileMenu from './MobileMenu';
import NavbarItem from './NavbarItem';
import AccountMenu from './AccountMenu';

const TOP_OFFSET = 66;

const Navbar = () => {
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [showAccountMenu, setShowAccountMenu] = useState(false);
	const [showBackground, setShowBackground] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY >= TOP_OFFSET) {
				setShowBackground(true);
			} else {
				setShowBackground(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const enableMobileMenu = useCallback(() => {
		setShowMobileMenu(true);
		setShowAccountMenu(false);
	}, []);
	const disableMobileMenu = useCallback(() => {
		setShowMobileMenu(false);
	}, []);

	const enableAccountMenu = useCallback(() => {
		setShowAccountMenu(true);
		setShowMobileMenu(false);
	}, []);

	const disableAccountMenu = useCallback(() => {
		setShowAccountMenu(false);
	}, []);

	const disableAllMenu = useCallback(() => {
		setShowAccountMenu(false);
		setShowMobileMenu(false);
	}, []);

	return (
		<nav
			onMouseLeave={disableAllMenu}
			className="w-full h-auto min-h-[70px] fixed top-0 z-30"
		>
			<div
				className={`

					h-[41px] lg:h-[68px]
					px-[4%]
					flex
					flex-row
					items-center
					transition
					duration-500
					bg-gradient-to-b from-black/70 from-10% to-transparent
					${showBackground ? 'bg-zinc-900' : ''}
				`}
			>
				<img className="h-3 md:h-4 lg:h-7" src="/images/logo.png" alt="logo" />

				<div
					className="
					flex-row
					ml-8
					gap-7
					hidden
					lg:flex
				"
				>
					<NavbarItem label="首頁" />
					<NavbarItem label="節目" />
					<NavbarItem label="電影" />
					<NavbarItem label="最新熱門影片" />
					<NavbarItem label="我的片單" />
					<NavbarItem label="按照語言瀏覽" />
				</div>
				<div
					onMouseEnter={enableMobileMenu}
					className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
				>
					<p className="text-white text-sm">瀏覽</p>
					<BsChevronDown
						className={`text-white transition ${
							showMobileMenu ? 'rotate-180' : 'rotate-0'
						}`}
					/>
					<div onMouseLeave={disableMobileMenu}>
						<MobileMenu visible={showMobileMenu} />
					</div>
				</div>
				<div className="flex flex-row ml-auto gap-7 items-center">
					<div className="text-gray-200 hover:text-gray-300 cursor-pointer">
						<BsSearch className="" />
					</div>
					<div className="text-gray-200 hover:text-gray-300 cursor-pointer">
						<BsBell className="" />
					</div>

					<div
						onMouseEnter={enableAccountMenu}
						className="group flex flex-row items-center gap-2 cursor-pointer relative transition"
					>
						<div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
							<img src="/images/default-blue.png" alt="" />
						</div>
						<BsChevronDown
							className={`text-white transition ${
								showAccountMenu ? 'rotate-180' : 'rotate-0'
							}`}
						/>
						<div
							onMouseLeave={disableAccountMenu}
							onMouseEnter={enableAccountMenu}
						>
							<AccountMenu visible={showAccountMenu} />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
