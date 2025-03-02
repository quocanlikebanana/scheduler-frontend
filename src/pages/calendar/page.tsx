import { useState } from 'react';
import Sidebar from './components/Sidebar/comp';
import Header from './components/Header/comp';
import CalendarView from './components/CalendarView/comp';

const CalendarPage = () => {
	const [isYourCalendarOpen, setIsYourCalendarOpen] = useState(false);

	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar />
			<div className="flex-1 flex flex-col h-screen bg-gray-100">
				<Header yourCalendarOpen={isYourCalendarOpen} onYourCalendarClick={() => setIsYourCalendarOpen(!isYourCalendarOpen)} />
				<CalendarView sideCollapsed={isYourCalendarOpen} />
			</div>
		</div>
	);
};

export default CalendarPage;