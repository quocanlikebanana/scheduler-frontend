import React from 'react';

interface Props {
	/**
	 * Optional size in pixels
	 * @default 24
	 */
	size?: number;

	/**
	 * Border width
	 * @default 2
	 */
	borderWidth?: number;

	/**
	 * Color for the active part of the spinner
	 * @default "currentColor"
	 */
	color?: string;

	/**
	 * Whether to center in the parent container
	 * @default false
	 */
	centered?: boolean;

	/**
	 * Optional class names to add
	 */
	className?: string;
}

/**
 * Simple spinner component for loading states
 */
export const SpinnerLocal: React.FC<Props> = ({
	size = 24,
	borderWidth = 2,
	color = "currentColor",
	centered = true,
	className = '',
}) => {
	const containerClass = centered ? 'flex items-center justify-center h-full w-full' : '';

	return (
		<div className={containerClass}>
			<div
				className={`inline-block rounded-full border-t-transparent animate-spin ${className}`}
				style={{
					width: `${size}px`,
					height: `${size}px`,
					borderWidth: `${borderWidth}px`,
					borderColor: color,
					borderTopColor: 'transparent'
				}}
				aria-label="Loading"
			/>
		</div>
	);
};

/**
 * Full page centered spinner
 */
export const FullPageSpinner: React.FC<Omit<Props, 'centered'>> = (props) => (
	<SpinnerLocal {...props} centered={true} />
);