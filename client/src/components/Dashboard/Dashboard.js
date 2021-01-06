import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import TakeTests from '../taketests/TakeTests';
import Result from '../Result/Result';
import Profile from '../Profile/Profile';

import './Dashboard.css';

import { Layout, Menu, Typography } from 'antd';
import {
	UserOutlined,
	HighlightOutlined,
	FileSearchOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
const { Title } = Typography;
const { Header, Content, Sider } = Layout;
const Dashboard = ({ auth, logout }) => {
	const [selectDashboard, setSelectDashboard] = useState('Profile');
	return (
		<Layout>
			<Sider
				breakpoint='lg'
				collapsedWidth='0'
				onBreakpoint={(broken) => {
					console.log(broken);
				}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
				style={{ minHeight: '100vh' }}
			>
				<div className='displayUser'>
					<center>
						<Title level={5}>{auth.user.name}</Title>
					</center>
				</div>

				<Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
					<Menu.Item
						key='1'
						icon={<UserOutlined />}
						onClick={() => setSelectDashboard('Profile')}
					>
						Profile
					</Menu.Item>
					<Menu.Item
						key='2'
						icon={<HighlightOutlined />}
						onClick={() => setSelectDashboard('TakeTest')}
					>
						Take Test
					</Menu.Item>
					<Menu.Item
						key='3'
						icon={<FileSearchOutlined />}
						onClick={() => setSelectDashboard('Result')}
					>
						Result
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Header
					className='site-layout-sub-header-background'
					style={{ padding: 0 }}
				>
					<div className='logout' onClick={logout}>
						Logout
						<LogoutOutlined style={{ paddingLeft: '7px' }} />
					</div>
				</Header>

				<Content style={{ margin: '24px 16px 0' }}>
					<div
						className='site-layout-background'
						style={{ padding: 24, minHeight: 360 }}
					>
						{selectDashboard === 'TakeTest' && <TakeTests />}
						{selectDashboard === 'Result' && <Result />}
						{selectDashboard === 'Profile' && <Profile />}
					</div>
				</Content>
			</Layout>
		</Layout>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error,
});

export default connect(mapStateToProps, { logout })(Dashboard);
