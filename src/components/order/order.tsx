import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import Table from '../table/Table';
import { TableField } from '../table/tableTypes';
import {
	fetchOrders,
	updateSearchCriteria,
	updateSortCriteria,
	updatePage,
	resetOrderState,
	updatePageSize,
	fetchIso,
	fetchStatuses,
} from './orderSlice';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../app/store';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
	root: {
		width: '70vw',
		margin: 20,
		padding: 30,
		marginX: 'auto',
	},
});

const mapStateToProps = (state: RootState) => ({
	orders: state.order?.orders,
	showLoading: state.order?.isFetching,
	sortCriteria: state.order?.sortCriteria,
	searchCriteria: state.order?.searchCriteria,
	filterCriteria: state.order?.filterCriteria,
	pagingInfo: state.order?.pagingInfo,
});
const mapDispatchToProps = {
	initiateFetchOrders: fetchOrders,
	initiateFetchIso: fetchIso,
	initiateFetchStatuses: fetchStatuses,
	changeSort: updateSortCriteria,
	changeSearch: updateSearchCriteria,
	resetState: resetOrderState,
	handlePageChange: updatePage,
	handlePageSizeChange: updatePageSize,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type OrderProps = PropsFromRedux;

const Order = (props: OrderProps) => {
	const { t } = useTranslation();
	const classes = useStyles();
	const history = useHistory();
	const {
		initiateFetchOrders,
		initiateFetchIso,
		initiateFetchStatuses,
		orders,
		showLoading,
		changeSort,
		sortCriteria,
		filterCriteria,
		changeSearch,
		handlePageChange,
		handlePageSizeChange,
		searchCriteria,
		pagingInfo,
		resetState,
	} = props;
	const orderFields: Array<TableField> = [
		{
			label: 'Order Id',
			field: 'webshopId',
			isLink: true,
			link: `https://webshop-admin.scannet.dk/?page=page&sub=edit&id=2&edit=product_orders&order=replacetext&action=details`
		},
		{
			label: 'Invoice Number',
			field: 'invoiceNumber',
		},
		{
			label: 'Name',
			field: 'customer.firstName',
			sortField: 'customerId',
		},
		{
			label: 'ISO',
			field: 'iso',
		},
		{
			label: 'Currency',
			field: 'currency',
		},
		{
			label: 'Status',
			field: 'orderStatus.title',
			sortField: 'statusId',
		},
		{
			label: 'Payment Method',
			field: 'paymentMethod.paymentMethodTitle',
			sortField: 'id',
		},
	];
	// on mount
	useEffect(() => {
		initiateFetchIso();
		initiateFetchStatuses();
	}, [initiateFetchIso, initiateFetchStatuses]);

	useEffect(() => {
		initiateFetchOrders({
			page: pagingInfo.page,
			search: searchCriteria,
			sortBy: sortCriteria.orderBy,
			sort: sortCriteria.order,
			size: pagingInfo.size,
			iso: filterCriteria.iso,
			status: filterCriteria.status,
			startDate: filterCriteria.startDate,
			endDate: filterCriteria.endDate,
		});
	}, [
		initiateFetchOrders,
		pagingInfo.page,
		searchCriteria,
		sortCriteria.order,
		sortCriteria.orderBy,
		pagingInfo.size,
		filterCriteria.status,
		filterCriteria.iso,
		filterCriteria.startDate,
		filterCriteria.endDate,
	]);

	// unmount
	useEffect(() => {
		return () => {
			resetState();
		};
	}, [resetState]);

	const routeToOrderDetail = (id: number, mode: string) => {
		history.push(
			`/orders/${id}`,
			{
				criteriaHistory: {
					sortCriteria,
					pagingInfo,
					filterCriteria,
					searchCriteria,
				}
			}
		);
	}
	const routeToOrderWarrantyDetails = (id: number, mode: string) => {
		history.push(
			`/orders/${id}/warranty`,
			{
				criteriaHistory: {
					sortCriteria,
					pagingInfo,
					filterCriteria,
					searchCriteria,
				}
			}
		);
	}
	const routeToCreateOrder = () => {
		history.push('/createOrder');
	}
	return (
		<div className={classes.root}>
			<div style={{ float: 'right', margin: 10 }}>
				<Button variant="contained" color="primary" onClick={routeToCreateOrder}>
					{t('create_order_button')}
				</Button>
			</div>
			<Table
				showLoading={showLoading}
				items={orders}
				sortCriteria={sortCriteria}
				changeSort={changeSort}
				changeSearch={changeSearch}
				hasActions={true}
				itemFormName={'order'}
				title={t('order_title')}
				titleField="id"
				fields={orderFields}
				pagingInfo={pagingInfo}
				handlePageChange={handlePageChange}
				handlePageSizeChange={handlePageSizeChange}
				showDetailPage={true}
				showEditAction={false}
				showAddAction={false}
				showCheckbox={false}
				showWarrantyAction={true}
				routeToDetail={routeToOrderDetail}
				routeToWarrantyDetails={routeToOrderWarrantyDetails}
				searchCriteria={searchCriteria}
			/>
		</div>
	);
};

export default connector(Order);
