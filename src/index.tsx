import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';

import '@/assets/styles/tailwind.css';

const rootEL = document.getElementById('root');

const App = () => {
	return <div>非常简单的测试</div>;
};
if (rootEL) {
	const root = ReactDOM.createRoot(rootEL);
	root.render(
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#7c3aed',
					colorPrimaryBg: '#f8f0ff',
					colorPrimaryBgHover: '#f0e0ff',
					colorPrimaryBorder: '#d9b8ff',
					colorPrimaryBorderHover: '#bf8fff',
					colorPrimaryHover: '#a064fa',
					colorPrimaryActive: '#5b26c7',
					colorPrimaryTextHover: '#a064fa',
					colorPrimaryText: '#7c3aed',
					colorPrimaryTextActive: '#5b26c7'
				}
			}}
		>
			<App />
		</ConfigProvider>
	);
}
