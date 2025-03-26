import { useRouteError, isRouteErrorResponse, useNavigate, Link } from 'react-router';

interface ErrorPageProps {
	/**
	 * Optional title for the error page
	 * @default "Something went wrong"
	 */
	title?: string;

	/**
	 * Whether to show home link
	 * @default true
	 */
	showHomeLink?: boolean;

	/**
	 * Whether to show back button
	 * @default true
	 */
	showBackButton?: boolean;

	/**
	 * Error object (will use route error if not provided)
	 */
	error?: unknown;
}

/**
 * Error page component for React Router integration
 * Can be used as an errorElement in route definitions
 */
export default function ErrorPage({
	title = "Something went wrong",
	showHomeLink = true,
	showBackButton = true,
	error: propError
}: ErrorPageProps) {
	const navigate = useNavigate();
	const routeError = useRouteError();
	const error = propError || routeError;

	// Parse error information
	let status = "Error";
	let message = "An unexpected error occurred";

	if (isRouteErrorResponse(error)) {
		// This is a React Router error response
		status = `${error.status}`;
		message = error.statusText || error.data?.message || message;
	} else if (error instanceof Error) {
		message = error.message;
	} else if (typeof error === 'string') {
		message = error;
	} else if (error && typeof error === 'object' && 'message' in error) {
		message = String((error as any).message);
	}

	return (
		<div className="flex items-center justify-center min-h-[70vh] px-4">
			<div className="text-center max-w-md">
				<h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
				<div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
					<p className="text-sm font-semibold text-red-800">{status}</p>
					<p className="text-sm text-red-700 mt-1">{message}</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					{showBackButton && (
						<button
							onClick={() => navigate(-1)}
							className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
							aria-label="Go back"
						>
							Go Back
						</button>
					)}

					{showHomeLink && (
						<Link
							to="/"
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
							aria-label="Go to home page"
						>
							Go to Homepage
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}