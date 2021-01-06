import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { login, logout } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import './Login.css';
import { Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = ({ isAuthenticated, error, login, logout }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [msg, setMsg] = useState(null);

	const handleChangeEmail = (e) => setEmail(e.target.value);
	const handleChangePassword = (e) => setPassword(e.target.value);

	const auth = useCallback(() => {
		return isAuthenticated;
	}, [isAuthenticated]);

	const handleOnSubmit = (e) => {
		const user = {
			email,
			password,
		};

		login(user);
		setMsg(null);
	};
	const history = useHistory();
	useEffect(() => {
		//Check for register error
		if (error.id === 'LOGIN_FAIL') {
			setMsg(error.msg);
		} else {
			setMsg(null);
		}
		const navigate = async () => {
			const authorized = await auth();
			if (authorized) history.push('/student');
		};

		navigate();
	}, [error, auth, history]);

	return (
		<>
			<Row style={{ paddingTop: '250px', paddingBottom: '250px' }}>
				<Col span='8'></Col>
				<Col span='8' align='center'>
					<Form onFinish={handleOnSubmit} className='login-form'>
						<Form.Item>
							<Input
								prefix={<UserOutlined className='site-form-item-icon' />}
								placeholder='Email'
								name='email'
								id='email'
								onChange={handleChangeEmail}
							/>
						</Form.Item>
						<Form.Item>
							<Input
								prefix={<LockOutlined className='site-form-item-icon' />}
								type='password'
								placeholder='Password'
								name='password'
								id='password'
								onChange={handleChangePassword}
							/>
						</Form.Item>
						{msg ? <p style={{ color: 'red' }}>{msg}</p> : null}
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
						>
							Log in
						</Button>
						Or
						<br />
						<Link to='/register/student'>Register Now</Link>
					</Form>
				</Col>
				<Col span='8'></Col>
			</Row>
		</>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors, logout })(Login);
