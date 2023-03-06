import { put, takeLatest } from 'redux-saga/effects';
import { fetchWrapper, API_URL } from '../../app/api';
import { User } from '../../types/user';
import { fetchUsersSuccess, updateAdminSuccess } from './adminSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { showNotification } from '../notification/notificationSlice';

function* getUsersList() {
	try {
		const users: User[] = yield fetchWrapper.get<User[]>(`${API_URL}/api/users`);
		yield put(fetchUsersSuccess({ users }));
	} catch (error: any) {
		console.error(`ERROR: ${error.stack}`);
	}
}

function* updateAdmin(action: PayloadAction<{ id: number, admin: Partial<User> }>) {
	try {
		const { id, admin } = action.payload;
		yield fetchWrapper.put(`${API_URL}/api/users/${id}`, admin);
		yield put(updateAdminSuccess());
		yield put(showNotification({ severity: 'success', message: 'Updated successfully' }));
	} catch (error: any) {
		yield put(showNotification({ severity: 'error', message: `Error update  details` }));
		console.error(`ERROR: ${error.stack}`);
	}
}
export default function* loginSaga() {
	yield takeLatest('admin/fetchUsers', getUsersList);
	yield takeLatest('admin/updateAdminSuccess', getUsersList);
	yield takeLatest('admin/updateAdmin', updateAdmin);
}
