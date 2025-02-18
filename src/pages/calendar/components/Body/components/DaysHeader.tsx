export default function DaysHeader() {
	const currentDate = new Date(2025, 1, 18); // February 18, 2025
	const weekDays = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date(currentDate);
		date.setDate(currentDate.getDate() - 2 + i); // Start from Monday (2 days before Wednesday)
		weekDays.push({
			date: date.getDate(),
			day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
			isToday: date.getDate() === 18 && date.getMonth() === 1, // Assuming today is Feb 18
		});
	}
	return (
		<div className="flex border-b bg-white">
			<div className="w-16 border-r"></div>
			{weekDays.map((day, index) => (
				<div
					key={index}
					className={`flex-1 text-center py-2 ${day.isToday ? 'bg-blue-900 text-white' : ''}`}
				>
					<div className={`text-sm ${day.isToday ? 'text-white' : 'text-gray-500'}`}>{day.day}</div>
					<div className={`${day.isToday ? 'w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center mx-auto' : ''}`}>
						{day.date}
					</div>
				</div>
			))}
		</div>
	);
}
