import { createSlice } from '@reduxjs/toolkit';
import { CountryItem, CustomerType } from '../../types/customer';

interface CustomerSlice {
	customers: CustomerType[];
	selectedCustomer: CustomerType | null;
	countries: CountryItem[];
	isFetching: boolean;
	pagingInfo: {
		totalCount: number;
		totalPages: number;
		page: number;
		size: number;
	},
	sortCriteria: {
		order: string;
		orderBy: string;
	},
	filterCriteria: {
		country: string;
	},
	searchCriteria: string;
}

const initialState: CustomerSlice = {
	customers: [],
	selectedCustomer: null,
	countries: [],
	isFetching: false,
	pagingInfo: {
		totalCount: 0,
		totalPages: 0,
		page: 1,
		size: 10,
	},
	sortCriteria: {
		order: '',
		orderBy: '',
	},
	filterCriteria: {
		country: '',
	},
	searchCriteria: '',
};

const customerSlice = createSlice({
	name: 'customer',
	initialState,
	reducers: {
		fetchCustomers(state, action) {
			state.isFetching = true;
		},
		fetchCustomersSuccess(state, action) {
			state.isFetching = false;
			state.customers = action.payload.response.data;
			state.pagingInfo.totalCount = action.payload.response.count;
			state.pagingInfo.totalPages = action.payload.response.totalPages;
			state.pagingInfo.page = action.payload.response.currentPage;
		},
		fetchSelectedCustomer: (state, action) => {},
		updateSelectedCustomer: (state, action) => {
			state.selectedCustomer = action.payload;
		},
		fetchCountries: (state) => {},
		updateCountries: (state,action) => {
			state.countries = action.payload;
		},

		updateSortCriteria: (state, action) => {
			const isAsc = state.sortCriteria.orderBy === action.payload
        && state.sortCriteria.order === 'asc';
			state.sortCriteria.order = isAsc ? 'desc' : 'asc';
			state.sortCriteria.orderBy = action.payload;
		},
		updateSearchCriteria: (state, action) => {
			state.searchCriteria = action.payload;
			state.pagingInfo.page = 1;
		},
		updateFilterCriteria: (state, action) => {
			state.filterCriteria.country = action.payload.country;
			state.pagingInfo.page = 1;
		},
		updatePage: (state, action) => {
			state.pagingInfo.page = action.payload;
		},
		updatePageSize: (state, action) => {
			state.pagingInfo.size = action.payload;
		},
		updateCustomerCriteria: (state, action) => {
			state.pagingInfo = action.payload.pagingInfo;
			state.sortCriteria = action.payload.sortCriteria;
			state.filterCriteria = action.payload.filterCriteria;
			state.searchCriteria = action.payload.searchCriteria;
		},
		resetCustomerState: (state) => initialState,
	},
});

export const {
	fetchCustomers,
	fetchCustomersSuccess,
	fetchCountries,
	fetchSelectedCustomer,
	updateSelectedCustomer,
	updateCountries,
	updateSortCriteria,
	updateFilterCriteria,
	updateSearchCriteria,
	updatePage,
	updatePageSize,
	updateCustomerCriteria,
	resetCustomerState,
} = customerSlice.actions;
export default customerSlice.reducer;
