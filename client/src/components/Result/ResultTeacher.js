import React from 'react';
import { connect } from 'react-redux';
import { Table, Tag, Divider } from 'antd';

const columns = [
	{
		title: 'Student Name',
		dataIndex: 'student_name',
	},
	{
		title: 'Test Name',
		dataIndex: 'test_name',
		responsive: ['xs', 'sm'],
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

function ResultTeacher({ result }) {
	const newArr = result.map((arr) => ({
		...arr,
		percentage: ((arr.marks / arr.no_of_questions) * 100).toFixed(2),
		status: (arr.marks / arr.no_of_questions) * 100 >= 50 ? 'pass' : 'fail',
	}));
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
});

export default connect(mapStateToProps)(ResultTeacher);
