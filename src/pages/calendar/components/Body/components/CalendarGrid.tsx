import { useState } from "react";

export default function CalendarGrid() {
	const [scrollPosition, setScrollPosition] = useState(0);

	// Generate time slots from 5am to 11am for this example
	const timeSlots = Array.from({ length: 7 }, (_, i) => 5 + i);

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		setScrollPosition(e.currentTarget.scrollTop);
	};

	return (
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
	)
}
