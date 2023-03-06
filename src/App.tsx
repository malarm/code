import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { connect, ConnectedProps } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { grey } from '@material-ui/core/colors';
import AppLayout from './components/appLayout/AppLayout';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Login from './components/login/Login';
import DateFnsUtils from '@date-io/date-fns'
import { RootState } from './app/store';
import Notification from './components/notification/Notification';
/* import IdleTimer from "./IdleTimer.js";
import SessionExpiredModel from './model/SessionExpiredModel'; */

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#4863a0',
			light: '#9c4446',
			dark: '#30426b',
		},
		secondary: {
			light: grey[300],
			main: grey[500],
			dark: grey[700],
		},
	},
});

const mapStateToProps = (state: RootState) => ({
	loggedInUser: state.auth.loggedInUser,
});

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type AppProps = PropsFromRedux

const App = ({ loggedInUser }: AppProps) => {
	/* const [isTimeout, setIsTimeout] = useState(false);
	useEffect(() => {
		const timer = new IdleTimer({
			timeout: 21600, //expire after 6 hours
			onTimeout: () => {
				setIsTimeout(true);
			},
			onExpired: () => {
				// do something if expired on load
				setIsTimeout(true);
			}
		});

		return () => {
			timer.cleanUp();
		};
	}, []); */
	return (
		<ThemeProvider theme={theme}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<div className="App">
					<Notification />
					<header className="App-header">

						{loggedInUser && <AppLayout />}
						<Switch>
							<Route path="/" component={Login} />
						</Switch>

					</header>
				</div>
			</MuiPickersUtilsProvider>
		</ThemeProvider>
	);
};

export default connector(App);
