import React, { useState, FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import TableView from './TableView';
import TableItemDialog from './TableItemDialog';
import { TableProps } from './tableTypes';
import { formComponents } from './tableHelper';

const useStyles = makeStyles({
	header: {
		float: 'right',
		padding: 10,
	},
});

const Table: FunctionComponent<TableProps> = (props) => {
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
		showLoading,
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
		showWarrantyAction= false,
		routeToDetail,
		routeToWarrantyDetails,
		searchCriteria = '',
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
				<TableView
					title={title}
					fields={fields}
					items={items}
					changeSearch={changeSearch}
					showLoading={showLoading}
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
					routeToWarrantyDetails={routeToWarrantyDetails}
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

export default Table;
