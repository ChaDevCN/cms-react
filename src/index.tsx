import { useEffect } from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from 'antd-style';
import ReactDOM from 'react-dom/client';

import '@/assets/styles/tailwind.css';
import { useSelector } from './hooks/use-selector';
import RootRouterProvider from './router/provider';
import { useGlobalStore } from './stores/global';

const rootEL = document.getElementById('root');

const Provider = () => {
	const { darkMode } = useGlobalStore(useSelector(['darkMode']));
	useEffect(() => {
		if (darkMode === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, []);
	return (
		<ThemeProvider appearance={darkMode}>
			<GoogleOAuthProvider clientId={PUBLIC_GOOGLE_CLIENT_ID}>
				<RootRouterProvider />
			</GoogleOAuthProvider>
		</ThemeProvider>
	);
};
if (rootEL) {
	const root = ReactDOM.createRoot(rootEL);
	root.render(
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#8508e8',
					colorPrimaryBg: '#f8f0ff',
					colorPrimaryBgHover: '#f0e0ff',
					colorPrimaryBorder: '#d9b8ff',
					colorPrimaryBorderHover: '#bf8fff',
					colorPrimaryHover: '#a064fa',
					colorPrimaryActive: '#5b26c7',
					colorPrimaryTextHover: '#a064fa',
					colorPrimaryText: '#8508e8',
					colorPrimaryTextActive: '#5b26c7'
				}
			}}
		>
			<Provider />
		</ConfigProvider>
	);
}
