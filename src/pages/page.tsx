'use client';
import { useState } from 'react';

export default function HomePage() {
	const [date, setDate] = useState(new Date());

	return (
		<main className="min-h-screen bg-gray-50">
			<nav className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex justify-between items-center">
						<h1 className="text-2xl font-bold text-indigo-600">Scheduler</h1>
						<button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
							New Event
						</button>
					</div>
				</div>
			</nav>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="bg-white rounded-lg shadow">
					<div className="p-6">
						<div className="flex items-center justify-between mb-8">
							<h2 className="text-xl font-semibold text-gray-800">Your Schedule</h2>
							<div className="flex space-x-4">
								<button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
									Day
								</button>
								<button className="px-4 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-md">
									Week
								</button>
								<button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
									Month
								</button>
							</div>
						</div>

						<div className="border rounded-lg min-h-[600px] p-4">
							<div className="grid grid-cols-7 gap-4">
								{Array.from({ length: 7 }).map((_, index) => (
									<div key={index} className="text-center p-2 border-b">
										<div className="text-sm text-gray-500">
											{new Date(date.getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
										</div>
										<div className="text-lg font-medium">
											{new Date(date.getTime() + index * 24 * 60 * 60 * 1000).getDate()}
										</div>
									</div>
								))}
							</div>

							<div className="mt-4">
								{/* Placeholder for events */}
								<div className="bg-indigo-100 border-l-4 border-indigo-600 p-3 rounded mb-2">
									<p className="text-sm text-indigo-600 font-medium">9:00 AM - Team Meeting</p>
									<p className="text-xs text-gray-500">Virtual Conference Room</p>
								</div>
								<div className="bg-green-100 border-l-4 border-green-600 p-3 rounded">
									<p className="text-sm text-green-600 font-medium">2:00 PM - Project Review</p>
									<p className="text-xs text-gray-500">Meeting Room 2</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}