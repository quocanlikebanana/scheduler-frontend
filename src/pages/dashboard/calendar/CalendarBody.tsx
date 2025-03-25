import { useState, useRef, useEffect } from 'react';
import { SlideLayout } from '../../../components/panels/SlidePanel';
import CalendarSide from './Side/CalendarSide';
import WeeklySchedule from './WeekView/WeekScheduleGrid';
import { AppointmentPopover, AppointmentData } from './AppointmentPopover';
import { BoundaryConstraint } from '../../../components/common/Popover';

type CalendarViewProps = {
	sideCollapsed: boolean;
	onAppointmentCreate?: (appointment: AppointmentData) => void;
};

export default function CalendarBody({ sideCollapsed, onAppointmentCreate }: CalendarViewProps) {
	const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
	const [isToCloseAppointmentCellClick, setIsToCloseAppointmentCellClick] = useState(false);
	const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
	const [initialDate, setInitialDate] = useState(new Date());
	const [boundaryConstraint, setBoundaryConstraint] = useState<BoundaryConstraint>(null);

	// Ref to the calendar container
	const calendarContainerRef = useRef<HTMLDivElement>(null);

	// Handle cell click from the weekly schedule grid
	const handleCellClick = (date: Date, element: HTMLElement) => {
		setInitialDate(date);
		setAnchorElement(element);
		if (isToCloseAppointmentCellClick) {
			setIsToCloseAppointmentCellClick(false);
		} else {
			setIsAppointmentOpen(true);
		}
	};

	// Update boundary constraint when the container resizes or opens/closes
	useEffect(() => {
		if (calendarContainerRef.current) {
			const updateBoundary = () => {
				const rect = calendarContainerRef.current?.getBoundingClientRect();
				if (rect) {
					setBoundaryConstraint({
						top: rect.top,
						right: rect.right,
						bottom: rect.bottom,
						left: rect.left
					});
				}
			};

			// Initial calculation
			updateBoundary();

			// Update on window resize
			window.addEventListener('resize', updateBoundary);
			return () => {
				window.removeEventListener('resize', updateBoundary);
			};
		}
	}, [sideCollapsed]); // Re-calculate when side panel collapses/expands

	// Handle saving the appointment
	const handleSaveAppointment = (appointmentData: AppointmentData) => {
		if (onAppointmentCreate) {
			onAppointmentCreate(appointmentData);
		}
		setIsAppointmentOpen(false);
	};

	// Set the next cell click is to close the appointment popover
	useEffect(() => {
		if (isAppointmentOpen) {
			setIsToCloseAppointmentCellClick(true);
		}
	}, [isAppointmentOpen]);

	return (
		<div className="flex flex-1 overflow-hidden relative" ref={calendarContainerRef}>
			<SlideLayout isCollapsed={sideCollapsed} expandedWidth="w-48" collapsedWidth="w-0">
				<CalendarSide />
			</SlideLayout>

			<WeeklySchedule onCellClick={handleCellClick} />

			<AppointmentPopover
				isOpen={isAppointmentOpen}
				onClose={() => setIsAppointmentOpen(false)}
				anchorElement={anchorElement}
				initialDate={initialDate}
				onSave={handleSaveAppointment}
				boundaryConstraint={boundaryConstraint}
				animation="zoom"
			/>
		</div>
	);
}
