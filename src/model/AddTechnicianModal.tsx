import { AddTechnicianModelProps, OrderTechnicianType } from "./modelTypes";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Grid, CircularProgress
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { WarrantyTechnicianTypes } from '../types/warranty';
import { useStyles } from "./styles"
import DialogTitle from "./DialogTitle";

const AddTechnicianModal = (props: AddTechnicianModelProps) => {
	const classes = useStyles();
	const {
		warranty,
		product,
		solution,
		title,
		handleSubmit,
		handleClose,
		openModel,
		technicianNames,
		technicianNamesLoaded
	} = props;

	const [solutionLocal] = useState(solution);
	const newTechnicianDetail: OrderTechnicianType = {
		warrantyId: warranty?.id,
		warrantySolutionId: solutionLocal?.id,
		warrantyProductId: product?.id,
		technicianId: 0,
		subject: `Bestilling af tekniker til kunde: ${warranty?.name} ${warranty?.lastName} Ref: ${warranty?.orderId}`,
		message: `Hej,

Vil i besøge vores kunde ${warranty?.name} på ${warranty?.address}, ${warranty?.zipCode} ${warranty?.city}.
Telefon: ${warranty?.phone} og email: ${warranty?.email}

Vores reference, som I bedes notere: ${warranty?.orderId}

Købsdato: ${warranty?.orderDate}.

Det drejer sig om en reklamation på ${product?.title} (${product?.itemNumber}). Kunden har oplyst, at produktet har følgende fejl:
${product?.errorDescription}.

I må gerne notere serienummeret på produktet ned, og notere dette på jeres faktura til os.
Vores reference: ${warranty?.orderId}

Med venlig hilsen,
Wineandbarrels
`
	};
	const [technicianDetail, setTechnicianDetail] = useState(newTechnicianDetail);

	const handleOnSelectChange = (newValue: WarrantyTechnicianTypes | null) => {
		setTechnicianDetail({ ...technicianDetail, technicianId: newValue?.id });
	};

	const handleOnTextChange = (field: string) => (event: any) => {
		setTechnicianDetail({ ...technicianDetail, [field]: event.target.value });
	};

	const handleOnClickClose = () => {
		handleClose && handleClose();
	};

	const handleOnSubmit = () => {
		handleSubmit && handleSubmit(technicianDetail);
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
							{technicianNamesLoaded ? (
								<Autocomplete
									id="solutions-outlined"
									options={technicianNames}
									getOptionLabel={(option: WarrantyTechnicianTypes) => option.name}
									renderInput={(params) => (
										<TextField
											{...params}
											variant="outlined"
											label="Technician Names"
										/>
									)}
									onChange={(event, newValue) => {
										handleOnSelectChange(newValue);
									}}
								/>
							) : (
								<CircularProgress />
							)}
						</Grid>
						<Grid item xs={12}>
							<TextField
								name=""
								label="Subject"
								variant="outlined"
								fullWidth
								value={technicianDetail.subject}
								onChange={handleOnTextChange('subject')}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name=""
								label="Message"
								variant="outlined"
								fullWidth
								multiline
								rows={12}
								value={technicianDetail.message}
								onChange={handleOnTextChange('message')}
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
						onClick={handleOnClickClose}>
						{'Close'}
					</Button>
					<Button
						variant="contained"
						color="primary"
						type="button"
						autoFocus
						className={classes.saveSolution}
						onClick={handleOnSubmit}>
						{'Order technician'}
					</Button>
				</DialogActions>
			</Dialog>

		</>
	);
}

export default AddTechnicianModal;
