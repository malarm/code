import React, { FunctionComponent } from 'react';
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));

const TablePaginationActions: FunctionComponent<TablePaginationActionsProps> = ({ count, page, rowsPerPage, onChangePage } ) => {
	const classes = useStyles();
	const totalPages = Math.ceil(count / rowsPerPage);
	const handleFirstPageButtonClick = (event:  React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event:  React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
		onChangePage(event, page);
	};

	const handleNextButtonClick = (event:  React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
		onChangePage(event, page + 2);
	};

	const handleLastPageButtonClick = (event:  React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
		onChangePage(event, Math.max(0, totalPages - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				<FirstPageIcon />
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				<KeyboardArrowLeft />
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= totalPages - 1}
				aria-label="next page"
			>
				<KeyboardArrowRight />
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= totalPages - 1}
				aria-label="last page"
			>
				<LastPageIcon />
			</IconButton>
		</div>
	);
};
export default TablePaginationActions;
