import { createSlice } from '@reduxjs/toolkit';
import { CompanyType } from '../../types/company';

interface CompanySlice {
	companies: CompanyType[],
	isFetching: boolean;
	sortCriteria: {
		order: string;
		orderBy: string;
	},
	filterCriteria: {
		country?: string;
	},
	searchCriteria: string;
}

const initialState: CompanySlice = {
	companies: [] as CompanyType[],
	isFetching: false,
	sortCriteria: {
		order: '',
		orderBy: ''
	},
	filterCriteria: {},
	searchCriteria: '',
};

const companySlice = createSlice({
	name: 'company',
	initialState,
	reducers: {
		fetchCompanies(state) {
			state.isFetching = true;
		},
		fetchCompaniesSuccess(state, action) {
			state.isFetching = false;
			state.companies = action.payload.companies;
		},
		updateCompany(state, action){
		},
		updateCompanySuccess(state){
			state.isFetching = true;
		},
		addCompany: (state, action) => {},
		addCompanySuccess: (state) => {state.isFetching = true; },
		deleteCompany: (state, action) => {},
		deleteCompanySuccess: (state) => {state.isFetching = true;},
		updateSortCriteria: (state,action) => {
			const isAsc = state.sortCriteria.orderBy === action.payload && state.sortCriteria.order === 'asc';
			state.sortCriteria.order = isAsc ? 'desc' : 'asc';
			state.sortCriteria.orderBy = action.payload;
		},
		updateSearchCriteria: (state,action) => {
			state.searchCriteria = action.payload;
		},
		updateFilterCriteria: (state,action) => {
			state.filterCriteria = action.payload.filter;
		},
		resetCompanyState: (state) => initialState
	},
});

export const {
	fetchCompanies,
	fetchCompaniesSuccess,
	updateCompany,
	updateCompanySuccess,
	addCompany,
	addCompanySuccess,
	deleteCompany,
	deleteCompanySuccess,
	updateSortCriteria,
	updateFilterCriteria,
	updateSearchCriteria,
	resetCompanyState
} = companySlice.actions;
export default companySlice.reducer;
