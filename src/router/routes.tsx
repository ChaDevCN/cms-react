import { RouteObject } from 'react-router-dom';

import Layout from '@/layouts';
import Login from '@/pages/login';
import User from '@/pages/user';
export const routes: RouteObject[] = [
	{
		path: '/login',
		Component: Login
	},
	{
		path: '/',
		Component: Layout,
		children: [
			{
				path: 'user',
				Component: User
			}
		]
	}
];
