import {createSlice} from '@reduxjs/toolkit';
import {UserSetting} from "../../types/userSetting";

interface UserSettingSlice {
	setting: UserSetting | null;
	settingLoaded: boolean;
}

const initialState: UserSettingSlice = {
	setting: null,
	settingLoaded: false,
};

const userSettingSlice = createSlice({
	name: 'userSetting',
	initialState,
	reducers: {
		fetchSetting: (state) => {},
		settingsLoaded: (state) => {
			state.settingLoaded = true;
		},
		updateSettingState: (state,action) => {
			state.setting = action.payload;
		},
		updateSetting(state, action){
		},
	},
});

export const {
	fetchSetting,
	updateSettingState,
	settingsLoaded,
	updateSetting
} = userSettingSlice.actions;
export default userSettingSlice.reducer;
