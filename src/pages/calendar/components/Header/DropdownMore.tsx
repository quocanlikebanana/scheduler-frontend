import { useState, useRef, useEffect } from 'react';
import { ChevronDown, MoreVertical } from 'lucide-react';
import { Switch } from '../../../../components/switch/comp';

export const DropdownMore = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Handle click outside to close dropdown
	useEffect(() => {
		const handleClickOutside = (event: { target: any; }) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative z-20" ref={dropdownRef}>
			{/* Trigger Button */}
			<button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded-full hover:bg-gray-200 cursor-pointer">
				<MoreVertical size={20} className="text-gray-600" />
			</button>

			{/* Dropdown Menu */}
			{isOpen && (
				<div className="absolute mt-1 right-0 w-64 bg-white rounded-lg shadow-lg z-10 overflow-hidden ring-1 ring-black ring-opacity-5">
					<div className="p-3 border-b border-gray-100">
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
				</div>
			)}
		</div>
	);
};