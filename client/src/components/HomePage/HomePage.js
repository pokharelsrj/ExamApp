import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<div>
			<Link to='./login/teacher'>
				<button>Teacher</button>
			</Link>
			<Link to='./login/student'>
				<button>Student</button>
			</Link>
		</div>
	);
};

export default HomePage;
