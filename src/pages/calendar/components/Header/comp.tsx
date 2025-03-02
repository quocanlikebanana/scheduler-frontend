import { ChevronLeft, ChevronRight, Grid3X3, PanelLeft, PanelLeftClose, Plus } from 'lucide-react'
import { DropdownMore } from './DropdownMore';

type HeaderProps = {
	onYourCalendarClick: () => void;
	yourCalendarOpen: boolean;
}

export default function Header(props: HeaderProps) {
	return (
		<div className="flex justify-between items-center px-4 py-2 bg-white border-b">
			<div className="flex items-center">
				<button className="flex items-center gap-2 mr-4 text-gray-700 cursor-pointer" onClick={props.onYourCalendarClick}>
					{props.yourCalendarOpen ? (
						<PanelLeftClose size={16} className='pt-1' />
					) : (
						<PanelLeft size={16} className='pt-1' />
					)}
					<span className="font-medium">Your calendar</span>
				</button>
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

				<DropdownMore />


				<button className="ml-4 px-6 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-full">
					Share
				</button>
			</div>
		</div>
	)
}
