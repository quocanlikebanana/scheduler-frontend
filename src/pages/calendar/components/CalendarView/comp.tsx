import { SlideLayout } from '../Sidebar/SlideLayout';
import CalendarSide from './CalendarSide';
import WeeklySchedule from './WeeklySchedule';

type CalendarViewProps = {
	sideCollapsed: boolean;
};

export default function CalendarView(props: CalendarViewProps) {
	return (
		<div className="flex flex-1 overflow-hidden">
			<SlideLayout isCollapsed={props.sideCollapsed} expandedWidth="w-48" collapsedWidth="w-0">
				<CalendarSide />
			</SlideLayout>
			<WeeklySchedule />
		</div>
	);
}
