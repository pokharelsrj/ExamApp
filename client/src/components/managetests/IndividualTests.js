import React from 'react';
import { connect } from 'react-redux';
import { Collapse } from 'antd';
import { Typography } from 'antd';
import Questions from './Questions';
const { Panel } = Collapse;
const { Title } = Typography;
function IndividualTests({ index, question }) {
	return (
		<>
			<Title level={3}>{question[index].test_name}</Title>
			<Collapse accordion>
				{question[index].questions_pool.map((que, index) => {
					return (
						<Panel header={`Question No ${index + 1}`}>
							<Questions
								key={que._id}
								question={que.question}
								option_a={que.option_a}
								option_b={que.option_b}
								option_c={que.option_c}
								option_d={que.option_d}
								correct_option={que.correct_option}
								index={index}
							/>
						</Panel>
					);
				})}
			</Collapse>
		</>
	);
}

const mapStateToProps = (state) => ({
	question: state.postquestion,
});

export default connect(mapStateToProps)(IndividualTests);
