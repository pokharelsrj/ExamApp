import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import './Login.css';
import { Form, Input, Button } from 'antd';

const Register = ({ isAuthenticated, error, register, clearErrors }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [address, setAddress] = useState('');
	const [contact_number, setContactNo] = useState(0);
	const [date_of_birth, setDOB] = useState('');
	const [msg, setMsg] = useState(null);

	const handleChangeName = (e) => setName(e.target.value);
	const handleChangeEmail = (e) => setEmail(e.target.value);
	const handleChangePassword = (e) => setPassword(e.target.value);
	const handleChangeAddress = (e) => setAddress(e.target.value);
	const handleChangeContactNo = (e) => setContactNo(e.target.value);
	const handleChangeDOB = (e) => setDOB(e.target.value);

	const auth = useCallback(() => {
		return isAuthenticated;
	}, [isAuthenticated]);

	const handleOnSubmit = (e) => {
		const user = {
			name,
			email,
			password,
			address,
			contact_number,
			date_of_birth,
		};

		register(user);
		setMsg(null);
	};
	const history = useHistory();
	useEffect(() => {
		//Check for register error
		if (error.id === 'REGISTER_FAIL') {
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
			<Row style={{ paddingTop: '150px', paddingBottom: '150px' }}>
				<Col span='8'></Col>
				<Col span='8' align='center'>
					<Form
						onFinish={handleOnSubmit}
						className='login-form'
						labelCol={{
							span: 9,
						}}
						wrapperCol={{
							span: 15,
						}}
						layout='horizontal'
					>
						<Form.Item label='Name'>
							<Input
								type='text'
								name='name'
								id='name'
								placeholder='Name'
								onChange={handleChangeName}
							/>
						</Form.Item>
						<Form.Item label='Email'>
							<Input
								type='string'
								name='email'
								id='email'
								placeholder='Email'
								onChange={handleChangeEmail}
							/>
						</Form.Item>
						<Form.Item label='Password'>
							<Input
								type='password'
								name='password'
								id='password'
								placeholder='Password'
								onChange={handleChangePassword}
							/>
						</Form.Item>
						<Form.Item label='Address'>
							<Input
								type='string'
								name='address'
								placeholder='address'
								onChange={handleChangeAddress}
							/>
						</Form.Item>
						<Form.Item label='Date of Birth'>
							<Input type='date' name='dob' onChange={handleChangeDOB} />
						</Form.Item>
						<Form.Item label='Contact Number'>
							<Input
								type='number'
								name='cnumber'
								placeholder='Contact Number'
								onChange={handleChangeContactNo}
							/>
						</Form.Item>
						{msg ? <p style={{ color: 'red' }}>{msg}</p> : null}
						<Button
							type='primary'
							htmlType='submit'
							className='login-form-button'
						>
							Register
						</Button>
						Or
						<br />
						<Link to='/login/student'>Login</Link>
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

export default connect(mapStateToProps, { register, clearErrors })(Register);
