import { PayloadAction } from '@reduxjs/toolkit';
import { put, takeLatest } from 'redux-saga/effects';
import { JwtPayload } from '../../types/user';
import { loginUser } from './loginSlice';
import jwt from 'jsonwebtoken';

function* loginFlow(action: PayloadAction<{ token: string }>) {
	try {
		const { token } = action.payload;
		const decodedToken = jwt.decode(token) as JwtPayload;
		yield put(loginUser({ user: decodedToken.user, token }));
	} catch (error) {
		console.error(`ERROR: ${error.stack}`);
	}
}

export default function* loginSaga() {
	yield takeLatest('auth/initiateLogin', loginFlow);
}
