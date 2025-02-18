import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical, Plus, Grid3X3 } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BodyComp from './components/Body/comp';

const CalendarPage = () => {
	const [currentTime, setCurrentTime] = useState(new Date());

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
				{/* Header - Fixed */}
				<Header />

				{/* Calendar Body */}
				<BodyComp />

			</div>
		</div>
	);
};

export default CalendarPage;