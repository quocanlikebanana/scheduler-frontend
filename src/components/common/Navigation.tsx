import { ReactNode } from "react";
import { NavItem } from "./NavItem";

export type NavigationItem = {
	icon: ReactNode;
	label: string;
};

type NavigationProps = {
	items: NavigationItem[];
	selectedIndex: number;
	isCollapsed: boolean;
	onItemClick: (index: number) => void;
};

export const Navigation = ({
	items,
	selectedIndex,
	isCollapsed,
	onItemClick,
}: NavigationProps) => {
	return (
		<div className="flex-1 overflow-y-auto">
			<div className="mt-2">
				{items.map((item, index) => (
					<NavItem
						key={index}
						icon={item.icon}
						label={item.label}
						isSelected={selectedIndex === index}
						isCollapsed={isCollapsed}
						onClick={() => onItemClick(index)}
					/>
				))}
			</div>
		</div>
	);
};