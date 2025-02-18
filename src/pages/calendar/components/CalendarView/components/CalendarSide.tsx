import { Plus } from "lucide-react";

export default function CalendarSide() {
	return (
		<div className="w-48 bg-white border-r flex flex-col">
			<div className="p-3 text-gray-700 font-medium">Your calendars</div>
			<div className="p-2 flex items-center hover:bg-gray-100 rounded mx-1">
				<div className="w-6 h-6 flex items-center justify-center bg-purple-100 rounded-sm text-purple-700 mr-2">
					A
				</div>
				<span className="text-sm">An Ngo</span>
			</div>
			<div className="mt-2 p-2 flex items-center text-gray-600 hover:bg-gray-100 rounded mx-1">
				<Plus size={16} className="mr-2" />
				<span className="text-sm">Connect calendar</span>
			</div>
		</div>
	)
}
