import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
	id: string | null;
	storeId: string | null;
	name: string;
	email: string;
	isAuthenticated: boolean;
}

const initialState: AccountState = {
	id: "1",
	name: 'John Doe',
	email: 'johndoe@gmail.com',
	isAuthenticated: false,
	storeId: "1"
};

const accountSlice = createSlice({
	name: 'account',
	initialState,
	selectors: {
		getStoreIdStrict: (state) => {
			if (!state.storeId) {
				throw new Error('Store ID is not set');
			}
			return state.storeId
		},
	},
	reducers: {
		login(state, action: PayloadAction<{ id: string; name: string; email: string }>) {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.isAuthenticated = true;
		},
		logout(state) {
			state.id = null;
			state.name = '';
			state.email = '';
			state.isAuthenticated = false;
		},
		updateAccount(state, action: PayloadAction<{ name?: string; email?: string }>) {
			if (action.payload.name) {
				state.name = action.payload.name;
			}
			if (action.payload.email) {
				state.email = action.payload.email;
			}
		},
	},
});

export const { login, logout, updateAccount } = accountSlice.actions;
export const selectors = accountSlice.selectors;

export default accountSlice.reducer;