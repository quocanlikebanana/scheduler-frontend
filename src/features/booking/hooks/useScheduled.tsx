import { useCalendarContext } from "../../../pages/dashboard/calendar/context";
import { useCustomGetAvailabilityByStoreIdOrWithTeamIdQuery, useCustomGetBookedByStoreIdOrWithTeamIdQuery } from "../apis/booking.api-custom";

export default function useScheduled() {
	const { storeId, startOfWeek, endOfWeek, currentTeamCalendarId } = useCalendarContext();

	const workHoursQuery = useCustomGetAvailabilityByStoreIdOrWithTeamIdQuery({
		storeId,
		teamId: currentTeamCalendarId ?? undefined,
		start: startOfWeek.toISOString(),
		end: endOfWeek.toISOString(),
	});

	const bookedQuery = useCustomGetBookedByStoreIdOrWithTeamIdQuery({
		storeId,
		teamId: currentTeamCalendarId ?? undefined,
		start: startOfWeek.toISOString(),
		end: endOfWeek.toISOString(),
	});

	if (workHoursQuery.isLoading || bookedQuery.isLoading) {
		return {
			isLoading: workHoursQuery.isLoading || bookedQuery.isLoading,
		};
	}
	if (workHoursQuery.error) {
		return { error: workHoursQuery.error };
	}
	if (bookedQuery.error) {
		return { error: bookedQuery.error };
	}
	if (!workHoursQuery.data || !bookedQuery.data) {
		return { data: null };
	}
	return {
		data: {
			workHours: workHoursQuery.data,
			booked: bookedQuery.data,
		}
	}
}
