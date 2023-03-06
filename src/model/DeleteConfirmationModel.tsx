import { DeleteConfirmationModelProps } from "./modelTypes";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Typography,
	Grid
} from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useStyles } from "./styles"
import DialogTitle from './DialogTitle'

const DeleteConfirmationModel = (props: DeleteConfirmationModelProps) => {
	const classes = useStyles();
	const {
		openModel,
		title,
		content,
		deleteID,
		handleDeleteConfirm,
		handleClose,
	} = props;

	useEffect(() => {
		if (!openModel) {
			handleClose();
		}
	}, [handleClose, openModel]);

	const handleOnClickClose = () => {
		handleClose();
	};

	const handleOnSubmit = () => {
		handleDeleteConfirm(deleteID);
	};

	return (
		<>
			<Dialog onClose={handleOnClickClose} open={openModel} >
				<DialogTitle onClose={handleOnClickClose}>
					{title}
				</DialogTitle>
				<DialogContent dividers>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography><b>{content}</b></Typography>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="primary"
						type="button"
						autoFocus
						className={classes.customButton}
						onClick={handleOnClickClose}
					>
						{'Close'}
					</Button>
					<Button
						variant="contained"
						color="primary"
						type="button"
						autoFocus
						className={classes.customButton}
						onClick={handleOnSubmit}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default DeleteConfirmationModel;
