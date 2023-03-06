import { put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchWrapper, API_URL } from '../../app/api';
import { UserSetting } from "../../types/userSetting";
import { updateSettingState, settingsLoaded } from "./usersettingSlice";
import { showNotification } from "../notification/notificationSlice";

function* fetchSetting() {
	try {
		const setting: UserSetting = yield fetchWrapper.get(`${API_URL}/api/users/settings`);
		yield put(updateSettingState(setting));
		yield put(settingsLoaded());
	} catch (error) {
		console.error(`ERROR: ${error.stack}`);
	}
}

function* updateSetting(action: PayloadAction<{userSettings: UserSetting}>) {
	try {
		const { userSettings } = action.payload;
		const result: UserSetting = yield fetchWrapper.post(`${API_URL}/api/users/settings`, userSettings);
		yield put(updateSettingState(result));
	} catch (error) {
		yield put(showNotification({severity: 'error', message: `Error on update user settings`}));
		console.error(`ERROR: ${error.stack}`);
	}
}

export default function* userSettingSaga() {
	yield takeLatest('userSetting/fetchSetting', fetchSetting);
	yield takeLatest('userSetting/updateSetting', updateSetting);
}
