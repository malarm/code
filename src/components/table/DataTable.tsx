import React, { useState, FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import DataGridView from './DataGridView';
import TableItemDialog from './TableItemDialog';
import { TableProps } from './tableTypes';
import { formComponents } from './tableHelper';

const useStyles = makeStyles({
	header: {
		float: 'right',
		padding: 10
	}
});

const DataTable: FunctionComponent<TableProps> = props => {
	const classes = useStyles();
	const { t } = useTranslation();
	const {
		items,
		fields,
		title,
		hasActions,
		itemFormName,
		titleField,
		deleteAction,
		sortCriteria,
		changeSort,
		changeSearch,
		showAddAction = true,
		showEditAction = true,
		showFilter = true,
		pagingInfo,
		handlePageChange,
		handlePageSizeChange,
		showDetailPage = false,
		showCheckbox = false,
		showWarrantyAction = false,
		routeToDetail,
		searchCriteria = ''
	} = props;
	const [actionMode, setActionMode] = useState<string>('');
	const [currItem, setCurrItem] = useState<any>({});
	const [open, openItemDialog] = useState<boolean>(false);
	const FormComponent = formComponents[itemFormName];
	const handleAdd = () => {
		setActionMode('New');
		openItemDialog(true);
	};
	return (
		<Paper>
			{!(showDetailPage && open) ? (
				<div className={classes.header}>
					{showAddAction && (
						<Button variant="contained" color="primary" onClick={handleAdd}>
							{t('add')}
						</Button>
					)}
				</div>
			) : (
				<div className={classes.header}>
					<Button color="primary" onClick={() => openItemDialog(false)}>
						{t('back')}
					</Button>
				</div>
			)}
			{!(showDetailPage && open) && (
				<DataGridView
					title={title}
					fields={fields}
					items={items}
					changeSearch={changeSearch}
					setActionMode={setActionMode}
					setCurrItem={setCurrItem}
					openItemDialog={openItemDialog}
					showActions={hasActions}
					deleteAction={deleteAction}
					sortCriteria={sortCriteria}
					changeSort={changeSort}
					showEditAction={showEditAction}
					showFilter={showFilter}
					pagingInfo={pagingInfo}
					handlePageChange={handlePageChange}
					itemFormName={itemFormName}
					handlePageSizeChange={handlePageSizeChange}
					showCheckbox={showCheckbox}
					showWarrantyAction={showWarrantyAction}
					routeToDetail={routeToDetail}
					searchCriteria={searchCriteria}
				/>
			)}
			{showDetailPage ? (
				open && (
					<FormComponent
						item={currItem}
						mode={actionMode}
						openItemDialog={openItemDialog}
					/>
				)
			) : (
				<TableItemDialog
					open={open}
					openItemDialog={openItemDialog}
					currItem={currItem}
					titleField={titleField}
					actionMode={actionMode}
				>
					<FormComponent
						item={currItem}
						mode={actionMode}
						openItemDialog={openItemDialog}
					/>
				</TableItemDialog>
			)}
		</Paper>
	);
};

export default DataTable;
