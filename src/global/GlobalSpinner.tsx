import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface GlobalSpinnerContextType {
	/**
	 * Show the global spinner with optional custom message
	 */
	showSpinner: (message?: string) => void;

	/**
	 * Hide the global spinner
	 */
	hideSpinner: () => void;

	/**
	 * Current loading state
	 */
	isLoading: boolean;

	/**
	 * Current spinner message
	 */
	message: string;
}

// Create the context with a default value
const GlobalSpinnerContext = createContext<GlobalSpinnerContextType>({
	showSpinner: () => { },
	hideSpinner: () => { },
	isLoading: false,
	message: ''
});

interface GlobalSpinnerProviderProps {
	children: ReactNode;
	defaultMessage?: string;
	spinnerSize?: number;
	spinnerColor?: string;
	spinnerWidth?: number;
	blur?: boolean;
	opacity?: number;
}

/**
 * Provider component that wraps your app and makes the spinner available globally
 */
export function GlobalSpinnerProvider({
	children,
	defaultMessage = 'Loading...',
	spinnerSize = 40,
	spinnerColor = '#ffffff',
	spinnerWidth = 3,
	blur = false,
	opacity = 70
}: GlobalSpinnerProviderProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState(defaultMessage);

	const showSpinner = useCallback((customMessage?: string) => {
		setMessage(customMessage || defaultMessage);
		setIsLoading(true);
	}, [defaultMessage]);

	const hideSpinner = useCallback(() => {
		setIsLoading(false);
	}, []);

	const value = {
		showSpinner,
		hideSpinner,
		isLoading,
		message
	};

	return (
		<GlobalSpinnerContext.Provider value={value}>
			{children}

			{isLoading && (
				<div
					className="fixed inset-0 flex items-center justify-center transition-opacity duration-300"
					style={{
						backgroundColor: `rgba(0, 0, 0, ${opacity / 100})`,
						zIndex: 9999
					}}
					aria-modal="true"
					aria-labelledby="loading-message"
				>
					{blur && <div className="absolute inset-0 backdrop-blur-sm"></div>}

					<div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg flex flex-col items-center">
						{/* Spinner Element */}
						<div
							className="inline-block rounded-full border-t-transparent animate-spin"
							style={{
								width: `${spinnerSize}px`,
								height: `${spinnerSize}px`,
								borderWidth: `${spinnerWidth}px`,
								borderColor: spinnerColor,
								borderTopColor: 'transparent'
							}}
							aria-label="Loading"
						/>

						{message && (
							<p
								id="loading-message"
								className="mt-4 text-white font-medium text-center"
							>
								{message}
							</p>
						)}
					</div>
				</div>
			)}
		</GlobalSpinnerContext.Provider>
	);
}

/**
 * Custom hook to use the global spinner from any component
 */
export function useGlobalSpinner() {
	const context = useContext(GlobalSpinnerContext);

	if (context === undefined) {
		throw new Error('useGlobalSpinner must be used within a GlobalSpinnerProvider');
	}

	return context;
}