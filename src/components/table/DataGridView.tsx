import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	IconButton,
	createMuiTheme,
	Theme,
	darken,
	lighten,
	Paper,
	TablePagination,
	Typography
} from '@material-ui/core';
import {
	DataGrid,
	GridColumnMenuProps,
	GridColumnMenuContainer,
	GridColumnsMenuItem,
	GridColDef,
	GridCellParams,
	getThemePaletteMode,
	GridRowParams,
	GridOverlay
} from '@material-ui/data-grid';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewIcon from '@material-ui/icons/ListAlt';
import { DataGridProps } from './tableTypes';
import TableToolbar from './TableToolbar';
import { differenceInCalendarDays } from 'date-fns';
import TablePaginationActions from './TablePaginationActions';
import DeleteConfirmationModel from '../../model/DeleteConfirmationModel';

const defaultTheme = createMuiTheme();
const useStyles = makeStyles(
	(theme: Theme) => {
		const getBackgroundColor = (color: any) =>
			getThemePaletteMode(theme.palette) === 'dark'
				? darken(color, 0.6)
				: lighten(color, 0.6);

		const getHoverBackgroundColor = (color: any) =>
			getThemePaletteMode(theme.palette) === 'dark'
				? darken(color, 0.5)
				: lighten(color, 0.5);

		return {
			root: {
				'& .super-app-theme--1': {
					backgroundColor: getBackgroundColor(theme.palette.success.main),
					'&:hover': {
						backgroundColor: getHoverBackgroundColor(theme.palette.success.main)
					}
				},
				'& .super-app-theme--warning': {
					backgroundColor: getBackgroundColor(theme.palette.warning.main),
					'&:hover': {
						backgroundColor: getHoverBackgroundColor(theme.palette.warning.main)
					}
				},
				'& .super-app-theme--0': {
					backgroundColor: getBackgroundColor('#ffffff'),
					'&:hover': {
						backgroundColor: getHoverBackgroundColor('#ffffff')
					}
				},
				'& .super-app-theme--expired': {
					backgroundColor: getBackgroundColor(theme.palette.error.main),
					'&:hover': {
						backgroundColor: getHoverBackgroundColor(theme.palette.error.main)
					}
				},
				'& .super-app-theme--cell': {
					boderWidth: 0
				},
				maxWidth: '77vw',
				cursor: 'pointer'
			},
			actionButton: {
				margin: '0px 3px'
			},

			header: {
				float: 'right',
				padding: 10
			},
			grid: {
				'& .super-app-theme--1': {
					backgroundColor: getBackgroundColor(theme.palette.success.main),
					'&:hover': {
						backgroundColor: getHoverBackgroundColor(theme.palette.success.main)
					}
				},
				'& .super-app-theme--warning': {
					backgroundColor: getBackgroundColor(theme.palette.warning.main),
					'&:hover': {
						backgroundColor: getHoverBackgroundColor(theme.palette.warning.main)
					}
				},
				'& .super-app-theme--0': {
					backgroundColor: getBackgroundColor('#ffffff'),
					'&:hover': {
						backgroundColor: getHoverBackgroundColor('#ffffff')
					}
				},
				'& .super-app-theme--expired': {
					backgroundColor: getBackgroundColor(theme.palette.error.main),
					'&:hover': {
						backgroundColor: getHoverBackgroundColor(theme.palette.error.main)
					}
				},
				width: '100%',
				cursor: 'pointer'
			}
		};
	},
	{ defaultTheme }
);

function CustomLoadingOverlay() {
	return (
		<GridOverlay>
			<Typography
				align="center"
				variant="h6"
				color="secondary"
				style={{ marginTop: 10 }}
			>
				No Records
			</Typography>
		</GridOverlay>
	);
}

const DataGridView = (props: DataGridProps) => {
	const classes = useStyles();
	const {
		items,
		fields,
		title,
		openItemDialog,
		setCurrItem,
		showActions,
		setActionMode,
		showEditAction,
		showFilter,
		deleteAction,
		changeSearch,
		pagingInfo,
		handlePageChange,
		handlePageSizeChange,
		itemFormName,
		showCheckbox,
		routeToDetail,
		searchCriteria,
		open,
		handleColumnVisibilityChange,
	} = props;
	const [deleteModelState, setDeleteModelState] = useState<boolean>(false);
	const [selectedDeletedID, setSelectedDeletedID] = useState<number>(0);
	const buttons: Array<any> = [
		showActions &&
		fields.length > 0 && {
			field: 'edit',
			headerName: 'Action',
			sortable: false,
			headerAlign: 'center',
			align: 'center',
			width: 150,
			cellClassName: 'super-app-theme--cell',
			renderCell: function IconCell(params: GridCellParams) {
				return (
					<div>
						<IconButton
							size="small"
							color="primary"
							title="View"
							className={classes.actionButton}
							onClick={() => handleAction('view', params.row)}
						>
							<ViewIcon />
						</IconButton>
						{showEditAction && (
							<IconButton
								size="small"
								color="primary"
								title="Edit"
								className={classes.actionButton}
								onClick={() => handleAction('edit', params.row)}
							>
								<EditOutlinedIcon />
							</IconButton>
						)}
						{deleteAction && (
							<IconButton
								size="small"
								color="primary"
								title="Delete"
								className={classes.actionButton}
								onClick={() => handleOpenDeleteModel(params.row.id)}
							>
								<DeleteIcon />
							</IconButton>
						)}
					</div>
				);
			}
		}
	];

	const columns: GridColDef[] = fields.concat(buttons);

	const handleAction = (mode: string, item: any) => {
		if (!routeToDetail) {
			setActionMode && setActionMode(mode);
			setCurrItem && setCurrItem(item);
			openItemDialog && openItemDialog(true);
		} else {
			routeToDetail(item.id, mode);
		}
	};

	const handleCloseDeleteModel = () => {
		console.log('handleCloseDeleteModel');
		setSelectedDeletedID(0);
		setDeleteModelState(false);
	};

	const handleOpenDeleteModel = (id: number) => {
		setSelectedDeletedID(id);
		setDeleteModelState(true);
	};

	const GridColumnMenu = React.forwardRef<HTMLUListElement, GridColumnMenuProps>(function GridColumnMenu(props: GridColumnMenuProps, ref) {
		const { hideMenu, currentColumn } = props;
		return (
			<GridColumnMenuContainer ref={ref} {...props}>
				<GridColumnsMenuItem onClick={hideMenu} column={currentColumn} />
			</GridColumnMenuContainer>
		);
	});

	const onChangePage = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		page: number
	) => handlePageChange && handlePageChange(page);

	const onChangeRowsPerPage = (event: any) =>
		handlePageSizeChange && handlePageSizeChange(event.target.value);

	const getRowClassName = (params: GridRowParams) => {
		if (params.row.status === 0) {
			if (differenceInCalendarDays(new Date(params.row.dueDate), new Date()) === 0) {
				return `super-app-theme--warning`;
			}
			if (differenceInCalendarDays(new Date(params.row.dueDate), new Date()) < 0) {
				return `super-app-theme--expired`;
			}
			if (differenceInCalendarDays(new Date(params.row.dueDate), new Date()) > 0) {
				return `super-app-theme--0`;
			}
		}
		if (params.row.status === 1) {
			return `super-app-theme--1`;
		}
		return ``;
	};

	return (
		<>
			{itemFormName === 'warranty' ? (
				<Paper>
					<TableToolbar
						changeSearch={changeSearch}
						itemFormName={itemFormName}
						title={title}
						showFilter={showFilter}
						searchCriteria={searchCriteria}
					/>
					<DataGrid
						rows={items}
						columns={columns}
						pageSize={pagingInfo?.size ?? 25}
						checkboxSelection={showCheckbox}
						disableSelectionOnClick
						autoHeight
						page={pagingInfo?.page ? pagingInfo?.page - 1 : 0}
						onCellClick={param => {
							if (param.colDef.headerName !== 'Action') {
								handleAction('edit', param.row)
							}
						}}
						className={open ? classes.grid : classes.root}
						components={{
							ColumnMenu: GridColumnMenu,
							NoRowsOverlay: CustomLoadingOverlay
						}}
						getRowClassName={params => getRowClassName(params)}
						hideFooter
						disableExtendRowFullWidth={true}
						onColumnVisibilityChange={param => {
							const { field, isVisible } = param;
							if (handleColumnVisibilityChange) {
								handleColumnVisibilityChange(field, isVisible);
							}
						}}
					/>
					{handlePageChange && (
						<TablePagination
							component="div"
							rowsPerPageOptions={[25, 50, 75, 100]}
							count={pagingInfo?.totalCount ?? 0}
							rowsPerPage={pagingInfo?.size ?? 25}
							page={pagingInfo?.page ? pagingInfo?.page - 1 : 0}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: true
							}}
							onChangePage={onChangePage}
							ActionsComponent={TablePaginationActions}
							onChangeRowsPerPage={onChangeRowsPerPage}
						/>
					)}
				</Paper>
			) : (
				<Paper>
					<TableToolbar
						changeSearch={changeSearch}
						itemFormName={itemFormName}
						title={title}
						showFilter={showFilter}
						searchCriteria={searchCriteria}
					/>
					<DataGrid
						rows={items}
						columns={columns}
						checkboxSelection={showCheckbox}
						disableSelectionOnClick
						autoHeight
						className={classes.grid}
						components={{
							ColumnMenu: GridColumnMenu,
							NoRowsOverlay: CustomLoadingOverlay
						}}
						hideFooter
						onColumnVisibilityChange={param => {
							const { field, isVisible } = param;
							if (handleColumnVisibilityChange) {
								handleColumnVisibilityChange(field, isVisible);
							}
						}}
					/>
					{handlePageChange && (
						<TablePagination
							component="div"
							rowsPerPageOptions={[10, 20]}
							count={pagingInfo?.totalCount ?? 0}
							rowsPerPage={pagingInfo?.size ?? 10}
							page={pagingInfo?.page ? pagingInfo?.page - 1 : 0}
							SelectProps={{
								inputProps: { 'aria-label': 'rows per page' },
								native: true
							}}
							onChangePage={onChangePage}
							ActionsComponent={TablePaginationActions}
							onChangeRowsPerPage={onChangeRowsPerPage}
						/>
					)}
				</Paper>
			)}
			{selectedDeletedID > 0 && <DeleteConfirmationModel
				openModel={deleteModelState}
				title="Delete Confirmation"
				content="Are sure you want to Delete Warranty?"
				deleteID={selectedDeletedID}
				handleDeleteConfirm={() => {
					deleteAction && deleteAction(selectedDeletedID);
					handleCloseDeleteModel();
				}}
				handleClose={handleCloseDeleteModel}
			/>}
		</>
	);
};

export default DataGridView;
