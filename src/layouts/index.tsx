import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import { useUserDetail } from './common/useUserDetail';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

import { usePCScreen } from '@/hooks/use-pc-screen';
import '@/assets/styles/tailwind.css';
import '@/assets/styles/reset.less';

const Page = () => {
	const isPC = usePCScreen();
	const { loading } = useUserDetail();
	const [containerHeight, setContainerHeight] = useState<number>();

	useEffect(() => {
		const header = document.querySelector('header');
		const footer = document.querySelector('footer');
		if (isPC && header?.offsetHeight && footer?.offsetHeight)
			setContainerHeight(
				header?.offsetHeight + footer?.offsetHeight + 20 + 24 + 26 + 32
			);
	}, [isPC]);
	if (loading) {
		return (
			<div className="looading-box">
				<div className="content">
					<div className="text">LOADING...</div>
				</div>
			</div>
		);
	}
	return (
		<Layout className="w-full h-dvh flex-col justify-between">
			<Header />
			<Main>
				<div
					className={`max-h-full overflow-auto h-full`}
					style={isPC ? { height: `calc(100vh - ${containerHeight}px)` } : {}}
				>
					<Outlet />
				</div>
			</Main>
			<Footer />
		</Layout>
	);
};
export default Page;
