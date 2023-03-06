import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { closeNotification } from './notificationSlice';
import { RootState } from '../../app/store';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

const mapStateToProps = (state: RootState) => ({
	notification: state.notification
});
const mapDispatchToProps = {
	close: closeNotification
};

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type NotificationProps = PropsFromRedux;

const  Alert = (props: any) => {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = (props: NotificationProps) => {
	const { close, notification } = props;
	const classes = useStyles();
	const actionHref = <a href={notification.redirectLink}  target="_blank" rel="noreferrer">{'View'}</a>
	return (
		<div className={classes.root}>
			<Snackbar open={notification.isOpen} autoHideDuration={6000} onClose={close} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
				<Alert onClose={close} severity={notification.severity} action={notification.redirectLink ? actionHref : null}>
					{notification.message}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default connector(Notification);
