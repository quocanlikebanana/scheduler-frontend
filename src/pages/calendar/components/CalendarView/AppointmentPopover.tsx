import { useState } from 'react';
import { X, Clock, FileText, Video } from 'lucide-react';
import { Position, AnchorRect, Popover, BoundaryConstraint } from '../../../../components/common/Popover';

interface AppointmentPopoverProps {
	isOpen: boolean;
	onClose: () => void;
	position?: Position;
	anchorRect?: AnchorRect;
	anchorElement?: HTMLElement | null;
	initialDate?: Date;
	onSave: (appointmentData: AppointmentData) => void;
	boundaryConstraint?: BoundaryConstraint;
	animation?: 'none' | 'fade' | 'zoom' | 'slide';
}

export interface AppointmentData {
	title: string;
	startTime: string;
	endTime: string;
	date: string;
	description?: string;
	location?: string;
	attendees?: string[];
	tags?: string[];
}

interface MeetingOption {
	duration: string;
	minutes: number;
	color: string;
}

export const AppointmentPopover: React.FC<AppointmentPopoverProps> = ({
	isOpen,
	onClose,
	position,
	anchorRect,
	anchorElement,
	initialDate = new Date(),
	onSave,
	boundaryConstraint = null,
	animation = 'fade',
}) => {
	const formattedDate = initialDate.toISOString().split('T')[0];

	const [formData, setFormData] = useState<AppointmentData>({
		title: '',
		startTime: '09:00',
		endTime: '10:00',
		date: formattedDate,
		description: '',
		location: '',
		attendees: [],
		tags: [],
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
		onClose();
	};

	const [selectedTab, setSelectedTab] = useState<'Service' | 'Class' | 'Event' | 'Reminder'>('Service');
	const [selectedMeeting, setSelectedMeeting] = useState<MeetingOption | null>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Convert anchor element to rect if provided
	const effectiveAnchorRect = anchorElement
		? anchorElement.getBoundingClientRect()
		: anchorRect;

	const meetingOptions: MeetingOption[] = [
		{ duration: '15 Minutes Meeting', minutes: 15, color: 'bg-teal-500' },
		{ duration: '30 Minutes Meeting', minutes: 30, color: 'bg-gray-300' },
		{ duration: '1 Hour Meeting', minutes: 60, color: 'bg-yellow-400' },
	];

	return (
		<Popover
			isOpen={isOpen}
			onClose={onClose}
			position={position}
			anchorRect={effectiveAnchorRect}
			placement="auto"
			width={400}
			offset={{ x: 10, y: 10 }}
			boundaryConstraint={boundaryConstraint}
			animation={animation}
		>
			<div className="bg-white rounded-lg w-full"
				style={{
					boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
				}}>
				{/* Header */}
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-xl font-bold">Appointment</h2>
					<button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
						<X size={20} />
					</button>
				</div>

				{/* Tabs */}
				<div className="flex border-b">
					{(['Service', 'Class', 'Event', 'Reminder'] as const).map((tab) => (
						<button
							key={tab}
							className={`px-6 py-3 text-sm font-medium ${selectedTab === tab
								? 'text-black border-b-2 border-black'
								: 'text-gray-500'
								}`}
							onClick={() => setSelectedTab(tab)}
						>
							{tab}
						</button>
					))}
				</div>

				{/* Form content */}
				<div className="p-4">
					{/* Service selector */}
					<div className="relative mb-4">
						<div
							className="flex items-center border rounded-lg p-3 cursor-pointer"
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						>
							<div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
							<span className="text-gray-500">
								{selectedMeeting ? selectedMeeting.duration : 'Select a service'}
							</span>
						</div>

						{/* Dropdown */}
						{isDropdownOpen && (
							<div className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
								{meetingOptions.map((option) => (
									<div
										key={option.duration}
										className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
										onClick={() => {
											setSelectedMeeting(option);
											setIsDropdownOpen(false);
										}}
									>
										<div className={`w-6 h-6 rounded-full ${option.color} mr-2`}></div>
										<div>
											<div className="font-medium">{option.duration}</div>
											<div className="text-sm text-gray-500">{option.minutes} mins</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Time selector */}
					<div className="flex items-center mb-4">
						<Clock className="text-gray-400 mr-2" size={20} />
						<input
							type="text"
							placeholder="Set time"
							className="border-b border-gray-300 w-full p-2 focus:outline-none"
						/>
					</div>

					{/* Video link */}
					<div className="flex items-center mb-4">
						<Video className="text-gray-400 mr-2" size={20} />
						<input
							type="text"
							placeholder="Add video link"
							className="border-b border-gray-300 w-full p-2 focus:outline-none"
						/>
					</div>

					{/* Notes */}
					<div className="flex items-center mb-4">
						<FileText className="text-gray-400 mr-2" size={20} />
						<input
							type="text"
							placeholder="Notes to provider and guest(s)"
							className="border-b border-gray-300 w-full p-2 focus:outline-none"
						/>
					</div>

					{/* Provider */}
					<div className="flex items-center mb-6">
						<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
							<span className="text-gray-600 text-sm">A</span>
						</div>
						<span>An Ngo</span>
					</div>
				</div>

				{/* Footer */}
				<div className="flex justify-end p-4">
					<button className="bg-black text-white px-6 py-2 rounded-full font-medium" onClick={handleSubmit}>
						Create
					</button>
				</div>
			</div>
		</Popover>
	);
};