import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { User } from '../../types/user';

type LoginState = {
	token: string | null;
	loggedInUser: User | null;
	isLoggingIn: boolean;
}

const initialState: LoginState = {
	loggedInUser: null,
	isLoggingIn: false,
	token: null,
};

const loginSlice = createSlice<LoginState, SliceCaseReducers<LoginState>, string>({
	name: 'auth',
	initialState,
	reducers: {
		initiateLogin(state) {
			state.isLoggingIn = true;
		},
		loginUser(state, action: PayloadAction<{ user: User, token: string }>) {
			state.loggedInUser = action.payload.user;
			state.token = action.payload.token;
			state.isLoggingIn = false;
		},
		logoutUser(state) {
			state.loggedInUser = null;
			state.isLoggingIn = false;
			state.token = null;
		}
	},
});

export const {
	initiateLogin,
	loginUser,
	logoutUser,
} = loginSlice.actions;
export default loginSlice.reducer;
