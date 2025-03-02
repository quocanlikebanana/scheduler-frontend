import React, { useState } from "react";
import { HOURS_12 } from "../../../../../utils/date";

export interface TimeCellProps {
	hourValue: number;
	dayIndex: number;
	isWorkHour: boolean;
	isWorkDay: boolean;
	height: number;
	onClick?: (quarterHour: number, event: React.MouseEvent) => void;
	className?: string;
}

const HourCell: React.FC<TimeCellProps> = ({
	hourValue,
	dayIndex,
	isWorkHour,
	isWorkDay,
	height,
	onClick,
	className = "",
}) => {
	const [hoveredQuarter, setHoveredQuarter] = useState<number | null>(null);

	// Create an array of quarter hours (0, 1, 2, 3 representing 0, 15, 30, 45 minutes)
	const quarterHours = [0, 1, 2, 3];

	const getTimeDisplay = (hourValue: number, quarter: number) => {
		const hourLabel = HOURS_12.find(h => h.value === hourValue)?.label || '';
		const minutePart = quarter === 0 ? ':00' :
			quarter === 1 ? ':15' :
				quarter === 2 ? ':30' :
					':45';

		// Extract AM/PM from the hour label
		const ampm = hourLabel.includes('AM') ? 'AM' : 'PM';

		// Extract just the hour number from the label
		const hourNumber = hourLabel.split(' ')[0];

		return `${hourNumber}${minutePart} ${ampm}`;
	}

	return (
		<div
			data-hour={hourValue}
			data-day={dayIndex}
			className={`flex flex-col border-b border-gray-300 ${isWorkHour && isWorkDay ? "bg-white" : "bg-gray-200"
				} ${className}`}
			style={{
				height
			}}
		>
			{/* Split into 4 vertical parts */}
			{
				quarterHours.map((quarter) => (
					<div
						key={quarter}
						data-quarter={quarter}
						className={`flex-1 h-[25%] ${quarter < 3 ? "border-b border-gray-100" : ""}
            ${hoveredQuarter === quarter ? "bg-gray-50" : ""}`}
						onClick={(e) => onClick?.(quarter, e)}
						onMouseEnter={() => setHoveredQuarter(quarter)}
						onMouseLeave={() => setHoveredQuarter(null)}
					>
						{hoveredQuarter === quarter && (
							<div className="border-1 text-black text-xs w-full h-fit rounded-sm whitespace-nowrap font-bold overflow-visible">
								{getTimeDisplay(hourValue, quarter)}
							</div>
						)}
					</div>
				))
			}
		</div >
	);
};

export default HourCell;