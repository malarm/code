import React from 'react';
import {
	Dialog, DialogTitle, DialogContent, makeStyles, Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import UserForm from './UserForm';
import { User } from '../../types/user';

const useStyles = makeStyles((theme) => ({
	dialogWrapper: {
		padding: theme.spacing(2),
		position: 'absolute',
		top: theme.spacing(5),
	},
	dialogTitle: {
		paddingRight: '0px',
	},
}));

type UserFormDialogProps = {
	open: boolean;
	currUser: Partial<User>;
	setDialogOpen: (state: boolean) => void;
}

const UserFormDialog = (props: UserFormDialogProps) => {
	const {
		open, setDialogOpen, currUser,
	} = props;
	const classes = useStyles();

	return (
		<Dialog open={open} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
			<DialogTitle className={classes.dialogTitle}>
				<div style={{ display: 'flex' }}>
					<Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
						{`Edit ${currUser?.name}`}
					</Typography>

					<CloseIcon color="secondary" onClick={() => { setDialogOpen(false); }} />

				</div>
			</DialogTitle>
			<DialogContent dividers>
				<UserForm currUser={currUser} closeButton={() => setDialogOpen(false)} />
			</DialogContent>
		</Dialog>
	);
};

export default UserFormDialog;
