import React from 'react';
import { connect } from 'react-redux';
import { Table, Tag, Divider } from 'antd';
import { Row, Col } from 'antd';
const columns = [
	{
		title: 'Test Name',
		dataIndex: 'test_name',
	},
	{
		title: 'Full Marks',
		dataIndex: 'no_of_questions',
		responsive: ['md'],
	},
	{
		title: 'Marks Obtained',
		dataIndex: 'marks',
		responsive: ['md'],
	},
	{
		title: 'Percentage',
		dataIndex: 'percentage',
		responsive: ['sm'],
	},
	{
		title: 'Result',
		dataIndex: 'status',
		render: (status) => {
			let color = status === 'pass' ? 'green' : 'red';
			return <Tag color={color}>{status.toUpperCase()}</Tag>;
		},
		responsive: ['xs', 'sm'],
	},
];

function Result({ result, auth }) {
	const resultFiltered = result.filter(
		(arr) => arr.student_name === auth.user.name
	);

	const newArr = resultFiltered.map((arr) => ({
		...arr,
		percentage: ((arr.marks / arr.no_of_questions) * 100).toFixed(2),
		status: (arr.marks / arr.no_of_questions) * 100 >= 50 ? 'pass' : 'fail',
	}));
	// console.log(newArr);

	return (
		<>
			<Divider orientation='left'>Result</Divider>
			<Table
				pagination={{ pageSize: 7 }}
				columns={columns}
				dataSource={newArr}
			/>
		</>
	);
}

const mapStateToProps = (state) => ({
	result: state.postresult,
	auth: state.auth,
});

export default connect(mapStateToProps)(Result);
