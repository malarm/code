import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types/user';

interface AdminSlice {
	users: User[];
	isFetching: boolean;
}

const initialState: AdminSlice = {
	users: [],
	isFetching: false,
};

const adminSlice = createSlice({
	name: 'admin',
	initialState,
	reducers: {
		fetchUsers(state) {
			state.isFetching = true;
		},
		fetchUsersSuccess(state, action) {
			state.isFetching = false;
			state.users = action.payload.users;
		},
		updateAdmin(state, action) {
		},
		updateAdminSuccess(state) {
			state.isFetching = true;
		},
	},
});

export const {
	fetchUsers,
	fetchUsersSuccess,
	updateAdmin,
	updateAdminSuccess
} = adminSlice.actions;
export default adminSlice.reducer;
