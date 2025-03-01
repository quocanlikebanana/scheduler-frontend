import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical, Plus, Grid3X3 } from 'lucide-react';
import Sidebar from './components/Sidebar/comp';
import Header from './components/Header/comp';
import CalendarView from './components/CalendarView/comp';

const CalendarPage = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [sideCollapsed, setSideCollapsed] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 60000);

		return () => clearInterval(timer);
	}, []);


	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar />

			<div className="flex-1 flex flex-col h-screen bg-gray-100">
				<Header onYourCalendarClick={() => setSideCollapsed(!sideCollapsed)} />
				<CalendarView sideCollapsed={sideCollapsed} />
			</div>
		</div>
	);
};

export default CalendarPage;