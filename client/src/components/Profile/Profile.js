import React from 'react';
import { Descriptions, Divider } from 'antd';
import { connect } from 'react-redux';

function Profile({ auth }) {
	const user = auth.user;
	return (
		<>
			<Divider orientation='left'>Student Profile</Divider>
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
	auth: state.auth,
});

export default connect(mapStateToProps)(Profile);
