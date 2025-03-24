import { useState } from "react";
import Header from "./Header/CalendarHeader";
import CalendarBody from "./CalendarBody";

export default function CalendarPage() {
	const [isYourCalendarOpen, setIsYourCalendarOpen] = useState(false);

	return (
		<div className="flex-1 flex flex-col h-screen bg-gray-100">
			<Header
				yourCalendarOpen={isYourCalendarOpen}
				onYourCalendarClick={() => setIsYourCalendarOpen(!isYourCalendarOpen)}
			/>
			<CalendarBody sideCollapsed={isYourCalendarOpen} />
		</div>
	);
}
