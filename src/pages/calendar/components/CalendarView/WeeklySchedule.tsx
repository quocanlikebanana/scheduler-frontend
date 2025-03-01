import { useEffect } from "react";
import { getStartOfWeek, HOURS_12, isSameDate, isWorkDay, isWorkHour, WEEK_DAYS } from "../../../../utils/date";

const SLOT_HEIGHT = 64;

export default function WeeklySchedule() {
	const now = new Date();
	const startOfWeek = getStartOfWeek(now);

	const weekSchedule: {
		day: number;
		weekDay: string;
		isToday: boolean;
	}[] = WEEK_DAYS.map((wd, index) => {
		const date = new Date(startOfWeek);
		date.setDate(startOfWeek.getDate() + index);
		return {
			day: date.getDate(),
			weekDay: wd.short,
			isToday: isSameDate(date, now)
		}
	});

	const hourSchedule: {
		hourDisplay: string;
		hourValue: number;
	}[] = HOURS_12.map((hour) => ({ hourDisplay: hour.label, hourValue: hour.value }));


	const timeIndicator = {
		top: now.getHours() * SLOT_HEIGHT + now.getMinutes() / 60 * SLOT_HEIGHT,
		horizontalChunk: now.getDay(),
	};

	useEffect(() => {
	}, []);

	return (
		< div className="flex-1 flex flex-col overflow-y-auto relative" >
			{/* 5% - 95% layout */}

			{/* Days Header */}
			<div className="flex flex-col sticky top-0 bg-white z-10">
				{/* Day display */}
				<div className="self-end w-[95%] flex items-baseline" >
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
									}`}>{day.day}</span>
								<span>{day.weekDay}</span>
							</div>
						</div>
					))
					}
				</div>

				{/* Whole day selection */}
				<div className="min-h-8 flex w-full border-b border-gray-300">
					<div className="w-[5%] text-xs text-gray-500 flex items-end justify-end pb-1 pr-1 border-r border-gray-300">ICT</div>
					<div className="w-[95%] flex">
						{weekSchedule.map((_, dayIndex) => (
							<div key={dayIndex} className="flex-1 border-r border-gray-300 bg-white cursor-pointer"></div>
						))}
					</div>
				</div >
			</div>

			{/* Time Grid */}
			< div className="flex w-full min-h-full" >
				{/* Hours Labels */}
				< div className="w-[5%] flex flex-col text-right pr-1 text-gray-500 font-light text-xs min-h-fit border-r border-gray-300 bg-white">
					{hourSchedule.map((hour) => (
						<div key={hour.hourValue} className="flex items-start justify-end" style={{ height: SLOT_HEIGHT }}>
							<span>{hour.hourDisplay}</span>
						</div>
					))}
				</div >

				{/* Grid Columns */}
				<div className="w-[95%] relative h-fit">
					<div className="grid grid-cols-7 min-h-fit" >
						{weekSchedule.map((_, dayIndex) => (
							<div key={dayIndex} className="border-r border-gray-300">
								{hourSchedule.map((hour) => (
									<div
										key={hour.hourValue}
										className={`flex border-b border-gray-300 ${isWorkHour(hour.hourValue) && isWorkDay(dayIndex) ? 'bg-white' : 'bg-gray-200'}`}
										style={{
											height: SLOT_HEIGHT
										}}
									></div>
								))}
							</div>
						))}
					</div >

					{/* Current Time Indicator */}
					<div
						className="absolute left-0 right-0 flex items-center"
						style={{
							top: timeIndicator.top - 1 // Minus to center the indicator
						}}
					>
						<div className="flex-1 grid grid-cols-7 h-px bg-gray-500">
							<div className="relative " style={{
								gridColumn: timeIndicator.horizontalChunk,
							}}>
								<div className="absolute h-[3px] bg-black w-full " style={{
									top: -1,
								}}>
									<div className="absolute" style={{
										top: -2,
										width: 2,
										height: 7,
										backgroundColor: 'black',
									}}></div>
								</div>
							</div>
						</div>
					</div >
				</div>
			</div >
		</div >
	);
}
