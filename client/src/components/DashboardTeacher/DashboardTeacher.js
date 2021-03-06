import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActionsTeacher';
import PostQuestions from '../Postquestions/PostQuestions';
import ManageTests from '../managetests/ManageTests';
import ResultTeacher from '../Result/ResultTeacher';
import ProfileTeacher from '../Profile/ProfileTeacher';
import './DashboardTeacher.css';

import { Layout, Menu, Typography } from 'antd';
import {
	UserOutlined,
	EditOutlined,
	FileSearchOutlined,
	LogoutOutlined,
	CopyOutlined,
} from '@ant-design/icons';
const { Title } = Typography;
const { Header, Content, Sider } = Layout;
const DashboardTeacher = ({ auth, logout }) => {
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
						icon={<EditOutlined />}
						onClick={() => setSelectDashboard('Post')}
					>
						Create Test
					</Menu.Item>
					<Menu.Item
						key='3'
						icon={<CopyOutlined />}
						onClick={() => setSelectDashboard('Manage')}
					>
						Manage Tests
					</Menu.Item>
					<Menu.Item
						key='4'
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
						{selectDashboard === 'Post' && <PostQuestions />}
						{selectDashboard === 'Manage' && <ManageTests />}
						{selectDashboard === 'Result' && <ResultTeacher />}
						{selectDashboard === 'Profile' && <ProfileTeacher />}
					</div>
				</Content>
			</Layout>
		</Layout>
		// {/* <Layout>
		// 	<Sider trigger={null} collapsible collapsed={collapsed}>
		// 		<div className='displayUser'>
		// 			<center>
		// 				<Title level={5}>{auth.user.name}</Title>
		// 			</center>
		// 		</div>

		// 		<Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
		// 			<Menu.Item
		// 				key='1'
		// 				icon={<UserOutlined />}
		// 				onClick={() => setSelectDashboard('Profile')}
		// 			>
		// 				Profile
		// 			</Menu.Item>
		// 			<Menu.Item
		// 				key='2'
		// 				icon={<EditOutlined />}
		// 				onClick={() => setSelectDashboard('Post')}
		// 			>
		// 				Create Test
		// 			</Menu.Item>
		// 			<Menu.Item
		// 				key='3'
		// 				icon={<CopyOutlined />}
		// 				onClick={() => setSelectDashboard('Manage')}
		// 			>
		// 				Manage Tests
		// 			</Menu.Item>
		// 			<Menu.Item
		// 				key='4'
		// 				icon={<FileSearchOutlined />}
		// 				onClick={() => setSelectDashboard('Result')}
		// 			>
		// 				Result
		// 			</Menu.Item>
		// 		</Menu>
		// 	</Sider>
		// 	<Layout className='siteLayout'>
		// 		<Header className='siteLayoutBackground' style={{ padding: 0 }}>
		// 			{collapsed ? (
		// 				<MenuUnfoldOutlined className='trigger' onClick={toggle} />
		// 			) : (
		// 				<MenuFoldOutlined className='trigger' onClick={toggle} />
		// 			)}

		// 			<div className='logout' onClick={logout}>
		// 				Logout
		// 				<LogoutOutlined style={{ paddingLeft: '7px' }} />
		// 			</div>
		// 		</Header>

		// 		<Content
		// 			className='siteLayoutBackground'
		// 			style={{
		// 				margin: '24px 16px',
		// 				padding: 24,
		// 				minHeight: 280,
		// 			}}
		// 		>
		// 			{selectDashboard === 'Post' && <PostQuestions />}
		// 			{selectDashboard === 'Manage' && <ManageTests />}
		// 			{selectDashboard === 'Result' && <ResultTeacher />}
		// 			{selectDashboard === 'Profile' && <ProfileTeacher />}
		// 		</Content>
		// 	</Layout>
		// </Layout> */}
	);
};

const mapStateToProps = (state) => ({
	auth: state.authtea,
	error: state.error,
});

export default connect(mapStateToProps, { logout })(DashboardTeacher);
