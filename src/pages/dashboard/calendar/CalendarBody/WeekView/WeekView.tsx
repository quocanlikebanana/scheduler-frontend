import { useEffect, useMemo, useState } from "react";
import { getStartOfWeek, HOURS_12, isSameDate, WEEK_DAYS } from "../../../../../utils/date";
import { Book, TimeRange, WorkHoursOfDays } from "../../../../../features/booking/apis/booking.api-gen";
import CurrentTimeIndicatorLayout from "./CurrentTimeIndicatorLayout";
import BookedLayout from "./BookedLayout";
import WorkHoursLayout from "./WorkHoursLayout";
import { useCalendarContext } from "../../calendar.context";

const SLOT_HEIGHT = 64;

type WeekSchedule = {
	dayIndex: number;
	dayName: string;
	workHours: TimeRange[];
	isToday: boolean;
};

const getWeekSchedule = (workHours: WorkHoursOfDays) => {
	const now = new Date();
	const startOfWeek = getStartOfWeek(now);
	const mappedWorkHours = new Map<number, TimeRange[]>();
	workHours.forEach((wh) => {
		mappedWorkHours.set(wh.dayOfWeek, wh.workHours);
	});
	const weekSchedule: WeekSchedule[] = WEEK_DAYS.map((wd, index) => {
		const date = new Date(startOfWeek);
		date.setDate(date.getDate() + index);
		return {
			dayIndex: date.getDate(),
			dayName: wd.short,
			workHours: mappedWorkHours.get(index) ?? [],
			isToday: isSameDate(date, now)
		};
	});
	return weekSchedule;
}

type Props = {
	services: Book[];
	workHoursOfDays: WorkHoursOfDays;
	onCellClick?: (date: Date, anchorElement: HTMLElement) => void;
};

export default function WeekView({
	services,
	workHoursOfDays,
	onCellClick
}: Props) {
	const { startOfWeek } = useCalendarContext();
	const [now, setNow] = useState(new Date());

	// Update time every minute
	useEffect(() => {
		const timeOut = setTimeout(() => {
			setNow(new Date());
		}, 60000); // 1 minute
		return () => clearTimeout(timeOut);
	}, [now]);

	const weekSchedule = useMemo(() => getWeekSchedule(workHoursOfDays), [workHoursOfDays]);

	const timeIndicator = {
		top: now.getHours() * SLOT_HEIGHT + now.getMinutes() / 60 * SLOT_HEIGHT,
		horizontalChunk: (now.getDay() + 6) % 7 + 1,
	};

	const handleCellClick = (quarter: number, hour: number, dayIndex: number, event: React.MouseEvent) => {
		if (!onCellClick) return;

		// Create date from the cell information
		const date = new Date(startOfWeek);
		date.setDate(startOfWeek.getDate() + dayIndex);
		date.setHours(hour);
		date.setMinutes(quarter * 15);

		// Pass the element that was clicked to use as anchor
		onCellClick(date, event.currentTarget as HTMLElement);
	};

	return (
		<div className="flex-1 flex flex-col overflow-y-auto relative">
			{/* 5% - 95% layout */}

			{/* Days Header */}
			<div className="flex flex-col sticky top-0 bg-white z-20">
				{/* Day display */}
				<div className="self-end w-[95%] flex items-baseline">
					{weekSchedule.map((day, index) => (
						<div
							key={index}
							className="flex-1 py-2 text-sm"
						>
							<div className={`flex items-center justify-center gap-1 ${day.isToday
								? 'text-black font-bold'
								: 'text-gray-700'}`}>
								<span className={`${day.isToday
									? 'bg-black text-white rounded-lg p-1'
									: ''
									}`}>{day.dayIndex}</span>
								<span>{day.dayName}</span>
							</div>
						</div>
					))}
				</div>

				{/* Whole day selection */}
				<div className="min-h-8 flex w-full border-b border-gray-300">
					<div className="w-[5%] text-xs text-gray-500 flex items-end justify-end pb-1 pr-1 border-r border-gray-300">ICT</div>
					<div className="w-[95%] flex">
						{weekSchedule.map((_, dayIndex) => (
							<div key={dayIndex} className="flex-1 border-r border-gray-300 bg-white cursor-pointer"></div>
						))}
					</div>
				</div>
			</div>

			{/* Time Grid */}
			<div className="flex w-full min-h-full">
				{/* Hours Labels */}
				<div className="w-[5%] flex flex-col text-right pr-1 text-gray-500 font-light text-xs min-h-fit border-r border-gray-300 bg-white">
					{HOURS_12.map((hour) => (
						<div key={hour.value} className="flex items-start justify-end" style={{ height: SLOT_HEIGHT }}>
							<span>{hour.label}</span>
						</div>
					))}
				</div>

				{/* Main Layout */}
				<div className="w-[95%] relative h-fit">

					<WorkHoursLayout
						weekSchedule={weekSchedule}
						slotHeight={SLOT_HEIGHT}
						onCellClick={handleCellClick}
					/>

					<CurrentTimeIndicatorLayout timeIndicator={timeIndicator} />

					<BookedLayout
						slotHeight={SLOT_HEIGHT}
						services={services}
					/>
				</div>
			</div>
		</div>
	);
}
