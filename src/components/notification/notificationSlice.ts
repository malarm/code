import { createSlice } from '@reduxjs/toolkit';

interface NotificationSlice {
	message: string;
	severity: string;
	isOpen: boolean;
	redirectLink: string;
}

const initialState: NotificationSlice = {
	message: "",
	severity:"",
	isOpen: false,
	redirectLink: "",
};

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		showNotification(state, action) {
			state.isOpen = true;
			state.message = action.payload.message;
			state.severity = action.payload.severity ?? 'info';
			if(action.payload.redirectLink){
				state.redirectLink = action.payload.redirectLink;
			}
		},
		closeNotification: (state) => initialState,
	},
});

export const {
	showNotification,
	closeNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
