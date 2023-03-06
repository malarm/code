import { put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchWrapper, API_URL } from '../../app/api';
import { fetchCompaniesSuccess, updateCompanySuccess, addCompanySuccess, deleteCompanySuccess } from './companySlice';
import { CompanyType } from '../../types/company';
import { PaginatedData } from '../../types/pagination';

function* getCompaniesList() {
	try {
		const companies: PaginatedData<CompanyType> = yield fetchWrapper.get(`${API_URL}/api/companies`);
		yield put(fetchCompaniesSuccess({ companies : companies.data }));
	} catch (error) {
		console.error(`ERROR: ${error.stack}`);
	}
}

function* updateCompany(action: PayloadAction<{ id: number, company: Partial<CompanyType> }>) {
	try{
		const { id, company: updatedCompany} = action.payload;
		yield fetchWrapper.put(`${API_URL}/api/companies/${id}`, updatedCompany);
		yield put(updateCompanySuccess());
	}catch (error) {
		console.error(`ERROR: ${error.stack}`);
	}
}

function* addCompany(action: PayloadAction<{ company: Partial<CompanyType> }>) {
	try{
		const { company } = action.payload;
		yield fetchWrapper.post(`${API_URL}/api/companies`, company);
		yield put(addCompanySuccess());
	}catch (error) {
		console.error(`ERROR: ${error.stack}`);
	}
}

function* deleteCompany(action: PayloadAction<number>) {
	try{
		const  id  = action.payload;
		yield fetchWrapper.delete(`${API_URL}/api/companies/${id}`);
		yield put(deleteCompanySuccess());
	}catch (error) {
		console.error(`ERROR: ${error.stack}`);
	}
}

export default function* companySaga() {
	yield takeLatest('company/fetchCompanies', getCompaniesList);
	yield takeLatest('company/updateCompanySuccess', getCompaniesList);
	yield takeLatest('company/addCompanySuccess', getCompaniesList);
	yield takeLatest('company/deleteCompanySuccess', getCompaniesList);
	yield takeLatest('company/updateCompany', updateCompany);
	yield takeLatest('company/addCompany', addCompany);
	yield takeLatest('company/deleteCompany', deleteCompany);
}
