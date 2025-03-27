// Date related utilities

/**
 * 0 is Monday, 6 is Sunday. Contains information about days of the week.
 */
export const WEEK_DAYS: {
	short: string;
	long: string;
}[] = [
		{
			short: 'Mon',
			long: 'Monday'
		},
		{
			short: 'Tue',
			long: 'Tuesday'
		},
		{
			short: 'Wed',
			long: 'Wednesday'
		},
		{
			short: 'Thu',
			long: 'Thursday'
		},
		{
			short: 'Fri',
			long: 'Friday'
		},
		{
			short: 'Sat',
			long: 'Saturday'
		},
		{
			short: 'Sun',
			long: 'Sunday'
		},
	];

export const HOURS_12 = Array.from({ length: 24 }, (_, i) => i).map((h) => {
	if (h === 0) return { value: h, label: '12 AM' };
	if (h < 12) return { value: h, label: `${h} AM` };
	if (h === 12) return { value: h, label: '12 PM' };
	return { value: h, label: `${h - 12} PM` };
});

export const HOURS_24 = Array.from({ length: 24 }, (_, i) => i).map((h) => {
	if (h < 10) return { value: h, label: `0${h}:00` };
	return { value: h, label: `${h}:00` };
});

export const WORK_WEEK_DAYS = [0, 1, 2, 3, 4];
export const WORK_HOURS = [9, 10, 11, 12, 13, 14, 15, 16];

export function getStartOfWeek(date: Date = new Date()) {
	const d = new Date(date);
	const day = d.getDay();
	const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
	d.setDate(diff)
	d.setHours(0, 0, 0, 0);
	return d;
}

export function getEndOfWeek(date: Date = new Date()) {
	const d = new Date(date);
	const day = d.getDay();
	const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
	d.setHours(23, 59, 59, 999);
	d.setDate(diff + 6)
	return d;
}

export function isSameDate(a: Date, b: Date) {
	return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

export function isWorkHour(hour: number) {
	return WORK_HOURS.includes(hour);
}

export function isWorkDay(weekDay: number) {
	return WORK_WEEK_DAYS.includes(weekDay);
}

export class DateUtils {
	static isInWeek(date: Date, weekOf: Date = new Date()) {
		const startOfWeek = getStartOfWeek(weekOf);
		const endOfWeek = getEndOfWeek(weekOf);
		return date >= startOfWeek && date <= endOfWeek;
	}
}