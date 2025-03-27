import React from "react";
import { HOURS_12 } from "../../../../../utils/date";
import HourCell from "../Items/HourCell";
import { TimeRange } from "../../../../../features/booking/apis/booking.api-gen";

interface WorkScheduleProps {
	weekSchedule: {
		dayIndex: number;
		dayName: string;
		workHours: TimeRange[];
		isToday: boolean;
	}[];
	slotHeight: number;
	onCellClick?: (quarter: number, hour: number, dayIndex: number, event: React.MouseEvent) => void;
}

const getCordinatesRange = (timeRange: TimeRange, slotHeight: number) => {
	const getCordinates = (time: { hour: number; minute: number }) => {
		return slotHeight * time.hour + (slotHeight / 60) * time.minute;
	};
	return {
		start: getCordinates(timeRange.start),
		end: getCordinates(timeRange.end),
	};
};

const WorkHoursLayout: React.FC<WorkScheduleProps> = ({
	weekSchedule,
	slotHeight,
	onCellClick
}) => {
	return (
		<div className="absolute left-0 top-0 w-full grid grid-cols-7 h-fit">
			{weekSchedule.map((ws) => {
				return (
					<div key={ws.dayIndex} className="relative border-r border-gray-300 bg-gray-200">
						{ws.workHours.map((wh, index) => {
							const { start, end } = getCordinatesRange(wh, slotHeight);
							return (
								<div
									key={index}
									className="absolute left-0 right-0 w-full bg-white z-0"
									style={{
										top: start,
										height: end - start,
									}}
								></div>
							);
						})}
						{HOURS_12.map((hour) => (
							<div className="relative" key={hour.value}>
								<HourCell
									hourValue={hour.value}
									dayIndex={ws.dayIndex}
									height={slotHeight}
									onClick={(quarter, event) =>
										onCellClick && onCellClick(quarter, hour.value, ws.dayIndex, event)
									}
								/>
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
};

export default WorkHoursLayout;