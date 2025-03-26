import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
	id: string | null;
	name: string;
	email: string;
	isAuthenticated: boolean;
}

const initialState: AccountState = {
	id: "1",
	name: 'John Doe',
	email: 'johndoe@gmail.com',
	isAuthenticated: false,
};

const accountSlice = createSlice({
	name: 'account',
	initialState,
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

export default accountSlice.reducer;