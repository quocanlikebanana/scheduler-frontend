import CalendarSide from './components/CalendarSide';
import WeeklySchedule from './components/WeeklySchedule';

export default function CalendarView() {
	return (
		<div className="flex flex-1 overflow-hidden">
			<CalendarSide />
			<WeeklySchedule />
		</div>
	);
}
