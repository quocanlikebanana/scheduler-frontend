import CalendarSide from './components/CalendarSide';
import DaysHeader from './components/DaysHeader';
import CalendarGrid from './components/CalendarGrid';

export default function BodyComp() {
	return (
		<div className="flex flex-1 overflow-hidden">
			<CalendarSide />
			<div className="flex-1 flex flex-col">
				<DaysHeader />
				<CalendarGrid />
			</div>
		</div>
	);
}
