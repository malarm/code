import {
	IconButton,
	Typography,
} from "@material-ui/core";
import React from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles, DialogTitleProps } from "./styles"

const DialogTitle = ((props: DialogTitleProps) => {
	const classes = useStyles();
	const { children, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.solution} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

export default DialogTitle
