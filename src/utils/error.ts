import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

/**
 * Parses RTK Query errors into user-friendly messages
 * @param error The error object from RTK Query
 * @param defaultMessage Optional default message to show
 * @returns An object with user-friendly error message and details
 */
export function parseRtkError(
	error: FetchBaseQueryError | SerializedError | undefined,
	defaultMessage = 'An error occurred'
): { message: string; details: string | null } {
	if (!error) {
		return { message: defaultMessage, details: null };
	}

	// Handle FetchBaseQueryError
	if ('status' in error) {
		const status = typeof error.status === 'number' ? error.status : error.status;
		const data = 'data' in error ? JSON.stringify(error.data) : null;

		// Handle specific error codes
		if (status === 'FETCH_ERROR') {
			return {
				message: 'Network error - please check your connection',
				details: data
			};
		} else if (status === 'PARSING_ERROR') {
			return {
				message: 'Error processing data from server',
				details: data
			};
		} else if (status === 'TIMEOUT_ERROR') {
			return {
				message: 'Request timed out - please try again',
				details: data
			};
		} else if (status === 'CUSTOM_ERROR') {
			return {
				message: 'Application error',
				details: data
			};
		} else if (status === 401) {
			return {
				message: 'Authentication error - please login again',
				details: data
			};
		} else if (status === 403) {
			return {
				message: 'You don\'t have permission to perform this action',
				details: data
			};
		} else if (status === 404) {
			return {
				message: 'Requested resource not found',
				details: data
			};
		} else if (status >= 500) {
			return {
				message: 'Server error - please try again later',
				details: data
			};
		}

		return {
			message: `Error ${status}`,
			details: data
		};
	}

	// Handle SerializedError
	return {
		message: error.message || defaultMessage,
		details: JSON.stringify(error)
	};
}