import { configureStore } from '@reduxjs/toolkit';
import { bookingApi } from '../features/booking/apis/booking.api';

const store = configureStore({
	reducer: {
		[bookingApi.reducerPath]: bookingApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(bookingApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;