import { useRequest } from 'ahooks';
import { Table, Card, Switch, TableProps, Dropdown, MenuProps } from 'antd';
import dayjs from 'dayjs';
import { Ellipsis } from 'lucide-react';

import { getUserList, type User } from './service';
import './index.less';

const User = () => {
	const { data = [], loading, run } = useRequest(getUserList);
	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <>编辑</>
		}
	];
	const columns: TableProps<User>['columns'] = [
		{
			title: '昵称',
			dataIndex: 'nickname',
			align: 'center'
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			render: (text: string) => text || '-',
			align: 'center'
		},
		{
			title: '角色',
			dataIndex: 'role'
		},
		{
			title: '',
			dataIndex: ''
		},
		{
			title: '状态',
			dataIndex: 'isActive',
			render: (active: boolean) => (
				<Switch
					value={active}
					checkedChildren="启用"
					unCheckedChildren="锁定"
				/>
			)
		},
		{
			title: '创建时间',
			dataIndex: 'createdTime',
			render: (time: number) => dayjs(time).format('YYYY-MM-DD HH:mm:ss')
		},
		{
			title: '操作',
			dataIndex: 'id',
			render: () => (
				<Dropdown menu={{ items }} arrow placement="bottomCenter">
					<Ellipsis />
				</Dropdown>
			)
		}
	];

	return (
		<Card className="h-full">
			<Table
				loading={loading}
				columns={columns}
				dataSource={[...(data as User[]), ...(data as User[])]}
				size="middle"
				rowClassName={(_, index) => (index % 2 === 0 ? 'row-even' : 'row-odd')}
			/>
		</Card>
	);
};
export default User;
