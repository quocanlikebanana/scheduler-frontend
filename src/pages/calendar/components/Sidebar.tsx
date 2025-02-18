import {
	Bell, Calendar, List, CreditCard, SmileIcon, Grid, Settings, Share2,
	ArrowUp, HelpCircle, ChevronLeft
} from 'lucide-react';

const Sidebar = () => {
	return (
		<div className="h-screen w-64 flex flex-col bg-white border-r border-gray-200">
			{/* Header & Profile */}
			<div className="p-4 flex items-center">
				<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
					<span className="text-gray-600 font-bold">A</span>
				</div>
				<span className="font-medium text-gray-800">Ango</span>
				<ChevronLeft className="ml-auto text-gray-500" size={18} />
			</div>

			{/* Notification Item */}
			<div className="px-4 py-3 flex items-center">
				<Bell className="w-5 h-5 text-gray-700 mr-3" />
				<span className="text-sm font-medium text-gray-800">Grow your brand</span>
				<div className="ml-auto w-6 h-6 bg-gray-200 rounded-full"></div>
			</div>

			{/* Navigation Items */}
			<div className="flex-1 overflow-y-auto">
				<div className="mt-2">
					<div className="px-4 py-3 flex items-center bg-gray-100 rounded-none">
						<div className="w-5 h-5 bg-gray-800 rounded-sm flex items-center justify-center mr-3">
							<Calendar className="w-3 h-3 text-white" />
						</div>
						<span className="text-sm font-medium text-gray-800">Calendar</span>
					</div>

					<div className="px-4 py-3 flex items-center">
						<List className="w-5 h-5 text-gray-700 mr-3" />
						<span className="text-sm font-medium text-gray-800">Services</span>
					</div>

					<div className="px-4 py-3 flex items-center">
						<CreditCard className="w-5 h-5 text-gray-700 mr-3" />
						<span className="text-sm font-medium text-gray-800">Payments</span>
					</div>

					<div className="px-4 py-3 flex items-center">
						<SmileIcon className="w-5 h-5 text-gray-700 mr-3" />
						<span className="text-sm font-medium text-gray-800">Customers</span>
					</div>

					<div className="px-4 py-3 flex items-center">
						<Grid className="w-5 h-5 text-gray-700 mr-3" />
						<span className="text-sm font-medium text-gray-800">Integrations</span>
					</div>

					<div className="px-4 py-3 flex items-center">
						<Settings className="w-5 h-5 text-gray-700 mr-3" />
						<span className="text-sm font-medium text-gray-800">Settings</span>
					</div>
				</div>
			</div>

			{/* Bottom Actions */}
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
		</div>
	);
};

export default Sidebar;