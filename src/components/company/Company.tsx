import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect, ConnectedProps } from 'react-redux';
import Table from '../table/Table';
import { TableField } from '../table/tableTypes';
import { deleteCompany, fetchCompanies, updateSearchCriteria, updateSortCriteria, resetCompanyState } from './companySlice';
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
	companies: state.company?.companies,
	showLoading: state.company?.isFetching,
	sortCriteria: state.company?.sortCriteria,
	searchCriteria: state.company?.searchCriteria,
});
const mapDispatchToProps = {
	initiateFetchCompanies: fetchCompanies,
	initiateDeleteCompany: deleteCompany,
	changeSort: updateSortCriteria,
	changeSearch: updateSearchCriteria,
	resetState: resetCompanyState,
};

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type CompanyProps = PropsFromRedux

const Company = (props: CompanyProps) => {
	const { t } = useTranslation();
	const classes = useStyles();
	const { initiateFetchCompanies, companies, showLoading, initiateDeleteCompany,  resetState } = props;
	const companyFields: Array<TableField> = [
		{
			label: 'company_id',
			field: 'id',
		},
		{
			label: 'name',
			field: 'name',
		},
		{
			label: 'address',
			field: 'address',
		},
		{
			label: 'phone',
			field: 'phoneNo',
		},
		{
			label: 'vat',
			field: 'vat',
		},
	]
	// on mount
	useEffect(() => {
		initiateFetchCompanies();
	},[initiateFetchCompanies]);

	// unmount
	useEffect(() => {
		return () => {
			resetState();
		}
	}, [resetState]);
	return (
		<div className={classes.root}>
			<Table
				showLoading={showLoading}
				items={companies}
				showFilter={false}
				hasActions={true}
				itemFormName={'company'}
				title={t('company')}
				titleField="name"
				fields={companyFields}
				deleteAction={initiateDeleteCompany}
			/>
		</div>
	);
};

export default connector(Company);
