import React from 'react';

import { GoogleLogin } from '@react-oauth/google';

import loginImg from '@/assets/images/login_bg.svg';
import loginLeft from '@/assets/images/login_left.png';
import './index.less';

const App: React.FC = () => {
	return (
		<div
			className={`w-full h-screen  flex items-center justify-center overflow-x-hidden bg-[#eee] bg-no-repeat bg-center bg-cover login-page`}
			style={{ backgroundImage: `url(${loginImg})` }}
		>
			<div className="login-box">
				<div className="login-left  lg:block hidden lg:w-[750px]">
					<img src={loginLeft} alt="login" />
				</div>
				<div className="login-form">
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							console.log(credentialResponse);
						}}
						onError={() => {
							console.log('登录失败');
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
