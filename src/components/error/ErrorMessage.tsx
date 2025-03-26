import React from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { parseRtkError } from '../../utils/error';

interface ErrorMessageProps {
	/**
	 * The error object from RTK Query
	 */
	error: FetchBaseQueryError | SerializedError | undefined;

	/**
	 * Optional default message to show if no specific error message is available
	 */
	defaultMessage?: string;

	/**
	 * Optional callback for retry action
	 */
	onRetry?: () => void;

	/**
	 * Whether to show retry button
	 * @default true
	 */
	showRetry?: boolean;

	/**
	 * Custom classes to apply to the container
	 */
	className?: string;
}

/**
 * A reusable component for displaying API error messages
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
	error,
	defaultMessage = 'An error occurred',
	onRetry,
	showRetry = true,
	className = '',
}) => {
	const { message } = parseRtkError(error, defaultMessage);

	const handleRetry = () => {
		if (onRetry) {
			onRetry();
		} else {
			// Default retry behavior is to reload the page
			window.location.reload();
		}
	};

	return (
		<div className={`flex flex-col items-center justify-center p-4 ${className}`}>
			<div className="text-red-500 mb-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 inline mr-2"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span className="font-semibold">{message}</span>
			</div>

			{showRetry && (
				<button
					className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
					onClick={handleRetry}
					aria-label="Retry"
				>
					Retry
				</button>
			)}
		</div>
	);
};
