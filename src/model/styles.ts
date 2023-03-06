import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
	},
	solution: {
		margin: 0,
		padding: theme.spacing(2),
	},
	saveSolution: {
		margin: 0,
		padding: theme.spacing(1)
	},
	// delete confirmation model
	modelTitle: {
		margin: 0,
		padding: theme.spacing(2),
	},
	customButton: {
		margin: 0,
		padding: theme.spacing(1)
	}
}));

export const statistics = makeStyles((theme) => ({
	root: {
		'& .MuiFormControl-root': {
			width: '90%',
			marginTop: theme.spacing(1),
		},
		margin: '30px 20px',
	},
	section: {
		margin: 20,
		padding: 30,
		marginX: 'auto',
	},

	subTable: {
		width: '100%',
		height: '25vh',
	},
	tableBody: {
		height: '80%',
	},
	actionButton: {
		margin: '0px 3px',
	},
	terminateColor: {
		color: "#f50057"
	},
	indeterminateColor: {
		color: "#f50057"
	},
	selectAllText: {
		fontWeight: 500
	},
	selectedAll: {
		backgroundColor: "rgba(0, 0, 0, 0.08)",
		"&:hover": {
			backgroundColor: "rgba(0, 0, 0, 0.08)"
		}
	},
	formControl: {
		margin: theme.spacing(1),
		width: "200px"
	},
	table: {
		width: '100%',
		minHeight: '60vh',
	},
	gray: {
		backgroundColor: '#d3d3d3'
	},
	white: {
		backgroundColor: '#fff'
	}

}));

export interface DialogTitleProps {
	children: React.ReactNode;
	onClose: () => void;
}
