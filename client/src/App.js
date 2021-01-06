import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { loadUserteacher } from './actions/authActionsTeacher';
import { loadQuestion } from './actions/postQuestionAction';
import { loadresult } from './actions/postResultAction';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import DashboardTeacher from './components/DashboardTeacher/DashboardTeacher';
import RegisterTeacher from './components/auth/RegisterTeacher';
import LoginTeacher from './components/auth/LoginTeacher';
import PrivateRouteTeacher from './components/private-route/PrivateRouteTeacher';

import PostQuestions from './components/Postquestions/PostQuestions';
import ManageTests from './components/managetests/ManageTests';
import IndividualTests from './components/managetests/IndividualTests';
import history from './history';

import TakeTests from './components/taketests/TakeTests';
import IndividualTestsStudent from './components/taketests/IndividualTestsStudent';

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
		store.dispatch(loadUserteacher());
		store.dispatch(loadQuestion());
		store.dispatch(loadresult());
	});

	return (
		<Provider store={store}>
			<Router history={history}>
				{/* Home Page */}
				<Route exact path='/' component={withRouter(Login)} />
				{/* Login and Registration */}
				<Route
					exact
					path='/register/student'
					component={withRouter(Register)}
				/>
				<Route exact path='/login/student' component={withRouter(Login)} />

				<Route
					exact
					path='/register/teacher'
					component={withRouter(RegisterTeacher)}
				/>
				<Route
					exact
					path='/login/teacher'
					component={withRouter(LoginTeacher)}
				/>
				{/* Dashboards */}
				<PrivateRoute exact path='/student' component={withRouter(Dashboard)} />
				<PrivateRouteTeacher
					exact
					path='/teacher'
					component={withRouter(DashboardTeacher)}
				/>
				{/* Teacher Dashboard Contents */}
				<Route exact path='/teacher/postquestion' component={PostQuestions} />
				<Route
					exact
					path='/teacher/managetests'
					component={withRouter(ManageTests)}
				/>
				<Route
					exact
					path='/individualtests'
					component={withRouter(IndividualTests)}
				/>

				{/* Student Dashboard Contents */}
				<Route
					exact
					path='/student/taketests'
					component={withRouter(TakeTests)}
				/>
				<PrivateRoute
					path='/student/test/:id'
					component={IndividualTestsStudent}
				/>
			</Router>
		</Provider>
	);
};

export default App;
