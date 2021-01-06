import React from 'react';
import { connect } from 'react-redux';
import { Descriptions, Divider } from 'antd';

function ProfileTeacher({ authtea }) {
	const user = authtea.user;
	return (
		<>
			<Divider orientation='left'>Teacher Profile</Divider>
			<Descriptions>
				<Descriptions.Item label='Name'>{user.name}</Descriptions.Item>
				<Descriptions.Item label='Telephone'>
					{user.contact_number}
				</Descriptions.Item>
				<Descriptions.Item label='Email'>{user.email}</Descriptions.Item>
				<Descriptions.Item label='Date of Birth'>
					{new Date(user.date_of_birth).toDateString()}
				</Descriptions.Item>
				<Descriptions.Item label='Address'>{user.address}</Descriptions.Item>
			</Descriptions>
		</>
	);
}
const mapStateToProps = (state) => ({
	authtea: state.authtea,
});

export default connect(mapStateToProps)(ProfileTeacher);
