import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Typography,

} from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles"
import DialogTitle from './DialogTitle'
import { useHistory } from 'react-router-dom';
import { RootState } from '../app/store';
import { logoutUser } from "../components/login/loginSlice";

import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: RootState) => ({
	loggedInUser: state.auth.loggedInUser,
});

const mapDispatchToProps = { logout: logoutUser };

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type SessionExpiredModelProps = PropsFromRedux


const SessionExpiredModel = (props: SessionExpiredModelProps) => {
	const classes = useStyles();
	const {
		logout
	} = props;
	const history = useHistory();

	const handleOnClickLogin = () => {
		logout({});

		history.replace('/');
		window.location.href = "/"
	};

	return (
		<>

			<Dialog open={true} maxWidth={"lg"} fullWidth >
				<DialogTitle onClose={handleOnClickLogin}>
					{`Session Expired`}
				</DialogTitle>
				<DialogContent dividers>
					<Typography
						color="textPrimary"
						align="left"
						variant="h6">
						{'Your Session has been Expired, Please login to Continue'}
					</Typography>
				</DialogContent>
				<DialogActions style={{ minWidth: '450px' }}>
					<Button
						variant="contained"
						color="primary"
						type="button"
						autoFocus
						className={classes.saveSolution}
						onClick={handleOnClickLogin}
					>
						{'Login'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default connector(SessionExpiredModel);
