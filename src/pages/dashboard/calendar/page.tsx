import { useState } from "react";
import Header from "./CalendarHeader/CalendarHeader";
import CalendarBody from "./CalendarBody/CalendarBody";
import { SlideLayout } from "../../../components/panels/SlidePanel";
import CalendarSide from "./CalendarSide/CalendarSide";

export default function CalendarPage() {
	const [isYourCalendarOpen, setIsYourCalendarOpen] = useState(false);

	return (
		<div className="flex-1 flex flex-col h-screen bg-gray-100">
			<Header
				yourCalendarOpen={isYourCalendarOpen}
				onYourCalendarClick={() => setIsYourCalendarOpen(!isYourCalendarOpen)}
			/>

			<div className="flex overflow-hidden">
				<SlideLayout isCollapsed={isYourCalendarOpen} expandedWidth="w-48" collapsedWidth="w-0">
					<CalendarSide />
				</SlideLayout>

				<CalendarBody />
			</div>
		</div>
	);
}
