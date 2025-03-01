import {
	Bell, Calendar, List, CreditCard, SmileIcon, Grid, Settings, Share2,
	ArrowUp, HelpCircle, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { Navigation, NavigationItem } from './Navigation';
import { SlideLayout } from './SlideLayout';

// Define navigation items array for better maintainability
const navItems: NavigationItem[] = [
	{ icon: <Bell />, label: "Grow your brand" },
	{ icon: <Calendar />, label: "Calendar" },
	{ icon: <List />, label: "Services" },
	{ icon: <CreditCard />, label: "Payments" },
	{ icon: <SmileIcon />, label: "Customers" },
	{ icon: <Grid />, label: "Integrations" },
	{ icon: <Settings />, label: "Settings" },
];

const Sidebar = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [selectedNavItem, setSelectedNavItem] = useState(1); // Default to Calendar (index 1)

	const toggleSidebar = () => {
		setCollapsed(!collapsed);
	};

	const handleNavItemClick = (index: number) => {
		setSelectedNavItem(index);
	};

	return (
		<SlideLayout
			isCollapsed={collapsed}
			className="h-screen bg-white border-r border-gray-200"
		>
			{/* Header & Profile */}
			<div className="p-4 flex items-center">
				{!collapsed && (
					<>
						<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
							<span className="text-gray-600 font-bold">A</span>
						</div>
						<span className="font-medium text-gray-800">Ango</span>
					</>
				)}
				<button
					onClick={toggleSidebar}
					className={`${collapsed ? 'mx-auto' : 'ml-auto'} text-gray-500 hover:bg-gray-100 p-1 rounded-full`}
					aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
				>
					{collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
				</button>
			</div>

			{/* Navigation Items */}
			<Navigation
				items={navItems}
				selectedIndex={selectedNavItem}
				isCollapsed={collapsed}
				onItemClick={handleNavItemClick}
			/>

			{/* Bottom Actions - Only show in expanded mode */}
			{!collapsed && (
				<div className="border-t border-gray-200 p-4">
					<div className="flex items-center mb-4">
						<span className="text-sm font-medium text-blue-900">Share your Booking Page link</span>
						<Share2 className="ml-auto text-gray-700" size={18} />
					</div>

					<button className="w-full bg-green-100 text-green-800 rounded-md py-2 mb-4 flex items-center justify-center">
						<ArrowUp className="w-4 h-4 mr-2" />
						<span className="text-sm font-medium">Get Pro</span>
					</button>

					<div className="flex items-center mb-4">
						<div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center mr-2">
							<HelpCircle className="w-4 h-4 text-white" />
						</div>
						<span className="text-sm font-medium text-gray-800">Help & Support</span>
					</div>

					<div className="flex items-center">
						<div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-2">
							<span className="text-xs font-medium text-gray-700">A</span>
						</div>
						<span className="text-sm font-medium text-gray-800">An Ngo</span>
						<div className="ml-1 w-2 h-2 bg-green-500 rounded-full"></div>
					</div>
				</div>
			)}
		</SlideLayout>
	);
};

export default Sidebar;