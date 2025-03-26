import { useEffect, useState } from 'react';

import { useRequest } from 'ahooks';

import Result404 from '@/components/exception/404';

import { CompsNameMap } from '@/utils/utils';

import { router } from '@/router';
import { replaceRoutes } from '@/router/router-utils';
import { useGlobalStore } from '@/stores/global';
import { useUserStore } from '@/stores/user';
import { Menu, User, MenuType } from '@/types/global-service';
const __mock = {
	id: 1,
	userName: 'john_doe',
	nickName: 'John Doe',
	phoneNumber: '123-456-7890',
	email: 'john.doe@example.com',
	createDate: '2023-01-01T12:00:00',
	updateDate: '2023-02-01T12:00:00',
	avatar: 'https://example.com/avatar.jpg',
	menus: [
		{
			id: '1',
			parentId: null,
			name: 'Dashboard',
			icon: 'DashboardOutlined', // Ant Design 图标名称
			type: 1,
			route: 'dashboard/overview',
			filePath: './Dashboard/index.tsx',
			orderNumber: 1,
			url: '/dashboard/overview',
			show: true,
			path: '/dashboard/overview',
			parentPaths: ['/'],
			authCode: 'DASHBOARD_VIEW',
			curVersion: '1.0.0'
		},
		{
			id: '2',
			parentId: null,
			name: 'Settings',
			icon: 'SettingOutlined', // Ant Design 图标名称
			type: 2,
			route: '/user',
			filePath: './User/index.tsx',
			orderNumber: 2,
			url: '/user',
			show: true,
			path: '/settings',
			parentPaths: ['/'],
			authCode: 'SETTINGS_VIEW',
			curVersion: '1.0.0'
		}
	],
	flatMenus: [
		{
			id: '1',
			parentId: null,
			name: 'Dashboard',
			icon: 'DashboardOutlined',
			type: 1,
			route: '/dashboard',
			filePath: './dashboard/index.tsx',
			orderNumber: 1,
			url: '/dashboard',
			show: true,
			path: '/dashboard',
			parentPaths: ['/'],
			authCode: 'DASHBOARD_VIEW',
			curVersion: '1.0.0'
		}
	],
	avatarPath: 'https://example.com/avatar.jpg',
	authList: ['DASHBOARD_VIEW', 'SETTINGS_VIEW']
};

const getCurrentUserDetail = (): Promise<User> =>
	new Promise((r, j) => {
		setTimeout(() => {
			r(__mock as User);
		}, 500);
	});
export const useUserDetail = () => {
	const [loading, setLoading] = useState(true);

	const { refreshToken } = useGlobalStore();
	const { setCurrentUser } = useUserStore();

	const { data: currentUserDetail, loading: requestLoading } = useRequest(
		getCurrentUserDetail,
		{ refreshDeps: [refreshToken] }
	);

	useEffect(() => {
		if (!currentUserDetail) return;

		setLoading(true);
		function formatMenus(
			menus: Menu[],
			menuGroup: Record<string, Menu[]>,
			routes: Menu[],
			parentMenu?: Menu
		): Menu[] {
			return menus.map((menu) => {
				const children = menuGroup[menu.id];

				const parentPaths = parentMenu?.parentPaths || [];
				const lastPath = parentPaths[parentPaths.length - 1];
				const path =
					(parentMenu ? `${lastPath}${menu.route}` : menu.route) || '';

				routes.push({ ...menu, path, parentPaths });

				return {
					...menu,
					path,
					parentPaths,
					children: children?.length
						? formatMenus(children, menuGroup, routes, {
								...menu,
								parentPaths: [...parentPaths, path || ''].filter((o) => o)
						  })
						: undefined
				};
			});
		}
		const { menus = [] } = currentUserDetail;

		const menuGroup = menus.reduce<Record<string, Menu[]>>((prev, menu) => {
			if (!menu.parentId) {
				return prev;
			}

			if (!prev[menu.parentId]) {
				prev[menu.parentId] = [];
			}

			prev[menu.parentId].push(menu);
			return prev;
		}, {});

		const routes: Menu[] = [];

		currentUserDetail.flatMenus = routes;
		currentUserDetail.menus = formatMenus(
			menus.filter((o) => !o.parentId),
			menuGroup,
			routes
		);

		currentUserDetail.authList = menus
			.filter((menu) => menu.type === MenuType.BUTTON && menu.authCode)
			.map((menu) => menu.authCode!);
		replaceRoutes('*', [
			...routes.map((menu) => {
				return {
					path: `/*${menu.path}`,
					id: `/*${menu.path}`,
					Component: menu.filePath
						? CompsNameMap[menu.filePath] || Result404
						: Result404,
					handle: {
						parentPaths: menu.parentPaths,
						path: menu.path,
						name: menu.name,
						icon: menu.icon
					}
				};
			}),
			{
				id: '*',
				path: '*',
				Component: Result404,
				handle: {
					path: '404',
					name: '404'
				}
			}
		]);

		setCurrentUser(currentUserDetail);

		router.navigate(`${location.pathname}${location.search}`, {
			replace: true
		});

		setLoading(false);
	}, [currentUserDetail, setCurrentUser]);

	return {
		loading: requestLoading || loading
	};
};
