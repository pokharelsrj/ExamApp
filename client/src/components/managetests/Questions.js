import React from 'react';
import { Radio } from 'antd';

const Questions = ({
	key,
	question,
	option_a,
	option_b,
	option_c,
	option_d,
	correct_option,
}) => {
	return (
		<div key={key}>
			<h1>{question}</h1>

			<Radio.Group name={`${key}`} buttonStyle='solid'>
				<Radio.Button value={option_a}>{option_a}</Radio.Button>
				<Radio.Button value={option_b}>{option_b}</Radio.Button>
				<Radio.Button value={option_c}>{option_c}</Radio.Button>
				<Radio.Button value={option_d}>{option_d}</Radio.Button>
				<Radio.Button value={correct_option}>Correct Answer</Radio.Button>
			</Radio.Group>
		</div>
	);
};

export default Questions;
