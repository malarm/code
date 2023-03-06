import React, { FunctionComponent } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	makeStyles,
	Typography,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { TableItemDialogProps } from './tableTypes';

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

const TableItemDialog: FunctionComponent<TableItemDialogProps> = (props) => {
	const {
		open,
		openItemDialog,
		currItem,
		titleField,
		children,
		actionMode,
	} = props;
	const classes = useStyles();
	const dialogTitle = titleField
		? `${actionMode} ${currItem[titleField] ?? ''}`
		: actionMode;
	return (
		<Dialog
			open={open}
			maxWidth="md"
			classes={{ paper: classes.dialogWrapper }}
		>
			<DialogTitle className={classes.dialogTitle}>
				<div style={{ display: 'flex' }}>
					<Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
						{dialogTitle}
					</Typography>

					<CloseIcon
						color="secondary"
						onClick={() => {
							openItemDialog(false);
						}}
					/>
				</div>
			</DialogTitle>
			<DialogContent dividers>{children}</DialogContent>
		</Dialog>
	);
};

export default TableItemDialog;
