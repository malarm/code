import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Toolbar,
	Typography,
	Tooltip,
	IconButton,
	TextField,
	InputAdornment,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import { ToolbarProps } from './tableTypes';
import FilterDialog from './FilterDialog';
import { formComponents } from './tableHelper';

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	title: {
		flex: '1 1 100%',
	},
	searchField: {
		padding: '10px 0',
		width: 400,
	},
}));

const TableToolbar = (props: ToolbarProps) => {
	const classes = useToolbarStyles();
	const { changeSearch, title, showFilter = true, itemFormName, searchCriteria = '' } = props;
	const [open, openFilterDialog] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>(searchCriteria);
	const FormComponent = formComponents[`${itemFormName}Filter`];
	return (
		<>
			<Toolbar className={classes.root}>
				<Typography
					className={classes.title}
					variant="h6"
					id="tableTitle"
					component="div"
					align="left"
				>
					{title}
				</Typography>
				{changeSearch && (
					<TextField
						variant="outlined"
						placeholder="Search.."
						className={classes.searchField}
						size="small"
						value={searchText}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							setSearchText(event.target.value)
						}
						onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
							changeSearch && changeSearch(event.target.value)
						}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon color="secondary" />
								</InputAdornment>
							),
						}}
					/>
				)}
				{showFilter && (
					<Tooltip title="Filter">
						<IconButton aria-label="filter list" onClick={() => openFilterDialog(true)}>
							<FilterListIcon />
						</IconButton>
					</Tooltip>
				)}
			</Toolbar>
			{
				showFilter && FormComponent && (
					<FilterDialog open={open} openFilterDialog={openFilterDialog}>
						<FormComponent openFilterDialog={openFilterDialog}/>
					</FilterDialog>
				)
			}
		</>
	);
};

export default TableToolbar;
