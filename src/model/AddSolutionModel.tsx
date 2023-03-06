import { AddSolutionModelProps } from "./modelTypes";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Typography
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { WarrantySolutionTypes } from "../types/warranty";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useEffect } from "react";
import { useStyles } from "./styles"
import DialogTitle from "./DialogTitle";

const AddSolutionModel = (props: AddSolutionModelProps) => {
	const classes = useStyles();
	const {
		openModel,
		title,
		solutionTypes,
		solutionTypesLoaded,
		warrantyProductId,
		warrantySolutions,
		handleClose,
		handleAddSolution
	} = props;

	const [solutionSelected, setSolutionSelected] = useState(-1);
	const [solutionTypesList, setSolutionTypesList] = useState<WarrantySolutionTypes[]>([]);

	const handleOnChangeSolution = (newValue: WarrantySolutionTypes | null) => {
		const solutionId = newValue ? newValue.id : -1;
		setSolutionSelected(solutionId);
	};

	const handleOnClickAddSolution = () => {
		handleAddSolution && handleAddSolution(warrantyProductId, solutionSelected);
	};

	const handleOnClickClose = () => {
		handleClose && handleClose();
	};

	useEffect(() => {
		const solutionAdded = warrantySolutions.filter(x => x.warrantyProductId == warrantyProductId).map(x => x.warrantySolutionTypeId);
		if (solutionTypes.filter(x => solutionAdded.indexOf(x.id) > -1 && x.final == 1).length > 0) {
			setSolutionTypesList(solutionTypes.filter(x => x.allowAfterFinal == 1));
		} else {
			setSolutionTypesList(solutionTypes);
		}
	}, [solutionTypes, solutionTypesLoaded, warrantyProductId, warrantySolutions]);
	return (
		<Dialog open={openModel} fullWidth={true} maxWidth={"sm"} onClose={handleOnClickClose}>
			<DialogTitle onClose={handleOnClickClose}>
				{title}
			</DialogTitle>
			<DialogContent dividers>
				{solutionTypesLoaded ? (
					<Autocomplete
						key={`autcomp${warrantyProductId}`}
						id="solutions-outlined"
						options={solutionTypesList}
						getOptionLabel={(option: WarrantySolutionTypes) => option.title}
						renderInput={(params) => (
							<TextField
								{...params}
								variant="outlined"
								label="Warranty Solution Types"
								placeholder="Select solution"
							/>
						)}
						onChange={(event, newValue) => {
							handleOnChangeSolution(newValue);
						}}
					/>
				) : (
					<Typography>Loading...</Typography>
				)}
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
				<Button
					variant="contained"
					color="primary"
					type="button"
					autoFocus
					className={classes.saveSolution}
					onClick={handleOnClickAddSolution}>
					{'Add Solution'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddSolutionModel;
