import { ChevronDown, MoreVertical } from 'lucide-react';
import { Switch } from '../../../../components/switch/comp';
import { Menu } from '../../../../components/common/Menu';

export const MenuMore = () => {
	return (
		<Menu button={
			<MoreVertical size={20} className="text-gray-600" />
		}>
			<div className="w-64 p-3 border-b border-gray-100">
				<div className="flex items-center justify-between py-2">
					<span className="text-sm font-medium text-gray-800">Enable off-hours booking</span>
					<Switch />
				</div>

				<div className="flex items-center justify-between py-2">
					<span className="text-sm font-medium text-gray-800">Enable double booking</span>
					<Switch />
				</div>
			</div>

			<div className="py-1">
				<button className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
					Calendar preferences
				</button>

				<button className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
					Change working hours
				</button>

				<div className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100">
					<span className="text-gray-800">Print Calendar</span>
					<span className="text-xs text-gray-500">CTRL + P</span>
				</div>

				<div className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-100">
					<span className="text-gray-800">View booking stats</span>
					<ChevronDown size={16} className="text-gray-500" />
				</div>
			</div>
		</Menu>
	);
};