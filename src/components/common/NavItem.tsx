import { ReactNode } from "react";

type NavItemProps = {
	icon: ReactNode;
	label: string;
	isSelected?: boolean;
	isCollapsed: boolean;
	onClick: () => void;
};

export const NavItem = ({
	icon,
	label,
	isSelected = false,
	isCollapsed = false,
	onClick,
}: NavItemProps) => {
	const baseClasses = `${isCollapsed ? 'justify-center' : 'px-4'}`;
	const selectedClasses = isSelected ? 'bg-gray-100 rounded-none' : '';

	// Determine icon styling based on selection state
	const iconBackground = isSelected ? "bg-gray-800" : undefined;
	const iconColor = isSelected ? "text-white" : "text-gray-700";

	return (
		<div
			className={`${baseClasses} ${selectedClasses} py-3 flex items-center cursor-pointer hover:bg-gray-50`}
			onClick={onClick}
		>
			{isSelected ? (
				<div className={`w-5 h-5 ${iconBackground} rounded-sm flex items-center justify-center mr-3`}>
					<div className={`${iconColor} flex items-center justify-center w-3 h-3`}>
						{icon}
					</div>
				</div>
			) : (
				<div className={`w-5 h-5 flex items-center justify-center ${iconColor} mr-3`}>
					{icon}
				</div>
			)}
			<span className={`${isCollapsed ? 'hidden' : ''} text-sm font-medium text-gray-800`}>{label}</span>
		</div>
	);
};
