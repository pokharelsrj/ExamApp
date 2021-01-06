import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Divider, Row, Col, Button, Typography } from 'antd';
import IndividualTests from './IndividualTests';
import { deleteQuestions } from '../../actions/postQuestionAction';
const { Title } = Typography;
function ManageTests({ question }) {
	const dispatch = useDispatch();
	const [individualTests, setIndividualTests] = useState(null);
	const clickFun = (index) => {
		if (individualTests === index) {
			setIndividualTests(null);
		} else {
			setIndividualTests(index);
		}
	};
	return (
		<>
			<Divider orientation='left'>Manage Tests</Divider>
			<Row>
				<Col span={1} />
				<Col span={9}>
					<>
						{/* <h1>{question[0].questions_pool[0].option_a}</h1> */}
						{question.map((arr, index) => {
							return (
								<div key={arr._id} style={{ paddingBottom: '10px' }}>
									<Title level={4}>{arr.test_name}</Title>

									<Button
										onClick={() => clickFun(index)}
										style={{ marginRight: '20px' }}
									>
										Go to Test
									</Button>
									<Button
										onClick={() => {
											dispatch(deleteQuestions(arr._id));
											setIndividualTests(null);
										}}
									>
										Delete Test
									</Button>
								</div>
							);
						})}
					</>
				</Col>

				<Col span={13}>
					<>
						{individualTests !== null ? (
							<IndividualTests index={individualTests} />
						) : null}
					</>
				</Col>
				<Col span={1} />
			</Row>
		</>
	);
}

const mapStateToProps = (state) => ({
	question: state.postquestion,
});

export default connect(mapStateToProps)(ManageTests);
