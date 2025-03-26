import { useState, useRef, useEffect } from 'react';
import WeeklySchedule from './WeekView/WeekView';
import { AppointmentPopover, AppointmentData } from './AppointmentPopover';
import { BoundaryConstraint } from '../../../../components/common/Popover';
import { useGetStoresByStoreIdAvailabilityQuery } from '../../../../features/booking/apis/booking.api-gen';
import { useCalendarContext } from '../context';
import { FullPageError } from '../../../../components/error/FullPageError';
import { useGlobalSpinner } from '../../../../global/GlobalSpinner';

type CalendarViewProps = {
	onAppointmentCreate?: (appointment: AppointmentData) => void;
};

export default function CalendarBody({
	onAppointmentCreate
}: CalendarViewProps) {
	const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
	const [isToCloseAppointmentCellClick, setIsToCloseAppointmentCellClick] = useState(false);
	const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
	const [initialDate, setInitialDate] = useState(new Date());
	const [boundaryConstraint, setBoundaryConstraint] = useState<BoundaryConstraint>(null);

	const { storeId, startOfWeek, endOfWeek } = useCalendarContext();
	const calendarContainerRef = useRef<HTMLDivElement>(null);
	const { showSpinner, hideSpinner } = useGlobalSpinner();

	const { data, isLoading, error } = useGetStoresByStoreIdAvailabilityQuery({
		storeId,
		start: startOfWeek.toISOString(),
		end: endOfWeek.toISOString(),
	});

	// Update boundary constraint when the container resizes or opens/closes
	useEffect(() => {
		console.log('calendarContainerRef.current: ', calendarContainerRef.current);
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

			const resizeObserver = new ResizeObserver(updateBoundary);
			resizeObserver.observe(calendarContainerRef.current);

			// Update on window resize
			window.addEventListener('resize', updateBoundary);
			return () => {
				if (calendarContainerRef.current) {
					resizeObserver.unobserve(calendarContainerRef.current);
				}
				window.removeEventListener('resize', updateBoundary);
				resizeObserver.disconnect();
			};
		}
	}, []);

	// Set the next cell click is to close the appointment popover
	useEffect(() => {
		if (isAppointmentOpen) {
			setIsToCloseAppointmentCellClick(true);
		}
	}, [isAppointmentOpen]);


	useEffect(() => {
		if (isLoading) {
			showSpinner('Loading calendar data...');
		} else {
			hideSpinner();
		}

		return () => hideSpinner();
	}, [isLoading, showSpinner, hideSpinner]);

	if (error) return <FullPageError error={error} />;
	if (!data) return null;

	const handleCellClick = (date: Date, element: HTMLElement) => {
		setInitialDate(date);
		setAnchorElement(element);
		if (isToCloseAppointmentCellClick) {
			setIsToCloseAppointmentCellClick(false);
		} else {
			setIsAppointmentOpen(true);
		}
	};

	const handleSaveAppointment = (appointmentData: AppointmentData) => {
		if (onAppointmentCreate) {
			onAppointmentCreate(appointmentData);
		}
		setIsAppointmentOpen(false);
	};

	return (
		<div className="flex flex-1 overflow-y-scroll relative" ref={calendarContainerRef}>
			<WeeklySchedule workHoursOfDays={data} onCellClick={handleCellClick} />

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
