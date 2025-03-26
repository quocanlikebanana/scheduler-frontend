import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { getEndOfWeek, getStartOfWeek } from '../../../utils/date';
import { useAppSelector } from '../../../app/hooks';
import { selectors } from '../../../features/account/accountSlice';
import { useGetStoresByStoreIdAvailabilityQuery, WorkHoursOfDays } from '../../../features/booking/apis/booking.api-gen';

interface CalendarContextProps {
	startOfWeek: Date;
	endOfWeek: Date;
	storeId: string;
	currentTeamCalendarId: string | null;
	setCurrentTeamCalendarId: (id: string | null) => void;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const storeId = useAppSelector(selectors.getStoreIdStrict);
	const [currentTeamCalendarId, setCurrentTeamCalendarId] = useState<string | null>(null);

	const [startOfWeek, endOfWeek] = useMemo(() => {
		const start = getStartOfWeek();
		const end = getEndOfWeek();
		return [start, end];
	}, []);

	return (
		<CalendarContext.Provider value={{
			startOfWeek,
			endOfWeek,
			storeId,
			currentTeamCalendarId,
			setCurrentTeamCalendarId
		}}>
			{children}
		</CalendarContext.Provider>
	);
};

export const useCalendarContext = (): CalendarContextProps => {
	const context = useContext(CalendarContext);
	if (!context) {
		throw new Error('useCalendar must be used within a CalendarProvider');
	}
	return context;
};