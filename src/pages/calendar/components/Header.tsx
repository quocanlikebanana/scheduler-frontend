import { ChevronLeft, ChevronRight, Grid3X3, Plus, MoreVertical } from 'lucide-react'

export default function Header() {
	return (
		<div className="flex justify-between items-center px-4 py-2 bg-white border-b">
			<div className="flex items-center">
				<div className="mr-4 text-gray-700">
					<span className="font-medium">Your calendar</span>
				</div>
			</div>
			<div className="flex items-center">
				<span className="mr-4 font-medium">February 2025</span>
				<button className="p-1 rounded-full hover:bg-gray-200 mr-1">
					<ChevronLeft size={20} className="text-gray-600" />
				</button>
				<button className="p-1 rounded-full hover:bg-gray-200 mr-4">
					<ChevronRight size={20} className="text-gray-600" />
				</button>
				<button className="px-4 py-1 text-sm text-gray-700 hover:bg-gray-200 rounded mr-4">
					Today
				</button>
				<button className="p-1 rounded-full hover:bg-gray-200 mr-1">
					<Grid3X3 size={20} className="text-gray-600" />
				</button>
				<button className="p-1 rounded-full hover:bg-gray-200 mr-1">
					<Plus size={20} className="text-gray-600" />
				</button>
				<button className="p-1 rounded-full hover:bg-gray-200">
					<MoreVertical size={20} className="text-gray-600" />
				</button>
				<button className="ml-4 px-6 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-full">
					Share
				</button>
			</div>
		</div>
	)
}
