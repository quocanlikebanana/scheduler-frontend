import { configureStore } from '@reduxjs/toolkit';
import { bookingApi } from '../features/booking/apis/booking.api';
import accountReducer from '../features/account/accountSlice';

const store = configureStore({
	reducer: {
		account: accountReducer,
		[bookingApi.reducerPath]: bookingApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(bookingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;