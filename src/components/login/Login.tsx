import React from 'react';
import Button from '@material-ui/core/Button';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { RootState } from '../../app/store';
import { API_URL } from '../../app/api';
import { initiateLogin } from './loginSlice';

const mapStateToProps = (state: RootState) => ({
	loggedInUser: state.auth.loggedInUser,
	loginProgress: state.auth.isLoggingIn,
});

const mapDispatchToProps = { initiateUserLogin: initiateLogin };
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type LoginProps = PropsFromRedux

const Login = (props: LoginProps) => {
	const { loggedInUser, initiateUserLogin } = props;
	const location = useLocation();
	const handleLogin = () => {window.location.href = `${API_URL}/auth`;}

	const queryParams = new URLSearchParams(location.search);
	if(queryParams.get('token')){
		initiateUserLogin({ token: queryParams.get('token')});
	}

	if (loggedInUser) {
		return <Redirect to={location.pathname !== '/' ? location.pathname : '/home'} />;
	}
	return (
		<Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
	);
};

export default connector(Login);
