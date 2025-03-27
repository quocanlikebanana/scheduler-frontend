import { useEffect } from 'react';
import WeekView from './WeekView/WeekView';
import { FullPageError } from '../../../../components/error/FullPageError';
import { useGlobalSpinner } from '../../../../global/GlobalSpinner';
import useScheduled from '../../../../features/booking/hooks/useScheduled';
import { NewBookProvider, useNewBookContext } from './new-book.context';
import NewBookPopover from './BookPopover/NewBookPopover';


export default function CalendarBody() {
	const { showSpinner, hideSpinner } = useGlobalSpinner();
	const {
		containerRef,
		handleCellClick,
	} = useNewBookContext();

	const { data, isLoading, error } = useScheduled();
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

	return (
		<NewBookProvider>
			<div className="flex flex-1 overflow-y-scroll relative" ref={containerRef}>
				<WeekView
					services={data.booked}
					workHoursOfDays={data.workHours}
					onCellClick={handleCellClick}
				/>
				<NewBookPopover />
			</div>
		</NewBookProvider>
	);
}
