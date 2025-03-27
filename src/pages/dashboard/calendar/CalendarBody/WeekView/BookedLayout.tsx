import { useCallback } from "react";
import { Book } from "../../../../../features/booking/apis/booking.api-gen";
import BookItem from "../Items/BookItem";
import { AppColor } from "../../../../../utils/color";
import { useCalendarContext } from "../../calendar.context";

type GridCoordinate = {
	top: number;
	horizontalChunk: number;
	height: number;
}

type Props = {
	services: Book[];
	slotHeight: number;
}

export default function BookedLayout({
	services,
	slotHeight,
}: Props) {
	const { startOfWeek, endOfWeek } = useCalendarContext();

	const serviceToCoordinates = useCallback((service: Book) => {
		const startDate = new Date(service.start);
		const endDate = new Date(service.end);
		// Time zone: Z => GTM+7 => + 7 hours, so 9:00 => 16:00

		return coordinateToGrid(startDate, endDate, slotHeight, startOfWeek, endOfWeek);
	}, [slotHeight, startOfWeek, endOfWeek]);

	return (
		<div className='absolute left-0 top-0 w-full h-full'>
			<div className="relative grid grid-cols-7 w-full h-full">
				{services.map((service) => {
					const coordinates = serviceToCoordinates(service);
					return coordinates.map((coord, coordIndex) => (
						<div className={`relative grid-cols-${coord.horizontalChunk} flex justify-center`} key={`${service.id}-${coordIndex}`}>
							<div className="absolute w-full h-full px-1 z-10"
								style={{
									top: `${coord.top}px`,
									height: `${coord.height}px`,
								}}>
								<BookItem
									serviceName={service.service.name}
									color={AppColor.randomColor()}
								/>
							</div>
						</div>
					));
				})}
			</div>
		</div>
	);
}

/**
 * Converts start and end dates to an array of grid coordinates
 * @param coordinateStart - The start date of the event
 * @param coordinateEnd - The end date of the event
 * @param slotHeight - Height of each hour slot in pixels
 * @param startOfWeek - The start date of the current week
 * @param endOfWeek - The end date of the current week
 * @returns Array of grid coordinates for each day the event spans
 */
const coordinateToGrid = (
	coordinateStart: Date,
	coordinateEnd: Date,
	slotHeight: number,
	startOfWeek: Date,
	endOfWeek: Date
): GridCoordinate[] => {
	const coordinates: GridCoordinate[] = [];

	// Ensure dates are within the week boundaries
	const clippedStart = new Date(Math.max(coordinateStart.getTime(), startOfWeek.getTime()));
	const clippedEnd = new Date(Math.min(coordinateEnd.getTime(), endOfWeek.getTime()));

	// If the event doesn't fall in this week, return empty array
	if (clippedStart > clippedEnd) {
		return [];
	}

	// Get the day of week for start and end (0 = Sunday, 6 = Saturday)
	const startDayOfWeek = clippedStart.getDay();
	const endDayOfWeek = clippedEnd.getDay();

	// For each day the event spans
	for (let day = startDayOfWeek; day <= endDayOfWeek; day++) {
		// Calculate vertical position (top)
		let dayStart = clippedStart;
		let dayEnd = clippedEnd;

		// If not the first day, start at beginning of the day
		if (day !== startDayOfWeek) {
			const currentDay = new Date(startOfWeek);
			currentDay.setDate(currentDay.getDate() + (day - currentDay.getDay()));
			currentDay.setHours(0, 0, 0, 0);
			dayStart = currentDay;
		}

		// If not the last day, end at end of the day
		if (day !== endDayOfWeek) {
			const currentDay = new Date(startOfWeek);
			currentDay.setDate(currentDay.getDate() + (day - currentDay.getDay()));
			currentDay.setHours(23, 59, 59, 999);
			dayEnd = currentDay;
		}

		// Calculate top position
		const startHour = dayStart.getHours();
		const startMinute = dayStart.getMinutes();
		const top = startHour * slotHeight + (slotHeight / 60) * startMinute;

		// Calculate height (duration)
		const durationMs = dayEnd.getTime() - dayStart.getTime();
		const durationMinutes = durationMs / (1000 * 60);
		const height = (durationMinutes / 60) * slotHeight;

		coordinates.push({
			top,
			horizontalChunk: day,
			height // Adding height property for convenience
		});
	}

	return coordinates;
};
