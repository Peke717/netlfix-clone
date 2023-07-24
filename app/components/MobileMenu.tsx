import React from 'react';

interface MobileMenuProps {
	visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
	if (!visible) {
		return null;
	}

	return (
		<div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
			<div className="flex flex-col gap-4">
				<div className="px-3 text-center text-white hover:underline">首頁</div>
				<div className="px-3 text-center text-white hover:underline">節目</div>
				<div className="px-3 text-center text-white hover:underline">電影</div>
				<div className="px-3 text-center text-white hover:underline">
					最新熱門影片
				</div>
				<div className="px-3 text-center text-white hover:underline">
					我的片單
				</div>
				<div className="px-3 text-center text-white hover:underline">
					依照語言瀏覽
				</div>
			</div>
		</div>
	);
};

export default MobileMenu;
