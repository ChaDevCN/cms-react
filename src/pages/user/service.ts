import request from '@/utils/request';

export interface Menu {
	id: string;
	parentId?: string;
	title?: string;
	icon?: string;
	type?: number;
	route?: string;
	filePath?: string;
	orderNumber?: number;
	url?: string;
	show?: boolean;
	children?: Menu[];
	path: string;
	parentPaths?: string[];
	authCode?: string;
	curVersion?: string;
}

export interface User {
	id: number;
	userName: string;
	nickName: string;
	email: string | null;
	avatar: string | null;
	isActive: boolean;
	metadata?: object;
	createTime: number;
	updateTime: number;
}

export const getUserList = async () =>
	await request<User[]>({
		method: 'get',
		url: '/user'
	});
