import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import authReducerTeacher from './authReducerTeacher';
import postQuestionReducer from './postQuestionReducer';
import postResultReducer from './postResultReducer';

export default combineReducers({
	error: errorReducer,
	auth: authReducer,
	authtea: authReducerTeacher,
	postquestion: postQuestionReducer,
	postresult: postResultReducer,
});
