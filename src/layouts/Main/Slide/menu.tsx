import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useMatches } from 'react-router-dom';

import { Menu } from 'antd';
import { MenuItemType } from 'antd/es/menu/interface';

import { antdIcons } from '@/assets/antd-icons';
import { Menu as MenuType } from '@/pages/user/service';
import { useGlobalStore } from '@/stores/global';

const menuDatas = [
	{
		path: '/dashboard',
		title: '仪表盘',
		icon: 'DashboardOutlined',
		show: true,
		children: [
			{
				path: '/dashboard/overview',
				title: '概览',
				icon: 'AppstoreAddOutlined',
				show: true,
				children: []
			},
			{
				path: '/dashboard/stats',
				title: '统计',
				icon: 'LineChartOutlined',
				show: true,
				children: [
					{
						path: '/dashboard/stats/visits',
						title: '访问量',
						icon: 'SearchOutlined',
						show: true,
						children: []
					},
					{
						path: '/dashboard/stats/sales',
						title: '销售额',
						icon: 'ShoppingCartOutlined',
						show: false, // 设置为不显示
						children: []
					}
				]
			}
		]
	},
	{
		path: '/feedback',
		title: '意见反馈',
		icon: 'CommentOutlined',
		show: true,
		children: [
			{
				path: '/feedback/list',
				title: '反馈列表',
				icon: 'UnorderedListOutlined',
				show: true,
				children: []
			},
			{
				path: '/feedback/statistics',
				title: '反馈统计',
				icon: 'BarChartOutlined',
				show: true,
				children: []
			},
			{
				path: '/feedback/settings',
				title: '反馈设置',
				icon: 'SettingOutlined',
				show: true,
				children: []
			}
		]
	},
	{
		path: '/maintenance',
		title: '全球维保',
		icon: 'GlobalOutlined',
		show: true,
		children: [
			{
				path: '/maintenance/records',
				title: '维保记录',
				icon: 'FileTextOutlined',
				show: true,
				children: []
			},
			{
				path: '/maintenance/schedule',
				title: '维保计划',
				icon: 'ScheduleOutlined',
				show: true,
				children: []
			},
			{
				path: '/maintenance/facilities',
				title: '设备管理',
				icon: 'ToolOutlined',
				show: true,
				children: []
			},
			{
				path: '/maintenance/teams',
				title: '维保团队',
				icon: 'TeamOutlined',
				show: true,
				children: []
			}
		]
	},
	{
		path: '/user',
		title: '用户管理',
		icon: 'UserOutlined',
		show: true,
		children: [
			{
				path: '/user/list',
				title: '用户列表',
				icon: 'UnorderedListOutlined',
				show: true,
				children: []
			},
			{
				path: '/user/settings',
				title: '用户设置',
				icon: 'SettingOutlined',
				show: true,
				children: []
			}
		]
	},
	{
		path: '/settings',
		title: '系统设置',
		icon: 'SettingOutlined',
		show: true,
		children: [
			{
				path: '/settings/general',
				title: '常规设置',
				icon: 'GlobalOutlined',
				show: true,
				children: []
			},
			{
				path: '/settings/permissions',
				title: '权限管理',
				icon: 'LockOutlined',
				show: true,
				children: []
			},
			{
				path: '/settings/logs',
				title: '操作日志',
				icon: 'HistoryOutlined',
				show: false, // 设置为不显示
				children: []
			}
		]
	},
	{
		path: '/help',
		title: '帮助中心',
		icon: 'QuestionCircleOutlined',
		show: true,
		children: [
			{
				path: '/help/faq',
				title: '常见问题',
				icon: 'QuestionOutlined',
				show: true,
				children: []
			},
			{
				path: '/help/contact',
				title: '联系我们',
				icon: 'PhoneOutlined',
				show: true,
				children: []
			}
		]
	}
] as const;

function SlideMenu() {
	const { collapsed, darkMode } = useGlobalStore();

	const matches = useMatches();

	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const [selectKeys, setSelectKeys] = useState<string[]>([]);

	useEffect(() => {
		const [match] = matches || [];
		if (match) {
			// 获取当前匹配的路由，默认为最后一个
			const route = matches[matches.length - 1];
			// 从匹配的路由中取出自定义参数
			const handle = route?.handle as { parentPaths: []; path: string };
			// 从自定义参数中取出上级path，让菜单自动展开
			if (collapsed) {
				setOpenKeys([]);
			} else {
				setOpenKeys(handle?.parentPaths || []);
			}
			// 让当前菜单和所有上级菜单高亮显示
			setSelectKeys([...(handle?.parentPaths || []), handle?.path]);
		}
	}, [matches, collapsed]);

	const getMenuTitle = (menu: MenuType) => {
		if (menu?.children?.filter((menu) => menu.show)?.length) {
			return menu.title;
		}
		return <Link to={menu.path}>{menu.title}</Link>;
	};

	const treeMenuData = useCallback((menus: MenuObj[]): MenuItemType[] => {
		return menus.map((menu: MenuObj) => {
			const children = menu?.children?.filter((menu) => menu.show) || [];
			return {
				key: menu.path || '',
				label: getMenuTitle(menu),
				icon:
					menu.icon &&
					antdIcons[menu.icon] &&
					React.createElement(antdIcons[menu.icon]),
				children: children.length ? treeMenuData(children || []) : null
			};
		});
	}, []);

	const menuData = useMemo(() => {
		return treeMenuData(menuDatas?.filter((menu) => menu.show) || []);
	}, [menuDatas]);

	return (
		<Menu
			className="bg-transparent"
			mode="inline"
			selectedKeys={selectKeys}
			style={{ height: '100%', borderRight: 0 }}
			items={menuData}
			inlineCollapsed={collapsed}
			openKeys={openKeys}
			onOpenChange={setOpenKeys}
			theme={darkMode === 'auto' ? 'light' : darkMode}
		/>
	);
}

export default memo(SlideMenu);
