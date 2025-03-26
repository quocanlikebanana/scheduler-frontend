import React, { useState } from 'react';
import { Calendar, CalendarDays, Users, LayoutGrid, Calendar as CalendarIcon, Grid3X3 } from 'lucide-react';
import { Menu } from '../../../../components/common/Menu';
import { Switch } from '../../../../components/switch/comp';

interface ViewOption {
	id: string;
	label: string;
	shortcut: string;
	icon: React.ReactNode;
}

const MenuSchedule = () => {
	const [selectedView, setSelectedView] = useState('week');
	const [hideWeekends, setHideWeekends] = useState(false);

	const viewOptions: ViewOption[] = [
		{ id: 'day', label: 'Day', shortcut: 'D', icon: <CalendarIcon size={18} /> },
		{ id: 'week', label: 'Week', shortcut: 'W', icon: <LayoutGrid size={18} /> },
		{ id: 'month', label: 'Month', shortcut: 'M', icon: <CalendarDays size={18} /> },
		{ id: 'agenda', label: 'Agenda', shortcut: 'A', icon: <Calendar size={18} /> },
		{ id: 'team', label: 'Team', shortcut: 'T', icon: <Users size={18} /> },
	];

	const handleViewSelect = (viewId: string) => {
		setSelectedView(viewId);
	};

	return (
		<Menu button={
			<Grid3X3 size={20} className="text-gray-600" />
		}>
			<div className='w-min-48 w-fit'>
				<ul className="w-full">
					{viewOptions.map((option) => (
						<li
							key={option.id}
							className="flex items-center px-2 py-2 hover:bg-gray-100 cursor-pointer"
							onClick={() => handleViewSelect(option.id)}
						>
							<div className="w-6">
								{selectedView === option.id && (
									<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								)}
							</div>
							<span className="text-gray-700 mr-2">{option.icon}</span>
							<span className="text-gray-800 flex-1">{option.label}</span>
							<div className='flex items-center justify-center w-8'>
								<span className="text-gray-500 text-sm mr-2">{option.shortcut}</span>
							</div>
						</li>
					))}
				</ul>

				<div className="border-t border-gray-200 mt-1 pt-2 px-4">
					<div className="w-48 flex items-center justify-between p-2">
						<span className=" text-gray-800 flex-1">Hide weekends</span>
						<Switch className='ml-auto' />
					</div>
				</div>
			</div>
		</Menu>
	);
};

export default MenuSchedule;