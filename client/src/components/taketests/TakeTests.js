import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Divider, Button, Spin } from 'antd';
import { Row, Col } from 'antd';
function TakeTests({ question }) {
	if (question == null) {
		return <Spin />;
	} else
		return (
			<>
				<Divider orientation='left'>Available Tests</Divider>
				{question.map((arr, index) => {
					return (
						<div key={arr._id}>
							<h1>{arr.test_name}</h1>
							<Link to={`/student/test/${arr._id}`}>
								<Button>Go to Test</Button>
							</Link>
							<br />
							<br />
						</div>
					);
				})}
			</>
		);
}

const mapStateToProps = (state) => ({
	question: state.postquestion,
});

export default connect(mapStateToProps)(TakeTests);
