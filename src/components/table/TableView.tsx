import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import {
	Checkbox,
	CircularProgress,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Typography,
	Link
} from '@material-ui/core';
import { Delete as DeleteIcon, EditOutlined as EditOutlinedIcon, ListAlt as ViewIcon } from '@material-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TableViewProps } from './tableTypes';
import TableToolbar from './TableToolbar';
import TablePaginationActions from './TablePaginationActions';

const useStyles = makeStyles({
	table: {
		width: '100%',
		minHeight: '60vh',
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
});

const TableView = (props: TableViewProps) => {
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
		showLoading,
		changeSort,
		sortCriteria,
		changeSearch,
		subTable = false,
		pagingInfo,
		handlePageChange,
		handlePageSizeChange,
		itemFormName,
		showCheckbox,
		showWarrantyAction,
		routeToDetail,
		routeToWarrantyDetails,
		searchCriteria,
	} = props;
	const { t } = useTranslation();
	const handleAction = (mode: string, item: any) => {
		if (!routeToDetail) {
			setActionMode && setActionMode(mode);
			setCurrItem && setCurrItem(item);
			openItemDialog && openItemDialog(true);
		} else {
			routeToDetail(item.id, mode);
		}
	};
	const handleWarrantyAction = (mode: string, item: any) => {
		if (!routeToWarrantyDetails) {
			setActionMode && setActionMode(mode);
			setCurrItem && setCurrItem(item);
			openItemDialog && openItemDialog(true);
		} else {
			routeToWarrantyDetails(item.id, mode);
		}
	};

	const handleSortCriteria = (field: string) => (
		event: React.MouseEvent<HTMLElement>
	) => changeSort && changeSort(field);

	const onChangePage = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
		page: number
	) => handlePageChange && handlePageChange(page);

	const onChangeRowsPerPage = (event: any) => handlePageSizeChange && handlePageSizeChange(event.target.value)
	return (
		<>
			<TableToolbar
				changeSearch={changeSearch}
				itemFormName={itemFormName}
				title={title}
				showFilter={showFilter}
				searchCriteria={searchCriteria}
			/>
			<TableContainer className={subTable ? classes.subTable : classes.table}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							{
								showCheckbox && <TableCell />
							}
							{fields.map((field) => (
								<TableCell
									key={field.field}
									align="left"
									sortDirection={
										sortCriteria
											? sortCriteria.orderBy === field.field
												? sortCriteria.order
												: false
											: null
									}
								>
									{sortCriteria ? (
										<TableSortLabel
											active={sortCriteria.orderBy === (field.sortField ?? field.field)}
											direction={
												sortCriteria.orderBy === (field.sortField ?? field.field)
													? sortCriteria.order
													: 'asc'
											}
											onClick={handleSortCriteria(field.sortField ?? field.field)}
										>
											{t(field.label)}
										</TableSortLabel>
									) : (
										t(field.label)
									)}
								</TableCell>
							))}
							{showActions && fields.length > 0 && (
								<TableCell align="center">{t('action')}</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody className={classes.tableBody}>
						{showLoading ? (
							<TableRow style={{ border: 'none' }}>
								<TableCell
									rowSpan={3}
									colSpan={fields.length + (showActions ? 1 : 0)}
									align="center"
									style={{ border: 'none' }}
								>
									<CircularProgress style={{ marginTop: 30 }} />
								</TableCell>
							</TableRow>
						) : (items.length > 0 ?
							items.map((row, index) => (
								<TableRow key={`tabRow${index}`}>
									{
										showCheckbox && <TableCell><Checkbox /></TableCell>
									}
									{fields.map((itm, idx) => {
										return (
											<>
												{
													<>
														{itm.isLink &&
															<TableCell key={`itm${idx}`} align="left">
																<Link onClick={e => e.stopPropagation()} href={itm.link?.replace('replacetext', itm.field?.split('.').reduce((a, b) => a[b], row))} target={'_blank'}>{itm.field?.split('.').reduce((a, b) => a[b], row)}</Link>
															</TableCell>}
														{(!itm.isLink) &&
															<TableCell key={`itm${idx}`} align="left">{itm.field?.split('.').reduce((a, b) => a[b], row)}</TableCell>
														}</>
												}
											</>
										);
									})}
									{showActions && fields.length > 0 && (
										<TableCell align="center">
											<IconButton
												size="small"
												color="primary"
												className={classes.actionButton}
												onClick={() => handleAction('View', row)}
											>
												<ViewIcon />
											</IconButton>
											{showWarrantyAction && (
												<IconButton
													size="small"
													color="primary"
													className={classes.actionButton}
													onClick={() => handleWarrantyAction('View', row)}
												>
													<FontAwesomeIcon icon="tools" />
												</IconButton>
											)}
											{showEditAction && (
												<IconButton
													size="small"
													color="primary"
													className={classes.actionButton}
													onClick={() => handleAction('Edit', row)}
												>
													<EditOutlinedIcon />
												</IconButton>
											)}
											{deleteAction && (
												<IconButton
													size="small"
													color="primary"
													className={classes.actionButton}
													onClick={() => deleteAction(row.id)}
												>
													<DeleteIcon />
												</IconButton>
											)}
										</TableCell>
									)}
								</TableRow>
							))
							: <Typography align="center" variant="h6" color="secondary" style={{ marginTop: 10 }}>No Records</Typography>)}
					</TableBody>
				</Table>
			</TableContainer>
			{handlePageChange && (
				<TablePagination
					component="div"
					rowsPerPageOptions={[25, 50, 75, 100]}
					count={pagingInfo?.totalCount ?? 0}
					rowsPerPage={pagingInfo?.size ?? 10}
					page={pagingInfo?.page ? pagingInfo?.page - 1 : 0}
					SelectProps={{
						inputProps: { 'aria-label': 'rows per page' },
						native: true,
					}}
					onChangePage={onChangePage}
					ActionsComponent={TablePaginationActions}
					onChangeRowsPerPage={onChangeRowsPerPage}
				/>
			)}
		</>
	);
};

export default TableView;
