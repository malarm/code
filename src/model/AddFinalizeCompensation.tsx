import { FinalizeCompensationModelProps } from "./modelTypes";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Grid,
	InputAdornment
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useStyles } from "./styles"
import DialogTitle from "./DialogTitle";

const FinalizeCompensationModel = (props: FinalizeCompensationModelProps) => {
	const classes = useStyles();
	const {
		openModel,
		title,
		handleSubmit,
		handleClose,
		handleDelete,
		// compensated,
		productPricePayed,
		isEdit,
		currency
	} = props;

	// const [compensatedState, setcompensated] = useState(compensated);
	const [returnAmountState, setReturnAmount] = useState(String(productPricePayed));

	const handleOnTextChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const regex = /(^\d+(\.\d{1,2})?$)|(^(\d+\.{0,1})$)/
		if (regex.test(event.target.value)) {
			if (field === 'returnAmount' && event != null) {
				setReturnAmount(event.target.value);
			}
			/* if (field === 'rm') {
				setcompensated(Number(event.target.value));
			} */
		}
	};

	const handleOnClickClose = () => {
		handleClose && handleClose();
	};

	const handleOnSubmit = () => {
		handleSubmit && handleSubmit(Number(returnAmountState), !isEdit);
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
							<TextField
								name="returnAmount"
								// value={compensatedState}
								value={returnAmountState}
								label="Amount returned to customer"
								variant="outlined"
								fullWidth
								style={{ minWidth: '450px' }}
								onChange={handleOnTextChange('returnAmount')}
								InputProps={{
									endAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
								}}
							// onChange={handleOnTextChange('rm')}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="primary"
						type="button"
						autoFocus
						className={classes.saveSolution}
						onClick={handleOnClickClose}
					>
						{'Close'}
					</Button>
					{
						isEdit ? <Button
							variant="contained"
							color="primary"
							type="button"
							autoFocus
							className={classes.saveSolution}
							onClick={handleDelete}
						>
							{'Delete'}
						</Button> : null
					}
					<Button
						variant="contained"
						color="primary"
						type="button"
						autoFocus
						className={classes.saveSolution}
						onClick={handleOnSubmit}
					>
						{isEdit ? "Update Amount" : "Finalize Compensation"}
					</Button>


				</DialogActions>
			</Dialog>

		</>
	);
}

export default FinalizeCompensationModel;
