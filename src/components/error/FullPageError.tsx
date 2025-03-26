import React from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ErrorMessage } from './ErrorMessage';

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
 * A full-page error message display
 */
export const FullPageError: React.FC<ErrorMessageProps> = (props) => {
	return (
		<div className="flex items-center justify-center h-full w-full">
			<ErrorMessage {...props} className="text-center" />
		</div>
	);
};