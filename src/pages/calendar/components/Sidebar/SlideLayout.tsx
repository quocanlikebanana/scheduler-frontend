import { ReactNode } from 'react';

type SlideLayoutProps = {
	children: ReactNode;
	isCollapsed: boolean;
	expandedWidth?: string;
	collapsedWidth?: string;
	className?: string;
};

/**
 * A layout component that can collapse and expand with a smooth transition
 */
export const SlideLayout = ({
	children,
	isCollapsed,
	expandedWidth = 'w-64',
	collapsedWidth = 'w-16',
	className = '',
}: SlideLayoutProps) => {
	return (
		<div
			className={`flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? collapsedWidth : expandedWidth
				} ${className}`}
		>
			{children}
		</div>
	);
};