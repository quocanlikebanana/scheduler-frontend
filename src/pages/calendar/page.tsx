import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical, Plus, Grid3X3 } from 'lucide-react';

const CalendarPage = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 60000);

		return () => clearInterval(timer);
	}, []);

	// Generate time slots from 5am to 11am for this example
	const timeSlots = Array.from({ length: 7 }, (_, i) => 5 + i);

	// Current week days
	const currentDate = new Date(2025, 1, 18); // February 18, 2025
	const weekDays = [];

	for (let i = 0; i < 7; i++) {
		const date = new Date(currentDate);
		date.setDate(currentDate.getDate() - 2 + i); // Start from Monday (2 days before Wednesday)
		weekDays.push({
			date: date.getDate(),
			day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
			isToday: date.getDate() === 18 && date.getMonth() === 1, // Assuming today is Feb 18
		});
	}

	const handleScroll = (e) => {
		setScrollPosition(e.target.scrollTop);
	};

	return (
		<div className="flex flex-col h-screen bg-gray-100">
			{/* Header - Fixed */}
			<div className="flex justify-between items-center px-4 py-2 bg-white border-b">
				<div className="flex items-center">
					<div className="mr-4 text-gray-700">
						<span className="font-medium">Your calendar</span>
					</div>
				</div>
				<div className="flex items-center">
					<span className="mr-4 font-medium">February 2025</span>
					<button className="p-1 rounded-full hover:bg-gray-200 mr-1">
						<ChevronLeft size={20} className="text-gray-600" />
					</button>
					<button className="p-1 rounded-full hover:bg-gray-200 mr-4">
						<ChevronRight size={20} className="text-gray-600" />
					</button>
					<button className="px-4 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded mr-4">
						Today
					</button>
					<button className="p-1 rounded-full hover:bg-gray-200 mr-1">
						<Grid3X3 size={20} className="text-gray-600" />
					</button>
					<button className="p-1 rounded-full hover:bg-gray-200 mr-1">
						<Plus size={20} className="text-gray-600" />
					</button>
					<button className="p-1 rounded-full hover:bg-gray-200">
						<MoreVertical size={20} className="text-gray-600" />
					</button>
					<button className="ml-4 px-6 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-full">
						Share
					</button>
				</div>
			</div>

			{/* Calendar Body */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar */}
				<div className="w-48 bg-white border-r flex flex-col">
					<div className="p-3 text-gray-700 font-medium">Your calendars</div>
					<div className="p-2 flex items-center hover:bg-gray-100 rounded mx-1">
						<div className="w-6 h-6 flex items-center justify-center bg-purple-100 rounded-sm text-purple-700 mr-2">
							A
						</div>
						<span className="text-sm">An Ngo</span>
					</div>
					<div className="mt-2 p-2 flex items-center text-gray-600 hover:bg-gray-100 rounded mx-1">
						<Plus size={16} className="mr-2" />
						<span className="text-sm">Connect calendar</span>
					</div>
				</div>

				{/* Main Grid */}
				<div className="flex-1 flex flex-col">
					{/* Days Header */}
					<div className="flex border-b bg-white">
						<div className="w-16 border-r"></div>
						{weekDays.map((day, index) => (
							<div
								key={index}
								className={`flex-1 text-center py-2 ${day.isToday ? 'bg-blue-900 text-white' : ''}`}
							>
								<div className={`text-sm ${day.isToday ? 'text-white' : 'text-gray-500'}`}>{day.day}</div>
								<div className={`${day.isToday ? 'w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center mx-auto' : ''}`}>
									{day.date}
								</div>
							</div>
						))}
					</div>

					{/* Scrollable Grid */}
					<div
						className="flex-1 overflow-y-auto relative"
						onScroll={handleScroll}
					>
						{/* Time Grid */}
						<div className="flex min-h-full">
							{/* Time Labels */}
							<div className="w-16 flex flex-col text-right pr-2 text-gray-500 text-sm">
								{timeSlots.map((hour) => (
									<div key={hour} className="h-16 flex items-start">
										<span className="mt-1">{hour}AM</span>
									</div>
								))}
							</div>

							{/* Grid Columns */}
							<div className="flex-1 grid grid-cols-7 border-l">
								{Array.from({ length: 7 }).map((_, dayIndex) => (
									<div key={dayIndex} className="border-r">
										{timeSlots.map((hour) => (
											<div
												key={hour}
												className={`h-16 border-b ${hour < 9 ? 'bg-gray-100' : 'bg-white'}`}
											></div>
										))}
									</div>
								))}
							</div>

							{/* Current Time Indicator */}
							<div
								className="absolute left-16 right-0 flex items-center"
								style={{
									top: 3 * 16 + 6, // Positioned at 8:06 (3rd hour after 5AM + 6 minutes)
								}}
							>
								<div className="w-2 h-2 rounded-full bg-black"></div>
								<div className="flex-1 h-px bg-black"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CalendarPage;